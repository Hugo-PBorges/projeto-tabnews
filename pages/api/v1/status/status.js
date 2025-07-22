import database from "../../../../infra/database.js";

async function status(request, response) {
    const result = database.query("SELECT 1 + 1;")
    console.log(result);
    response.status(200).json({"chave": "Esta Dando Certo!"});
}

export default status;
