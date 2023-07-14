//Iniciando las variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimiento = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let tiempoInicial = 45;
let tiempoRegresivoId = null;

//apuntando a documento HTML

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random()-0.5});

console.log(numeros);

//Funcion temporizador
const contarTiempo = () => {
   tiempoRegresivoId = setInterval(() => {
        
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
        
    }, 1000)
}

//FUNCION blequear tarjetas

const bloquearTarjetas = () => {
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
    
    alert("Se te acabo el tiempo, Vuelve a intentarlo");
}



//Funcion principal

const destapar = (id) => {
    
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    
    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="images/${primerResultado}.png" alt="">`;

        //Deshabilitar boton
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="images/${segundoResultado}.png" alt="" />`;

        tarjeta2.disabled = true;

        //Incremento del movimiento
        movimiento++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimiento}`;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);

                alert(`Felicidades! Has ganado, solo te tomo ${tiempoInicial - timer} segundos`);
            }
        
        }else{
            tarjetasDestapadas = 0;

            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta1.disabled = false;
    
                tarjeta2.innerHTML = '';
                tarjeta2.disabled = false;
            }, 800)
            
        }


    }

}