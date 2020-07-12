const express = require ('express');
const mysql = require ('mysql');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5050;
var birds = require('./birds')
//middlewares
app.use(bodyParser.json());
app.use('/birds', birds)
//MYSQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ML*EHz12y34x56',
    database: 'db_stock'
});


+
//Routing 
app.get('/', ()=>{

    console.log("bienvenido a probando cosas we have the next url \n users")
});
app.get('/users', (req,res)=>
{

    //const query1 = "SELECT * FROM usuarios;"
    const sql = 'select u.id_usuario as id, u.nombre, u.email, u.clave, u.fecha as fecha_creacion, r.nombre as rol from usuarios as u inner join roles as r on u.rol_id = r.id_rol;';
    
    connection.query(sql,(err,results)=>{
        if (err) throw err;
        
        if (results.length > 0){
            res.json(results);
        }else{
            res.send("We dont have any thing");
        }
    });

});
app.get('/users/:id', (req,res)=>{

    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    connection.query(sql,req.params.id,(err,results)=>{
        if (err) throw err;

        if (results.length > 0){
            res.json(results);
        }else{
            res.send("We dont have it");
        }
    });
    
});

app.post('/users/add', (req,res)=>{
  //const UserColums =['nombre', 'email','clave','rol_id'];
  const UserValues = {
      nombre : req.body.nombre,
      email : req.body.email,
      clave : req.body.clave,
      rol_id : req.body.rol_id
  }
  const sql = 'INSERT INTO usuarios SET ?';
  connection.query(sql,UserValues,(err, results)=>{
    if (err) throw err;
    res.send("añadido XD");
    console.log(results.insertId);
  });
    
   

});
app.put('/users/modify/:id',(req,res)=>{

    let {id} = req.params;
    let {nombre,email,clave,rol_id} = req.body;
    
    const updateQuery = `UPDATE usuarios SET nombre = '${nombre}', email = '${email}', clave = '${clave}', rol_id = '${rol_id}', fecha = now()  WHERE id_usuario =${id}` ; // user update for name, email, password and rol_id
    const validationQuery = `SELECT * FROM usuarios WHERE id_usuario = ${id}`; // existing user validation 
    
    connection.query(validationQuery, (err,results)=>{

        if (err) throw err;
        if (results.length > 0){

            connection.query(updateQuery, (err,result)=>{
                if(err) throw err;
                res.send(`changed ${result.changedRows} row`);
            });
        }else {
            res.send(`Sorry, the row ${id}doesn't exists`);
        }

    });
    //res.send(`hola mundo num. ${req.params.id}`);



});
app.delete('/users/delete/:id', (req,res)=>{

    const id = req.params.id;

    const validationQuery = `SELECT * FROM usuarios WHERE id_usuario = ${id}`; // existing user validation 
    const deleteQuery = `DELETE FROM usuarios WHERE id_usuario =${id}`;
   //res.send(`adios mundo num. ${req.params.id}`);
    connection.query(validationQuery, (err,results)=>{
           if (err) throw err;

           if (results.length > 0){

            connection.query(deleteQuery, (err,result)=>{
                if(err) throw err;
                res.send(`deleted ${result.affectedRows} row`);
            });
        }else {
            res.send(`Sorry, the row ${id}doesn't exists... so you cant delete it `);
        }
    });
});




//verificacion de la coneccion

connection.connect(err => {
if (err) throw err;
console.log('Database Server Running!!!')
});


app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT} `);

});