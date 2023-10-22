import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class ShorthendLink extends Model {
    protected id!: number;
    public user_id!: string;
    public original_link!: string;
    public short_link!: string;
    public redirect_link!: string;
    public link_type!: string;
    public link_expiry!: string;
    public total_click!: string;
    public short_url!: string;
    

    public static get = async (formData:any): Promise<ShorthendLink | null> =>
    {
      return ShorthendLink.findOne({ where: formData });
    }

    public static add = async (formData: any) : Promise <ShorthendLink | null> => 
    {

        try {

        const data = await ShorthendLink.create({...formData,user_id:formData.uuid});  

        const response = { ...data.toJSON() };
        delete response.id;

        return response;
        } catch (error) {
        console.log(error) // please remove
        return null;
        }
    }

    public static updateLink = async  (uuid:string ,formData: any) : Promise <ShorthendLink | null> => 
    {
        try {
        // Update the user record in the database using Sequelize
        const [rowCount, [updateLink]] = await ShorthendLink.update(formData, {
            where: { uuid },
            returning: true, // To get the updated user object
        });

        if (rowCount === 0) return null;// If no rows were updated, return null or throw an error

        const response = { ...updateLink.toJSON() };
        delete response.id;

        return response;
        } catch (error) {
        console.log(error) // please remove
        return null;
        }
    }

    public static delete = async (uuid: string): Promise<boolean> =>  
    {
        try {
        const existingUser = await ShorthendLink.findOne({ where: { uuid } });
        // If an existing user with the same UUID is found, return false
        return !existingUser;
        } catch (error) {
        console.error('Error checking UUID uniqueness:', error);
        throw error;
        }
    }

    // static associate(models) {
    //   // define association here
    // }
  }
  ShorthendLink.init({
    user_id: DataTypes.STRING,
    original_link: DataTypes.STRING,
    short_link: DataTypes.STRING,
    redirect_link: DataTypes.STRING,
    link_type: DataTypes.STRING,
    link_expiry: DataTypes.STRING,
    total_click: DataTypes.STRING,
    short_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "ShorthendLink",
    tableName: 'shorthend_link',
  });


export default ShorthendLink;