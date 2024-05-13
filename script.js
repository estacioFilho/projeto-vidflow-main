const conteinerVideos = document.getElementsByClassName('videos__container')[0];


const api = fetch("http://localhost:3000/videos")
.then((response) => response.json())
.then((videos) => 
    videos.forEach(video => {
        conteinerVideos.innerHTML +=`
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="logo-canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>`

    })
)
.catch((error) => {
    conteinerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}`;
})