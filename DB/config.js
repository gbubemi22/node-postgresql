import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';




const sequelize = new Sequelize(process.env.DB_DATABASE || 'test', process.env.DB_USER || 'testuser', process.env.DB_PASSWORD || "1234", {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<< YOU NEED THIS
    }
  }
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;



