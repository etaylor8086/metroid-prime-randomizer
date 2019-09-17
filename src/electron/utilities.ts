import { MersenneTwister } from './mersenneTwister';

export function isServe(): boolean {
  const args = process.argv.slice(1);
  return  args.some(val => val === '--serve');
}

export function getBaseLog(x: number, base: number) {
  return Math.log(x) / Math.log(base);
}

export function getRandomInt(min: number, max: number, rng: MersenneTwister = new MersenneTwister()) {
  return Math.floor(rng.random() * (max - min + 1)) + min;
}

export function randomArray<T>(arr: T[], size: number, rng: MersenneTwister): T[] {
  // Return null if array is empty or specified size is zero
  if (arr.length < 1 || size < 1) {
    return null;
  }

  // Shallow copy array so arr isn't affected
  const oldItems = [...arr];
  let newItems = [];

  while (size-- > 0 && oldItems.length > 0) {
    newItems.push(...oldItems.splice(getRandomInt(0, oldItems.length - 1, rng), 1));
  }

  return newItems;
}