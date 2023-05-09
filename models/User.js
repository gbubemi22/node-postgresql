import { Model, DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import Education from './Education.js';
import Business from './BusinessInfo.js';
import Party from './PartyInfo.js';

class User extends Model { }


// Create a new Sequelize instance



// Define the User model
User.init({

     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },

     first_name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     last_name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     email_address: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
               isEmail: {
                    args: true,
                    msg: 'Invalid email address'
               }
          }
     },
     contact_number: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false
     },
     state_origin: {
          type: DataTypes.STRING,
          allowNull: false
     },
     lga_origin: {
          type: DataTypes.STRING,
          allowNull: false
     },
     place_of_birth: {
          type: DataTypes.STRING,
          allowNull: false
     },
     gender: {
          type: DataTypes.ENUM('MALE', 'FEMALE'),
          
     },
     short_bio: {
          type: DataTypes.STRING,
          allowNull: false
     },
     occupation: {
          type: DataTypes.STRING,
          allowNull: false
     },
     account_type: {
          type: DataTypes.ENUM('ELITE', 'POLITICIAN'),
          allowNull: false,
          defaultValue: 'ELITE'
          
     },

}, {
     sequelize,
     modelName: 'User',
     timestamps: true
});



// Define the association

User.hasOne(Education);
Education.belongsTo(User);
User.hasOne(Business);
Business.belongsTo(User);
User.hasOne(Party);
Party.belongsTo(User);


// Export the User model
export default User;


