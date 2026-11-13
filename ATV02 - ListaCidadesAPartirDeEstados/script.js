
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const resultado = document.getElementById("resultado");


async function buscarEstados() {
    const resposta = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const dados = await resposta.json();

    dados.forEach(item => {
        const opcao = document.createElement("option");
        opcao.value = item.sigla;
        opcao.textContent = item.nome;
        estado.appendChild(opcao);
    });
}

async function buscarCidades() {
    const uf = estado.value;
    cidade.innerHTML = '<option value="">Selecione uma cidade</option>';
    cidade.disabled = true;
    resultado.textContent = "";

    if (uf === "") {
        return;
    }
    const resposta = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const dados = await resposta.json();
    dados.forEach(item => {
        const opcao = document.createElement("option");
        opcao.innerHTML = item.nome;
        cidade.appendChild(opcao);

    });
    cidade.disabled = false;
}


function mostrarResultado() {
    const nomeEstado = estado.options[estado.selectedIndex].text;
    const nomeCidade = cidade.value;

    if (nomeEstado && nomeCidade) {

        resultado.textContent =
            `Você selecionou: ${nomeCidade} - ${nomeEstado}`;

    }
}

estado.addEventListener("change", buscarCidades);
cidade.addEventListener("change", mostrarResultado);

buscarEstados();
