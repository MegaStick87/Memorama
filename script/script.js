// Memorama programado por MegaStick. (Fabricio Isaac Gutiérrez Moreno)


// _____ ______   _______   ________  ________  ________  _________  ___  ________  ___  __       
// |\   _ \  _   \|\  ___ \ |\   ____\|\   __  \|\   ____\|\___   ___\\  \|\   ____\|\  \|\  \     
// \ \  \\\__\ \  \ \   __/|\ \  \___|\ \  \|\  \ \  \___|\|___ \  \_\ \  \ \  \___|\ \  \/  /|_   
// \ \  \\|__| \  \ \  \_|/_\ \  \  __\ \   __  \ \_____  \   \ \  \ \ \  \ \  \    \ \   ___  \  
//  \ \  \    \ \  \ \  \_|\ \ \  \|\  \ \  \ \  \|____|\  \   \ \  \ \ \  \ \  \____\ \  \\ \  \ 
//   \ \__\    \ \__\ \_______\ \_______\ \__\ \__\____\_\  \   \ \__\ \ \__\ \_______\ \__\\ \__\
//    \|__|     \|__|\|_______|\|_______|\|__|\|__|\_________\   \|__|  \|__|\|_______|\|__| \|__|
//                                                \|_________|                                    

//                                             ARCHIVO JS.

// Ingeniería TIC'S.

// Variables del juego:
// --------------------
var cartasArray = [1,2,3,4,5,6,1,2,3,4,5,6];
        var contadorVolteadas = 0;
        var carta1 = '';
        var carta2 = '';
        var encontradas = 0;
        var faltantes = 6;
        var tiempo = 0;
        var temporizador ;
        var intentos = 0;
        var clic = false;
        var juegoIniciado = false; // Variable para controlar el estado del juego
        // var limiteDeTiempo = 60; Límite de tiempo en segundo (Sin usar)
