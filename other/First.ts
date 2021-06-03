const testString: string = "testing typescript";


const sayHello = (name: string) => {
    return "Hello " + name;
}

console.log(sayHello("User"));


let num: number | string = 15;
num = "15";

console.log(typeof(num));

let objTest: {name: string, email: string} | string = {
    name: "Veljko",
    email: "veljko@gmail.com"
}

objTest = "objekat";

console.log(objTest);


const funk: (num: number, str: string) => string = (num,str) => {
    return num.toString() + " " + str;
}

console.log(funk(3, "musketara"));