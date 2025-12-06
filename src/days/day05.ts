import { sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const freshIngredientIdRanges: Array<{ min: number; max: number }> = [];
  const availableIngredientIds: Array<number> = [];

  const inputs = input.split('\n\n');

  for (const line of inputs[0].split('\n')) {
    const [min, max] = line.split('-');
    freshIngredientIdRanges.push({ min: parseInt(min), max: parseInt(max) });
  }

  for (const line of inputs[1].split('\n')) {
    availableIngredientIds.push(parseInt(line));
  }

  let numFresh = 0;
  for (const id of availableIngredientIds) {
    if (freshIngredientIdRanges.some((range) => id >= range.min && id <= range.max)) {
      numFresh++;
    }
  }

  return numFresh.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const freshIngredientIdRanges: Array<{ min: number; max: number }> = [];

  const inputs = input.split('\n\n');

  for (const line of inputs[0].split('\n')) {
    const [min, max] = line.split('-');
    freshIngredientIdRanges.push({ min: parseInt(min), max: parseInt(max) });
  }

  const sortedRanges = freshIngredientIdRanges.sort((a, b) => a.min - b.min);

  const mergedRanges: Array<{ min: number; max: number }> = [];
  let range = sortedRanges[0];
  for (let i = 1; i < sortedRanges.length; i++) {
    const nextRange = sortedRanges[i];

    if (range.max >= nextRange.min) {
      range.max = Math.max(range.max, nextRange.max);
    } else {
      mergedRanges.push(range);
      range = nextRange;
    }
  }

  mergedRanges.push(range);
  return sumArrayBy(mergedRanges, (v) => v.max - v.min + 1).toString();
};
