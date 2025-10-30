import { Model,DataTypes } from "sequelize";

import sequelize from "../drivers/database.mjs";

class Book extends Model {}
Book.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isbn:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    publicationYear:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    pages:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    genre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    publisher:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,modelName:'Book'})

sequelize.sync()
export default Book    