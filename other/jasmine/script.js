const pow = (a, n) => {
    if(a == null || n == null) {
        return null;
    }
    let result = 1;
    for(let i = 0; i < n; i++){
        result *= a;
    }
    return result;
}

const sum = (a, b) => {
    if(a == null || b == null ||typeof a == "undefined"||typeof b == "undefined") {
        return 'нет значений';
    }

    if(isNaN(a)||isNaN(b)){
        return 'Один из аргументов не число!';
    }
    
    return a + b;
}

const sub = (a, b) => {
    if(a == null || b == null ||typeof a == "undefined"||typeof b == "undefined") {
        return 'нет значений';
    }
    if(isNaN(a)||isNaN(b)){
        return 'Один из аргументов не число!';
    }
    return a - b;
}

const mult = (a, b) => {
    if(a == null || b == null ||typeof a == "undefined"||typeof b == "undefined") {
        return 'нет значений';
    }
    if(!!!a||!!!b){
        return NaN;
    }
    if(isNaN(a)||isNaN(b)){
        return 'Один из аргументов не число!';
    }
    
    return a * b;
}

const div = (a, b) => {
    if(a == null || b == null ||typeof a == "undefined"||typeof b == "undefined") {
        return 'нет значений';
    }
    if(isNaN(a)||isNaN(b)){
        return 'Один из аргументов не число!';
    }
    if(b == 0){
        return 'на ноль делить нельзя!';
    }
    
    return a / b;
}

module.exports = {
    pow: pow,
    sum: sum,
    sub: sub,
    mult: mult,
    div: div
}