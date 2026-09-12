type PurchaseNumbers = [
  number,
  number,
  number,
  number,
  number,
  number
];

export type DrawNumbers = [
  number,
  number,
  number,
  number,
  number,
  number
];

export type LotteryCheckResult = {
  winRank: number | null;
  prizeAmount: number;
  matchedCount: number;
  bonusMatched: boolean;
};

export function checkLottery(
  purchaseNumbers: PurchaseNumbers,
  drawNumbers: DrawNumbers,
  bonusNumber: number,
  prizes: {
    prize_1: number;
    prize_2: number;
    prize_3: number;
    prize_4: number;
    prize_5: number;
  }
): LotteryCheckResult {
  const matchedCount = purchaseNumbers.filter((number) =>
    drawNumbers.includes(number)
  ).length;

  const bonusMatched = purchaseNumbers.includes(bonusNumber);

  let winRank: number | null = null;

  /*
   * ロト6の当選判定
   *
   * 1等：本数字6個一致
   * 2等：本数字5個一致 + ボーナス数字一致
   * 3等：本数字5個一致
   * 4等：本数字4個一致
   * 5等：本数字3個一致
   */
  if (matchedCount === 6) {
    winRank = 1;
  } else if (matchedCount === 5 && bonusMatched) {
    winRank = 2;
  } else if (matchedCount === 5) {
    winRank = 3;
  } else if (matchedCount === 4) {
    winRank = 4;
  } else if (matchedCount === 3) {
    winRank = 5;
  }

  let prizeAmount = 0;

  switch (winRank) {
    case 1:
      prizeAmount = prizes.prize_1;
      break;

    case 2:
      prizeAmount = prizes.prize_2;
      break;

    case 3:
      prizeAmount = prizes.prize_3;
      break;

    case 4:
      prizeAmount = prizes.prize_4;
      break;

    case 5:
      prizeAmount = prizes.prize_5;
      break;

    default:
      prizeAmount = 0;
  }

  return {
    winRank,
    prizeAmount,
    matchedCount,
    bonusMatched,
  };
}