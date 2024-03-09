import http from "http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res); //middleware

    const route = routes.find((route) => {
        return route.method === method && route.path.test(url); //quero encontrar uma rota onde o method descrita nela e a url seja igual ao da request
    });

    if (route) {
        const routeParams = req.url.match(route.path); //routeParams verifica se a url tem alguma coisa que siga os parametros da função buildRoutPath
        //quando haver um parametro dinamico na url ele vai ser armazenado em routeParams
        req.params = {...routeParams.groups}// req.params está recebendo o groups do objeto retornado do match da regex
        return route.handler(req, res);
    }
    //se tiver encontrado a rota, retorna a função dela (handler passado no objeto da rota encontrada)

    res.writeHead(404).end("not found");
});

const port = 3333;

server.listen(port, () => {
    console.log("rodando na porta", port);
});
