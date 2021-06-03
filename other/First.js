var testString = "testing typescript";
var sayHello = function (name) {
    return "Hello " + name;
};
console.log(sayHello("User"));
var num = 15;
num = "15";
console.log(typeof (num));
var objTest = {
    name: "Veljko",
    email: "veljko@gmail.com"
};
objTest = "objekat";
console.log(objTest);
var funk = function (num, str) {
    return num.toString() + " " + str;
};
console.log(funk(3, "musketara"));
