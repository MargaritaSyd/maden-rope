module.exports = function(sequelize, dataTypes)
 {
     const alias = "user";
     const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mail: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        tel: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        dni: {
            type: dataTypes.STRING,
            allowNull: true
        },
        admin: {
            type: dataTypes.INTEGER,
            allowNull: true
            
        },
        adress: {
            type: dataTypes.STRING,
            allowNull: true
        }
    };
     const config = {
         tableName: "user",
         timestamps: false
     };
     const user = sequelize.define(alias, cols, config);
     return user
 }