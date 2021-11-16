module.exports = function(sequelize, dataTypes)
 {
     const alias = "la_morita_images";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         space: {
            type: dataTypes.STRING,
            allowNull: false
        },

        image: {
            type: dataTypes.STRING,
            allowNull: false
        },

        title_for_img: {
            type: dataTypes.STRING,
            allowNull: false
        },
       
        descript_for_img: {
            type: dataTypes.STRING,
            allowNull: true
        }
    };
     const config = {
         tableName: "la_morita_images",
         timestamps: false
     };
     const la_morita_images = sequelize.define(alias, cols, config);
     
     return la_morita_images;

 }