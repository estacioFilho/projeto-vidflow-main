const conteinerVideos = document.getElementsByClassName('videos__container')[0];

async function buscarEMostrarVideos(){
    try{
        //await diz para aguardar
        const busca = await fetch("http://localhost:3000/videos");
        //metodo json() transforma nosso json em uma lista de objetos
        const videos = await busca.json();
            videos.forEach(video => {
                if(video.categoria == ""){
                    throw(` video: ${video.titulo}, não tem categoria!`)
                }
                conteinerVideos.innerHTML +=`
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="logo-canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden >${video.categoria}</p>
                    </div>
                </li>`
        
            })
        
    } catch(error){
        conteinerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}`;
    }
}
buscarEMostrarVideos();

const barraDePesquisa = document.getElementsByClassName("pesquisar__input")[0];
barraDePesquisa.addEventListener('input', filtrarPesquisa);
function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLocaleLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            }else{
                video.style.display = "block";
            }
        }
    }else{
        video.style.display = "block";
    }
}

const  botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) =>{
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item")

    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLocaleLowerCase();
        let valorFiltro = filtro.toLocaleLowerCase();
        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        }else{
            video.style.display = "block";
        }
    }
}