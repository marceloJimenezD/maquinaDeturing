var frame = window.requestAnimationFrame;
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var anchoCanvas = canvas.width;
var altoCanvas = canvas.height;

var machin = new Maquina(999,41);
var cinta =  new Tape(ctx,anchoCanvas,altoCanvas);
var cabecera = new Cabecera();

var programaRaw = new Array();
var input ="";
var txt = "";
var encendido =false;


var fotogramas = 0;
function loop(){
	
	if(encendido){
		fotogramas++;
		if(fotogramas>=60){
			machin.step();
			fotogramas=0;
		}

		frame(loop);
	}

}


function capturartxt(){
	txt = document.getElementById("codigo").value;
	programaRaw = txt.split('\n');
	var errores = new Array();
	var aprobado = true;
	var contadorErrores = 0;
	var arraydeprueba = ["0","1","2","3","4","5","6","7","8","9"];

	for(var i = 0; i<programaRaw.length ; i++){
		if(programaRaw[i].length!==12){
			errores[contadorErrores]=[i+1,0,0];
			contadorErrores++;
			aprobado = false;
		}
		for(var j = 0 ; j < programaRaw[i].length; j++){
			var numero = programaRaw[i].substring(j,j+1);
			if(numero=="0"||numero=="1"||numero=="2"||numero=="3"||numero=="4"||numero=="5"||numero=="6"||numero=="7"||numero=="8"||numero=="9"){
				
			}else{
				
				errores[contadorErrores]=[i+1,j+1,1];
				contadorErrores++;
				aprobado = false;
			}
		}

	}

	
	if(aprobado){
		compilar();
		console.log("ok morisha")
	}else{
		txt = "";
		programaRaw = [0];
		console.log(contadorErrores,errores);
	}
	
}


function compilar(){
	machin.loadPrograma(programaRaw);
	machin.compilar();
}

function capturarinput(){
	reset();
	encendido=false;
	cinta.reiniciar();
	input = document.getElementById("input").value;
	
	cinta.llenar(input,ctx);
}

function play(){
	if(encendido==false){
	encendido=true;
	loop();
	}
}

function stop(){
	console.log("stop");
	encendido =false;
}

function reset(){
	machin.reiniciarArray();
	cinta.reiniciar();
	cinta.llenar(input,ctx);

	//machin.loadPrograma(programaRaw);
	//machin.compilar();

	var fotogramas = 0;

	encendido =false;
}

