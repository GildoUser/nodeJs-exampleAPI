const zod = require("zod");
const Customer = require("../model/Customer")
const verificad = new zod.object({
    nome: zod.string().trim().min(2),
});


class CustomerController{

    getAll(req,res){
        Customer.findAll((err,customers)=>{
            if(err) return res.status(500).json({message: "erro interno"})
            return res.status(200).json({allCustomers:customers})
        });  
        
    }

    getOne(req,res){
        const id = parseInt(req.params.id);
        
        if(isNaN(id)) return res.status(400).json({message:"id inválido"})
        
        Customer.findById(id, (err,customer)=>{
            if(err || !customer) return res.status(404).json({message: "não encontrado"})

            return res.status(200).json({customer: customer});
        });
     }  
    
    createCustomer(req,res){
        const {nome} = req.body;
        const confirmaValidacao = verificad.safeParse({nome})

        if ( confirmaValidacao.success === false) return res.status(400).json({message: "'nome' deve ser uma string válida"});
        
        Customer.createCustomer(confirmaValidacao.data,function(err,id){
            if(err) return res.status(500).json({message:"houve um erro ao criar usuário"})

            res.status(201).json({message:"usuário criado", id:id, newUser:confirmaValidacao.data })
        })
    }
    
    updateCustomer(req,res){
        const id = parseInt(req.params.id);

        if (isNaN(id)){
            return res.status(400).json({message:"id inválido"})
        } 
        const { nome } = req.body;
        const confirmaValidacao = verificad.safeParse({nome})
        
        if (confirmaValidacao.success == false){
            return res.status(400).json({message: "'nome' deve ser uma string válida"});
        }
        Customer.updateCustomer(id,confirmaValidacao.data,(err,changes)=>{
            if(err) return res.status(500).json({message:"erro ao atualizar"})
            if(changes === 0) return res.status(404).json({message: "não encontrado"})

            return res.status(200).json({message: `${changes} linha(s) alterada(s)`, newUserData: confirmaValidacao.data})
        });
    }

    deleteCustomer(req,res){
        const id = parseInt(req.params.id);

        if ( isNaN(id) ){
            return res.status(400).json({message:"id inválido"})
        }

        Customer.deleteCustomer(id,(err,changes)=>{
            if(err || changes === 0) return res.status(404).json({message:"não encontrado"})

            return res.status(200).json({message: `${changes} linha(s) alterada(s)`})

        });

    }

}

module.exports = new CustomerController();
