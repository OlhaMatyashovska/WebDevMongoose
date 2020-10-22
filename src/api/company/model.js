import {Schema, model } from 'mongoose';

const companySchema=new mongoose.Schema({
    company:{
        type:String,
        required:true,
        unique:[true, "Така компанія вже занесена в базу даних"],
        maxlength:150
    },
    technologies:{
        type:String,
        required:true
    },
    countriesAllies:{
        type:String,
        required:true,
        enum:{  
            values:["USA", "Canada", "Germany","China","India"],         
            message: 'Дозволені ролі "USA", "Canada", "Germany","China","India"',
        },
        default:"USA"
    },
    workercount:{
        type:Number,
        required:true,
        min:10,
        max:1000000
    }
});
const Company = model("company", companySchema);

export default Company;