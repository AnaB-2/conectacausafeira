const myModel = require("../model/categoriasmodel")

async function Get(req,res){
     const responseData = await myModel.Get(req);
     return responseData;
}

async function GetById(req,res){
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

function Post(req,res){
  const payload = req.body;
  const responseData = myModel.Post(payload);
  return responseData;
   
}

function Put(req,res){
  const id = req.params.id;
  const payload = req.body;
  const responseData = myModel.Put(payload , id);
  return responseData;
   
}

function Delete(req,res){
  const id = req.params.id;
  const responseData = myModel.Delete(id);
  return responseData;
}

function EndPointName(){
  return myModel.EndPointName();
}

async function Login(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return { "messege": "Error", "data": "E-mail e senha são obrigatórios!" };
  }

  const user = await myModel.Login(email);

  if (!user) {
    return { "messege": "Error", "data": "Usuário não encontrado!" };
  }

  if (user.password !== password){
    return { "messege": "Error", "data": "Senha incorreta!"};
  }

  const { password: _, ...userWithoutPassword } = user;
  return { "messege": "SUcess", "data": userWithoutPassword };
}

async function UpdateProfile(req, res) {
  
  const payload = req.body;
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName}