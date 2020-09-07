var arr = [
  1,
  1,
  2,
  4,
  56,
  7,
  3,
  5,
  7,
  4,
  2,
  2,
  56,
  7,
  87,
  45,
  3,
  5,
  4,
  5,
  71,
  24,
  2,
  9,
  40,
  4,
  5,
  67,
  7,
  32,
  6,
  7,
  49,
  41,
  23
];
var group = 3;
// var arr = []
//  for(let i =0;i< 100; i++){
//   arr.push(Math.floor(Math.random() * 1000))
// };
var colors = ['red', 'blue', 'green'];
  
// for (let i = 0; i < group; i++) {
//    colors.push(getRandomRgb());
//  }
var sumaverage = function (arrays) {
  var sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    sum += arrays[i];
  }
  return sum / arrays.length;
};

var centerRandom = function (arr) {
  var centerpoint = [];
  for (let index = 0; index < group; index++) {
    let center = arr[Math.floor(Math.random() * arr.length)];
    while (centerpoint.indexOf(center) !== -1) {
      center = arr[Math.floor(Math.random() * arr.length)];
    }
    centerpoint.push(center);
  }
  return centerpoint;
};
var center = centerRandom(arr);
var stop = 0.001;
var u = [];
for (let i = 0; i < arr.length; i++) {
  var a = [];

  for (let j = 0; j < group; j++) {
    var w = 0;
    for (let k = 0; k < group; k++) {
      var b = arr[i] - center[k];
      if (b) {
        w += Math.pow((arr[i] - center[j]) / b, 2);
      }
    }
    if (w != 0) {
      a.push(1 / w);
    } else {
      a.push(0);
    }
  }
  u.push(a);
}

var sumMath = function (matrixA, matrixB) {
  var matrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    var arr = [];
    for (let j = 0; j < group; j++) {
      arr.push(matrixA[i][j] - matrixB[i][j]);
    }
    matrix.push(arr);
  }
  return matrix;
};
var sumMatrixArr = function (matrix) {
  var arr = [];
  for (let j = 0; j < group; j++) {
    var sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      sum += Math.abs(matrix[i][j]);
    }
    arr.push(sum);
  }
  return arr;
};

var d = 1;
var uk = [];
var intervalFuzzy = null;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var count = 0;
var fuzzy = function (callback) {
  
  // while (d > stop) {
    for (let j = 0; j < group; j++) {
      var c = 0;
      var sum = 0;
      var sumu = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += u[i][j] * arr[i];
        sumu += u[i][j];
      }
      c = sum / sumu;
      center[j] = c;
      uk = [];
      for (let i = 0; i < arr.length; i++) {
        var a = [];
        for (let j = 0; j < group; j++) {
          var w = 0;
          for (let k = 0; k < group; k++) {
            var b = arr[i] - center[k];
            if (b) {
              w += Math.pow((arr[i] - center[j]) / b, 2);
            }
          }
          if (w != 0) {
            a.push(1 / w);
          } else {
            a.push(0);
          }
        }
        uk.push(a);
      }
    }
    var sumMatrixPoint = sumMath(u, uk);
    var arrMatrix = sumMatrixArr(sumMatrixPoint);
    d = Math.max(...arrMatrix);
    u = uk;
    count++; 
      ctx.clearRect(0, 0, 1000, 300);
    
 ctx.fillText('count ' + count, 200, 150);
  callback(u, center);
  if(d <= stop) {
    clearInterval(intervalFuzzy);
    ctx.fillText('Done !', 200, 140);
  }
    // if (d <= stop) {
      
    // }
  // }
  
};

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

var createPoint = function (u, center) {
  var groups = [];
  for (let i = 0; i < group; i++) {
    let group = [];
    for (let j = 0; j < u.length; j++) {
      var max = Math.max(...u[j]);
      if (u[j].indexOf(max) === i) {
        group.push(arr[j]);
      }
    }
    groups.push(group);
  }
  ctx.beginPath();
  ctx.moveTo(0, 300);
  ctx.lineTo(1000, 300);
  var maxValue = Math.max(...arr);
  for (let k = 0; k < groups.length; k++) {
    let arrays = groups[k];
    for (let j = 0; j < arrays.length; j++) {
      let point = arrays[j] / maxValue;
      let pointX = Math.floor(point * 900);
     
      
      ctx.fillStyle = colors[k];
     
      ctx.fillRect(pointX, 296, 8, 8);
      ctx.fillText(arrays[j], pointX, 290);
    }
  }
    ctx.clearRect(0,310,1000, 350);
  for(let j = 0; j < group; j++){
      ctx.fillStyle = colors[j];
    let centeiod = Math.floor(  (center[j] /maxValue)* 900);
     ctx.fillRect(centeiod,310, 8, 8);
  }
   
  ctx.stroke();
}
intervalFuzzy = setInterval(function() {
  fuzzy(createPoint);
 }, 2000);
 
