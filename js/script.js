// Función para generar matrices
function generateMatrices() {
  // Obtiene el tamaño de la matriz desde el elemento con id 'matrixSize'
  const size = parseInt(document.getElementById('matrixSize').value);
  
  // Verifica si el tamaño es un número válido entre 2 y 10
  if (isNaN(size) || size < 2 || size > 10) {
    // Muestra un mensaje de error si el tamaño no es válido
    displayResult('Error: Ingrese un tamaño de matriz valido (2 a 10).', true);
    return;
  }
  
  // Genera las matrices 'matrixA' y 'matrixB' con el tamaño especificado
  generateMatrix('matrixA', size);
  generateMatrix('matrixB', size);
  
  // Limpia cualquier mensaje previo de resultado
  displayResult('');
}

// Función para generar una matriz específica
function generateMatrix(id, size) {
  // Obtiene el contenedor de la matriz por su id
  const container = document.getElementById(id);
  
  // Limpia el contenido del contenedor
  container.innerHTML = '';
  
  // Establece el estilo de cuadrícula CSS para organizar los elementos de entrada
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  
  // Crea elementos de entrada de tipo número y los agrega al contenedor
  for (let i = 0; i < size * size; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = 0;
    container.appendChild(input);
  }
}

// Función para aleatorizar los valores de las matrices
function randomizeMatrices() {
  // Aleatoriza los valores de 'matrixA' y 'matrixB'
  randomizeMatrix('matrixA');
  randomizeMatrix('matrixB');
}

// Función para aleatorizar los valores de una matriz específica
function randomizeMatrix(id) {
  // Selecciona todos los elementos de entrada dentro del contenedor especificado
  const inputs = document.querySelectorAll(`#${id} input`);
  
  // Asigna a cada elemento de entrada un valor aleatorio entre -10 y 10, con dos decimales
  inputs.forEach(input => {
    input.value = (Math.random() * 20 - 10).toFixed(2);
  });
}

// Función para obtener los valores de una matriz específica
function getMatrixValues(id) {
  // Selecciona todos los elementos de entrada dentro del contenedor especificado
  const inputs = document.querySelectorAll(`#${id} input`);
  
  // Calcula el tamaño de la matriz a partir del número de elementos de entrada
  const size = Math.sqrt(inputs.length);
  
  // Organiza los valores en una matriz bidimensional
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(Array.from(inputs).slice(i * size, (i + 1) * size).map(input => parseFloat(input.value)));
  }
  return matrix;
}

// Función para mostrar el resultado en el DOM
function displayResult(result, isError = false) {
  // Obtiene el elemento del DOM donde se mostrará el resultado
  const resultContent = document.getElementById('resultContent');
  
  // Limpia el contenido previo del elemento
  resultContent.innerHTML = '';
  
  // Muestra el resultado según su tipo (cadena, matriz bidimensional, número)
  if (typeof result === 'string') {
    resultContent.innerHTML = `<p class="${isError ? "error" : ""}">${result}</p>`;
  } else if (Array.isArray(result) && Array.isArray(result[0])) {
    const size = result.length;
    const table = document.createElement('div');
    table.className = 'matrix';
    table.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    result.flat().forEach(value => {
      const cell = document.createElement('div');
      cell.textContent = Number(value).toFixed(2);
      table.appendChild(cell);
    });
    resultContent.appendChild(table);
  } else if (typeof result === 'number') {
    resultContent.innerHTML = `<p>${result.toFixed(2)}</p>`;
  } else {
    resultContent.textContent = result;
  }
}

// Función para sumar dos matrices
function addMatrices() {
  // Obtiene los valores de 'matrixA' y 'matrixB'
  const matrixA = getMatrixValues('matrixA');
  const matrixB = getMatrixValues('matrixB');
  
  // Verifica si las matrices tienen el mismo tamaño
  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    displayResult('Error: Las matrices deben tener el mismo tamaño para la suma.', true);
    return;
  }
  
  // Realiza la suma de las matrices
  const result = matrixA.map((row, i) =>
    row.map((value, j) => value + matrixB[i][j])
  );
  
  // Muestra el resultado
  displayResult(result);
}

// Función para restar dos matrices
function subtractMatrices() {
  // Obtiene los valores de 'matrixA' y 'matrixB'
  const matrixA = getMatrixValues('matrixA');
  const matrixB = getMatrixValues('matrixB');
  
  // Verifica si las matrices tienen el mismo tamaño
  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    displayResult('Error: Las matrices deben tener el mismo tamaño para la resta.', true);
    return;
  }
  
  // Realiza la resta de las matrices
  const result = matrixA.map((row, i) =>
    row.map((value, j) => value - matrixB[i][j])
  );
  
  // Muestra el resultado
  displayResult(result);
}

