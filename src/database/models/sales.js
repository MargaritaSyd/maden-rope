module.exports = function(sequelize, dataTypes)
 {
     const alias = "sales";
     const cols = {
        collection_id: {
             type: dataTypes.STRING,
             primaryKey: true,
             autoIncrement: false,
             allowNull: false
         },
         payment_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        payment_type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        merchant_order_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        preference_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        merchant_account_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: dataTypes.STRING,
            allowNull: true
        },
    };
     const config = {
         tableName: "sales",
         timestamps: false
     };
     const sales = sequelize.define(alias, cols, config);
     sales.associate = (models) => {
         sales.belongsTo(models.category, {
             as: "user",
             foreignKey: "id_user"
         })
     }
     return sales

 }