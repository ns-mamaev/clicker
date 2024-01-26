const sumEven = (n: number): number => (n % 2 ? 0 : n);

function sumFibonacci(
  limit: number,
  firstEl: number = 0,
  secondEl: number = 1,
  sumFn: typeof sumEven = (n) => n
) {
  if (limit < secondEl || secondEl < firstEl) {
    throw new Error('incorrect arguments')
  }
  let prev = firstEl;
  let current = secondEl;
  let sum = sumFn(firstEl);
  while (current < limit) {
    sum += sumFn(current);
    current += prev;
    prev = current - prev;
  }
  return sum;
}

// find sum of even-valued for sequence starst with 3 and 4, and limit 7 million
console.log(sumFibonacci(7000000, 3, 4, sumEven))
