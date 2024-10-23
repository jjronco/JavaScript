// Objeto con la composición de cada bloque + variable con el total de diputados (257)
const bloques = [
    { nombre: "Unión por la Patria", cantidad: 99 },
    { nombre: "La Libertad Avanza", cantidad: 39 },
    { nombre: "PRO", cantidad: 38 },
    { nombre: "UCR", cantidad: 33},
    { nombre: "Encuentro Federal", cantidad: 16},
    { nombre: "Innovación Federal", cantidad: 8},
    { nombre: "Coalición Cívica", cantidad: 6},
    { nombre: "Frente de Izquierda", cantidad: 5},
    { nombre: "Otros", cantidad: 13},
]
const totalDiputados = bloques.reduce((acc, bloque) => acc + bloque.cantidad, 0);


// FUNCIÓN PARA MOSTRAR LA COMPOSICIÓN DE BLOQUES
function mostrarBloques(bloques) {
    let listaBloques = `La Cámara de Diputados está compuesta por ${totalDiputados} legisladores que conforman los siguientes bloques:\n\n`;
    bloques.forEach(bloque => {
        listaBloques += ` - ${bloque.nombre}: ${bloque.cantidad} diputados;\n`;
    });
    alert(listaBloques);
}


// FUNCIÓN PARA VERIFICAR EL QUÓRUM (129 diputados)
const verificarQuorum = () =>{
    alert (`Se debe alcanzar un mínimo de 129 legisladores para obtener quórum e iniciar la sesión.`)
    const quorumRequerido = 129;
    let totalPresentes = 0;

    for (const bloque of bloques) {
        let presentes;
        do {
            presentes = prompt(`Ingrese el número de diputados correspondientes al bloque ${bloque.nombre}, el cual tiene ${bloque.cantidad} integrantes:`);
            if (presentes === null) {
                alert("Se reinicia el simulador.");
                return app();
            }
            presentes = parseInt(presentes);
            if (isNaN(presentes) || presentes < 0 || presentes > bloque.cantidad) {
                alert(`Por favor, ingrese un número válido. Recuerde que el número no puede ser menor a cero ni mayor al total de miembros del bloque.`);
            }
        } while (isNaN(presentes) || presentes < 0 || presentes > bloque.cantidad);
      
        totalPresentes += presentes;
    }

    if (totalPresentes >= quorumRequerido) {
        alert(`Total de diputados presentes: ${totalPresentes}. ¡Hay quórum! \n\n Puede iniciar el debate.`);
    } else {
        alert(`Total de diputados presentes: ${totalPresentes}. No hay quórum`);
    }
}


// FUNCIÓN PARA SIMULAR VOTACIONES
function simularVotacion() {

    // Selección del tipo de votación
    let tipoVotacion = null;
    while (tipoVotacion !== "1" && tipoVotacion !== "2") {
        tipoVotacion = prompt(
            `Seleccione el tipo de votación que desee calcular:\n 1 - Mayoría simple (mitad más uno)\n 2 - Mayoría agravada (dos tercios)\n\nDebe ingresar el número de la opción seleccionada.`
        );
        if (tipoVotacion !== "1" && tipoVotacion !== "2") {
            alert("Opción no válida. Por favor, elija 1 o 2.");
        }
    }

    // Verificación del número de presentes
    function verificarPresentes() {
        let totalPresentes=0
        do {
        totalPresentes = parseInt(prompt("Ingrese el número total de diputados presentes para esta votación:"));
            if (isNaN(totalPresentes) || totalPresentes <= 0) {
                alert("Por favor, ingrese un número válido de diputados presentes.");
            } else if (totalPresentes > totalDiputados) {
                alert(`El número de presentes no puede ser superior al total de diputados (${totalDiputados}). Hay algún intruso.`);
            } else if (totalPresentes < 129) {
                alert("No hay quórum para realizar la votación.");
            }
        } while (totalPresentes < 129 || totalPresentes > totalDiputados || isNaN(totalPresentes) )
        
        return totalPresentes
    }

    totalPresentes = verificarPresentes()

    // Calcular la mayoría requerida
    let mayoriaRequerida;
    if (tipoVotacion === "1") {
        mayoriaRequerida = Math.floor(totalPresentes / 2) + 1; // Mayoría simple
    } else {
        mayoriaRequerida = Math.ceil((2 * totalPresentes) / 3); // Mayoría agravada
    }
    alert(`Los votos afirmativos requeridos son: ${mayoriaRequerida}`);

    // Votación por bloque
    let votosAfirmativos = 0;
    const obtenerVotosPorBloque = (bloque) => {
    let votosPorBloque;
    let votacion = true
    while (votacion) {
        votosPorBloque = prompt(`Ingrese el número de votos afirmativos del bloque ${bloque.nombre} (máx: ${bloque.cantidad}):`);
        if (votosPorBloque === null) return null;
        
        votosPorBloque = parseInt(votosPorBloque);
        if (isNaN(votosPorBloque) || votosPorBloque < 0) {
            alert("Debe ingresar un número válido");
        } else if (votosPorBloque > bloque.cantidad) {
            alert("El número de votos no puede exceder la cantidad de integrantes del bloque.");
        } else if (votosAfirmativos > totalPresentes) {
            const reiniciar = confirm("El número de votos afirmativos superó el total de legisladores presentes. ¿Desea reiniciar el conteo?");
                if(reiniciar){
                    votosAfirmativos = 0;
                    alert("Se repite la votación.");
                    return null;
                }
        } else {
            return votosPorBloque;
        }
    }
    }

    for (const bloque of bloques) {
        const votosPorBloque = obtenerVotosPorBloque(bloque);
        if (votosPorBloque === null) return simularVotacion();
        votosAfirmativos += votosPorBloque;
    }

    // Resultado de la votación
    const votosNegativos = totalPresentes - votosAfirmativos;
    if (votosAfirmativos >= mayoriaRequerida) {
        alert(
            `La votación resultó: ${votosAfirmativos} votos afirmativos contra ${votosNegativos} votos negativos.\n` +
            `¡La propuesta ha sido aprobada!`
        );
    } else {
        alert(
            `La votación resultó: ${votosAfirmativos} votos afirmativos contra ${votosNegativos} votos negativos.\n` +
            `La propuesta ha sido rechazada.`
        );
    }
}


// FUNCIONES SELECTOR DE OPCIONES
const seleccionarOpcion = (opciones) => {
    switch (opciones) {
        case 1:
            mostrarBloques(bloques);
            break;
        case 2:
            verificarQuorum();
            break;
        case 3:
            simularVotacion();
            break;
        default:
            alert(`Ingresó un valor inválido.`);
    }
}

const app = () => {
    let loop = true;
    alert("¡Hola! Bienvenido al simulador de sesiones legislativas")
    while (loop) {
        let opciones = parseInt(prompt(`Elija una opción del menú:\n 1- Mostrar composición de Bloques.\n 2- Verificar Quórum.\n 3- Simular votación.\n Por favor ingrese el número de la opción seleccionada.`));
        seleccionarOpcion(opciones);
        loop = confirm("¿Desea continuar en el simulador?")
    }
    alert("¡Hasta pronto!")
}

app();
