document.addEventListener("DOMContentLoaded", function() {

//se crean las 28 fichas de 0 a 6
function createPieces() {
    let pieces = [];
    let cont = 0;

    for (let i = 0; i < 29; i++) {
        for (let j = cont; j < 7; j++) {
            pieces.push(cont + " | " + j);
            const div = document.createElement("div");
            
        }
        cont++;
    }
    return pieces;
}

function createDivsForPieces() {
    const container = document.getElementById("contenedor-fichas");
    let p = createPieces();

    for (let i = 0; i < p.length; i++) {

    const div = document.createElement("div");
      div.textContent = p[i]; // Alternatively, display specific data fields using template literals
      div.classList.add("ficha"); // Assign a class for styling
      container.appendChild(div);
    }
  }

//barajar el dominó aleatoriamente
function shuffleDominoes() {

    let listRandomNumber = [];
    let pieces = [];

    while (listRandomNumber.length < 28) {
        const randomNumber = Math.floor(Math.random() * 28); // Generar un número aleatorio entre 0 y 27
        if (!listRandomNumber.includes(randomNumber)) { // Verificar si el número generado ya está en la lista
            listRandomNumber.push(randomNumber); // Agregar el número generado a la lista si no está repetido

            pieces.push(createPieces()[randomNumber]);
        }
    }

    return pieces;

}

// Función para dividir la lista en grupos para cada jugador
function PiecesPerPlayer(players) {

    const groups = [];
    const pieces = shuffleDominoes();

    for (let i = 0; i < players; i++) {

        groups.push(pieces.slice(0, 7));//se dan 7 fichas a cada jugador
        pieces.splice(0, 7)//se eliminan las fichas dadas
    }

    return groups;
}

function NumberPlayers() {
    //solicita al usuario la cantidad de jugadores a participara
    let numPlayer = 0;
    do {
        numPlayer = prompt("numero de participantes de 2 a 4");
    } while (parseInt(numPlayer) != 2 && parseInt(numPlayer) != 3 && parseInt(numPlayer) != 4);

    return numPlayer;
}

function saveFirstPiece(i, fichaUtilizar, pieces, game, player) {

    //indica de quien es el turno y muestra sus fichas
    let turnP = i+1;
    console.log("Turno del jugador " + turnP)
    console.log(pieces[i])

    //valida que solo se puedan agregar numeros segun las fichas 
    do {
        //solicita la ficha que el jugador quiere agregar
        fichaUtilizar = prompt("Introduzca el numero de la ficha a utilizar del 1 al " + pieces[player].length);
    } while (fichaUtilizar - 1 > pieces[player].length - 1 || fichaUtilizar - 1 < 0 || isNaN(fichaUtilizar));


    //agrega la ficha a la lista de juego
    game.push(pieces[i][fichaUtilizar - 1]);

    //elimina la ficha de la lista del jugador
    pieces[i].splice(fichaUtilizar - 1, 1);
    //da el valor del jugador actual
    player = i;
    //muestra en consola los datos de la lista del juego
    console.log("-----inicio Juego-----");
    for (let i = 0; i < game.length; i++) {
        console.log(game[i])
    }
    console.log("------cierre Juego-----")
}

function startGame() {

    let numPlayer = NumberPlayers();//solicita cantidad de jugadores
    const pieces = PiecesPerPlayer(parseInt(numPlayer));//reparte las fichas a los jugadores
    let game = [];//almacena las fichas del juego
    let player = 0;//jugador en turno
    let fichaUtilizar = 0;//ficha por jugar

    //recorre la lista donde estan los 4 jugadores
    for (let i = 0; i < pieces.length; i++) {

        //recorro las fichas de cada jugador
        for (let k = 0; k < pieces[i].length; k++) {

            //consulta quien tiene la ficha inicial y la agrega a la lista del juego
            if (pieces[i][k] === "6 | 6") {

                saveFirstPiece(i, fichaUtilizar, pieces, game, player)
            }
        }
    }

    //si hay menos de 4 jugadores y ninguno tiene la ficha 6 | 6
    if (game.length == 0) {

        //recorre la lista donde estan los 4 jugadores
        for (let i = 0; i < pieces.length; i++) {

            saveFirstPiece(i, fichaUtilizar, pieces, game, player)
            i = pieces.length;

        }
    }

    //contador para saber cuantas veces pasa turno y determinar si el juego está cerrado
    let countPassShift = 0;
    let closedGame = false;

    //se ejecutará mientras el juego no haya finalizado
    //mientras todos los jugadores tengan fichas y el juego no esté cerrado
    //while (pieces[player].length != 0 && closedGame == false) {

    //si el turno fue del ultimo jugador, entonces pasará al primero nuevamente
    if (player === parseInt(numPlayer) - 1) {
        player = 0;

    } else {//si no, el turno pasa al siguiente jugador
        player++;
    }

    //siguiente turno ---------------------------------------

    //muestra datos informacion del jugador en turno
    let turnP = player+1;
    console.log("Turno del jugador " + turnP);
    console.log("Tus fichas ");
    console.log(pieces[player]);

    let firstPiece = [];//numero del inicio del juego
    let secondPiece = [];//numero del final del juego
    let selectedPiece = [];//ficha seleccionada por el jugador
    let playerPieces = [];//almacena los datos de las piezas del jugaador para saber si debe pasar turno

    firstPiece = game[0] + "".split(" | ");//almacena los datos de la primera pieza del juego
    secondPiece = game[game.length - 1] + "".split(" | ");//almacena los datos de la ultima pieza del juego

    let turnPlayer = false;//para determinar si el jugador pasa turno o no

    //recorre las fichas del jugador en turno
    for (let i = 0; i < pieces[player].length; i++) {

        //obtiene los datos de las fichas
        playerPieces = pieces[player][i] + "".split(" | ");

        //consulta si el jugador pasa turno o no
        if (parseInt(playerPieces[0]) == firstPiece[0] || parseInt(playerPieces[4]) == firstPiece[0]
            || parseInt(playerPieces[0]) == secondPiece[4] || parseInt(playerPieces[4]) == secondPiece[4]) {
            turnPlayer = true;
        }
    }

    //consulta si el jugador puede jugar
    if (turnPlayer) {
        
        do {

            //solicita una ficha a jugar
            fichaUtilizar = prompt("Introduzca el numero de la ficha a utilizar del 1 al " + pieces[player].length);

            //obtiene los datos de la ficha seleccionada
            selectedPiece = pieces[player][fichaUtilizar - 1] + "".split(" | ");//ficha seleccionada

            //si la ficha seleccionada se puede colocar en el tablero del juego
        } while (parseInt(selectedPiece[0]) != firstPiece[0] && parseInt(selectedPiece[4]) != firstPiece[0]
        && parseInt(selectedPiece[0]) != secondPiece[4] && parseInt(selectedPiece[4]) != secondPiece[4]);

        //Si se agrega al final y está en el orden correcto
        if (parseInt(selectedPiece[0]) == secondPiece[4]) {
            game.push(pieces[player][fichaUtilizar - 1]);
            pieces[player].splice(fichaUtilizar - 1, 1);

            //si se agrega al inicio y está en el orden correcto
        } else if (parseInt(selectedPiece[4]) == firstPiece[0]) {
            game.unshift(pieces[player][fichaUtilizar - 1]);
            pieces[player].splice(fichaUtilizar - 1, 1);

            //si se agrega al final y está invertido
        } else if (parseInt(selectedPiece[4]) == secondPiece[4]) {
            game.push(selectedPiece[4] + " | " + selectedPiece[0]);
            pieces[player].splice(fichaUtilizar - 1, 1);

            //si se agrega al inicio y está invertido
        } else if (parseInt(selectedPiece[0]) == firstPiece[0]) {
            game.unshift(selectedPiece[4] + " | " + selectedPiece[0]);
            pieces[player].splice(fichaUtilizar - 1, 1);

        }

        console.log("-----inicio Juego-----");
        for (let i = 0; i < game.length; i++) {
            console.log(game[i])
        }
        console.log("------cierre Juego-----")

        //si un jugador se queda sin fichas
        if (pieces[player] == 0) {
            let winner = player+1;
            console.log("El ganador de la partida fue el jugador " + winner);
            closedGame = true;
        }

        //si algun jugador pasó turno pero el siguiente si juega se resta al contador
        //para que el juego no finalice
        if (countPassShift > 0) {
            countPassShift--;
        }

        //si el jugador no tiene fichas para jugar
    } else {

        //aumenta el contador de pasar turno
        countPassShift++;
        //si el contador de pasar turno es igual o mayor a la cantidad de jugadores
        //el juego se finaliza
        if (parseInt(countPassShift) >= parseInt(numPlayer)) {
            console.log("se termina porque no tienen fichas, juego cerrado")
            closedGame = true;
            pieces[player].length = 0;

            //si el juego no ha terminado indica que el jugador pasa turno
        } else {
            let playerTurn = player+1;
            console.log("El jugador " + playerTurn + " no tiene fichas para jugar, pasa turno")
        }
    }
    //}
}

startGame()
createDivsForPieces();
});