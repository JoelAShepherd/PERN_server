const router = require('express').Router();
const pool = require('../database/db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    //get username from the database
    try{
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0]);

    } catch(err){
        console.log(err.message)
        res.status(500).json("Server Error")
    }
})



router.get('/orders', authorization, async(req, res)=> {
    //get order history from the database
    try{
        const orderHistory = await pool
        .query("SELECT order_id, json_items_ordered, order_date, cost, order_status FROM orders WHERE user_id = $1",
        [req.user])
        res.json(orderHistory.rows)
        
    } catch(err){
        console.log(err.message)
        res.status(500).json("Server Error On Order History")
    }
})


module.exports = router;