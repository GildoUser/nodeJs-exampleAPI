const {Router} = require("express");
const Customer = require("../controllers/customersController")
const routes = new Router();



routes.get("/customers",(req,res)=> Customer.getAll(req,res))
routes.get("/customers/:id",(req,res)=> Customer.getOne(req,res))
routes.post("/customers",(req,res)=> Customer.createCustomer(req,res))
routes.patch("/customers/:id",(req,res)=> Customer.updateCustomer(req,res))
routes.delete("/customers/:id",(req,res)=> Customer.deleteCustomer(req,res))
module.exports = routes;
