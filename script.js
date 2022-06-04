const display = document.querySelector('.display');
let displayArray = [];
let leftOp = [];
let rightOp = [];
let operator = '';
let result = 0;
let decimalFlag = false;
let equalFlag = false;

// Operative functions
function add(x, y) {
    return +x + +y;
}
function subtract(x, y) {
    return +x - +y;
}
function multiply(x, y) {
    return +x * +y;
}
function divide(x, y) {
    return +x / +y;
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
            // Catch divide by zero
            if (y === 0) {
                alert('Are you TRYING to break my calculator?\nYou must be so proud of yourself.');
                return 'ERROR';
            }
            return divide(x,y);
            break;
        default:
            // This should never get returned
            return alert('Critical error!');
    }
}


// Display function
// Calls operation functions to make the calculation
// Then displays result in DOM
function displayOnCalc(char) {
    displayArray.push(char);

    switch (char) {
        case '+':
        case '-':
        case '×':
        case '÷':
            displayArray.pop(); // Pop operator symbol from display

            // Creates negative number if '-' is pressed before any numbers
            if (displayArray.length === 0){
                if(char === '-') { 
                    displayArray.push('-');
                    break;
                }
                break;
            }
            // When '+-*/' is pressed, store what is currently displayed in leftOp
            else if (leftOp.length === 0) {
                leftOp = +displayArray.join('');
                displayArray = [];
                decimalFlag = false;
                operator = char;
            } 
            // This handles chaining operations e.g., '2 * 5 + 6 / 2 = 8'
            else {
                // Catches error if user presses '+-*/' immediately after '='
                if (equalFlag) {
                    displayArray = [];
                    equalFlag = false;
                }
                // Makes calculation and stores result in leftOp
                else {
                leftOp = operate(operator,leftOp,+displayArray.join(''));
                }
                displayArray = [];
                decimalFlag = false;
                operator = char;
            }
            break;
        case '=':
            // This is the main case for making calculations
            
            displayArray.pop(); // Pop operator symbol from display
            if (leftOp.length === 0) break; //catches '=' with no operator provided
            if (displayArray.length === 0) break; //catches '=' with nothing to operate
            if (equalFlag) break; //catches multiple '='

            // Calculate and store result
            result = operate(operator,leftOp,+displayArray.join(''));
            // Handles decimal rounding and limits to one decimal in str
            if (result.toString().includes('.')) { 
                result = result.toFixed(2);
                decimalFlag = true;
            } else { decimalFlag = false; }
            // Add result to display arr
            displayArray = result.toString().split('');
            leftOp = result;
            equalFlag = true;
            break;
        case 'CL':
            // Reset all vars and flags
            displayArray = [];
            leftOp = [];
            decimalFlag = false;
            equalFlag = false;
            break;
        case 'BACKSPACE':
            displayArray.pop(); // Pop operator symbol from display
            if (equalFlag) break;
            displayArray.pop(); // Pop last char from display
            break;
        case '.':
            if (equalFlag) break;
            // Adds decimal, limit to 1 in arr
            if (decimalFlag) displayArray.pop();
            decimalFlag = true;
            break;
        default:
            if (equalFlag) displayArray.pop();
    }
    

    //Throw error if overflow
    if (displayArray.length > 12 || displayArray.includes('E')) {
        displayArray = 'ERROR'.split('');
    }
    // If chaining or equating, keep displayArray emppty but still display calculated result
    let opList = '+-×÷=';
    if (opList.includes(char)) {
        // Another overflow error catch
        if (leftOp.toString().length > 12) {
            displayArray = 'ERROR'.split('');
            display.textContent = displayArray.join('');
        }
        else if (displayArray !== ['-'] && leftOp.toString().length > 0 ) {
            display.textContent = leftOp.toString();
        }
    }
    //Display '0' if displayArray empty
    else if (displayArray.length === 0) {
        display.textContent = '0';
    }
    //Display arr in DOM
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