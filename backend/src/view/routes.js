// switch das rotas
const Routes = require("express");
const usersRoutes = require("./usersRoutes");
const ongsRoutes = require("./ongsRoutes");
const categoriasRoutes = require("./categoriasRoutes");
const doacoesRoutes = require("./doacoesRoutes");
const catUsersRoutes = require("./catUsersRoutes");


const routes = Routes() ;

routes.use( usersRoutes );
routes.use( ongsRoutes );
routes.use( categoriasRoutes );
routes.use( doacoesRoutes );
routes.use( catUsersRoutes );



routes.get("/test", (req,res) => { 
    //codigo
    res.status(206).json( { "message":"servidor Rodando ..."} );

} );

module.exports = routes;