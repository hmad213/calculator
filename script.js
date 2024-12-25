function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, operator, b){
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function changeOperator(target){
    if(operatorElement !== undefined){
        operatorElement.style.backgroundColor = "whitesmoke";
    }
    if(target !== undefined){
        operatorElement = target;
        operatorString = target.textContent;
        operatorElement.style.backgroundColor = "lightgrey";
    }
}

function pressDigit(text){
    if(!equals){
        repeatOperators = false;
        curnumber = curnumber === "0" ? `${text}` : `${curnumber}${text}`;
        curnumber = curnumber.toString();
        display.innerHTML = curnumber;
        textInput = true;
    }
}

function pressOperator(target){
    if(curnumber === "0" && operatorString === "/"){
        alert("Hey! you can't divide by zero");
    }
    else if(!repeatOperators){
        if(equals){
            equals = false
        }
        if(firstNum && !equals){
            firstNum = false;
        }
        else if(!firstNum){
            if(textInput){
                curnumber = operate(parseFloat(prevnumber), operatorString, parseFloat(curnumber));
            }
            textInput = false;
        }
        changeOperator(target);
        display.innerHTML = curnumber;
        prevnumber = curnumber;
        curnumber = "0";
        repeatOperators = true;
        point = false;
    }
    else if(operatorString !== item.target.textContent){
        changeOperator(target);
    }
}

function pressBack(){
    if(textInput && !equals && !repeatOperators){
        console.log(curnumber.slice(curnumber.length-1, curnumber.length))
        if(curnumber.slice(curnumber.length-1, curnumber.length) === "."){
            point = false;
        }
        if(curnumber.length > 1){
            curnumber = curnumber.slice(0, curnumber.length-1)
        }
        else{
            curnumber = "0";
        }
        display.textContent = curnumber;
    }
}

function pressClear(){
    curnumber = "0";
    prevnumber = "0";
    firstNum = true;
    operatorString = "";
    textInput = true;
    display.innerHTML = "0";
    equals = false;
    repeatOperators = false;
    point = false;
    changeOperator();
}

function pressEquals(){
    if(curnumber === "0" && operatorString === "/"){
        alert("Hey! you can't divide by zero");
    }
    else if(operatorString !== "=" && !firstNum && !repeatOperators){
        curnumber = operate(parseFloat(prevnumber), operatorString, parseFloat(curnumber));
        operatorString = "=";
        display.innerHTML = curnumber;
        prevnumber = curnumber;
        firstNum = true;
        equals = true;
        point = false
        changeOperator();
    }
}

function pressPoint(text){
    if(!equals && !point){
        curnumber = `${curnumber}${text}`;
        display.innerHTML = curnumber;
        repeatOperators = false;
        point = true;
    }
}

let display = document.querySelector(".display");
let curnumber = "0";
let prevnumber = "0";
let firstNum = true;
let operatorString = "";
let operatorElement;
let textInput = true;
let equals = false;
let repeatOperators = false;
let point = false;

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("mousedown", (item) => item.target.style.backgroundColor = "lightgrey");
    button.addEventListener("mouseup", (item) => {
        if(item.target !== operatorElement) item.target.style.backgroundColor = "whitesmoke";
    });
});

let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => button.addEventListener("click", item => pressDigit(item.target.textContent)))

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => button.addEventListener("click", item => pressOperator(item.target)))

let back = document.querySelector(".back");
back.addEventListener("click", pressBack);

let clear = document.querySelector(".clear");
clear.addEventListener("click", pressClear)

let equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", pressEquals)

let pointButton = document.querySelector(".point");
pointButton.addEventListener("click", item => pressPoint(item.target.textContent))

window.addEventListener("keydown",(event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
      
    if(event.key >= "0" && event.key <= "9"){
        pressDigit(event.key);
    }

    switch(event.key){
        case "+":
            pressOperator(operatorButtons[1]);
            break;
        case "-":
            pressOperator(operatorButtons[2]);
            break;
        case "*":
            pressOperator(operatorButtons[3]);
            break;
        case "/":
            pressOperator(operatorButtons[0]);
            break;
        case ".":
            pressPoint(".");
            break;
        case "Enter":
            pressEquals();
            break;
        case "Escape":
            pressClear();
            break;
        case "Backspace":
            pressBack();
    }
    console.log(event.key);
    
  
      // Cancel the default action to avoid it being handled twice
    event.preventDefault();
    }, true,);