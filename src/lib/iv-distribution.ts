const MAX_IV = 15;
const IV_PARTS = 3;

function partition(sum: number, parts: number): number[][] {
  if (sum === 0) return [[0, 0, 0]];

  if (sum < 0 || parts === 0) return [];

  const result: number[][] = [];

  for (let i = 0; i <= MAX_IV; i++) {
    const partitions = partition(sum - i, parts - 1);
    partitions.forEach((el) => {
      el.unshift(i);
      result.push(el);
    });
  }

  console.log({result})

  return result;
}

export function findIvCombinations(iv: number): [number, number, number][] {
  const sum = Math.round(iv * 45);
  const partitions = partition(sum, IV_PARTS);

  const solutions: [number, number, number][] = []

  console.log({partitions})

  partitions.forEach(([att, def, hp]) => solutions.push([att, def, hp]));

  return solutions;
}

