/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import App from '../app.vue'

const linearAlgebra = require('linear-algebra')(),     // initialise it
Vector = linearAlgebra.Vector,
Matrix = linearAlgebra.Matrix;

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})

var m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);

// default
var m2 = m.mulEach(5);   // multiply every element by 5
m2 === m;  // false

// in-place
var m2 = m.mulEach_(5); // notice the _ suffix
m2 === m;  // true

var m, m2, m3;  // variables we'll use below

/* Construction */

m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
console.log( m.rows );     // 2
console.log( m.cols );     // 3
console.log( m.data );     // [ [1, 2, 3], [4, 5, 6] ]

// identity matrix
m = Matrix.identity(3);
console.log( m.data );     // [ [1,0,0], [0,1,0], [0,0,1] ]

// scalar (diagonal) matrix
m = Matrix.scalar(3, 9);
console.log( m.data );     // [ [9,0,0], [0,9,0], [0,0,9] ]

// zeros
m = Matrix.zero(3, 2);
console.log( m.data );     // [ [0, 0], [0, 0], [0, 0] ]

// reshape from array
m = Matrix.reshapeFrom([1, 2, 3, 4, 5, 6], 2, 3);
console.log( m.data );     // [ [1, 2, 3,], [4, 5, 6] ]

// vector (a 1-row matrix)
m = Vector.zero(5);
console.log( m.data );     // [ [0, 0, 0, 0, 0] ]


/* Algebra */

// transpose
m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
m2 = m.trans();
console.log(m2.data);    // [ [1, 4], [2, 5], [3, 6] ]

// dot-product
m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.dot(m2);
console.log(m3.data);    // [ [22, 28], [49, 64] ]

// multiply corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.mul(m2);
console.log(m3.data);    // [ [10, 40], [90, 160], [250, 360] ]

// divide corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.div(m2);
console.log(m3.data);    // [ [10, 10], [10, 10], [10, 10] ]

// add corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.plus(m2);
console.log(m3.data);    // [ [11, 22], [33, 44], [55, 66] ]

// subtract corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.minus(m2);
console.log(m3.data);    // [ [9, 18], [27, 36], [45, 54] ]


/* Math functions */

// natural log (Math.log)
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.log();
console.log(m2.data);    // [ [0.0000, 0.69315], [1.09861, 1.38629], [1.60944   1.79176] ]

// sigmoid
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.sigmoid();
console.log(m2.data);    // [ [0.73106, 0.88080], [0.95257, 0.98201], [0.99331, 0.99753] ]

// add value to each element
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.plusEach(5);
console.log(m2.data);    // [ [6, 7], [8, 9], [10, 11] ]

// multiply each element by value
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.mulEach(5);
console.log(m2.data);    // [ [5, 10], [15, 20], [25, 30] ]

// any function
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.map(function(v) {
    return v - 1;
});
console.log(m2.data);    // [ [0, 1], [2, 3], [4, 5] ]

// any function with row and column passed-in
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.eleMap(function(v, row, col) {
    return (0 === row && 1 === col ? v : v * 2 + 1);
});
console.log(m2.data);    // [ [1, 1], [7, 9], [11, 13] ]


/* Calculations */

// sum all elements
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
console.log(m.getSum());    // 21


/* Other methods */

// cloning
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.clone();
console.log( m2.data ); // [ [1, 2], [3, 4], [5, 6] ]

// to plain array
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.toArray();
console.log( m2 ); // [ [1, 2], [3, 4], [5, 6] ]

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
