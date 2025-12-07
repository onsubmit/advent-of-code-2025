import { multiplyArray, sumArray } from '../arrayMethods';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const parsed = new TwoDimensionalArray(
    input,
    (v) => {
      if (!v) {
        return undefined;
      }

      if (v === '+' || v === '*') {
        return v;
      }

      return parseInt(v);
    },
    {
      columnSplitter: /\s+/,
      retainEmptyLines: false,
    }
  );

  const answers: Array<number> = [];
  for (let column = 0; column < parsed.numColumns; column++) {
    const operator = parsed.at(parsed.numRows - 1, column);
    if (operator === '+') {
      let sum = 0;
      for (let r = 0; r < parsed.numRows - 1; r++) {
        sum += parsed.at(r, column) as number;
      }
      answers.push(sum);
    } else {
      let product = 1;
      for (let r = 0; r < parsed.numRows - 1; r++) {
        product *= parsed.at(r, column) as number;
      }
      answers.push(product);
    }
  }

  return sumArray(answers).toString();
};

export const getPartTwoSolution = (input: string): string => {
  const parsed = new TwoDimensionalArray<string>(input, (v) => v, {
    columnSplitter: '',
    retainEmptyLines: false,
  });

  const operators = parsed.rowAt(parsed.numRows - 1)?.filter((v) => v.trim()) ?? [];

  const answers: Array<number> = [];
  let numbers: Array<number> = [];

  let operator = '';
  let column = 0;
  for (let c = 0; c < parsed.numColumns; c++) {
    operator = operators[column];

    let isColumnAllSpaces = true;
    for (let r = 0; r < parsed.numRows; r++) {
      if (parsed.at(r, c) !== ' ') {
        isColumnAllSpaces = false;
        break;
      }
    }

    if (isColumnAllSpaces) {
      column++;
      if (operator === '+') {
        answers.push(sumArray(numbers));
      } else {
        answers.push(multiplyArray(numbers));
      }
      numbers = [];
      continue;
    }

    let number = '';
    for (let r = 0; r < parsed.numRows - 1; r++) {
      const ch = parsed.at(r, c) ?? ' ';
      if (ch !== ' ') {
        number += ch;
      }
    }

    numbers.push(parseInt(number));
  }

  if (operator === '+') {
    answers.push(sumArray(numbers));
  } else {
    answers.push(multiplyArray(numbers));
  }

  return sumArray(answers).toString();
};
