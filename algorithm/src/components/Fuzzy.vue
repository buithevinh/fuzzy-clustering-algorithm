<template>
  <div>
    <h3>Fuzzy Clustering Algorithms</h3>
    <div class="block-content">
      <p class="text-left">
        1.Initialize U=[uij] matrix, U(0)
        <br />2. At k-step: calculate the centers vectors C(k)=[cj] with U(k)
        <br />3. Update U(k) , U(k+1)
        <br />4. If || U(k+1) - U(k)||&#x3c; then STOP; otherwise return to step 2.
      </p>
    </div>

    <canvas id="myCanvas" width="1000" height="350" style="border:1px solid
  #d3d3d3;"></canvas>
  </div>
</template>

<script>
import { FUZZY_DATA_SET } from '../dataset';
import { COLORS, EPSILON } from '../constant';
import { randomPoint, maximunInArray } from '../utils/math';
import { minusMatrix, matrixNormsByOne } from '../utils/matrix';
export default {
  name: 'fuzzy-clustering-algorithm',
  mounted() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const dataSet = FUZZY_DATA_SET;
    const GROUP = 3;
    const colorPoints = COLORS;
    let centroid = randomPoint(dataSet, GROUP);
    let matrix = this.initializeMatrix(dataSet, GROUP, centroid);
    matrix = this.fuzzyAlgorithm(dataSet, GROUP, centroid, matrix);
    this.drawPoint(dataSet, centroid, matrix, GROUP, ctx, colorPoints);
  },
  methods: {
    initializeMatrix: function(dataSet, lengthGroup, centroid) {
      const matrix = this.calculationWeight(dataSet, lengthGroup, centroid);
      return matrix;
    },
    calculationWeight: function(dataSet, lengthGroup, centroid) {
      const matrix = [];
      for (let i = 0; i < dataSet.length; i++) {
        const array = [];
        for (let j = 0; j < lengthGroup; j++) {
          let weight = 0;
          for (let k = 0; k < lengthGroup; k++) {
            var b = dataSet[i] - centroid[k];
            if (b) {
              weight += Math.pow((dataSet[i] - centroid[j]) / b, 2);
            }
          }
          if (weight != 0) {
            array.push(1 / weight);
          } else {
            array.push(0);
          }
        }
        matrix.push(array);
      }
      return matrix;
    },
    fuzzyAlgorithm: function(dataSet, lengthGroup, centroid, matrix) {
      let epsilon = 1;
      let nextMatrix = [];
      while (epsilon > EPSILON) {
        for (let j = 0; j < lengthGroup; j++) {
          let centerPoint = 0;
          let sum = 0;
          let sumOfMatrix = 0;

          for (let i = 0; i < dataSet.length; i++) {
            sum += matrix[i][j] * dataSet[i];
            sumOfMatrix += matrix[i][j];
          }
          centerPoint = sum / sumOfMatrix;
          centroid[j] = centerPoint;
          nextMatrix = this.calculationWeight(dataSet, lengthGroup, centroid);
        }
        const minus = minusMatrix(matrix, nextMatrix, lengthGroup);
        const arrMatrix = matrixNormsByOne(minus, lengthGroup);
        epsilon = maximunInArray(arrMatrix);
        matrix = nextMatrix;
      }
      return matrix;
    },
    drawPoint: function(dataSet, centeiod, matrix, lengthGroup, ctx, colors) {
      const arrayByGroup = [];
      for (let i = 0; i < lengthGroup; i++) {
        let array = [];
        for (let j = 0; j < matrix.length; j++) {
          const max = maximunInArray(matrix[j]);
          if (matrix[j].indexOf(max) === i) {
            array.push(dataSet[j]);
          }
        }
        arrayByGroup.push(array);
      }
      ctx.beginPath();
      ctx.moveTo(0, 300);
      ctx.lineTo(1000, 300);
      const maxValue = maximunInArray(dataSet);
      for (let k = 0; k < arrayByGroup.length; k++) {
        let arrays = arrayByGroup[k];
        for (let j = 0; j < arrays.length; j++) {
          let point = arrays[j] / maxValue;
          let pointX = Math.floor(point * 900);

          ctx.fillStyle = colors[k];

          ctx.fillRect(pointX, 296, 8, 8);
          ctx.fillText(arrays[j], pointX, 290);
        }
      }
      ctx.stroke();
    }
  }
};
</script>
<style scoped>
.text-left {
  text-align: left;
  display: inline-block;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}
</style>