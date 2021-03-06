module.exports = (sequelize, Sequelize) => {
    const Coment = sequelize.define("coment", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        coment: {
            type: Sequelize.TEXT("long"),
            allowNull: false,
            required: true,
        },
    });

    return Coment;
};