const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('breed', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        life_span: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },

        height: {
            type: DataTypes.STRING,
            allowNull: false
        },

        create_in_db: { //me va a permitir diferenciar entre las razas traidas de la api y las creadas desde el form
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

};
