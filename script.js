const display = document.querySelector('.display');
let displayArray = [];
let leftOp = [];
let rightOp = [];
let operator = '';
let result = 0;
let decimalFlag = false;

// Operative functions
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function operate(operator, x, y) {
    switch(operator) {
        case '+':
            return add(x,y);
            break;
        case '-':
            return subtract(x,y);
            break;
        case '×':
            return multiply(x,y);
            break;
        case '÷':
            if (y === 0) {
                alert('Are you TRYING to break my calculator?\nYou must be so proud of yourself.');
                return 'ERROR';
            }
            return divide(x,y);
            break;
        default:
            return alert('Critical error!');
    }
}


// Display function
function displayOnCalc(char) {
    displayArray.push(char);

    switch (char) {
        case '+':
        case '-':
        case '×':
        case '÷':
            displayArray.pop();
            if (displayArray.length === 0){
                //Creates negative number if '-' is pressed before any numbers
                if(char === '-') { 
                    displayArray.push('-');
                    break;
                }
                break;
            }
            else if (leftOp.length === 0) {
                leftOp = +displayArray.join('');
                displayArray = [];
                decimalFlag = false;
                operator = char;
            } 
            else {
                //another + or - should be treated as = with result stored in leftOp
                leftOp = operate(operator,leftOp,+displayArray.join(''));
                displayArray = [];
                decimalFlag = false;
                operator = char;
            }
            break;
        case '=':
            displayArray.pop();
            if (leftOp.length === 0) break;
            if (displayArray.length === 0) break;

            result = operate(operator,leftOp,+displayArray.join(''));
            if (result.toString().includes('.')) { 
                result = result.toFixed(1);
                decimalFlag = true;
            } else { decimalFlag = false; }
            displayArray = result.toString().split('');
            leftOp = result;
            break;
        case 'CL':
            displayArray = [];
            leftOp = [];
            decimalFlag = false;
            break;
        case 'BACKSPACE':
            displayArray.pop();
            displayArray.pop();
            break;
        case '.':
            if (decimalFlag) displayArray.pop();
            decimalFlag = true;
            break;
        default:
    }
    

    //Throw error if overflow
    if (displayArray.length > 12 || displayArray.includes('E')) {
        displayArray = 'ERROR'.split('');
    }
    //Display array as string in DOM or display '0' if string is empty or last num entered if operator
    let opList = '+-×÷=';
    if (opList.includes(char)) {
        if (displayArray !== ['-'] && leftOp.toString().length > 0 ) {
            display.textContent = leftOp.toString();
        }
        else { display.textContent = '0'; }
    }
    else if (displayArray.length === 0) {
        display.textContent = '0';
    }
    else { display.textContent = displayArray.join(''); }
}


// Add Event Listners to buttons
const calcButtons = document.querySelectorAll('button');
calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        displayOnCalc(btn.textContent);
    });
});

// Add keyboard handler
document.addEventListener('keyup', e => {
    let acceptedKeys = '1234567890.=+-*/cEnterBackspace';
    let name = e.key;
    let code = e.code;
    console.log({name});
    console.log({code});
    if (acceptedKeys.includes(name)) {
        if (name === '*') name = '×';
        if (name === '/') name = '÷';
        if (name === 'Enter') name = '=';
        if (name === 'Backspace') name = 'BACKSPACE';
        if (name === 'c') name = 'CL';
        displayOnCalc(name);
    }
})