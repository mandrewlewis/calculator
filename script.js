const display = document.querySelector('.display');
let displayArray = [];


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
            add(x,y);
            break;
        case '-':
            subtract(x,y);
            break;
        case '*':
            multiply(x,y);
            break;
        case '/':
            divide(x,y);
            break;
        default:
            alert('Critical error!');
    }
}


// Display function
function displayOnCalc(char) {
    displayArray.push(char);
    if (char === 'CL') displayArray = [];
    if (char === 'BACKSPACE') { displayArray.pop(); displayArray.pop(); }

    //Throw error if overflow
    if (displayArray.length > 12 || displayArray.includes('E')) {
        displayArray = 'ERROR'.split('');
    }
    
    //Display array as string in DOM or display '0' if string is empty
    display.textContent = displayArray.join('');
    if (displayArray.length === 0) display.textContent = '0';
}


// Add Event Listners to buttons
const calcButtons = document.querySelectorAll('button');
console.log(calcButtons);
calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        displayOnCalc(btn.textContent);
    });
});