// Import EventEmitter class and create an instance
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Handle and trigger 'greet' event
emitter.on("greet", () => console.log("hello Anurag Kumar"));
emitter.emit("greet");

// Handle and trigger 'multiply' event
emitter.on("multiply", (a, b) => console.log(a * b));
emitter.emit("multiply", 2, 7);

let result;

// Handle and trigger 'add' event
emitter.on("add", (a, b) => result = a + b);
emitter.emit("add", 2, 7);
console.log(result);

// Handle and trigger 'percentage' event
emitter.on("percentage", (marks) => {
  let sum = Object.values(marks).reduce((acc, curr) => acc + curr, 0);
  let percentage = (sum / (Object.values(marks).length * 100)) * 100;
  console.log(`Percentage: ${percentage.toFixed(2)}%`);
});
emitter.emit("percentage", {
  sci: 89,
  math: 95,
  hindi: 91,
  sst: 78,
  english: 75,
});
