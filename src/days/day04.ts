import { Coordinate } from '../coordinate';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const grid = new TwoDimensionalArray<'@' | '.'>(input, (ch) => ch as '@' | '.');
  let count = 0;
  grid.forEach((item, row, column) => {
    if (item === '.') {
      return;
    }

    const border = grid.getBorderAt(new Coordinate(row, column));
    if (border.filter((x) => x.item === '@').length < 4) {
      count++;
    }
  });

  return count.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const grid = new TwoDimensionalArray<'@' | '.'>(input, (ch) => ch as '@' | '.');
  let go = true;
  let removed = 0;
  while (go) {
    let someRemoved = false;
    grid.forEach((item, row, column) => {
      if (item === '.') {
        return;
      }

      const border = grid.getBorderAt(new Coordinate(row, column));
      if (border.filter((x) => x.item === '@').length < 4) {
        grid.set(row, column, '.');
        removed++;
        someRemoved = true;
      }
    });

    if (!someRemoved) {
      go = false;
    }
  }

  return removed.toString();
};
