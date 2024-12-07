
// Se crea clase Bloque con función constructora para contener nombre, cantidad de miembros y más adelante el númeto de votos
class Bloque {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.votosAfirmativos = 0;
    }
}

// Se crea clase votación. Acá no entiendo por qué tuve que cerrar la llave al final del código para que funcione. Pensaba que debía cerrarse en la línea 47
class Votacion {
    constructor() {
        this.bloques = [
            new Bloque("Unión por la Patria", 99),
            new Bloque("La Libertad Avanza", 39),
            new Bloque("PRO", 37),
            new Bloque("UCR", 20),
            new Bloque("Encuentro Federal", 16),
            new Bloque("Democracia para Siempre", 12),
            new Bloque("Innovación Federal", 8),
            new Bloque("Coalición Cívica", 6),
            new Bloque("Independencia", 3),
            new Bloque("MID", 3),
            new Bloque("PTS", 3),
            new Bloque("Por Santa Cruz", 2),
            new Bloque("Producción y Trabajo", 2),
            new Bloque("CREO", 1),
            new Bloque("Fuerzas del Cielo", 1),
            new Bloque("Izquierda Socialista", 1),
            new Bloque("Movimiento Popular Neuquino", 1),
            new Bloque("Partido Obrero", 1),
            new Bloque("Unidos", 1),
        ];
        this.totalDiputados = this.bloques.reduce((acc, bloque) => acc + bloque.cantidad, 0);
        this.mostrarBloques();
        this.mayoriaRequerida = 0;
        this.nombreVotacion = '';
        
        this.historial = JSON.parse(localStorage.getItem("historialVotaciones")) || [];
        this.mostrarHistorial();
    }
  
    guardarHistorial() {
        localStorage.setItem("historialVotaciones", JSON.stringify(this.historial));
    }

