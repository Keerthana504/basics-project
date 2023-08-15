//example for this scope
var length = 10;
function fn() {
  console.log(this.length); // 10 (printed from the global scope as this points to global)
  // 2 (prints the length of the arguments as this points to arguments)
}
var obj = {
  length: 5,
  method: function (fn) {
    fn();
    //console.log( );
    arguments[0]();
  },
};

obj.method(fn, 1);

//example for call
const name = {
  firstName: "Keerthana",
  lastname: "Ayelligadala",
  method: function () {
    console.log(`My name is ${this.firstName} ${this.lastname}`); //using Template Literals from the new ES6 features
  },
};

name.method();

//function burrowing
const name2 = {
  firstName: "Karthik",
  lastname: "Bandi",
};

name.method.call(name2);
//example for apply

//example for bind

//quotes API

fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
