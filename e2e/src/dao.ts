import { createConnection } from 'mysql';
import Query = require('mysql/lib/protocol/sequences/Query');

export class Dao {
    
    private async connectDB(database: string) {
        return await createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: database,
            user: 'root',
            password: 'mysql',
            trace: true
        })
    }

    private async executeQuery(database: string, sql: string) {
        this.connectDB(database).then(conn => {
            conn.query(sql, async (err: Query.QueryError, data) => {
                if (err) {
                    throw 'SQL Query error: ' + err;
                }
                // console.log(data)
            })
        }, async err => {
            throw 'Connection error: ' + err;
        })
    }

    // public async getLastInsertedId(database: string) {
    //     let lastId;
    //     this.connectDB(database).then(conn => {
    //         conn.query('SELECT LAST_INSERT_ID()', async (err: Query.QueryError, data) => {
    //             if (err) {
    //                 console.log('SQL Query error: ' + err);
    //                 conn.destroy();
    //             }
    //             lastId = await data;
    //         })
    //     }, async err => {
    //         console.log('Connection error: ' + err)
    //     })
    //     return lastId;
    // }

    private generateDateTime() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public generateGenericUserFor(database: string) {
        if (database === 'sts') {
            this.executeQuery('sts',
                `insert into users(company_id,cpf,created_at,email,name,office,phone,status,updated_at) values(1,'11111111111','${this.generateDateTime()}','bentinho_capitu@bbi.solutions','Bentinho Capitu','Poeta','11999999999',1, '${this.generateDateTime()}')`);
        } else if (database === 'mdzn') {
            this.executeQuery('mdzn', `insert into users(email,name,password) values('bentinho_capitu@bbi.solutions','Bentinho Capitu','$2y$13$N0Xt7xXlOAuzdx3rfuk3jugT2wTmlkn1G9U/lZLtMyJqqpBdIqdFq')`)
        }
    }
    public deleteGenericUserFrom(database: string) {
        if (database === 'sts') {
            this.executeQuery('sts',
                `delete from users where email = 'bentinho_capitu@bbi.solutions'`);
        } else if (database === 'mdzn') {
            this.executeQuery('mdzn', `delete from users where email = 'bentinho_capitu@bbi.solutions'`);
        }
    }
}