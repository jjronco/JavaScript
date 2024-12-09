# Simulador de Votación - Cámara de Diputados de la Nación

Este proyecto es un simulador de votación diseñado para emular el proceso legislativo de la Cámara de Diputados de Argentina. Permite visualizar la composición de bloques, verificar quórum, establecer tipos de mayorías, registrar votaciones, y explorar los integrantes de cada bloque a través de un acordeón dinámico.

---

## **Características del Proyecto**

### 1. **Composición de Bloques**
   - Se muestra un resumen de los bloques legislativos y la cantidad de miembros que los componen.
   - La información es tomada dinámicamente de un archivo JSON que contiene los datos actualizados de los diputados. Respecto a este punto es importante mencionar dos cuestiones. Por un lado, el sitio oficial de la Cámara de Diputados ofrece entre sus recursos de datos abiertos un documento .json con los datos de los legisladores actuales. Sin embargo, el mismo se encuentra disponible para descargar pero no es posible acceder a él utilizando el método fecth debido a una política de CORS (Cross-Origin Resource Sharing), tal como indica el error que se genera. Por este motivo, se procedió a descargar el archivo e incorporarlo al proyecto. En segundo lugar, es necesario aclarar que los datos provistos oficialmente se encuentran desactualizados: se crearon nuevos bloques que modificaron la composición de algunos espacios; y falleció un diputado que, al no haber sido reemplazado hasta el momento, dejó a la Cámara con un total de 256 legisladores. Por estos motivos se mantuvieron separadas las secciones "Composición de Bloques" (que está vinculado con el funcionamiento del simulador) e "Integrantes de Bloques" (que sólo visualiza los datos provistos en diputados.json).

### 2. **Verificación de Quórum**
   - Permite ingresar la cantidad de diputados presentes para verificar si se cumple el quórum requerido.
   - Emite mensajes claros sobre si es posible proceder con una votación.

### 3. **Simulación de Votación**
   - Ofrece la posibilidad de registrar un nombre para la votación.
   - Permite seleccionar diferentes tipos de mayorías (mitad más uno, dos tercios, etc.) según el reglamento legislativo.
   - Calcula los votos afirmativos necesarios para aprobar una moción.

### 4. **Historial de Votaciones**
   - Almacena el resultado de las votaciones en el localStorage.
   - Permite consultar un historial de las votaciones realizadas.

### 5. **Integrantes de Bloques**
   - Utiliza un acordeón interactivo (con Bootstrap) para mostrar los diputados de cada bloque legislativo.
   - Presenta el nombre y la provincia de cada diputado.
   - Aquí es importante subrayar lo mencionado en el punto 1. qué explica por qué esta sección se encuentra separada.

---
