import fs from "fs/promises";

const databasePath = new URL("../db.json", import.meta.url);
//URL recebe dois parametros, o nome do arquivo final, e o diretorio

export class Database {
    #database = {};

    constructor() {
       fs.readFile(databasePath, 'utf8').then( data => {
        this.#database = JSON.parse(data)
       }

       ).catch( () => {
        this.#persist() //escreve em databasePath(arquivo fisico) os objetos de #database
       }

       )
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {
        const data = this.#database[table] ?? []; //Operador de Coalescência Nula: caso a esquerda do ?? for null ou undefined ele retorna o da direita
        return data;
    } //vai procurar uma tabela com o nome passado em select(table)

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            //para verificar se algo é um array deve-se usar Array.isArray, pois isArray é um metodo estatico, o que significa q ele é chamado do objeto Array, e não de uma nova instancia de array
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];

            return data;
        }

        this.#persist();
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id) //row recebe o indice, o indice é o objeto com os dados do usuario. indice.id recebe o id passado na função delete
        
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1) //metodo splice para remover rowIndex, somente 1 elemento
            this.#persist()
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1 ) {
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
        
    }
}
//classe recebe uma propriedade database que recebe um objeto,
//esse objeto esta sendo passado justamente para que possamos passar não só login de usuarios mas tambem outros valores, ex:
//database = {"users": [array de usuarios], "videos": [array de videos]...}
//encapsulamento usando classe
