const db = require("../models");
const Coment = db.coments;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

exports.findAllPublished = async (req, res) => {
    Coment.findAll({
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment'],
                order: [['createdAt', 'ASC']]
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.user,
                        attributes: ['username', 'attachment']
                    },
                    {
                        model: db.coments,
                        coment: req.params.comentId,
                        attributes: ['id', 'coment', 'userId'],
                        order: [["createdAt", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            },
                        ]
                    },
                    {
                        model: db.likes,
                        likes: req.body.likeId,
                        attributes: ['likes'],
                        order: [["created", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            }
                        ],
                    },
                ],
            },
        ],
        order: [['createdAt', 'ASC']],
        attributes: {
            exclude: ['updateAt']
        }
    }).then(result => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la r??cup??ration des publications.",
        });
    });
};
exports.findOnePublished = async (req, res, next) => {
    const comentId = req.params.id;
    Coment.findOne({
        where: {
            id: comentId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.user,
                        attributes: ['username', 'attachment']
                    },
                    {
                        model: db.coments,
                        coment: req.params.comentId,
                        attributes: ['id', 'coment', 'userId'],
                        order: [["createdAt", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            },
                        ]
                    },
                    {
                        model: db.likes,
                        likes: req.body.likeId,
                        attributes: ['likes'],
                        order: [["created", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            }
                        ],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    }).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(400).json({ error });
    });
};
//Permet l'affichage des commentaires associer ?? un post
exports.findCommentsByPostId = async (req, res, next) => {
    const postId = req.params.id;
    Coment.findAll({
        where: {
            postId: postId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.user,
                        attributes: ['username', 'attachment']
                    },
                    {
                        model: db.coments,
                        coment: req.params.comentId,
                        attributes: ['id', 'coment', 'userId'],
                        order: [["createdAt", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            },
                        ]
                    },
                ],
            },
        ]
    }).then(user => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json({
            message:
                error.message ||
                "Une erreur s'est produite lors de la r??cup??ration des commentaires de la publication !",
        });
    });
};
exports.createComent = async (req, res, next) => {
    const coment = new Coment({
        ...req.body,
    })
    coment.save().then(() => {
        console.log(coment);
        res.status(201).json({ message: 'Objet enregistr?? !' })
    }).catch(() => {
        res.status(400).json({
            message: "Vous ne pouvez pas cr??er un commentaire vide !!!"
        });
    });
};
exports.updateComent = async (req, res, next) => {
    const comentId = req.params.id;
    Coment.findOne({
        where: {
            id: comentId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
        ]
    })
    const comentModify = req.file ? {
        ...req.body.comentId,
    } : { ...req.body }
    Coment.update({
        ...comentModify, id: req.params.id
    }, {
        where: { id: req.params.id },
        attributes: ['coment']
    }).then(() => {
        res.status(200).json({
            message: "Le commentaire a ??t?? modifi?? !"
        });
    }).catch((error) => {
        res.status(400).json({
            error, message: "Le comnentaire n'a pas ??t?? modifi?? !"
        });
    });
};
exports.deleteComent = (req, res) => {
    const id = req.params.id;
    Coment.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: 'Commentaire supprim??!'
        });
    }).catch((error) => {
        res.status(400).json({
            error, message: "Vous ne pouvez pas supprimer un commentaire dont vous n'??tes pas l'auteur !!!"
        });
    });
};