// Función para multiplicar dos matrices
function multiplyMatrices() {
  // Obtiene los valores de 'matrixA' y 'matrixB'
  const matrixA = getMatrixValues('matrixA');
  const matrixB = getMatrixValues('matrixB');
  
  // Verifica si el número de columnas de 'matrixA' coincide con el número de filas de 'matrixB'
  if (matrixA[0].length !== matrixB.length) {
    displayResult('Error: El numero de columnas de A debe coincidir con el de filas de B.', true);
    return;
  }
  
  // Inicializa la matriz resultado con ceros
  const result = Array.from({ length: matrixA.length }, () =>
    Array(matrixB[0].length).fill(0)
  );
  
  // Realiza la multiplicación de las matrices
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixA[0].length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  
  // Muestra el resultado
  displayResult(result);
}

// Función para multiplicar una matriz por un escalar
function scalarMultiply() {
  // Solicita al usuario un valor escalar
  const scalar = parseFloat(prompt('Ingrese un valor escalar:'));
  
  // Verifica si el valor ingresado es un número válido
  if (isNaN(scalar)) {
    displayResult('Error: Ingrese un numero escalar valido.', true);
    return;
  }
  
  // Obtiene los valores de 'matrixA'
  const matrixA = getMatrixValues('matrixA');
  
  // Realiza la multiplicación escalar
  const result = matrixA.map(row => row.map(value => value * scalar));
  
  // Muestra el resultado
  displayResult(result);
}

// Función para transponer la matriz 'matrixA'
function transposeMatrixA() {
  // Obtiene los valores de 'matrixA'
  const matrixA = getMatrixValues('matrixA');
  
  // Calcula la transpuesta de la matriz
  const result = matrixA[0].map((_, i) => matrixA.map(row => row[i]));
  
  // Muestra el resultado
  displayResult(result);
}

// Función para calcular el determinante de la matriz 'matrixA'
function calculateDeterminant() {
  // Obtiene los valores de 'matrixA'
  const matrixA = getMatrixValues('matrixA');
  
  // Calcula el determinante utilizando la función 'determinant'
  const det = determinant(matrixA);
  
  // Muestra el resultado
  displayResult(`Determinante: ${det.toFixed(2)}`);
}

// Función para calcular la inversa de la matriz 'matrixA'
function calculateInverse() {
  // Obtiene los valores de 'matrixA'
  const matrixA = getMatrixValues('matrixA');
  
  // Calcula la inversa utilizando la función 'inverseMatrix'
  const inv = inverseMatrix(matrixA);
  
  // Verifica si la matriz es invertible
  if (inv === null) {
    displayResult('Error: La matriz A no es invertible.', true);
    return;
  }
  
  // Muestra el resultado
  displayResult(inv);
}

// Función para generar una matriz identidad
function generateIdentityMatrix() {
  // Obtiene el tamaño de la matriz desde el elemento con id 'matrixSize'
  const size = parseInt(document.getElementById('matrixSize').value);
  
  // Verifica si el tamaño es un número válido entre 2 y 10
  if (isNaN(size) || size < 2 || size > 10) {
    displayResult('Error: Ingrese un tamaño de matriz valido (2 a 10).', true);
    return;
  }
  
  // Genera la matriz identidad utilizando la función 'identity'
  const idMatrix = identity(size);
  
  // Muestra el resultado
  displayResult(idMatrix);
}

// Función para calcular el determinante de una matriz
function determinant(matrix) {
  const n = matrix.length;
  
  // Caso base: matriz de 1x1
  if (n === 1) return matrix[0][0];
  
  // Caso base: matriz de 2x2
  if (n === 2)
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  // Calcula el determinante para matrices de mayor tamaño
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
    det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
  }
  return det;
}

// Función para calcular la inversa de una matriz
function inverseMatrix(matrix) {
  const n = matrix.length;
  
  // Crea una matriz aumentada con la matriz identidad
  let augmented = matrix.map((row, i) => row.concat(identity(n)[i]));
  
  // Realiza la eliminación gaussiana
  for (let i = 0; i < n; i++) {
    let pivot = augmented[i][i];
    
    // Si el pivote es cero, intercambia filas
    if (pivot === 0) {
      let swap = i + 1;
      while (swap < n && augmented[swap][i] === 0) {
        swap++;
      }
      if (swap === n) return null;
      [augmented[i], augmented[swap]] = [augmented[swap], augmented[i]];
      pivot = augmented[i][i];
    }
    
    // Normaliza la fila del pivote
    for (let j = 0; j < 2 * n; j++) {
      augmented[i][j] /= pivot;
    }
    
    // Elimina los elementos por encima y por debajo del pivote
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let factor = augmented[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
  }
  
  // Extrae la matriz inversa de la matriz aumentada
  return augmented.map(row => row.slice(n));
}

// Función para generar una matriz identidad de tamaño 'n'
function identity(n) {
  const id = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(i === j ? 1 : 0);
    }
    id.push(row);
  }
  return id;
}

// Genera matrices automáticamente cuando la página se carga
window.onload = generateMatrices;