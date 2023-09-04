function operate(a, operator, b){
    switch(operator){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    }
}
const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const resetButton = document.querySelector(".reset");
const deleteButton = document.querySelector(".delete");
const dotButton = document.querySelector(".dot");

const topDisplay = document.querySelector(".top.display");
const bottomDisplay = document.querySelector(".bottom.display");

numberButtons.forEach(num => num.addEventListener("click", () => appendNumber(num.textContent)));
operationButtons.forEach(operation => operation.addEventListener("click", () => setOperation(operation.textContent)));
resetButton.addEventListener("click", () => resetAll());
deleteButton.addEventListener("click", () => deleteLastEntry());
dotButton.addEventListener("click", () => addDot());

allButtons.forEach(button => button.addEventListener("mouseover", (e) => hoverAction(e)));
allButtons.forEach(button => button.addEventListener("mouseleave", (e) => hoverAction(e)));
window.addEventListener("keydown", (e) => handleKeyboardInput(e));

let firstNum;
let secondNum;
let operator;


function add(a,b){
    return roundNumber(a)+roundNumber(b);
}

function subtract(a,b){
    return roundNumber(a)-roundNumber(b);
}

function multiply(a,b){
    return roundNumber(a)*roundNumber(b);
}

function divide(a,b){
    return roundNumber(a)/roundNumber(b);
}

function operate(a,operator,b){
    switch(operator){
        case("+"): return add(a,b);
        case("-"): return subtract(a,b);
        case("*"): return multiply(a,b);
        case("/"): return divide(a,b);
        case("="): return a;
    }
}

function appendNumber(num){
    if(bottomDisplay.textContent === "0") resetBottom();
    bottomDisplay.textContent += num;
}


function setOperation(operation){
    if(operator === undefined){ // If operator is not set, get first number from panel and set operator.
        if(operation !== "="){
            operator = operation;
            firstNum = bottomDisplay.textContent;
            
            bottomDisplay.textContent += operator;
            switchDisplayToTop();
        }
    }

    else if(operator && bottomDisplay.textContent === ""){ // If operator is already set and second number is not entered, change the operator
        resetTop();
        operator = operation;
        bottomDisplay.textContent = firstNum;

        if(operator !== "="){
            bottomDisplay.textContent += operator;
            switchDisplayToTop();
        }

    }

    else{  // If operator is set and bottom display is not empty, calculate
        secondNum = bottomDisplay.textContent;
        firstNum = operate(firstNum,operator,secondNum);
        bottomDisplay.textContent = firstNum;

        if(operation !== "="){
            bottomDisplay.textContent += operation;
            
            operator = operation;
            secondNum = undefined;
            switchDisplayToTop();
        }
        else{
            resetTop();
            operator = undefined;
            secondNum = undefined;
        }
    }
}

function switchDisplayToTop(){
    topDisplay.textContent = bottomDisplay.textContent;
    resetBottom();
}

function resetBottom(){
    bottomDisplay.textContent = "";
}

function resetTop(){
    topDisplay.textContent = "";
}

function resetAll(){
    resetTop();
    bottomDisplay.textContent = "0";

    firstNum = undefined;
    secondNum = undefined;
    operation = undefined;
}


function deleteLastEntry(){
    if(bottomDisplay.textContent === "" && topDisplay.textContent === "") return;
    else if(bottomDisplay.textContent !== ""){
        bottomDisplay.textContent = bottomDisplay.textContent.slice(0,-1);
    }
}

function addDot(){
    if(!bottomDisplay.textContent.includes(".") && bottomDisplay.textContent !== ""){
        bottomDisplay.textContent += ".";
    }
}

function roundNumber(number){
    return Math.round(number*1000)/1000;
}

function handleKeyboardInput(event){
    const key = document.querySelector(`button[data-key="${event.code}"]`);

    if(key.classList.contains("number")) appendNumber(key.textContent);
    else if(key.classList.contains("operation")) setOperation(key.textContent);
    else if(key.classList.contains("delete")) deleteLastEntry();
    else addDot();
}

function hoverAction(e){
    if(e.type == "mouseover"){
        e.target.classList.add("hover");
    }
    else{
        e.target.classList.remove("hover");
    }
}
