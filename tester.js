class Number
{
    constructor(x) 
    {
        this.x = x;    
    }
};
class Data
{
    constructor(number) 
    {
        this.number = number;    
    }
};

const num = new Number(50);
const data = new Data(num);

console.log("hello");
console.log(num.x);
console.log(data.number)
num.x = 100;
console.log(data.number.x)
