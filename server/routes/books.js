const router = require('express').Router();
const pool = require('../models/db');
router.get('/', async (req, res)=>{
    try {
        const {q} = req.query;
        const bookData = await pool.query(`SELECT * from books WHERE title ~* $1 `, [q]);
        const testData = bookData.rows.filter((item)=> item.title.slice(0,q.length).toLowerCase() === q.toLowerCase());
        
        q? res.status(200).json(testData.slice(0,5)) : res.status(200).json([]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');
        
    }
    

})

router.get('/popular', async(req, res)=>{
    try {
        const bookData = await pool.query('SELECT * from books LIMIT 20');
       
        res.status(200).json(bookData.rows);
    } catch (error) {
        
    }
})

module.exports = router;