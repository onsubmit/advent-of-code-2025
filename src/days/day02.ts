export const getPartOneSolution = (input: string): string => {
  const ranges = parseInput(input);

  let sum = 0;
  for (const { start, end } of ranges) {
    for (let i = start; i <= end; i++) {
      if (isInvalidIdPart1(i)) {
        sum += i;
      }
    }
  }

  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const ranges = parseInput(input);

  let sum = 0;
  for (const { start, end } of ranges) {
    for (let i = start; i <= end; i++) {
      if (isInvalidIdPart2(i)) {
        sum += i;
      }
    }
  }

  return sum.toString();
};

function isInvalidIdPart1(id: number): boolean {
  const idString = id.toString();
  if (idString.length % 2) {
    return false;
  }

  const mid = idString.length / 2;
  if (idString.substring(0, mid) === idString.substring(mid)) {
    return true;
  }

  return false;
}

function isInvalidIdPart2(id: number): boolean {
  const idString = id.toString();
  const mid = Math.floor(idString.length / 2);
  for (let length = 1; length <= mid; length++) {
    if (idString.length % length) {
      continue;
    }

    const toCheck = idString.substring(0, length);
    let valid = false;
    for (let i = 1; !valid && i < idString.length / length; i++) {
      if (toCheck !== idString.substring(i * length, (i + 1) * length)) {
        valid = true;
        continue;
      }
    }

    if (!valid) {
      return true;
    }
  }

  return false;
}

function parseInput(input: string): Array<{ start: number; end: number }> {
  const lines = input.split('\n').filter(Boolean);
  return lines.flatMap((line) =>
    line.split(',').flatMap((range) => {
      const [start, end] = range.split('-');
      return { start: parseInt(start), end: parseInt(end) };
    })
  );
}
