window.addEventListener("load", () => {
    const background = document.querySelector(".background");
    const video = document.createElement("video");
    const imagemFundo = document.querySelector(".background img");

    video.src = "frontend/img/video-background.mp4";
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.style.opacity = 0; // Começa invisível

    // Quando o vídeo estiver pronto para tocar
    video.addEventListener("canplaythrough", () => {
        video.play();
        video.style.opacity = 1; // Aparece o vídeo
        if(imagemFundo) {
            imagemFundo.style.opacity = 0; // Esconde a imagem
        }
    });

    background.appendChild(video);
});