// --------------------	
	
        function carta(x,y,w,h,imagenFrente,imagenAtras){
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.imagenAtras = imagenAtras;
            this.imagenFrente = imagenFrente;
            this.template = `
            <div onclick="voltear(this)" class="flip-cartaTemporal ctrlCartas" carta="`+this.imagenAtras+`" 
                style="position: absolute;left: `+this.x+`px;top: `+this.y+`px; margin: 10px; width:`+this.w+`px; height:`+this.h+`px;">
                <div class="flip-cartaTemporal-inner">
                    <div class="flip-cartaTemporal-front">
                        <img src="`+this.imagenFrente+`" alt="AvatarF" style="width:`+this.w+`px;height:`+this.h+`px;">
                    </div>
                    <div class="flip-cartaTemporal-back">
                        <img src="`+this.imagenAtras+`" alt="AvatarB" style="width:`+this.w+`px;height:`+this.h+`px;">
                    </div>
                </div>
            </div> 
            `;
        }

        function seleccionarCartasAleatorias() {
            let imagenesSeleccionadas = [];
            while(imagenesSeleccionadas.length < 6){
                let r = Math.floor(Math.random() * 12) + 1; // Números aleatorios del 1 al 12
                if(imagenesSeleccionadas.indexOf(r) === -1) imagenesSeleccionadas.push(r);
            }
            return imagenesSeleccionadas.concat(imagenesSeleccionadas); // Duplicar para hacer pares
        }
        
        window.onload = function() {
            cargaCartas();
            temporizador();
        };

        function desordenarArrays(arrayX){
            let arrayReacomodado = arrayX.sort(function(){return Math.random() -0.5});
            return arrayReacomodado;
        }

        function temporizador(){
            temporizador = setInterval(() => {
                tiempo++
                document.getElementById('temporizador').innerHTML = tiempo;
            }, 1000);
        }

        function cargaCartas(){
            let cartasTemporal = desordenarArrays(seleccionarCartasAleatorias());
            let modificador = 10;
            for(let i=0;i<12;i++){
                let lugar = document.getElementById("pantalla"); 
                if(i == 4 || i == 8){ modificador = 10; }
                if(i < 4){ y = 10; }
                if(i < 8 && i >3){ y = 130; }
                if(i < 12 && i >7){ y = 250; }
                let cartaTemporal = new carta(modificador ,y ,100 ,100 ,'imagenes/back.png','imagenes/'+cartasTemporal[i]+'.jpg');
                lugar.insertAdjacentHTML("beforeend", cartaTemporal.template);
                modificador = modificador + 120;
            }
        } 

        function voltear(e){
            if (!juegoIniciado) { // Verifica si el juego ha comenzado
                alert("Primero tienes que darle al botón 'Iniciar Juego' para poder una jugar. :)");
                return; // No permite voltear la carta si el juego no ha comenzado
                
            }
    
            e.setAttribute('onclick',"");
            e.classList.add('volteada');
            if(contadorVolteadas < 2){
                let imagenX = e.getAttribute('carta');
                if(contadorVolteadas == 0){
                    carta1 = imagenX;
                }
                if(contadorVolteadas == 1){
                    carta2 = imagenX;
                }
                e.firstElementChild.style.transform = ' rotateY(180deg) ';
                contadorVolteadas++;
                if(contadorVolteadas == 2){
                    intentos++;
                    document.getElementById('intentos').innerHTML = intentos ;
                    let cartasArray = document.getElementsByClassName('flip-cartaTemporal-inner');
                    setTimeout(() => {
                        if(carta1 == carta2){
                            let chequeo = document.getElementsByClassName('ctrlCartas');
                            for (let cartaX of chequeo) {
                                let imagenCarta = cartaX.getAttribute('carta');
                                if(imagenCarta == carta1){
                                    cartaX.setAttribute("style", "display: none;");
                                    encontradas = encontradas + .5;
                                    faltantes = faltantes - .5;
                                    document.getElementById('encontrados').innerHTML = encontradas ;
                                    document.getElementById('faltantes').innerHTML = faltantes ;
                                    if(encontradas == 6){
                                        clearInterval(temporizador);
                                        document.getElementById('ganaste').style.display = 'block';
                                    }
                                }
                            }
                        }else{
                            let volteadas = document.getElementsByClassName('volteada');
                            let cantidadVolteadas = volteadas.length - 1;
                            for (let index = cantidadVolteadas; index >= 0; index--) {
                                volteadas[index].setAttribute("onclick","voltear(this);")
                                volteadas[index].classList.remove("volteada");
                            }
                        }
                        for(let cartaX of cartasArray){
                            cartaX.style.transform = '' ;
                            contadorVolteadas = 0;
                        }
                    }, 1000);
                }
            }
        }
        // Establece más reglas en el juego.
document.getElementById('startButton').onclick = iniciarJuego;

function iniciarJuego() {
    juegoIniciado = true; // Establece que el juego ha comenzado
    // Voltear todas las cartas mostrando el frente por un breve período
    alert("Las cartas se van a voltear, memorízalas correctamente!");
    let cartas = document.getElementsByClassName('flip-cartaTemporal-inner');
    Array.from(cartas).forEach((carta) => {
        carta.style.transform = 'rotateY(180deg)';
    });

    // Ocultar las cartas después de un breve tiempo y empezar el temporizador
    setTimeout(() => {
        Array.from(cartas).forEach((carta) => {
            carta.style.transform = '';
            carta.parentElement.setAttribute('onclick', 'voltear(this);'); // Reasigna la funcionalidad de voltear
        });

                // Notificar al jugador que el juego ha comenzado
        alert("¡Da comienzo el juego!");

        temporizador(); // Inicia el temporizador del juego
    }, 5000); // Ajusta este tiempo al deseado (5000 milisegundos = 5 segundos)

    // Desactivar el botón de inicio para evitar reinicios durante el juego
    document.getElementById('startButton').disabled = true;
}

