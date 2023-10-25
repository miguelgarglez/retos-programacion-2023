/*
 * Escribe un programa que muestre cómo transcurre un juego de tenis y quién lo ha ganado.
 * El programa recibirá una secuencia formada por "P1" (Player 1) o "P2" (Player 2), según quien
 * gane cada punto del juego.
 * 
 * - Las puntuaciones de un juego son "Love" (cero), 15, 30, 40, "Deuce" (empate), ventaja.
 * - Ante la secuencia [P1, P1, P2, P2, P1, P2, P1, P1], el programa mostraría lo siguiente:
 *   15 - Love
 *   30 - Love
 *   30 - 15
 *   30 - 30
 *   40 - 30
 *   Deuce
 *   Ventaja P1
 *   Ha ganado el P1
 * - Si quieres, puedes controlar errores en la entrada de datos.   
 * - Consulta las reglas del juego si tienes dudas sobre el sistema de puntos.   
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//  indices ->     0      1     2     3       4
const scores = ['Love', '15', '30', '40', 'Ventaja']

// la situación de cada jugador en el juego
let gameMap = {'P1': 0, 'P2': 0}

rl.question('Introduce una secuencia de puntos. \n\
(Puedes introducirla en el siguiente formato: \
P1,P1,P2,P2,P1,P2,P1,P1)\nIndicando el orden en\
 el que gana el punto cada jugador, pulsa Enter si eliges la opción de ejemplo. ', (userInput) => {

    if (userInput == ''){
        game(['P1', 'P1', 'P2', 'P2', 'P1', 'P2', 'P1', 'P1'])

    } else {
        // entradas para la terminal:
        // P1,P1,P1,P1,P2,P2,P2 --> 40 - 0 GANA P1
        // P2,P1,P2,P2,P1,P1,P2,P2 --> GANA P2 POR VENTAJA
        // P2,P2,P2,P2,P1,P1 --> 0 - 40 GANA P2
        let puntos = userInput.split(',')
        game(puntos)
    }

    rl.close();
});

function game(puntos) {
    let deuce = false
    for(punto of puntos) {
        gameMap[punto] += 1 // se sube en una posición en el array de puntuaciones
        if(gameMap['P1'] >= 3 && gameMap['P2'] >= 3 && gameMap['P1'] == gameMap['P2']) {
            deuce = true
            console.log('Deuce')
        } else if (deuce == true) {
            if (gameMap['P1'] > gameMap['P2']) {
                p = 'P1'
            } else {
                p = 'P2'
            }
            deuce = false
            console.log(`Ventaja ${p}`)
        } else if (deuce == false && ((gameMap['P1'] > 3) || (gameMap['P2'] > 3))) {
            // gameMap['P1'] >= 3 && gameMap['P2'] >= 3) || 
            if (gameMap['P1'] > gameMap['P2']) {
                winner = 'P1'
            } else {
                winner = 'P2'
            }
            console.log(`Ha ganado el ${winner}`)
            break
        } else {
            console.log(`${scores[gameMap['P1']]} - ${scores[gameMap['P2']]}`)
        }
    }
}