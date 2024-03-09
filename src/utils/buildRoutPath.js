//criando regex para encontrar parametros users/:id
export function buildRoutPath(path) {
    //recebe um camminhho /users/:id
    const routeParametersRegex = /:([a-z]+)/gi; //aqui identifica *todas as rotas que contêm as regras da regex (iniciar com : e conter de a-z sendo maiusculas ou minusculas).
    const pathWithParams = path.replaceAll(
        // a variavel caminho com parametros recebe a rota 'path' e troca tudo que foi identificado pelos parametros da RouteParametersRegex por algo que siga as normas passadas na regex como segundo parametro
        routeParametersRegex,
        "(?<$1>[a-z0-9\-_]+)" // ?<name> serve para nomear grupo do retorno do match de uma regex. quando coloco $1 eu estou dizendo que quero pegar o retorno na posição 1 de routeParametersRegex, que no caso era 'id', e colocar como nome do grupo
    );
    //ou seja, pathWithParams serve para trocar o :id da rota para algo que o usuario usar como input na url (obviamente seguindo o padrão estabelecido)
    const pathRegex = new RegExp(`^${pathWithParams}`); // cria-se uma nova regex que obrigatoriamente inicie com o input que o usuario deu na url. começa com a rota ja alterada (substituida)
    return pathRegex;
}
//constroi caminho de rota de acordo com o input do user