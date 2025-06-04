const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER); // 2^53 - 1
const MIN_SAFE = BigInt(Number.MIN_SAFE_INTEGER); // -(2^53 - 1)

export function toNumber(input: string | number | bigint): number {
  const num = typeof input === 'bigint' ? input : BigInt(input);

  if (num > MAX_SAFE || num < MIN_SAFE) {
    throw new Error('안전한 정수 범위를 벗어났습니다.');
  }

  return Number(num);
}
