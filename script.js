'use strict';

const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.cal-keys');
const display = document.querySelector('.cal-display');

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      console.log('number key');
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operator key');
    }

    // listening to other keys singularly
    if (action === 'decimal') {
      console.log('decimal key');
    }

    if (action === 'clear') {
      console.log('clear key');
    }

    if (action === 'calculate') {
      console.log('equaly key');
    }

    if (action === 'delete') {
      console.log('delete key');
    }

    if (action === 'percentage') {
      console.log('percentage key');
    }
  }
});

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (!action) {
      if (displayedNum === '0') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === 'decimal') {
      if (actionAfterOperator()) {
        display.textContent = '0.';
      } else if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      }
    }

    function actionAfterOperator() {
      const operatorKeys = document.querySelectorAll(
        '[data-action="divide"], [data-action="multiply"], [data-action="subtract"], [data-action="add"] '
      );

      return (
        Array.from(operatorKeys).some(key =>
          key.classList.contains('is-pressed')
        ) && calculator.dataset.operator
      );
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-pressed');
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === 'clear') {
      display.textContent = 0;
    }

    const operatorKeys = document.querySelectorAll(
      '[data-action="divide"], [data-action="multiply"], [data-action="subtract"], [data-action="add"] '
    );
    const operatorPressed = Array.from(operatorKeys).some(key =>
      key.classList.contains('is-pressed')
    );
    if (operatorPressed && !action) {
      display.textContent = keyContent;
      operatorKeys.forEach(key => key.classList.remove('is-pressed'));
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      const calculate = function (n1, operator, n2) {
        let result = '';
        if (operator === 'add') {
          result = parseFloat(n1) + parseFloat(n2);
        } else if (operator === 'subtract') {
          result = parseFloat(n1) - parseFloat(n2);
        } else if (operator === 'multiply') {
          result = parseFloat(n1) * parseFloat(n2);
        } else if (operator === 'divide') {
          result = parseFloat(n1) / parseFloat(n2);
        }
        return result;
      };

      display.textContent = calculate(firstValue, operator, secondValue);
    }

    if (action === 'delete') {
      const displayedNumArray = Array.from(displayedNum);
      displayedNumArray.pop();
      display.textContent = displayedNumArray.join('');
      console.log(displayedNumArray);
    }
  }
});
