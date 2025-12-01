export const getPartOneSolution = (input: string): string => {
  const lines = parseInput(input);
  let zeros = 0;
  let dial = 50;
  for (const line of lines) {
    const number = parseInt(line.slice(1));
    if (line.at(0) === 'L') {
      dial = dial - number;
      if (dial < 0) {
        dial = (100 + dial) % 100;
      }
    } else {
      dial = (dial + number) % 100;
    }

    if (dial === 0) {
      zeros++;
    }
  }

  return zeros.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = parseInput(input);
  let zeros = 0;
  let dial = 50;
  for (const line of lines) {
    const number = parseInt(line.slice(1));
    if (line.at(0) === 'L') {
      const diff = dial - number;
      if (diff <= 0) {
        zeros += Math.floor(-diff / 100) + (dial > 0 ? 1 : 0);
      }

      dial = diff;
      if (dial < 0) {
        dial = ((dial % 100) + 100) % 100;
      }
    } else {
      const sum = dial + number;
      if (sum >= 100) {
        zeros += Math.floor(sum / 100);
      }
      dial = sum % 100;
    }
  }

  return zeros.toString();
};

const parseInput = (input: string): Array<string> => {
  const lines = input.split('\n').filter(Boolean);
  return lines;
};
