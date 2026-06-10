
class DatabaseSchemaMysql {
    static async initialize(dbStrategy) {
        console.log("Verificando estrutura do banco de dados...");

        const queries = [
            `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            senha VARCHAR(255),
            tipo_usuario VARCHAR(20),
            telefone VARCHAR(20),
            data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, 
        `CREATE TABLE IF NOT EXISTS ongs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT,
            nome_ong VARCHAR(100),
            cnpj VARCHAR(30),
            descricao VARCHAR(50),
            cidade VARCHAR(100),
            estado VARCHAR(50),
            foto VARCHAR(255),
            FOREIGN KEY (usuario_id) REFERENCES users(id)
        )`,
        `CREATE TABLE IF NOT EXISTS categorias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome_categoria VARCHAR(50)
        )`,
        `CREATE TABLE IF NOT EXISTS doacoes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            doador_id INT,
            quantidade INT,
            mensagem VARCHAR(50),
            status VARCHAR(30),
            data_doacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (doador_id) REFERENCES users(id)
        )`,

        `CREATE TABLE IF NOT EXISTS categoriaUsuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL UNIQUE,
            descricao VARCHAR(255),
            ativo BOOLEAN DEFAULT TRUE,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaMysql }