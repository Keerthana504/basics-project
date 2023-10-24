//example for this scope
var length = 10;
function fn() {
  console.log(this.length);
  // 10 (printed from the global scope as this points to global)
  // 2 (prints the length of the arguments as this points to arguments)
}
var obj = {
  length: 5,
  method: function (fn) {
    fn();
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

const city = function (state, city) {
  console.log(`My name is ${this.firstName} ${this.lastname}`);
  console.log(`I live in ${state} ${city}`); //using Template Literals from the new ES6 features
};

city.call(name, "Telangana", "Hyderabad");
city.call(name2, "Telangana", "Shadnagar");

city.apply(name, ["Telangana", "Hyderabad"]);
city.apply(name2, ["Telangana", "Shadnagar"]);

const name3 = city.bind(name, "Canada", "Windsor");
name3();
//example for apply

//example for bind

//example for this
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
// 20 as this here is pointing to its current scope in a regular function
console.log(shape.perimeter());
// NaN as this here is pointing to global scope in an arrow funtion

// class methods
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
// object creation, constructor is called first and has access to all the methods inside the class
console.log(freddie.colorChange("orange"));
// orange - only if there is return statement in the method , else undefined.

// function prototyping
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());

//quotes API

fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//debounce
const input = document.querySelector("input");
const debounce = (func, timer) => {
  let timeId = null;
  return () => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func();
    }, timer);
  };
};

input.addEventListener(
  "keyup",
  debounce((e) => {
    console.log(input.value);
  }, 2000)
);

const getData = function (){
  console.log("fetch data");
}

const debouncee = function (getData,time) {
  let timer;
  return function() {
      let context = this;
      args = arguments;
     clearTimeout(timer);
     timer = setTimeout(()=>{
      getData.apply(context, arguments);
    }, time);
  }
}

const betterFunction = debouncee(getData , 300);
<input type="text" onkeyup=betterFunction()>

//array flattening
const arr = [
  [1, 2],
  [3, 4],
  [5, 6, [7, 8], 9],
  [0, 1],
];
function flatten(arr, depth) {
  let result = [];
  arr.forEach((ar) => {
    if (Array.isArray(ar) && depth > 0) {
      result.push(...flatten(ar, depth - 1));
    } else result.push(ar);
  });
  return result;
}
console.log(flatten(arr, 2));

//polyfill for bind
let name = {
  firstname: "Keerthana",
  lastname: "Ayelligadala",
};
//console.log(name);

const printName = function (town, country) {
  console.log(this.firstname + ", " + town + ", " + country);
};

//printName();

const printName1 = printName.bind(name, "Hyderabad");
printName1("India");

Function.prototype.myBind = function (...args) {
  const params = args[1];
  //console.log(params);
  let obj = this;
  return function (...args2) {
    //console.log(...args2);
    obj.apply(args[0], [params, args2]);
  };
};

const myPrintName = printName.myBind(name, "Hyderabad");
myPrintName("India");

//this keuword usage
this.name = "abc"; //updated the browser this --> Global this
function updateName() {
  // function has access to this keyword of the window obj if no object is called it , or the object that it is called with
  //this has a function scope inside of it
  this.name = "123";
  const changeName = () => {
    //arrow functions takes the scope of the enclosed function
    this.name = "!@#$";
  };
  changeName();
  console.log(this.name);
}
updateName();
console.log(this.name);

//Given two arrays of integers, compute the pair of values
// with the smallest difference and return it
function smallestDifferece(array1, array2) {
  let result1 = [];
  let result;
  array1.forEach((item) => {
    result = array2.map((item1) => {
      if (item > item1) {
        return item - item1;
      } else {
        return item1 - item;
      }
    });
    result1 = [...result1, ...result];
  });
  smallest = result1.sort();
  // console.log(smallest[0] , result1.sort());
  return smallest[0];
}

const second = [40, 60, 80];
const result = smallestDifferece(first, second);
console.log(`The smallest difference is: ${result}`);

// reverse a number

let num = 123456;
let result1 = 0;

console.log("Answer");
while (num > 0) {
  rightMost = num % 10; // modulus gives the reminder i,e last number
  result1 = result1 * 10 + rightMost;
  num = Math.floor(num / 10); //
  console.log(result);
};


// closure example
function outerFunc() { 
  let a = 10; // lexical scope (reference to it) of a will be available for innerFunc;
  return (innerFunc = function () {
    console.log(a++); //only initial value of a is available at first execution,
    //later it gets incremented
  });
}
var closureCall = outerFunc();
closureCall(); //10
closureCall(); //11
closureCall(); //12
closureCall(); //13

//HigherOrderFunctions Example before
//calculating the circle parameters with regular functions

const radius = [3, 1, 2, 5];
const calculateArea = function (radius){
  return radius.map((r)=>Math.PI*r*r)
}
console.log(calculateArea(radius));
const calculateCircumference = function (radius){
  return radius.map((r)=>Math.PI*r*2)
}
console.log(calculateCircumference(radius));
const calculateDiameter = function (radius){
  return radius.map((r)=>2*r)
}
console.log(calculateDiameter(radius));

// calculating the circle parameters with HigherOrderFunctions
// Map,forEach and loop iterations are expensive and can be reduced in this matter by using HOF and callbacks

