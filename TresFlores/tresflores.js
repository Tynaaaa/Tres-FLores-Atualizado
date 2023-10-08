const divPrincipal = document.createElement('div');
divPrincipal.id = "principal";
divPrincipal.style.backgroundImage = "url('imagens/inicio.gif')";
document.body.appendChild(divPrincipal);

let cenarios = 0;

//AUDIOS
const trilhaSonora = document.querySelector('#audioUm');
const somPassos = document.querySelector('#audioDois');
const somTiro = document.querySelector('#audioTres');
const somInimigo = document.querySelector('#audioQuatro');
const somMedo = document.querySelector('#audioCinco');
const somBatalha = document.querySelector('#audioSeis');


//CRIAÇÂO DAS DIVs PRINCIPAIS

    //Criação da div SUPERIOR 
    const divSuperior = document.createElement('div');
    divSuperior.id = "superior";
    divPrincipal.appendChild(divSuperior);

        //Criando Imagem da div SUPERIOR 
        const imgSuperior = document.createElement('img');
        imgSuperior.src = "imagens/nome.png";
        imgSuperior.alt = "Placa escrita 'Três Flores'";
        divSuperior.appendChild(imgSuperior);


    //Criação da div INTERMEDIÁRIA 
    const divIntermediaria = document.createElement('div');
    divIntermediaria.id = "intermediaria";
    divPrincipal.appendChild(divIntermediaria);


        //Criando Imagem da div INTERMEDIÁRIA (JOGAR)
        const imgJogar = document.createElement('img');
        imgJogar.src = "imagens/jogar.png";
        imgJogar.alt = "Uma placa de madeira clara escrita 'JOGAR'"
        divIntermediaria.appendChild(imgJogar);

    //Criação da div INFERIOR
    const divInferior = document.createElement('div');
    divInferior.id = "inferior";
    divPrincipal.appendChild(divInferior);

        //Criando imagem para voltar ao login
        const imgLogin = document.createElement('img');
        imgLogin.src = "imagens/login.png";
        imgLogin.alt = "Botão com uma seta girando";
        divInferior.appendChild(imgLogin);

        imgLogin.addEventListener("click", () => {
            window.location.href = "login.php";
        });

        //Criando imagem para iniciar a trilha sonora
        const divMusica = document.createElement('div');
        divMusica.id = "musica";
        divInferior.appendChild(divMusica);

            const imgPlay = document.createElement('img');
            imgPlay.src = "imagens/play.png";
            imgPlay.alt = "Botão com o desenho de uma nota musical";
            divMusica.appendChild(imgPlay);

            imgPlay.addEventListener("click", () => {
                imgPlay.replaceWith(imgPause);
                trilhaSonora.play();
            });

            //Criando imagem para pausar a trilha sonora
            const imgPause = document.createElement('img');
            imgPause.src = "imagens/pause.png";
            imgPause.alt = "Botão com um quadrado";

            imgPause.addEventListener("click", () => {
                imgPause.replaceWith(imgPlay);
                trilhaSonora.pause();
            });

        //Criação da imagem da div INfERIOR
        const imgInferior = document.createElement('img');
        imgInferior.src = "imagens/info.png";
        imgInferior.alt = "Botão de madeira de informações";
        divInferior.appendChild(imgInferior);

        //crinado imagem de passar cenários
        const imgContinuar = document.createElement('img');
        imgContinuar.src = "imagens/continuar.png";
        imgContinuar.alt = "Placa de madeira com uma seta";


//FUNÇÔES P/ MOVIMENTAÇÂO ENTRE TELA INICIAL E INFORMAÇÔES
    function ocultarImagens() {
        imgSuperior.style.display = 'none';
        imgJogar.style.display = 'none';
        imgInferior.style.display = 'none';
        imgLogin.style.display = 'none';
        divMusica.style.display = 'none';
        divInferior.style.justifyContent = 'flex-end';
    };

    function mostrarImagens() {
        imgSuperior.style.display = 'block';
        imgJogar.style.display = 'block';
        imgInferior.style.display = 'block';
        imgLogin.style.display = 'block';
        divMusica.style.display = 'block';
        divInferior.style.justifyContent = 'center';

    };

//MOVIMENTAÇÂO ENTRE TELA INICIAL E INFORMAÇÔES

    //Tela inicial -> TELA INFORMAÇÕES  
    imgInferior.addEventListener('click', () => {
        divPrincipal.style.backgroundImage = "url('imagens/informacoes.gif')";
        ocultarImagens();
        imgInferior.replaceWith(imgContinuar);
    });

    //Tela informações -> TELA INICIAL
    imgContinuar.addEventListener('click', () => {
        if (cenarios === 0){
            divPrincipal.style.backgroundImage = "url('imagens/inicio.gif')";
            mostrarImagens();
            imgContinuar.replaceWith(imgInferior);
            console.log(cenarios);
        }


//MOVIMENTAÇÕES JOGO

    //Cenários - JOGO
        else{
            cenarios = cenarios + 1;

            if (cenarios === 2){
                divPrincipal.style.backgroundImage = "url('imagens/cenarioDois.png')";
                console.log(cenarios);
            }
        
            if (cenarios === 3){
                divPrincipal.style.backgroundImage = "url('imagens/cenarioTres.gif')";
                console.log(cenarios);
            }

            if (cenarios === 4){
                trilhaSonora.pause();
                imgContinuar.style.display = 'none';
                divPrincipal.style.backgroundImage = "url('imagens/preto.png')";
                somPassos.play();
                console.log(cenarios);
                somPassos.addEventListener("ended", function() {
                    imgContinuar.style.display = 'block';
                    divPrincipal.style.backgroundImage = "url('imagens/cenarioQuatro.png')";
                });
            }

            if (cenarios === 5){
                imgContinuar.style.display = 'none';
                divPrincipal.style.backgroundImage = "url('imagens/preto.png')";
                somMedo.play();
                somMedo.addEventListener("ended", function() {
                    divPrincipal.style.backgroundImage = "url('imagens/cenarioGuerra.png')";
                    somBatalha.play(); });
                console.log(cenarios);
            }

        }
    });
    //Iniciar JOGO
    imgJogar.addEventListener('click', () => {
        cenarios = cenarios + 1;
        divPrincipal.style.backgroundImage = "url('imagens/cenarioUm.gif')";
        ocultarImagens();    
        imgInferior.replaceWith(imgContinuar);    
        imgContinuar.style.display = 'block';
        console.log(cenarios);
    });

