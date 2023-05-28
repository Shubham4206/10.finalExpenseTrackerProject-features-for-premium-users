const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');


const sequelize=require('./util/database.js');



const User=require('./model/user');
const Expense=require('./model/expense');
const Premiumuser = require('./model/premiumuser');




User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Premiumuser);
Premiumuser.belongsTo(User);



const userroute=require('./routes/user');
const expenseroute=require('./routes/expense');


app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors());


app.use('/user',userroute);
app.use('/expense',expenseroute);













sequelize.sync();
app.listen(4000);











