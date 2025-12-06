import { sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const banks = input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('').map(Number));

  const sum = sumArrayBy(banks, (bank) => getJoltageForBankPart1(bank));
  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const banks = input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('').map(Number));

  const sum = sumArrayBy(banks, (bank) => getJoltageForBankPart2(bank));
  return sum.toString();
};

function getJoltageForBankPart1(bank: Array<number>, disallowed?: number): number {
  const max =
    disallowed === undefined
      ? Math.max(...bank)
      : Math.max(...bank.filter((battery) => battery !== disallowed));

  const maxIndices = bank
    .map((battery, index) => (battery === max ? index : -1))
    .filter((x) => x >= 0);

  if (disallowed === undefined && maxIndices.length >= 2) {
    return parseInt(`${max}${max}`);
  }

  if (maxIndices[0] === bank.length - 1) {
    return getJoltageForBankPart1(bank, max);
  }

  const nextMax = Math.max(...bank.slice(maxIndices[0] + 1));
  return parseInt(`${max}${nextMax}`);
}

function getJoltageForBankPart2(bank: Array<number>): number {
  const indices: Record<number, Array<number>> = {};
  for (let digit = 1; digit < 10; digit++) {
    indices[digit] = bank.map((v, i) => (v === digit ? i : -1)).filter((n) => n >= 0);
  }

  let minIndex = -1;
  const joltageDigits: Array<number> = [];
  for (let i = 0; i < 12; i++) {
    for (let battery = 9; battery >= 1; battery--) {
      const batteryIndex = indices[battery].findIndex(
        (j) => j >= minIndex && j <= bank.length - (12 - i)
      );

      if (batteryIndex > -1) {
        minIndex = indices[battery][batteryIndex];
        joltageDigits[i] = battery;
        indices[battery].splice(batteryIndex, 1);
        break;
      }
    }
  }

  return parseInt(joltageDigits.join(''));
}
