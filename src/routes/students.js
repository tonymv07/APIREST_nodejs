const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM students', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        
        }else{
            console.log(err);
        }
    });
});

router.get('/id=:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM students WHERE id = ?', [id], (err, 
    rows, fields) => {
        if(!err){
            res.json(rows[0]);
        
        }else{
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, name, age } = req.body;
    const query = `
        CALL studentAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, age], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Student Saved'});
        
        }else{
            console.log(err);
        }
    });
});

router.put('/id=:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    const query = 'CALL studentAddOrEdit(?, ?, ?)';
    mysqlConnection.query(query, [id, name, age], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Student Updated'});

        }else{

            console.log(err);
        }
    });
});

router.delete('/id=:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM students WHERE id = ?', [id], (err, rows, fiels) => {
        if(!err){
            res.json({status: 'Student Deleted'});
        
        }else{
            console.log(err);
        }
    });
});




module.exports = router;