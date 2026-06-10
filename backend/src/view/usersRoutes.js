const Routes = require("express");
const usersController = require("../controller/usersControllers");

const routes = Routes();

routes.get("/users", async (req, res) => {
    const result = await usersController.Get(req, res);
    return res.status(200).json(result);
});

routes.post("/users", async (req, res) => {
    try {
        const result = await usersController.Post(req, res);
        return res.status(201).json(result);
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);

        return res.status(500).json({
            message: "Error",
            data: "Erro interno no servidor"
        });
    }
});



routes.post("/login", async (req, res) => {
    const result = await usersController.Login(req, res);

    if (result.message === "Success") {
        return res.status(200).json(result);
    }

    return res.status(401).json(result);
});
module.exports = routes;