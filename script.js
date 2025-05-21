function calculate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
        return 'Invalid input. Please enter numbers.';
    }

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Cannot divide by zero.';
            }
            return num1 / num2;
        default:
            return 'Invalid operator.';
    }
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = '';
let previousInput = '';
let calculated = false; 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (button.classList.contains('number') || buttonText === '.') {
            if (calculated) { 
                currentInput = buttonText;
                calculated = false;
            } else {
                currentInput += buttonText;
            }
            display.value = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput === '' && previousInput === '') {
                
                return;
            }
            if (currentInput !== '' && previousInput !== '') {
               
                const result = calculate(previousInput, operator, currentInput);
                display.value = result;
                previousInput = result;
                currentInput = '';
            } else if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = buttonText;
            calculated = false;
        } else if (buttonText === '=') {
            if (currentInput !== '' && previousInput !== '' && operator !== '') {
                const result = calculate(previousInput, operator, currentInput);
                display.value = result;
                currentInput = result; 
                previousInput = '';
                operator = '';
                calculated = true;
            }
        } else if (buttonText === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
            calculated = false;
        }
    });
});