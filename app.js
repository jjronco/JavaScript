class Bloque {
    constructor(nombre, cantidad) {
      this.nombre = nombre;
      this.cantidad = cantidad;
      this.votosAfirmativos = 0;
      this.votosNegativos = 0;
      this.abstenciones = 0;
    }
  }
  
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
    }
  
    // Mostrar los bloques en la lista
    mostrarBloques() {
      const listaBloques = document.getElementById("composicion-bloques").querySelector("ul");
      listaBloques.innerHTML = "";
      this.bloques.forEach(bloque => {
        const item = document.createElement("li");
        item.textContent = `${bloque.nombre}: ${bloque.cantidad}`;
        listaBloques.appendChild(item);
      });
    }
  
    // Verificar el quórum
    verificarQuorum() {
      const presentesInput = document.getElementById("presentes");
      const totalPresentes = parseInt(presentesInput.value, 10);
      const mensajeQuorum = document.getElementById("quorum-mensaje");
  
      if (isNaN(totalPresentes) || totalPresentes < 129) {
        mensajeQuorum.textContent = "No hay quórum para realizar la votación.";
      } else if (totalPresentes > this.totalDiputados) {
        mensajeQuorum.textContent = `El número de presentes no puede ser superior al total de diputados (${this.totalDiputados}).`;
      } else {
        mensajeQuorum.textContent = "¡Hay quórum! Puede iniciar el debate.";
      }
    }
  
    // Iniciar la votación
    iniciarVotacion() {
      const tipoMayoriaSeleccionado = document.querySelector('input[name="mayoria"]:checked');
      const mensajeMayoria = document.getElementById("mensajeMayoria");
  
      if (!tipoMayoriaSeleccionado) {
        mensajeMayoria.textContent = "Por favor, seleccione un tipo de mayoría.";
        return;
      }
  
      const tipoVotacion = tipoMayoriaSeleccionado.value;
      const totalPresentes = parseInt(document.getElementById("presentes").value, 10);
      let mayoriaRequerida;
  
      // Calcular la mayoría requerida
      switch (tipoVotacion) {
        case "mitad_presentes":
          mayoriaRequerida = Math.floor(totalPresentes / 2) + 1;
          break;
        case "mitad_total":
          mayoriaRequerida = Math.floor(this.totalDiputados / 2) + 1;
          break;
        case "dos_tercios_presentes":
          mayoriaRequerida = Math.ceil(totalPresentes * 2 / 3);
          break;
        case "tres_cuartas_presentes":
          mayoriaRequerida = Math.ceil(totalPresentes * 3 / 4);
          break;
        default:
          return;
      }
  
      mensajeMayoria.textContent = `Los votos afirmativos requeridos son: ${mayoriaRequerida}`;
      this.mostrarFormularioVotacion();
    }
  
    // Mostrar el formulario de votación para cada bloque
    mostrarFormularioVotacion() {
      const votacionContainer = document.getElementById("votacion");
      votacionContainer.innerHTML = "";
  
      this.bloques.forEach(bloque => {
        const bloqueDiv = document.createElement("div");
        bloqueDiv.className = "bloque";
        bloqueDiv.innerHTML = `
          <h3>${bloque.nombre} (${bloque.cantidad})</h3>
          <label>Votos afirmativos:</label>
          <input type="number" class="afirmativos" data-bloque="${bloque.nombre}" value="0">
          <label>Votos negativos:</label>
          <input type="number" class="negativos" data-bloque="${bloque.nombre}" value="0">
          <label>Abstenciones:</label>
          <input type="number" class="abstenciones" data-bloque="${bloque.nombre}" value="0">
        `;
        votacionContainer.appendChild(bloqueDiv);
      });
  
      votacionContainer.style.display = "block";
    }
  
    // Mostrar resultados y comparar con la mayoría requerida
    mostrarResultados() {
        const votosAfirmativos = document.querySelectorAll(".afirmativos");
        const votosNegativos = document.querySelectorAll(".negativos");
        const votosAbstenciones = document.querySelectorAll(".abstenciones");
        let totalAfirmativos = 0;
        let totalNegativos = 0;
        let totalAbstenciones = 0;
   
        votosAfirmativos.forEach(input => {
        totalAfirmativos += parseInt(input.value) || 0;
        });
        votosNegativos.forEach(input => {
        totalNegativos += parseInt(input.value) || 0;
        });
        votosAbstenciones.forEach(input => {
        totalAbstenciones += parseInt(input.value) || 0; 
        })
    
        // Obtener el elemento para mostrar el resultado
        const resultadoFinal = document.getElementById("resultados");
    
        // Mostrar el total de votos afirmativos
        resultadoFinal.innerHTML = `
        <ul>
            <li>Total de votos afirmativos: ${totalAfirmativos}</li>
            <li>Total de votos negativos: ${totalNegativos}</li>
            <li>Total de abstenciones: ${totalAbstenciones}</li>
        </ul>
        `;
    
        // Llamar a la función para comparar los votos afirmativos con la mayoría requerida
        const mensajeResultado = this.compararConMayoria(totalAfirmativos);
    
        // Mostrar el mensaje final dependiendo de la comparación
        resultadoFinal.textContent += ` - ${mensajeResultado}`;
    
        // Mostrar la sección de resultados
        document.getElementById("resultados").style.display = "block";
    }
    
    // Función que compara el total de votos afirmativos con la mayoría requerida
    compararConMayoria(totalAfirmativos) {
        if (totalAfirmativos >= this.mayoriaRequerida) {
        return "¡La votación fue aprobada!";
        } else {
        return "No se alcanzó la mayoría necesaria.";
        }
    }
  }
  const votacion = new Votacion();
  