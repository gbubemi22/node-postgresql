import { Model, DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import User from './User.js';

class Education extends Model { }
// Create a new Sequelize instance



Education.init({
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },

     primary_education_name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     primary_education_city: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     primary_education_state: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     primary_education_country: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     primary_education_year_joined: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     primary_education_year_end: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_school_name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_city: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_state: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_country: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_year_joined: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     secondary_education_year_end: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_school_name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_qualification: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_city: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_state: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_country: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_year_joined: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     tertiary_education_year_end: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     other_education_degree: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true
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
     modelName: 'Education',
     timestamps: true

});


// Associate the Education model with the User model




Education.associate = (models) => {
     Education.belongsTo(models.User, {
          onDelete: "cascade",
     })

     return Education;
     
}



export default Education;