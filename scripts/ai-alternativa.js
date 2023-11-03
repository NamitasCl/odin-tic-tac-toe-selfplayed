(function init() {
    
    let espaciosDisponibles = [];  
    espaciosDisponibles = dibujaTablero(espaciosDisponibles);  
    iniciaJuego(espaciosDisponibles);
})()

function reiniciar() {
    
    let espaciosDisponibles = [];  
    espaciosDisponibles = dibujaTablero(espaciosDisponibles);  
    iniciaJuego(espaciosDisponibles);
}

function iniciaJuego(espaciosDisponibles, turno = 'X') {
    setTimeout((function() {
        jugar(espaciosDisponibles, turno);
        turno = proximoTurno(espaciosDisponibles, turno); 

        if(espaciosDisponibles.length > 0 && !verificaGanador()) {
            setTimeout(iniciaJuego(espaciosDisponibles, turno),0);
        }
    }), 1000);
}

function selJug(turno) {
    let jugadores = ['X', 'O'];
    
    if (turno === jugadores[0]){
        turno = jugadores[1];
    } else {
        turno = jugadores[0];
    }
    return turno;
}

function dibujaTablero(espaciosDisponibles) {
    let tablero = document.createElement('div');
    tablero.id = 'tablero';
    document.body.appendChild(tablero);
    
    //El tablero siempre sera cuadrado, el tamaño sera lado x lado
    //lado 3 = 9 celdas;
    let tamTablero = 9;

    //Hago las caracteristicas CSS
    tablero.style.width = '180px';
    tablero.style.display = 'grid';
    tablero.style.gridTemplateColumns = 'repeat(3, 1fr)';
    tablero.style.gap = '10px';
    tablero.style.margin = '0 auto';
    tablero.style.justifyItems = 'center';

    //Agrego las celdas al tablero
    for(let i = 0; i<tamTablero; i++) {
        let celda = document.createElement('div');

        //Hago las caracteristicas de cada celda
        celda.style.display = "flex";
        celda.style.justifyContent = "center";
        celda.style.alignItems = "center"
        celda.style.width = "50px";
        celda.style.height = "50px";
        celda.style.backgroundColor = "lightgrey";
        celda.style.borderRadius = '10px';

        tablero.appendChild(celda);
        
    }

    //Agrego los espacios disponibles
    let celdas = document.querySelectorAll('#tablero div');

    for(let i = 0; i<celdas.length; i++) {
        espaciosDisponibles.push(celdas[i]);   
    }

    //Agrego tablero al document.
    document.body.appendChild(tablero);

    return espaciosDisponibles;
}

function jugar(espaciosDisponibles, turno) {
    let celdaRandom = Math.floor(Math.random() * espaciosDisponibles.length);
    let lugar = espaciosDisponibles.splice(celdaRandom, 1);
    lugar[0].innerText = turno;
}

function verificaIgualdad(a,b,c) {
    return (a === b && b === c);
}

function verificaGanador() {
    let celdas = document.querySelectorAll('#tablero div');
    let ganador;

    if(verificaIgualdad(celdas[0].innerText, celdas[1].innerText, celdas[2].innerText)) ganador = celdas[0].innerText;
    if(verificaIgualdad(celdas[3].innerText, celdas[4].innerText, celdas[5].innerText)) ganador = celdas[3].innerText;
    if(verificaIgualdad(celdas[6].innerText, celdas[7].innerText, celdas[8].innerText)) ganador = celdas[6].innerText;

    if(verificaIgualdad(celdas[0].innerText, celdas[3].innerText, celdas[6].innerText)) ganador = celdas[0].innerText;
    if(verificaIgualdad(celdas[1].innerText, celdas[4].innerText, celdas[7].innerText)) ganador = celdas[1].innerText;
    if(verificaIgualdad(celdas[2].innerText, celdas[5].innerText, celdas[8].innerText)) ganador = celdas[2].innerText;

    if(verificaIgualdad(celdas[0].innerText, celdas[4].innerText, celdas[8].innerText)) ganador = celdas[0].innerText;
    if(verificaIgualdad(celdas[2].innerText, celdas[4].innerText, celdas[6].innerText)) ganador = celdas[2].innerText;

    return ganador;
}

function reset() {
    let celdas = document.querySelectorAll('#tablero div');
    celdas.forEach(cell => {
        cell.innerText = '';
    })
    
    document.querySelector('button').remove();
    document.querySelector('#tablero').remove();
    document.querySelector('.resultado').remove();

    reiniciar();

}

function addResetBtn() {
    let resetBtn = document.createElement('button');
    resetBtn.addEventListener('click', reset);
    resetBtn.classList = 'button';
    resetBtn.innerText = 'Reiniciar';
    return resetBtn;
}

function proximoTurno(espaciosDisponibles, turno) {
    let resultado = verificaGanador();
    if(espaciosDisponibles.length >= 0) {
        if(resultado) {
            mostrarResultado(resultado);
            return;
        } else if (espaciosDisponibles.length === 0 ) {
            mostrarResultado(resultado);
        }

        turno = selJug(turno);

    } else {
        alert("Ha habido un empate.");
        addResetBtn();
    }

    return turno;    
}

function mostrarResultado(resultado) {
    let divResultado = document.createElement('div');
    let pResultado = document.createElement('p');

    divResultado.className = 'resultado';
    
    if(resultado) {
        pResultado.innerText = `El ganador es ${resultado}.`;
    } else {
        pResultado.innerText = `Ha sido un empate!.`
    }
    divResultado.append(pResultado);
    divResultado.append(addResetBtn());
    document.body.append(divResultado);
    
}