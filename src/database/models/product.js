module.exports = function(sequelize, dataTypes)
 {
     const alias = "product";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image_product: {
            type: dataTypes.STRING,
            allowNull: true
        },
        image_product_1: {
            type: dataTypes.STRING,
            allowNull: true
        },
        image_product_2: {
            type: dataTypes.STRING,
            allowNull: true
        },
        image_product_3: {
            type: dataTypes.STRING,
            allowNull: true
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description_add: {
            type: dataTypes.STRING,
            allowNull: true
        }
        
    };
     const config = {
         tableName: "product",
         timestamps: false
     };
     const product = sequelize.define(alias, cols, config);
     product.associate = (models) => {
         product.belongsTo(models.category, {
             as: "category",
             foreignKey: "id_category"
         })
     }
     return product

 }