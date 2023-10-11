//criação de variáveis globais. Guardarão informações e estados 
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



//TECLAS DE MOVIMENTAÇÃO

	//função de quando uma tecla é clicada 
	function teclaDw(){
		var tecla=event.keyCode; //keycode identifica qual teclha foi clicado e guarda o valor dessa tecla 
		if(tecla==38){//Cima - o valor da tecla direcional para cima é 38
			diryJ=-1; //muda o valor da posição
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

	//função de quando uma tecla é solta 
	function teclaUp(){
		var tecla=event.keyCode;
		if((tecla==38)||(tecla==40)){
			diryJ=0;
		}
		if((tecla==37)||(tecla==39)){//Esquerda
			dirxJ=0;
		}
	}



//TANQUE VERDE
function criaBomba(){

	//define uma posição aleatória para o tanque 
	if(jogo){ //verifica se o jogo já começou (true ou false)
		var y=0; //difine q o tanque verde nascerá no topo
		var x=Math.random()*tamTelaW;  //cria um valor aleatório para o tanque nascer horizontalmente. Para isso ele usa o tamanho da tela (tamTelaw)

	//cria o tanque 
	var bomba=document.createElement("div");
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="bomba"; //valor da class
	att2.value="top:"+y+"px;left:"+x+"px;"; //valor do style top e left (definidos anteriormente)
	bomba.setAttributeNode(att1);
	bomba.setAttributeNode(att2);


	document.body.appendChild(bomba); //adciona o tanque a tela (MUDAR PARA A DIVPRINCIPAL)
	contBombas--; // conta a quantidade de bombas criadas por meio do decremento (mesma coisa q escrever contBombas = contBombas - 1)
	}
}

	//controla o movimento, colisões com a tela e remoção dos tanques no jogo.
	function controlaBomba(){
		bombasTotal=document.getElementsByClassName("bomba"); // a array bombasTotal guarda todos os elementos com o class = bomba. (na função anterior foi criada essa class e definida como a class dos tanques )
		var tam=bombasTotal.length; //a quantidade de elementos guardados em bombasTotal é guardado em tam
		for(var i=0;i<tam;i++){ //esse for percorre todos os tanques criados 
			if(bombasTotal[i]){ //verifica se a bomba identificada pelo valor de i ainda existe no jogo. 
				var pi=bombasTotal[i].offsetTop; // em pi é armazenado a posição vertical do tanque 
				pi+=velB; //nessa mesma posição é adicionado um valor. Esse valor almentará a distância do topo, dando a impressão de q o tanque está andando. Por meio dessa valocidade posso controlar a velocidade do item, aumentando ou diminuindo o espaço percorrido  (pi+=velB  --> pi = pi + velB)
				bombasTotal[i].style.top=pi+"px"; //o valor de pi é enviado para o css 
				if(pi>tamTelaH){ //verifica se o item saiu da tela, ou seja, se o jogador perdeu pontos 
					vidaPlaneta-=10; //caso o valor de pi seja maior q o tamanho da tela, o item saiu da tela e então a vida do planeta é diminuida 
					criaExplosao(2,bombasTotal[i].offsetLeft,null); //cria a explosão nas coordenas do tanque 
					bombasTotal[i].remove(); //retira o tanque q explodiu 
				}
			}
		}
	}


//TIROS
	function atira(x,y){
		var t=document.createElement("div");
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		att1.value="tiroJog";
		att2.value="top:"+y+"px;left:"+x+"px";
		t.setAttributeNode(att1);
		t.setAttributeNode(att2);
		document.body.appendChild(t);
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
	jog=document.getElementById("naveJog");
	jog.style.top=pjy+"px";
	jog.style.left=pjx+"px";

	//Controles das bombas
	contBombas=150;
	velB=3;
	
	//Controles do planeta
	vidaPlaneta=300;
	barraPlaneta=document.getElementById("barraPlaneta");
	barraPlaneta.style.width=vidaPlaneta+"px";

	//Controles de explosão
	ie=ison=0;

	//Telas
	telaMsg=document.getElementById("telaMsg");
	telaMsg.style.backgroundImage="url('intro.jpg')";
	telaMsg.style.display="block";
	document.getElementById("btnJogar").addEventListener("click",reinicia);

}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);