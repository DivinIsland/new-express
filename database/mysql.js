const mysql = require("mysql2");
const db_config = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "express_movie_app",
  insecureAuth: false,
};

const databaseConfig = db_config;

class Database {
  constructor(config) {
    console.log(config, "config");
    this.config = config;
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    const self = this;
    console.log(self.config, "config");
    const connection = mysql.createConnection(self.config);
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    const self = this;
    const connection = mysql.createConnection(self.config);
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const database = new Database(databaseConfig);

module.exports = {
  database,
};
