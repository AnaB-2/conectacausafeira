CREATE DATABASE IF NOT EXISTS conectacausa;
USE conectacausa;

CREATE TABLE categoriaUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario INT,
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_usuario) REFERENCES categoriaUsuario(id)
);

CREATE TABLE ongs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome_ong VARCHAR(100),
    cnpj VARCHAR(30),
    descricao VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    foto VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(50)
);

CREATE TABLE doacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doador_id INT,
    quantidade INT,
    mensagem VARCHAR(255),
    status VARCHAR(30),
    data_doacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doador_id) REFERENCES users(id)
);