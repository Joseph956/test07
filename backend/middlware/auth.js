const db = require("../models");
const User = db.user;
const Post = db.posts;
const Coment = db.coments;
const jwt = require('jsonwebtoken');
const passwrdValidator = require('password-validator');
const emailSchema = require('validator');
require('dotenv').config();

module.exports.token = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.token = token;
                req.user = userId;
                next();
            } else {
                return res.status(401).send({
                    message: "Aucun utilisateur trouvé avec ce jeton !",
                });
            }
        });
    } catch (error) {
        res.status(403).json({ error: error + 'Requête non authentifiée !' });
    }
};
module.exports.haveRightOnPost = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const post = req.params.id;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                if (role.role == "admin") {
                    return next();
                } else {
                    Post.findByPk(post).then(
                        (foundedPost) => {
                            if (foundedPost.userId == userId) {
                                return next();
                            } else {
                                return res.status(403).send({
                                    message: "Sécurité : Vous n'avez pas les droits nécessaires pour supprimer ou modifier ce post !",
                                });
                            }
                        })
                }
            } else {
                return res.status(407).send({
                    message: "Requête non authentifiée !",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non autorisé !' });
    }
};
module.exports.haveRightOnComent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const coment = req.params.id;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                if (role.role == "admin") {
                    return next();
                } else {
                    Coment.findByPk(coment).then((foundedComent) => {
                        if (foundedComent.userId == userId) {
                            return next();
                        } else {
                            return res.status(403).send({
                                message: "Sécurité : Vous n'avez pas les droits necessaires pour modifier ou supprimer ce commentaire !",
                            });
                        }
                    })
                }
            } else {
                return res.status(407).send({
                    message: "Requête non authentifiée !",
                });
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non autorisé !' });
    }
};
module.exports.haveRightOnProfile = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                if (role.role == "admin") {
                    return next();
                } else if (userId == req.params.id) {
                    return next()
                } else {
                    return res.status(403).send(
                        {
                            message: "Sécurité : Vous n'avez pas les droits necessaires pour modifier ou supprimer ce compte utilisateur !",
                        });
                }
            } else {
                return res.status(407).send({
                    message: "Requête non authentifiée !",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Requête non autorisé !' });
    }
};
module.exports.email = (req, res, next) => {
    if (emailSchema.isEmail(req.body.email)) {
        next();
    } else {
        return res.status(400).json({
            error: "Veuillez saisir un email valide !"
        });
    }
};
const passwdSchema = new passwrdValidator();

passwdSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters (majuscule)
    .has().lowercase(1)                              // Must have lowercase letters (minuscule)
    .has().digits(2)                                // Must have at least 2 digits (chiffres)
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports.passwd = (req, res, next) => {
    if (passwdSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            message: "Le mot de passe que vous avez saisi n’est pas conforme, il doit contenir au moins 8 caractères dont au moins un chiffre, une lettre majuscule, et une lettre minuscule" +
                passwdSchema.validate(req.body.password, { list: true })
        })
    }
};
// const confirmPasswdSchema = new passwrdValidator();

// confirmPasswdSchema
//     .is().min(8)                                    // Minimum length 8
//     .is().max(100)                                  // Maximum length 100
//     .has().uppercase(1)                              // Must have uppercase letters (majuscule)
//     .has().lowercase(1)                              // Must have lowercase letters (minuscule)
//     .has().digits(2)                                // Must have at least 2 digits (chiffres)
//     .has().not().spaces()                           // Should not have spaces
//     .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// module.exports.confirmPasswd = (req, res, next) => {
//     if (confirmPasswdSchema.validate(req.body.newPasswd)) {
//         next();
//     } else {
//         return res.status(400).json({
//             message: "Le mot de passe que vous avez saisi n’est pas conforme, il doit contenir au moins 8 caractères dont au moins un chiffre, une lettre majuscule, et une lettre minuscule" +
//                 confirmPasswdSchema.validate(req.body.newPasswd, { list: true })
//         })
//     }
// };
