
class DatabaseSchemaSqlite {
    static async initialize(dbStrategy) {
        console.log("Verificando estrutura do banco de dados...");

        const queries = [
            `CREATE TABLE IF NOT EXISTS users (
            id INTEGER  PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT,
            tipo_usuario TEXT,
            telefone TEXT,
            data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, 
        `CREATE TABLE IF NOT EXISTS ongs (
            id INT AUTO INCREMENT PRIMARY KEY,
            usuario_id INT,
            nome_ong TEXT,
            cnpj TEXT,
            descricao TEXT,
            cidade TEXT,
            estado TEXT,
            foto TEXT,
            FOREIGN KEY (usuario_id) REFERENCES users(id)
        )`,
        `CREATE TABLE IF NOT EXISTS categorias (
            id INT AUTO INCREMENT PRIMARY KEY,
            nome_categoria TEXT
        )`,
        `CREATE TABLE IF NOT EXISTS doacoes (
            id INT AUTO INCREMENT PRIMARY KEY,
            doador_id INT,
            quantidade INT,
            mensagem TEXT,
            status TEXT,
            data_doacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (doador_id) REFERENCES users(id)
        )`,
        `CREATE TABLE IF NOT EXISTS categoriaUsuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            ativo BOOLEAN DEFAULT 1,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            
        )`
        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaSqlite }