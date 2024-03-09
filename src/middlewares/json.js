//lida com dados de entrada com json e devolve tudo em json

export async function json(req, res) {
    //para ler o corpo da request:
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    //o corpo da request tem q receber o objeto json passado na request
    //isto vai para o get
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()); //estou criando um metodo body dentro de req
    } catch {
        req.body = null;
    }
    res.setHeader("content-type", "application-json"); //toda saida (resposta) será enviada com json
}