const radius1 = [3, 1, 2, 5];

const calculateArea1 = function (r){
  return Math.PI*r*r
}
const calculateCircumference1 = function (r){
  return Math.PI*r*2
}
const calculateDiameter1 = function (r){
  return 2*r
}
const calculate = function (rad,logic){
    const output =[];
    for (i=0;i<rad.length;i++){
      output.push(logic(rad[i]))
    }
    return output;
  //return rad.map((r)=>logic(r));
}
console.log(calculate(radius,calculateArea1))
console.log(calculate(radius,calculateCircumference1))
console.log(calculate(radius,calculateDiameter1))

console.log(radius.map(calculateArea1)); //similar to the calculate function call with raduis and calculateArea1 

//polyfill for map function written with Array.prototype as prefix, will have access to every other function
//for writing any polyfills use for loops
//Map works in the same mechanism, takes a callback as a param, creates an empty array 
//loops through the array to process and and return the array
Array.prototype.calculate = function (logic){
  const output =[];
  console.log(this);//this in polyfil points to the object with which the function is being called
  for (i=0;i<this.length;i++){
    output.push(logic(this[i]))
  }
  return output;
  //rad.map((r)=>logic(r));
}
//these two lines are the same, 1. is a polyfill for map 
console.log(radius.calculate(calculateArea))
console.log(radius.map(calculateArea));

//map/filter/reduce can be written in these ways

let arr1 = [9, 5, 6, 2, 7, 1];

let double = (x)=>{
  return x+x
};
const outputDouble = arr1.map(double);
console.log(outputDouble);

const outputTriple = arr1.map(function(x){
  return x+x+x
});
console.log(outputTriple);

const outputBinary = arr1.map((x)=>{
  return x.toString(2);
});
console.log(outputBinary);

//filter --> filtering elements based on boolean criteria, return only values where condition is true
let arr2 = [9, 5, 6, 2, 7, 1];

let getOdd= (x)=>{
  return x%2;
}
const outputOdd = arr2.filter(getOdd);
console.log(outputOdd);

let geteven= (x)=>{
  return x%2 ===0;
}
const outputEven = arr2.filter(geteven);
console.log(outputEven);

const getSmallest = arr2.filter(x=>x<5);
console.log(getSmallest);

const getLargest = arr2.filter(x=>x>2)
console.log(getLargest);

//reduce

let arr3 = [9, 5, 6, 2, 7, 1];

{/* const findSum = function(){
  let total = 0;
  for(i=0;i<arr3.length;i++){
    total +=arr3[i]; 
  }
  return total;
}
console.log(findSum()); */}

const sum2 =arr3.reduce((acc,curr)=>{
  acc += curr;
  return acc;
},0);
console.log(sum2);

const max = arr3.reduce((acc,curr)=>{
  if(acc<curr){
    acc = curr;
  }
  return acc;
},0);
console.log(max);

//reduce map and filter on objects
const actors = [
  {fName:"Mahesh",lName:"G",age:"48"},
  {fName:"Nani",lName:"nani",age:"40"},
  {fName:"Deepika",lName:"Padukone",age:"40"},
  {fName:"Kajal",lName:"Agarwal",age:"37"},
  {fName:"Keerthi",lName:"Suresh",age:"30"},
]

const fullNames = actors.map(x=>x.fName+" "+x.lName);
console.log(fullNames);

//using reduce to count the no of times a value is present 
const ageCount = actors.reduce((acc,curr)=>{
  if(acc[curr.age]){  
    acc[curr.age] = ++acc[curr.age];
  }else{
    acc[curr.age] = 1;
  }
  return acc;
},{});
console.log(ageCount);

//getting the names of actors with age < 40 using filter and map
const youngActors = actors.filter(x=>x.age<40).map((x)=>x.fName);
console.log(youngActors);

const youngActor = actors.reduce((acc, curr)=>{
    if(curr.age<40){
      acc.push(curr.fName);
    }
  return acc;
},[]);
console.log(youngActor);

//thinking recursively -- calling the same function within itself

const user = {
  name:"Keerthana",
  role:"Developer",
  address:{
    home:{
      city:"Hyderabad",
      country:"India",
    },
    office:{
      city:"Toronto",
      country:"Canada",
      area:{
        landmark:"North America"
      }
    }
  }

const finalObj = {};
const magic = (obj, parent)=>{
  for(let key in obj){
      if(typeof obj[key] === "object"){
        magic(obj[key] , parent+"-"+key);
       // console.log(1, obj[key])
      }else{
        finalObj[parent+"-"+key]=obj[key];
        //console.log(finalObj)
      }
   }
  
}
magic(user , "user");
console.log(finalObj)

//function currying and recursion 
const sum = (a)=>{
  console.log("a "+ a);
  return (b)=>{
    console.log("b "+ b);
    if(b){
      return sum(a+b);
    }else{
      return a
    }
  }
}
console.log(sum(22)(33)(35)(40)());

//reverse a string two ways
const reverseString = (str)=>{
  console.log(str.split('').reverse().join(""));// 1 way
  let len= str.length;
  let reverseStr ='';
  for(i=len-1;i>=0;i--){
    console.log(str[i] , reverseStr);
    reverseStr += str[i];
  }
  console.log(reverseStr);
}

let name = "keerthana";
reverseString(name);

