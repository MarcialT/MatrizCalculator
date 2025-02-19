function generateMatrices() {
      const size = parseInt(document.getElementById('matrixSize').value);
      if (isNaN(size) || size < 2 || size > 10) {
        displayResult('Error: Ingrese un tamaño de matriz valido (2 a 10).', true);
        return;
      }
      generateMatrix('matrixA', size);
      generateMatrix('matrixB', size);
      displayResult(''); 
    }
    function generateMatrix(id, size) {
      const container = document.getElementById(id);
      container.innerHTML = '';
      container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      for (let i = 0; i < size * size; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = 0;
        container.appendChild(input);
      }
    }
    function randomizeMatrices() {
      randomizeMatrix('matrixA');
      randomizeMatrix('matrixB');
    }
    function randomizeMatrix(id) {
      const inputs = document.querySelectorAll(`#${id} input`);
      inputs.forEach(input => {
        input.value = (Math.random() * 20 - 10).toFixed(2);
      });
    }
    function getMatrixValues(id) {
      const inputs = document.querySelectorAll(`#${id} input`);
      const size = Math.sqrt(inputs.length);
      const matrix = [];
      for (let i = 0; i < size; i++) {
        matrix.push(Array.from(inputs).slice(i * size, (i + 1) * size).map(input => parseFloat(input.value)));
      }
      return matrix;
    }
    function displayResult(result, isError = false) {
      const resultContent = document.getElementById('resultContent');
      resultContent.innerHTML = '';
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
    function addMatrices() {
      const matrixA = getMatrixValues('matrixA');
      const matrixB = getMatrixValues('matrixB');
      if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        displayResult('Error: Las matrices deben tener el mismo tamaño para la suma.', true);
        return;
      }
      const result = matrixA.map((row, i) =>
        row.map((value, j) => value + matrixB[i][j])
      );
      displayResult(result);
    }

    function subtractMatrices() {
      const matrixA = getMatrixValues('matrixA');
      const matrixB = getMatrixValues('matrixB');
      if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        displayResult('Error: Las matrices deben tener el mismo tamaño para la resta.', true);
        return;
      }
      const result = matrixA.map((row, i) =>
        row.map((value, j) => value - matrixB[i][j])
      );
      displayResult(result);
    }
    function multiplyMatrices() {
      const matrixA = getMatrixValues('matrixA');
      const matrixB = getMatrixValues('matrixB');
      if (matrixA[0].length !== matrixB.length) {
        displayResult('Error: El numero de columnas de A debe coincidir con el de filas de B.', true);
        return;
      }
      const result = Array.from({ length: matrixA.length }, () =>
        Array(matrixB[0].length).fill(0)
      );
      for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
          for (let k = 0; k < matrixA[0].length; k++) {
            result[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }
      displayResult(result);
    }
    function scalarMultiply() {
      const scalar = parseFloat(prompt('Ingrese un valor escalar:'));
      if (isNaN(scalar)) {
        displayResult('Error: Ingrese un numero escalar valido.', true);
        return;
      }
      const matrixA = getMatrixValues('matrixA');
      const result = matrixA.map(row => row.map(value => value * scalar));
      displayResult(result);
    }
    function transposeMatrixA() {
      const matrixA = getMatrixValues('matrixA');
      const result = matrixA[0].map((_, i) => matrixA.map(row => row[i]));
      displayResult(result);
    }
    function calculateDeterminant() {
      const matrixA = getMatrixValues('matrixA');
      const det = determinant(matrixA);
      displayResult(`Determinante: ${det.toFixed(2)}`);
    }
    function calculateInverse() {
      const matrixA = getMatrixValues('matrixA');
      const inv = inverseMatrix(matrixA);
      if (inv === null) {
        displayResult('Error: La matriz A no es invertible.', true);
        return;
      }
      displayResult(inv);
    }
    function generateIdentityMatrix() {
      const size = parseInt(document.getElementById('matrixSize').value);
      if (isNaN(size) || size < 2 || size > 10) {
        displayResult('Error: Ingrese un tamaño de matriz valido (2 a 10).', true);
        return;
      }
      const idMatrix = identity(size);
      displayResult(idMatrix);
    }
    function determinant(matrix) {
      const n = matrix.length;
      if (n === 1) return matrix[0][0];
      if (n === 2)
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      let det = 0;
      for (let i = 0; i < n; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
      }
      return det;
    }
    function inverseMatrix(matrix) {
      const n = matrix.length;
      let augmented = matrix.map((row, i) => row.concat(identity(n)[i]));
      for (let i = 0; i < n; i++) {
        let pivot = augmented[i][i];
        if (pivot === 0) {
          let swap = i + 1;
          while (swap < n && augmented[swap][i] === 0) {
            swap++;
          }
          if (swap === n) return null
          [augmented[i], augmented[swap]] = [augmented[swap], augmented[i]];
          pivot = augmented[i][i];
        }
        for (let j = 0; j < 2 * n; j++) {
          augmented[i][j] /= pivot;
        }
        for (let k = 0; k < n; k++) {
          if (k !== i) {
            let factor = augmented[k][i];
            for (let j = 0; j < 2 * n; j++) {
              augmented[k][j] -= factor * augmented[i][j];
            }
          }
        }
      }
      return augmented.map(row => row.slice(n));
    }
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

    window.onload = generateMatrices;