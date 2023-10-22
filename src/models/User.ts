import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"; 
import sequelize from "../db";
// import UserLogs from "./UserLogs";

class User extends Model {
  protected id!: number;
  public uuid!: string;
  public first_name!: string;
  public last_name!: string;
  public nick_name!: string | null;
  public email!: string;
  public phone!: string;
  public address!: string;
  public status!: string| null;
  public verified!: boolean|false;
  public password!: string;

  comparePassword = async (candidatePassword: string): Promise<boolean> =>
  {
    return bcrypt.compare(candidatePassword, this.password);
  }

  public static encryptPassword = async (candidatePassword: string)=>
  {
    return await bcrypt.hash(candidatePassword, 10);
  }
  
  public static getUser = async (formData:any): Promise<User | null> =>
  {
    return User.findOne({ where: formData });
  }


  private static generateUniqueUUID = async ():Promise<string>  =>
  {
    let uuid: string;
    do {
      uuid = uuidv4();
      // Check if the UUID already exists in your database here
      // If it exists, repeat the loop and generate another UUID
    } while (!(await this.isUniqueUuidInDatabase(uuid)));
    return uuid;
  }

  private static isUniqueUuidInDatabase = async (uuid: string): Promise<boolean> =>  
  {
    try {
      const existingUser = await User.findOne({ where: { uuid } });
      // If an existing user with the same UUID is found, return false
      return !existingUser;
    } catch (error) {
      console.error('Error checking UUID uniqueness:', error);
      throw error;
    }
  }

  public static registerUser = async (formData: any) : Promise <User | null> => {
    try {
      // Create a new user record in the database using Sequelize
      const hashedPassword = await this.encryptPassword(formData.password);
      const newUuid = await this.generateUniqueUUID();
      const user = await User.create({ ...formData, password: hashedPassword, uuid: newUuid});  

      const userResponse = { ...user.toJSON() };
      delete userResponse.password;
      delete userResponse.id;

      return userResponse;
    } catch (error) {
      console.log(error) // please remove
      return null;
    }
  }

  public static updateUser = async  (uuid:string ,formData: any) : Promise <User | null> => {
    try {
      // Update the user record in the database using Sequelize
      const [rowCount, [updatedUser]] = await User.update(formData, {
        where: { uuid },
        returning: true, // To get the updated user object
      });

      if (rowCount === 0) return null;// If no rows were updated, return null or throw an error

      const userResponse = { ...updatedUser.toJSON() };
      delete userResponse.password;
      delete userResponse.id;

      return userResponse;
    } catch (error) {
      console.log(error) // please remove
      return null;
    }
  }

  // deleteUser = async () : Promise <User | null> => {
  //   return {email:"email",password:"password"};
  // }

  // Define associations
  // static associate(models: any) {
  //   User.hasMany(models.UserLogs, { foreignKey: "user_id" }); // One-to-many relationship
  // }
}

User.init(
  {
  first_name:DataTypes.STRING,
  last_name:DataTypes.STRING,
  nick_name:DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  password:DataTypes.STRING,
  address:DataTypes.STRING ,
  uuid:DataTypes.STRING,
  status:DataTypes.STRING,
  verified:DataTypes.BOOLEAN,


},{
    sequelize,
    modelName: "User",
    tableName: 'users',
  }
);

// User.hasMany(UserLogs, { foreignKey: "user_id" });

export default User;


