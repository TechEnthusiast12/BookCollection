const router = require('express').Router();
const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../Middleware/authorization');
router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await pool.query("SELECT * from users where user_email = $1", [email]);
      
        if(user.rows.length != 0){
            return res.status(401).json("User already exists...");
        }
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword =  await bcrypt.hash(password, salt);
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await pool.query("Select * from users where user_email = $1", [email]);
       
        // Check if the User exists
        if(user.rows.length === 0){
            return res.status(401).json('User doesnot exist....')
        }

        // Check if the password is correct
        const validity = await bcrypt.compare(password, user.rows[0].user_password);
        if(!validity){
            return res.status(401).json("Email or Password Invalid");
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/verify', authorization, (req, res)=>{
    try {
        
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});



/*
router. get('/users', async (req, res) =>{
    try {
        const users = await pool.query("Select * from users");
        res.json(users);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
} );


*/
module.exports = router;
