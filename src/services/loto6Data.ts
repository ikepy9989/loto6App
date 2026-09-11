export type Loto6Result = {
  draw_number: number;
  draw_date: string;
  winning_numbers: number[];
  bonus_number: number;
  prize_1: number;
  prize_2: number;
  prize_3: number;
  prize_4: number;
  prize_5: number;
  carry_over: number;
  sales_amount: number;
};

const latestUrl =
  'https://raw.githubusercontent.com/ikepy9989/loto6-data/main/data/latest.json';

export async function fetchLatestLoto6Result(): Promise<Loto6Result> {
  const response = await fetch(latestUrl);

  if (!response.ok) {
    throw new Error(
      `ロト6結果の取得に失敗しました: ${response.status}`
    );
  }

  const result: Loto6Result = await response.json();

  return result;
}