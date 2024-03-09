import { Database } from "./database.js";
import { randomUUID } from "crypto";
import { buildRoutPath } from "./utils/buildRoutPath.js";

const database = new Database();
export const routes = [
    {
        method: "GET",
        path: buildRoutPath("/users"),
        handler: (req, res) => {
            const users = database.select("users");
            //para mandar coisa para o front tem que ser em json
            return res.end(JSON.stringify(users));
        },
    },
    {
        method: "POST",
        path: buildRoutPath("/users"),
        handler: (req, res) => {
            const { name, email, idade } = req.body;
            const user = {
                id: randomUUID(),
                name,
                email,
                idade,
            };

            database.insert("users", user);

            return res.writeHead(201).end();
        },
    },
    {
        method: "DELETE",
        path: buildRoutPath("/users/:id"), //route parameter usando id para identificação de um recurso, no caso o usuario.
        handler: (req, res) => {
            const { id } = req.params
            database.delete('users', id)       
            return res.writeHead(204).end();
        },
    },
    {
        method: "PUT",
        path: buildRoutPath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const {name, email} = req.body
            database.update('users', id, {name, email})
            return res.writeHead(204).end()
        }
    }
];
