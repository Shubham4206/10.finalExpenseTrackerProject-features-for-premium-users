const Expense=require('../model/expense');
const User=require('../model/user'); 
const { Op } = require('sequelize');

exports.addExpense=async(req,res,next)=>{
    const{amount,description,category}=req.body;
    if(amount.length>0 && description.length>0 && category.length>0){
            try{
      let data = await  req.user.createExpense({
                amount:amount,
                description:description,
                category:category
            });
            console.log(data);

         res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
    }
}

exports.getExpense=async(req,res,next)=>{
    try{
        let data= await req.user.getExpenses();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({success:false,message:err});
    }
}

exports.deleteExpense=async(req,res,next)=>{
    const uid=req.params.id;
    await Expense.destroy({
        where:{
         id:uid
        }
    });
    res.sendStatus(200);

}

exports.getLeaderboard=async(req,res,next)=>{
    if(req.user.isPremiumUser === true) {
        
        User.findAll({
            where: {
                id: {
                  [Op.not]: req.user.id
                }
              }
        })
            .then(async (users) => {
                let leaderboardData = [];
                try {
                    for(let i = 0; i < users.length; i ++) {
                        let userData = {user: users[i]};
                        let expenses = await users[i].getExpenses();
                        // console.log(expenses);
                        userData['expenses'] = expenses;
                        leaderboardData.push(userData);
                    }
                    res.status(200).json(leaderboardData);
                } catch (error) {
                    throw new Error(error);
                }
                // console.log(leaderboardData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({success: false, error: err});
            })
    } else {
        res.status(403).json({success: false, message: 'user does not premium membership'});
    }

};
