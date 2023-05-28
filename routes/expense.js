const express=require('express');
const router=express.Router();
 const expensecontroller=require('../controller/expense');
 const authenticate=require('../middleware/authenticate');

router.post('/addexpense',authenticate.authentication,expensecontroller.addExpense);
router.get('/getexpense',authenticate.authentication,expensecontroller.getExpense);
router.delete('/deleteexpense/:id',expensecontroller.deleteExpense);
router.get('/get-leaderboard',authenticate.authentication,expensecontroller.getLeaderboard);








module.exports=router;