const db = require("../db/database");

class Customer {

    findAll(callback){
        db.all('SELECT * FROM customers',(err,customers)=>{
            if(err) return callback(err)
            return callback(null, customers)
        });
    }

    findById(id, callback){
       db.get('SELECT id, nome FROM customers WHERE id = ?', [id], function(err,customer){
        if(err) return callback(err);

        callback(null,customer)
       })

    }

    createCustomer(customer, callback){
        db.run('INSERT INTO customers (nome) VALUES (?)',[customer.nome], function(err){
            if(err) return callback(err);

            callback(null, this.lastID)
        });
    }

    updateCustomer(id,customer,callback){
        db.run('UPDATE customers SET nome = ? WHERE id = ?', [customer.nome, id],function(err){
            if(err) return callback(err);
            return callback(null,this.changes)
        })
    }

    deleteCustomer(id,callback){
        db.run('DELETE FROM customers WHERE id = ?',[id],function(err){
            if(err) return callback(err)
            console.log(this)
            return callback(null,this.changes)
        })

    }
}

module.exports = new Customer();
