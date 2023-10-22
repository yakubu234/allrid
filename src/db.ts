import { Sequelize,Options } from "sequelize";

import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/env/.env' })

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;


let sequelize: Sequelize; // Explicitly type 'sequelize'

interface SequelizeOptions extends Options { // Extend 'Options' interface
  database: string;
  username: string;
  password: string; 
  host: string;
}


if (DATABASE_URL) {
   sequelize = new Sequelize(DATABASE_URL);
}else{

    // Define Sequelize configuration object
    let sequelizeOptions: SequelizeOptions = {
      database: DATABASE_NAME ?? "",
      username: DATABASE_USER ??"",
      password:DATABASE_PASSWORD ?? "",
      host: DATABASE_HOST ?? "",
      dialect: "postgres",
      logging:false
    }
  
   sequelize = new Sequelize(sequelizeOptions);
}

// const modelsToSync = [User, Author, Book];
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    

    // Synchronize each model  uncomment line 49 to 54 if you want the model create database instead of migration
    // Promise.all(modelsToSync.map(model => model.sync({alter: true })))
      // sequelize
      // .sync().then(() => {
      //         console.log('Database synchronized');
      //       }).catch((error) => {
      //         console.error('Error synchronizing database:', error);
      //       });
    
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
