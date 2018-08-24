var calculadora ={
  pant: document.getElementById("display"),
  pantalla :"0",
  operacion: "",
  firstvalor: 0,
  secondvalor:0,
  thirdvalor:0,
  result:0,
  tcligual : false,

  init:(function() {
    this.eventosbotones(".tecla");
    this.eventosfuncionesmate();

  }),

  eventosbotones: function (selector) {
    var x = document.querySelectorAll(selector);
    for (var i = 0; i < x.length; i++) {
     x[i].onmouseover = this.eventachicarboton;
     x[i].onmouseleave = this.eventnormalboton;
     };

   },

   eventachicarboton:function(event){
     calculadora.botonpequeno(event.target);
   },
   eventnormalboton:function(event){
     calculadora.botonnormal(event.target);
   },

   botonpequeno: function (elemento) {
     var x = elemento.id;
 		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
 			elemento.style.width = "28%";
 			elemento.style.height = "62px";
 		} else if(x=="mas") {
 			elemento.style.width = "88%";
 			elemento.style.height = "98%";
 		} else {
 		elemento.style.width = "21%";
 		elemento.style.height = "62px";
 		}
   },

   botonnormal: function (elemento) {
     var x = elemento.id;
 		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
 			elemento.style.width = "29%";
 			elemento.style.height = "62.91px";
 		} else if(x=="mas") {
 			elemento.style.width = "90%";
 			elemento.style.height = "100%";
 		} else {
 		elemento.style.width = "22%";
 		elemento.style.height = "62.91px";
 		}
   },


  // eventos de los numeros
  eventosfuncionesmate :function() {
    document.getElementById("0").addEventListener("click",function(){calculadora.numeroingresado("0");});
    document.getElementById("1").addEventListener("click",function(){calculadora.numeroingresado("1");});
    document.getElementById("2").addEventListener("click",function(){calculadora.numeroingresado("2");});
    document.getElementById("3").addEventListener("click",function(){calculadora.numeroingresado("3");});
    document.getElementById("4").addEventListener("click",function(){calculadora.numeroingresado("4");});
    document.getElementById("5").addEventListener("click",function(){calculadora.numeroingresado("5");});
    document.getElementById("6").addEventListener("click",function(){calculadora.numeroingresado("6");});
    document.getElementById("7").addEventListener("click",function(){calculadora.numeroingresado("7");});
    document.getElementById("8").addEventListener("click",function(){calculadora.numeroingresado("8");});
    document.getElementById("9").addEventListener("click",function(){calculadora.numeroingresado("9");});
    document.getElementById("on").addEventListener("click", function() {calculadora.limpiar();});
    document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarsigno();});
    document.getElementById("punto").addEventListener("click", function() {calculadora.puntodecimal();});
    document.getElementById("igual").addEventListener("click", function() {calculadora.resultado();});
    document.getElementById("mas").addEventListener("click", function() {calculadora.operacion_matematica("+");});
    document.getElementById("menos").addEventListener("click", function() {calculadora.operacion_matematica("-");});
    document.getElementById("por").addEventListener("click", function() {calculadora.operacion_matematica("*");});
    document.getElementById("raiz").addEventListener("click", function() {calculadora.operacion_matematica("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {calculadora.operacion_matematica("/");});



  },

  limpiar:function () {
    this.pantalla ="0";
    this.operacion = "";
    this.firstvalor = 0;
    this.secondvalor = 0;
    this.thirdvalor = 0;
    this.result = 0;
    this.Operación = "";
    this.tcligual  = false
    this.refrescar();
  },
  cambiarsigno:function () {
    if (this.pantalla!="0") {
        var help;
        if (this.pantalla.charAt(0)=="-") {
          help = this.pantalla.slice(1);
        }
          else {
            help = "-"+ this.pantalla;
          }

        this.pantalla ="";
        this.pantalla = help;
        this.refrescar();
    }

  },

  puntodecimal:function () {
    if (this.pantalla.indexOf(".")== -1) {
      if (this.pantalla == ""){
        this.pantalla = this.pantalla + "0.";
      } else {
        this.pantalla= this.pantalla + ".";
      }
      this.refrescar();
    }

  },

  numeroingresado:function (numero) {
    if (this.pantalla.length < 8) {
      if (this.pantalla=="0") {
        this.pantalla = "";
        this.pantalla = this.pantalla + numero;

      }else {
        this.pantalla = this.pantalla + numero;
      }
      this.refrescar();
    }

  },

  operacion_matematica: function (oper) {
    this.firstvalor = parseFloat(this.pantalla);
		this.pantalla = "";
		this.operacion = oper;
		this.tcligual = false;
		this.refrescar();
  },

  resultado : function() {
    if (!this.tcligual) {
      this.secondvalor = parseFloat(this.pantalla);
      this.thirdvalor = this.secondvalor;
      this.realizarfuncion(this.firstvalor,this.secondvalor,this.operacion);
    }else {
      this.realizarfuncion(this.firstvalor,this.thirdvalor,this.operacion);
    }
    this.firstvalor = this.result;
    this.pantalla="";

    if (this.result.toString().length<9) {
        this.pantalla = this.result.toString();
    }else {
      this.pantalla = this.result.toString().slice(0,8) + "...";
    }

    this.tcligual = true;
    this.refrescar();


  },

  realizarfuncion: function(firstvalue, secondvalue, operacion){
		switch(operacion){
			case "+":
				this.result = eval(firstvalue + secondvalue);
			break;
			case "-":
				this.result = eval(firstvalue - secondvalue);
			break;
			case "*":
				this.result = eval(firstvalue * secondvalue);
			break;
			case "/":
				this.result = eval(firstvalue / secondvalue);
			break;
			case "raiz":
				this.result = eval(Math.sqrt(firstvalue));
		}
	},
  refrescar: function(){
    this.pant.innerHTML = this.pantalla;
  }


};
calculadora.init();
