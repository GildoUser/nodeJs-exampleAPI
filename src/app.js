const express = require("express");
const routes = require("./routes/routes")

class App{
    constructor(){
        this.server = new express();
        this.middleware()
        this.router(routes)
    }

    router(routes){
        this.server.use(routes)
    }

    middleware(){
        this.server.use(express.json())
    }
};

module.exports = new App().server;  
