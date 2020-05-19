class Tape{
	constructor(contexto,ancho,alto){
		
		this.casillaActual = 13;
		this.altoCanvas = alto;
		this.alto = ancho/25;
		this.ancho = ancho;
		this.dibujarCinta(contexto);
		this.alfabeto=["0","1","2","3","4","5","6","7","8","9","0","1","2","3","4","5","6","7","8","9","0","1","2","3","4","5","6","7","8","9","0","1","2","3","4","5","6","7","8","9",""]
		this.contexto = contexto;
	}



	dibujarCinta(contexto){
		contexto.fillStyle="red";
		contexto.fillRect(0,this.altoCanvas/3,this.ancho,this.alto);
		contexto.fillStyle="black";
		for(var i = 0 ; i<26; i++){
			contexto.fillRect(0+24*i,this.altoCanvas/3,1,this.alto);
		}
		contexto.fillStyle="blue";
		contexto.fillRect(24*(12)+2,this.altoCanvas/3+30,20,this.alto);	
	}

	escribir(contexto,input,casilla){
		if(input!= 39){
			contexto.fillStyle="red";
			contexto.fillRect(24*(casilla-1)+2,this.altoCanvas/3,20,this.alto);
			contexto.fillStyle ="black";
			contexto.font="22px";
			contexto.fillText(this.alfabeto[input],24*(casilla-1)+10,this.altoCanvas/3+15);
		}		
	}

	marcar(contexto,input,casilla){
			contexto.clearRect(0,this.altoCanvas/3+28,this.ancho,this.alto+30);	
			contexto.fillStyle="blue";
			contexto.fillRect(24*(casilla-1)+2,this.altoCanvas/3+30,20,this.alto);	
	}

	llenar(entrada,contexto){
		this.dibujarCinta(contexto);
		var llenado = new Array();
		llenado = entrada.split('');
		contexto.fillStyle ="black";
		contexto.font="22px";
		machin.reiniciarArray();
		for(var i = 0 ; i<llenado.length; i++){
				contexto.fillText(llenado[i],24*(12+i)+10,this.altoCanvas/3+15);
				machin.array[i]=llenado[i];
		}

		
	}

	reiniciar(){
		this.casillaActual = 13;
		this.contexto.clearRect(0,0,this.ancho,this.altoCanvas);
		this.dibujarCinta(this.contexto);
	}
}