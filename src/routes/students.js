const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM posts', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        
        }else{
            res.json(err);
        }
    });
});

router.get('/id=:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM posts WHERE id = ?', [id], (err, 
    rows, fields) => {
        if(!err){
            res.json(rows[0]);
        
        }else{
            res.json(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, title, status, content, user_id } = req.body;
    
    mysqlConnection.query('INSERT INTO posts (id,title,status,content,user_id) VALUES (?, ?, ?, ?, ?)', [id, title, status, content, user_id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Student Saved'});
        
        }else{
            res.json(err);
        }
    });
});

router.put('/id=:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM posts WHERE id = ?', [id], (err, 
        rows, fields) => {
            if(!err){

                if ("title" in req.body){
                    rows[0]["title"] = req.body["title"]
                }
                if ("status" in req.body){
                    rows[0]["status"] = req.body["status"]
                }
                if ("content" in req.body){
                    rows[0]["content"] = req.body["content"]
                }
                if ("user_id" in req.body){
                    rows[0]["user_id"] = req.body["user_id"]
                }
                const data = [rows[0]["title"], rows[0]["status"], rows[0]["content"], rows[0]["user_id"], rows[0]["id"]]
                const { name } = req.body;
                mysqlConnection.query('UPDATE posts SET title=?, status=?, content=?, user_id=? where id = ?', data, (err, rows, fields) => {
                    if(!err){
                        res.json({status: 'Student Updated'});

                    }else{

                        res.json(err);
                    }
                });
            }else{
                res.json(err);
            }
        });
});

router.delete('/id=:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM posts WHERE id = ?', [id], (err, rows, fiels) => {
        if(!err){
            res.json({status: 'Student Deleted'});
        
        }else{
            res.json(err);
        }
    });
});




module.exports = router;