export function minusMatrix(matrixA, matrixB, lengthOfRow) {
  const matrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    let arr = [];
    for (let j = 0; j < lengthOfRow; j++) {
      arr.push(matrixA[i][j] - matrixB[i][j]);
    }
    matrix.push(arr);
  }
  return matrix;
}

export function matrixNormsByOne(matrix, lengthOfRow) {
  const arr = [];
  for (let j = 0; j < lengthOfRow; j++) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      sum += Math.abs(matrix[i][j]);
    }
    arr.push(sum);
  }
  return arr;
}
