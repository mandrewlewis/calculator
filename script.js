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
                if(char === '-' && displayArray.length === 0) { 
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
            if (result.toString().includes('.')) { result = result.toFixed(1); }
            displayArray = result.toString().split('');
            leftOp = [];
            decimalFlag = false;
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
    if (char === '+' || char === '-' || char === '×' || char === '÷' || char === '=') {
        if (displayArray != ['-'] && displayArray.length > 0) {
            display.textContent = leftOp;
            display.textContent = displayArray.join('');
        }
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