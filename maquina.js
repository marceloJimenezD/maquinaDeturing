class Maquina{
	constructor(estados,inputs){
		this.array = new Array();
		this.estado = 0;
		this.posicion = 0;

		this.estadoXinputs = new Array();
		for(var i=0 ; i < estados+1;i++){
			this.estadoXinputs[i] = new Array(); 
		}

		this.programa = new Array();

	}



	reiniciarMaquina(){
		for(var i = 0; i<this.estadoXinputs.length;i++){
			for(var j = 0; j<this.estadoXinputs[i].length;j++){
				this.estadoXinputs[i][j]=null;
			}
		}
	}
	reiniciarArray(){
		for(var i = 0 ; i<this.array.length; i++){
			this.array[i]=null;
		}

		this.estado=0;
		this.posicion = 0;
	}

	loadPrograma(programaRaw){
		this.programa = new Array();
		for(var i = 0 ; i<programaRaw.length;i++){
			this.programa[i]=programaRaw[i];
		}
	}


/////////////READY////////////////////
	compilar(){
		this.reiniciarMaquina();

		var opcode;
		var estadoIni;
		var input;
		var output;
		var mov;
		var estadoFin;
		for(var i = 0 ; i<this.programa.length ; i++){
			opcode = this.programa[i];
			estadoIni= parseInt(opcode.substring(0,3));
			input=parseInt(opcode.substring(3,5));
			output = parseInt(opcode.substring(5,7));
			mov = parseInt(opcode.substring(7,9));
			estadoFin = parseInt(opcode.substring(9,12));
			this.estadoXinputs[estadoIni][input] = [output,mov,estadoFin];
			
			if(input == 39){
				for(var i=0; i<41; i++){
					this.estadoXinputs[estadoIni][i] = [output,mov,estadoFin];
				}
			}

		}
	}
////////////////////////////////

	step(){
		if(this.estado != 999){

				if(this.array[this.posicion] == null || this.array[this.posicion] == undefined){
					var input = 40;
				}else{
					var input = this.array[this.posicion];
				}


				if(this.estadoXinputs[this.estado][input]!= null ||this.estadoXinputs[this.estado][input] != undefined){
					var output = this.estadoXinputs[this.estado][input][0];	

					if(output !== 39){
						this.array[this.posicion]=output;
					}
					

					if(this.estadoXinputs[this.estado][input][1]==2){
						this.posicion++;
					}else if (this.estadoXinputs[this.estado][input][1]==0){
						if(this.posicion == 0){
							this.array.unshift(null);
						}else{
							this.posicion--;
						}
					}
					cinta.escribir(ctx,this.estadoXinputs[this.estado][input][0],cinta.casillaActual);

					if(this.estadoXinputs[this.estado][input][1]==0){
							cinta.casillaActual--;
						}if(this.estadoXinputs[this.estado][input][1]==2){
							cinta.casillaActual++;
					}

					this.estado = this.estadoXinputs[this.estado][input][2];
				
					cinta.marcar(ctx,input,cinta.casillaActual);
				}else{
					stop();
				}
				
			
		}else{
			//console.log("bye");
		}

	}	

}