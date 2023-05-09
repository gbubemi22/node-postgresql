import { Model, DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';


class Business extends Model { }


Business.init({
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },
     business_name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     location: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     industry: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     no_of_employee: {
          type: DataTypes.STRING,
          allowNull: true,
     },

     
}, {
     sequelize,
     modelName: 'Business',
     timestamps: true


});


// Associate the Education model with the User model


Business.associate = (models) => {
     Business.belongsTo(models.User, {
          onDelete: "cascade",
     })

     return Business;
     
}


export default Business;