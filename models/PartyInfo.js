import { Model, DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';




class Party extends Model { }


Party.init({
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },

     current_party_name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     current_party_position: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     current_party_position_status: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     current_date_year_joined: {
          type: DataTypes.STRING,
          allowNull: false,
     },

     userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,  // add this line to set the field as unique
          references: {
               model: 'User',
               key: 'id'
          },
     },

}, {
     sequelize,
     modelName: 'Party',
     timestamps: true
});


import User from '../models/User.js';

// Associate the Education model with the User model



Party.associate = (models) => {
     Party.belongsTo(models.User, {
          onDelete: "cascade",
     })

     return Party;
     
}



export default Party;