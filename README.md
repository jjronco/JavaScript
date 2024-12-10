# Simulador de Votación - Cámara de Diputados de la Nación
Este proyecto busca crear una herramienta que replica el proceso de votación en la Cámara de Diputados de la Nación. Permite observar la composición de los bloques políticos, verificar quórum, realizar votaciones y almacenar los resultados en un historial.

## Desglose del proyecto

### 1. **Visualización de bloques**
Esta funcionalidad muestra la composición de los bloques políticos de la Cámara, con los diputados agrupados por bloque. Los datos se obtienen desde un archivo `diputados.json`, derivado de la información disponible en el portal de datos abiertos de la HCDN: https://datos.hcdn.gob.ar/dataset/a80e0fa7-d73a-4ed1-9dec-80465e368951/resource/638cf72a-f993-4211-80e1-43984a529e4f/download/diputados_actuales1.3.json. 

Debido a las siguientes limitaciones:
- La falta de actualización de los datos originales.
- Restricciones para acceder al JSON desde el código directamente.

Se procedió a descargar, actualizar y estructurar manualmente el archivo. Este archivo contiene información como el nombre, apellido y distrito de cada diputado, agrupados por su bloque político. Sin embargo en esta ocasión no era necesario utilizar toda esa información.

#### Cómo funciona:
- Los datos se cargan mediante un método `fetch`.
- Se agrupan dinámicamente utilizando un objeto.
- Se representan en un acordeón interactivo generado con Bootstrap.

### 2. **Verificación de quórum**
Esta funcionalidad permite calcular si hay suficientes diputados presentes para iniciar una votación, siguiendo los requisitos reglamentarios. El número total de diputados se obtiene directamente de la sumatoria de los integrantes de los bloques.

#### Lógica aplicada:
- Hay quórum cuando los Diputados presentes superan a la mitad más uno del Total.
- Si supera el total de diputados, se muestra un mensaje de error.
- Si cumple con los requisitos, se habilita la posibilidad de continuar con la votación.

### 3. **Simulación de votaciones**
Esta parte del proyecto permite:
- Configurar el tipo de mayoría requerida (por ejemplo, mayoría simple, 2/3 de los presentes, etc.).
- Capturar los votos afirmativos de cada bloque mediante campos numéricos.
- Comparar los resultados con la mayoría requerida para determinar si la votación fue aprobada o rechazada.

#### Interacción con el usuario:
- Los resultados se muestran mediante alertas importadas de la librería SweetAlert2.
- Se crea un resumen detallado de la votación en el DOM.

### 4. **Historial de votaciones**
Los resultados de las votaciones se guardan localmente usando `localStorage`, permitiendo su recuperación en futuras sesiones. Cada registro incluye:
- El nombre de la votación.
- El número total de votos afirmativos.
- La mayoría requerida.
- Si la propuesta fue aprobada o rechazada.
