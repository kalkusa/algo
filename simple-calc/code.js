// Your goal is to implement simple calculator.
// Input is math expression in form of string.
// The expression can contain basic operators: +, -, *, /
// For the sake of simplicity ignore operator priority and calculate one by one
//
// So 8+2*10 would be 100

const operators = ["+", "-", "*", "/"];

function calculate(expression) {
  const result = evaluateComplexExpression(expression);
  console.log("result: ", result);
}

function containsOperator(str) {
  return operators.some((operator) => str.includes(operator));
}

function evaluateComplexExpression(expression) {
  if (containsOperator(expression)) {
    let firstOperatorIndex = 0;
    let firstOperatorFound = false;
    let secondOperatorIndex = 0;
    let secondOperatorFound = false;

    for (let index = 0; index < expression.length; index++) {
      const currentCharacter = expression[index];

      if (operators.includes(currentCharacter) && !firstOperatorFound) {
        firstOperatorIndex = index;
        firstOperatorFound = true;
      }

      if (
        operators.includes(currentCharacter) &&
        firstOperatorFound &&
        !secondOperatorFound &&
        index > firstOperatorIndex
      ) {
        secondOperatorIndex = index;
        secondOperatorFound = true;
      }
    }

    const firstOperator = expression[firstOperatorIndex];

    if (secondOperatorFound) {
      const subExpression = expression.substring(0, secondOperatorIndex);
      const arguments = subExpression.split(firstOperator);
      const evaluatedSubExpression = evaluateSimpleExpression(
        Number(arguments[0]),
        Number(arguments[1]),
        firstOperator
      );

      const newExpression =
        evaluatedSubExpression +
        expression.substring(secondOperatorIndex, expression.length);
      return evaluateComplexExpression(newExpression);
    } else {
      const arguments = expression.split(firstOperator);
      return evaluateSimpleExpression(
        Number(arguments[0]),
        Number(arguments[1]),
        firstOperator
      );
    }
  }

  return expression;
}

function evaluateSimpleExpression(firstArgument, secondArgument, operator) {
  if (operator === "+") {
    return firstArgument + secondArgument;
  }

  if (operator === "-") {
    return firstArgument - secondArgument;
  }

  if (operator === "*") {
    return firstArgument * secondArgument;
  }

  if (operator === "/") {
    return firstArgument / secondArgument;
  }
}

calculate("8+2*10"); //should be 100
calculate("10*2+5/3"); //should be 8.(3)
calculate("5-2-1+10*100/5"); //should be 240
