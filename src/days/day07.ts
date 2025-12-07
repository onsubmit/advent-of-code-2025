import { Coordinate } from '../coordinate';
import { TwoDimensionalArray } from '../twoDimensionalArray';

type Manifold = TwoDimensionalArray<string>;

export const getPartOneSolution = (input: string): string => {
  let startCoordinates: Array<Coordinate> = [];
  const manifold: Manifold = new TwoDimensionalArray(input, (ch, r, c) => {
    if (ch === 'S') {
      startCoordinates.push(new Coordinate(r, c));
    }

    return ch;
  });

  let numSplits = 0;
  while (startCoordinates.length) {
    let c: Coordinate | undefined;
    while ((c = startCoordinates.pop())) {
      c = c.move('S');

      const space = manifold.atCoordinate(c);
      if (space === '.') {
        manifold.setCoordinate(c, '|');
        startCoordinates.push(c);
      } else if (space === '^') {
        numSplits++;
        const left = c.move('W');
        const right = c.move('E');
        if (manifold.atCoordinate(left) === '.') {
          manifold.setCoordinate(left, '|');
          startCoordinates.push(left);
        }

        if (manifold.atCoordinate(right) === '.') {
          manifold.setCoordinate(right, '|');
          startCoordinates.push(right);
        }
        continue;
      } else if (space === '|') {
        continue;
      }
    }
  }

  return numSplits.toString();
};

const beamCache: Record<string, number> = {};
export const getPartTwoSolution = (input: string): string => {
  let startCoordinate = new Coordinate(-1, -1);
  const manifold: Manifold = new TwoDimensionalArray(input, (ch, r, c) => {
    if (ch === 'S') {
      startCoordinate = new Coordinate(r, c);
    }

    return ch;
  });

  const timelines = 1 + shootBeam(manifold, startCoordinate);
  return timelines.toString();
};

function shootBeam(manifold: Manifold, startCoordinate: Coordinate): number {
  const coordinateKey = startCoordinate.toString();
  if (beamCache[coordinateKey]) {
    return beamCache[coordinateKey];
  }

  let at: string | undefined;
  let c: Coordinate = startCoordinate;
  while ((at = manifold.atCoordinate(c)) !== '^') {
    if (at === undefined) {
      return 0;
    }

    c = c.move('S');
  }

  beamCache[coordinateKey] =
    1 + shootBeam(manifold, c.move('W')) + shootBeam(manifold, c.move('E'));

  return beamCache[coordinateKey];
}
