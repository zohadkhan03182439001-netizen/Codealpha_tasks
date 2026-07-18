const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');

let currentInput = '';
let previousInput = '';
let operation = undefined;

function clear() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') currentInput = '';
    currentInput = currentInput.toString() + number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '−': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': 
            computation = current === 0 ? "Error" : prev / current; 
            break;
        default: return;
    }
    currentInput = computation;
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.innerText = currentInput || '0';
    if (operation != null) {
        previousDisplay.innerText = `${previousInput} ${operation}`;
    } else {
        previousDisplay.innerText = '';
    }
}

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerText));
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => chooseOperation(button.innerText));
});

equalsButton.addEventListener('click', compute);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);

// Bonus: Keyboard Support
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+') chooseOperation('+');
    if (e.key === '-') chooseOperation('−');
    if (e.key === '*') chooseOperation('×');
    if (e.key === '/') chooseOperation('÷');
});