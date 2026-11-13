
const botao = document.getElementById("botao");
const cep = document.getElementById("cep");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", buscarcep);

async function buscarcep() {
    const numeroCep = cep.value.replace(/\D/g, "");

    if (numeroCep.length !== 8) {
        resultado.textContent = "Digite um CEP válido!";
        return;
    }
    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${numeroCep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            resultado.textContent = "CEP não encontrado!";
            return;
        }

resultado.innerHTML = `
    <p>Rua: ${dados.logradouro}</p>
    <p>Bairro: ${dados.bairro}</p>
    <p>Cidade: ${dados.localidade}</p>
    <p>Estado: ${dados.uf}</p>
`;
    } catch (erro) {

        resultado.textContent = "Erro ao consultar o CEP.";

        console.log(erro);
    }
}