    guardarNombreVotacion() {
        const nombreInput = document.getElementById("nombre-votacion-input");
        const mensajeNombre = document.getElementById("mensaje-nombre");
        this.nombreVotacion = nombreInput.value.trim();

        // Toast de SweetAlert2 y textContent en caso de avanzar
        if (!this.nombreVotacion) {
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'error',
                title: 'Por favor, ingrese un nombre para la votación.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        return false;


        }
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'success',
                title: `Se procede a la votación de: ${this.nombreVotacion}.`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            mensajeNombre.textContent = `Se procede a la votación de: ${this.nombreVotacion}.`;
            mensajeNombre.style.display = "block";
        return true;
    }
    
    
// Se crea función mostrarBloques y crea <li> enel HTML para detallar la composición de cada bloque (El objetivo es meramente descriptivo para probar. Y lo dejé porque creo que puede ser de utilidad)
    mostrarBloques() {
        const listaBloques = document.getElementById("composicion-bloques").querySelector("ul");
        listaBloques.innerHTML = "";
        this.bloques.forEach(bloque => {
            const item = document.createElement("li");
            item.textContent = `${bloque.nombre}: ${bloque.cantidad}`;
            listaBloques.appendChild(item);
        });
    }

// Se crea función para verificar que haya quorum necesario para habilitar la votación. Se crea variable que captura el número ingresado para luego calcular la mayoría necesaria.
    verificarQuorum() {
        const presentesInput = document.getElementById("presentes");
        const totalPresentes = parseInt(presentesInput.value, 10);
        const mensajeQuorum = document.getElementById("quorum-mensaje");

        if (isNaN(totalPresentes) || totalPresentes < 129) {
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'error',
                title: 'No hay quórum para realizar la votación.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            mensajeQuorum.textContent = "No hay quórum para realizar la votación.";
        } else if (totalPresentes > this.totalDiputados) {
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'error',
                title: `El número de presentes no puede ser superior al total (${this.totalDiputados}).`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            mensajeQuorum.textContent = `El número de presentes no puede ser superior al total de diputados (${this.totalDiputados}).`;
        } else {
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'success',
                title: '¡Hay quórum! Puede iniciar el debate.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            mensajeQuorum.textContent = "¡Hay quórum! Puede iniciar el debate.";
        }
    }

// Se crea función para iniciar la votación una vez establecido el quorum. Lo primero que se pide es seleccionar el tipo de mayoría que requiere la votación.
    iniciarVotacion() {
        if (!this.guardarNombreVotacion()) {
            return; // No iniciar votación si no se ingresó un nombre
        }

        const tipoMayoriaSeleccionado = document.querySelector('input[name="mayoria"]:checked');
        const mensajeMayoria =   document.getElementById("mensajeMayoria");

        if (!tipoMayoriaSeleccionado) {
            Swal.fire({
                toast: true,
                position: 'center',
                icon: 'error',
                title: 'Por favor, seleccione un tipo de mayoría.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const tipoVotacion = tipoMayoriaSeleccionado.value;
        const totalPresentes = parseInt(document.getElementById("presentes").value, 10);

        switch (tipoVotacion) {
            case "mitad_presentes":
                this.mayoriaRequerida = Math.floor(totalPresentes / 2) + 1;
                break;
            case "mitad_total":
                this.mayoriaRequerida = Math.floor(this.totalDiputados / 2) + 1;
                break;
            case "dos_tercios_presentes":
                this.mayoriaRequerida = Math.ceil(totalPresentes * 2 / 3);
                break;
            case "tres_cuartas_presentes":
                this.mayoriaRequerida = Math.ceil(totalPresentes * 3 / 4);
                break;
            default:
                return;
        }
        
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'info',
            title: `Los votos afirmativos requeridos son: ${this.mayoriaRequerida}.`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        mensajeMayoria.textContent = `Los votos afirmativos requeridos son: ${this.mayoriaRequerida}`;
        this.mostrarFormularioVotacion();
    }

// Se crea función que visualiza en el HTML cada bloque con un <input> para introducir el número de votos afirmativos que aporta cada bloque.
    mostrarFormularioVotacion() {
        const votacionContainer = document.getElementById("votacion");
        votacionContainer.innerHTML = "";

        this.bloques.forEach(bloque => {
            const bloqueDiv = document.createElement("div");
            bloqueDiv.className = "bloque";
            bloqueDiv.innerHTML = `
                <h3>${bloque.nombre} (${bloque.cantidad})</h3>
                <label>Votos afirmativos:</label>
                <input type="number" class="afirmativos" data-bloque="${bloque.nombre}" value="0" min="0" max="${bloque.cantidad}">
            `;
            votacionContainer.appendChild(bloqueDiv);

            //Listener para limitar que se ingrese un valor superior al total de miembros de cada bloque
            const input = bloqueDiv.querySelector(".afirmativos");
            input.addEventListener("input", (event) => {
                let value = parseInt(event.target.value, 10);
                if (value > bloque.cantidad) {
                    // Si el valor supera la cantidad de miembros, se corrige al total
                    event.target.value = bloque.cantidad;
                } else if (value < 0) {
                    // No permitir valores negativos
                    event.target.value = 0;
                }
            });
        });

        votacionContainer.style.display = "block";
    }


// Se crea función que obtiene los valores insertados en los <input> y luego los suma.
    mostrarResultados() {
        const votosAfirmativos = document.querySelectorAll(".afirmativos");
        let totalAfirmativos = 0;

        votosAfirmativos.forEach(input => {
            totalAfirmativos += parseInt(input.value) || 0;
        });

        const mensajeResultado = this.compararConMayoria(totalAfirmativos);

        // Guarda el historial con el nombre de la votación
        this.historial.push({
            nombreVotacion: this.nombreVotacion,  // Agrega el nombre de la votación al historial
            votosAfirmativos: totalAfirmativos,
            mayoriaRequerida: this.mayoriaRequerida,
            resultado: mensajeResultado
        });
        this.guardarHistorial();
        this.mostrarHistorial();

        Swal.fire({
            toast: true,
            position: 'center',
            icon: totalAfirmativos >= this.mayoriaRequerida ? 'success' : 'error',
            title: mensajeResultado,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        const resultadoFinal = document.getElementById("resultados");
        resultadoFinal.innerHTML = `
            <ul>
                <li>Total de votos afirmativos: ${totalAfirmativos}</li>
            </ul>
            <p>${mensajeResultado}</p>`;
        resultadoFinal.style.display = "block";
    }

// Se crea función para comparar el resultado obtenido con la mayoría exigida para concluir si la iniciativa fue aprobada o rechazada.
    compararConMayoria(totalAfirmativos) {
        return totalAfirmativos >= this.mayoriaRequerida
            ? "¡La votación fue aprobada!"
            : "No se alcanzó la mayoría necesaria.";
    }


// Se crea funciones para retomar el array almacenado en el localstorage e insertar un textContent con los resultados de las distintas votaciones en <li>
    mostrarHistorial() {
        const historialDiv = document.getElementById("historial");
        historialDiv.innerHTML = "";

        if (this.historial.length > 0) {
            this.historial.forEach((simulacion, index) => {
                const item = document.createElement("li");
                item.textContent = `Votación: ${simulacion.nombreVotacion} - Votos Afirmativos: ${simulacion.votosAfirmativos}, 
                    Mayoría Requerida: ${simulacion.mayoriaRequerida}, Resultado: ${simulacion.resultado}`;
                historialDiv.appendChild(item);
            });
            historialDiv.style.display = "block";
        }
    }
}

const votacion = new Votacion();


    // Bloque para agregar los event listeners de los botones principales
    document.addEventListener("DOMContentLoaded", () => {
        // Listener para verificar quórum
        const verificarQuorumBtn = document.getElementById("verificar-quorum-btn");
        verificarQuorumBtn.addEventListener("click", () => votacion.verificarQuorum());

        // Listener para guardar el nombre de la votación
        const guardarNombreVotacionBtn = document.getElementById("guardar-nombre-votacion");
        guardarNombreVotacionBtn.addEventListener("click", () => votacion.guardarNombreVotacion());
    
        // Listener para iniciar votación
        const iniciarVotacionBtn = document.getElementById("iniciar-votacion-btn");
        iniciarVotacionBtn.addEventListener("click", () => votacion.iniciarVotacion());
    
        // Listener para mostrar resultados
        const mostrarResultadosBtn = document.getElementById("mostrar-resultados-btn");
        mostrarResultadosBtn.addEventListener("click", () => votacion.mostrarResultados());
    });