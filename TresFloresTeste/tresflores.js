
var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba;
var bombasTotal;
var vidaPlaneta,barraPlaneta;
var ie,isom;
var telaMsg;




const divPrincipal = document.createElement('div');
divPrincipal.id = "principal";
divPrincipal.style.backgroundImage = "url('imagens/inicio.gif')";
document.body.appendChild(divPrincipal);
jog=document.getElementById("naveJog");
jog.style.display = 'none';
barraPlaneta=document.getElementById("barraPlaneta");
barraPlaneta.style.display = 'none';


//código jogo




function teclaDw(){
	var tecla=event.keyCode;
	if(tecla==38){//Cima
		diryJ=-1;
	}else if(tecla==40){//Baixo
		diryJ=1;
	}
	if(tecla==37){//Esquerda
		dirxJ=-1;
	}else if(tecla==39){//Direita
		dirxJ=1;
	}
	if(tecla==32){//Espaço / Tiro
		//TIRO
		atira(pjx+17,pjy);
	}
}
function teclaUp(){
	var tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){
		diryJ=0;
	}
	if((tecla==37)||(tecla==39)){//Esquerda
		dirxJ=0;
	}
}
function criaBomba(){
	if(jogo){
		var y=0;
		var x=Math.random()*tamTelaW;
		var bomba=document.createElement("div");
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		att1.value="bomba";
		att2.value="top:"+y+"px;left:"+x+"px;";
		bomba.setAttributeNode(att1);
		bomba.setAttributeNode(att2);
		divPrincipal.appendChild(bomba);
		contBombas--;
	}
}
function controlaBomba(){
	bombasTotal=document.getElementsByClassName("bomba");
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			var pi=bombasTotal[i].offsetTop;
			pi+=velB;
			bombasTotal[i].style.top=pi+"px";
			if(pi>tamTelaH){
				vidaPlaneta-=10;
				criaExplosao(2,bombasTotal[i].offsetLeft,null);
				bombasTotal[i].remove();
			}
		}
	}
}
function atira(x,y){
	var t=document.createElement("div");
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="tiroJog";
	att2.value="top:"+y+"px;left:"+x+"px";
	t.setAttributeNode(att1);
	t.setAttributeNode(att2);
	divPrincipal.appendChild(t);
}
function controleTiros(){
	var tiros=document.getElementsByClassName("tiroJog");
	var tam=tiros.length;
	for(var i=0;i<tam;i++){
		if(tiros[i]){
			var pt=tiros[i].offsetTop;
			pt-=velT;
			tiros[i].style.top=pt+"px";
			colisaoTiroBomba(tiros[i]);
			if(pt<0){
				//document.body.removeChild(tiros[i]);
				tiros[i].remove();
			}
		}
	}
}
function colisaoTiroBomba(tiro){
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			if(
				(
					(tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&& //Cima tiro com baixo bomba
					((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) //Baixo tiro com cima bomba
				)
				&&
				(
					(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&& //Esquerda tiro com direita bomba
					((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) //Direita Tito  com esquerda Bomba
				)
			){
				criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop);
				bombasTotal[i].remove();
				tiro.remove();
			}
		}
	}
}
function criaExplosao(tipo,x,y){ //Tipo 1=AR, 2=TERRA
	if(document.getElementById("explosao"+(ie-4))){
		document.getElementById("explosao"+(ie-4)).remove();
	}
	var explosao=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");
	//Atributos para div
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");
	//Atributo para imagem
	var att4=document.createAttribute("src");
	//Atributos para audio
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+ie;
	if(tipo==1){
		att1.value="explosaoAr";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="explosao_ar.gif?"+new Date();
	}else{
		att1.value="explosaoChao";
		att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px;";
		att4.value="explosao_chao.gif?"+new Date();
	}
	att5.value="exp1.mp3?"+new Date();
	att6.value="som"+isom;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img);
	explosao.appendChild(som);
	document.body.appendChild(explosao);
	document.getElementById("som"+isom).play();
	ie++;
	isom++;
}

function controlaJogador(){
	pjy+=diryJ*velJ;
	pjx+=dirxJ*velJ;
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";
}
function gerenciaGame(){
	barraPlaneta.style.width=vidaPlaneta+"px";
	if(contBombas<=0){
		jogo=false;
		clearInterval(tmpCriaBomba);
		telaMsg.style.backgroundImage="url('vitoria.jpg')";
		telaMsg.style.display="block";
	}
	if(vidaPlaneta<=0){
		jogo=false;
		clearInterval(tmpCriaBomba);
		telaMsg.style.backgroundImage="url('derrota.jpg')";
		telaMsg.style.display="block";		
	}
}

function gameLoop(){
	if(jogo){
		//FUNÇÕES DE CONTROLE
		controlaJogador();
		controleTiros();
		controlaBomba();
	}
	gerenciaGame();
	frames=requestAnimationFrame(gameLoop);
}
function reinicia(){
	bombasTotal=document.getElementsByClassName("bomba");
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			bombasTotal[i].remove();
		}
	}
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			bombasTotal[i].remove();
		}
	}	
	telaMsg.style.display="none";
	clearInterval(tmpCriaBomba);
	cancelAnimationFrame(frames);
	vidaPlaneta=300;
	pjx=tamTelaW/2;
	pjy=tamTelaH/2;
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";
	contBombas=150;
	jogo=true;
	tmpCriaBomba=setInterval(criaBomba,1700);
	gameLoop();
}

function inicia(){
	jogo=false;

	//Ini Tela
	tamTelaH=window.innerHeight;
	tamTelaW=window.innerWidth;

	//Ini Jogador
	dirxJ=diryJ=0;
	pjx=tamTelaW/2;
	pjy=tamTelaH/2;
	velJ=velT=5;
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";
    jog.style.display = 'block';
    

	//Controles das bombas
	contBombas=150;
	velB=3;
	
	//Controles do planeta
	vidaPlaneta=300;
	barraPlaneta.style.width=vidaPlaneta+"px";
    barraPlaneta.style.display = 'block';

	//Controles de explosão
	ie=ison=0;
}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);






//meu código

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
                    inicia();
                    reinicia();
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




