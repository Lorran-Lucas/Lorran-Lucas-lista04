
const usuarios = document.getElementById("usuarios");
const posts = document.getElementById("posts");
const detalhes = document.getElementById("detalhes");
const retorna = document.getElementById("retorna");

async function carregarUsuarios() {

    try {
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
		const listaUsuarios = await resposta.json();
        if ( resposta.erro) {
            retorna.innerHTML = "Erro ao buscar usuários"
			return
		}

        usuarios.innerHTML = '<option value="">Selecione um usuário</option>';

        listaUsuarios.forEach(usuario => {
            const option = document.createElement("option");
            option.value = usuario.id;
            option.textContent = usuario.name;
            usuarios.appendChild(option);
        });

    } catch (erro) {
        console.error("Erro:", erro);
    }
}


usuarios.addEventListener("change", async () => {
    const userId = usuarios.value;
    posts.innerHTML = "";
    detalhes.innerHTML = "";

    if (userId === "") return;

    const resposta = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    const listaPosts = await resposta.json();

    listaPosts.forEach(post => {

        posts.innerHTML += `
            <div class="post" onclick="mostrarPost(${post.id})">
                ${post.title}
            </div>
        `;
    });
});


async function mostrarPost(idPost) {

    const respostaPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${idPost}`
    );

    const respostaComentarios = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${idPost}/comments`
    );

    const post = await respostaPost.json();
    const comentarios = await respostaComentarios.json();

    let html = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>

        <h3>Comentários:</h3>
    `;

    comentarios.forEach(comentario => {
        html += `
            <div class="comentario">
                <strong>${comentario.name}</strong><br>
                <small>${comentario.email}</small>
                <p>${comentario.body}</p>
            </div>
        `;
    });

    detalhes.innerHTML = html;
}

carregarUsuarios();
