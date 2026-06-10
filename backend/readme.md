

```sql
CREATE DATABASE conectacausa;

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

INSERT INTO users ( name, email, senha, tipo_usuario, telefone, data_cadastro ) VALUES
( "ana", "ana@test.com", "ana123", ),
( "rafa@gmail.cm", "234", "rafael");

SELECT nome, email
FROM users;

SELECT *
FROM users
WHERE id = 1;

UPDATE users
SET telefone = '(16)99999-9999'
WHERE id = 1;

DELETE FROM users
WHERE id = 1;

SELECT
    o.id,
    o.nome_ong,
    o.cnpj,
    u.nome,
    u.email,
    u.telefone
FROM ongs o
INNER JOIN users u
ON o.usuario_id = u.id;
```