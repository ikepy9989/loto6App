import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { checkLottery } from '../services/lotteryChecker';

type Purchase = {
  purchase_id: number;
  draw_number: number;
  purchase_date: string;

  number_1: number;
  number_2: number;
  number_3: number;
  number_4: number;
  number_5: number;
  number_6: number;

  purchase_amount: number;
  win_rank: number | null;
  prize_amount: number;

  matched_count?: number;
  bonus_matched?: boolean;
};

function PurchaseHistory() {
  const [drawNumber, setDrawNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [numbers, setNumbers] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const loadPurchases = async () => {
    const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .order('purchase_date', { ascending: false })
        .order('purchase_id', { ascending: false });

    if (error) {
        console.error(error);
        setMessage(`購入履歴取得エラー: ${error.message}`);
        return;
    }

    const purchasesData = data ?? [];

    if (purchasesData.length === 0) {
        setPurchases([]);
        return;
    }

    const drawNumbers = [
        ...new Set(
        purchasesData.map((purchase) => purchase.draw_number)
        ),
    ];

    const { data: resultsData, error: resultsError } = await supabase
        .from('draw_results')
        .select('*')
        .in('draw_number', drawNumbers);

    if (resultsError) {
        console.error(resultsError);
        setMessage(`当選結果取得エラー: ${resultsError.message}`);
        return;
    }

    const resultsMap = new Map(
        (resultsData ?? []).map((result) => [
        result.draw_number,
        result,
        ])
    );

    const checkedPurchases = purchasesData.map((purchase) => {
        const result = resultsMap.get(purchase.draw_number);

        if (!result) {
        return {
            ...purchase,
            win_rank: null,
            prize_amount: 0,
            matched_count: undefined,
            bonus_matched: undefined,
        };
        }

        const checkResult = checkLottery(
        [
            purchase.number_1,
            purchase.number_2,
            purchase.number_3,
            purchase.number_4,
            purchase.number_5,
            purchase.number_6,
        ],
        [
            result.winning_number_1,
            result.winning_number_2,
            result.winning_number_3,
            result.winning_number_4,
            result.winning_number_5,
            result.winning_number_6,
        ],
        result.bonus_number,
        {
            prize_1: result.prize_1,
            prize_2: result.prize_2,
            prize_3: result.prize_3,
            prize_4: result.prize_4,
            prize_5: result.prize_5,
        }
        );

        return {
            ...purchase,
            win_rank: checkResult.winRank,
            prize_amount: checkResult.prizeAmount,
            matched_count: checkResult.matchedCount,
            bonus_matched: checkResult.bonusMatched,
        };
    });

    for (const purchase of checkedPurchases) {
        if (purchase.matched_count === undefined) {
            continue;
        }

        const { error: updateError } = await supabase
            .from('purchases')
            .update({
            win_rank: purchase.win_rank,
            prize_amount: purchase.prize_amount,
            })
            .eq('purchase_id', purchase.purchase_id);

        if (updateError) {
            console.error(updateError);
            setMessage(`照合結果保存エラー: ${updateError.message}`);
            return;
        }
    }

    setPurchases(checkedPurchases);
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const registerPurchase = async () => {
    setMessage('');

    if (!drawNumber || !purchaseDate) {
      setMessage('抽選回と購入日を入力してください。');
      return;
    }

    if (numbers.some((number) => number === '')) {
      setMessage('6個すべての数字を入力してください。');
      return;
    }

    const convertedNumbers = numbers.map(Number);

    if (convertedNumbers.some((number) => number < 1 || number > 43)) {
      setMessage('数字は1～43で入力してください。');
      return;
    }

    if (new Set(convertedNumbers).size !== 6) {
      setMessage('数字は重複しないように入力してください。');
      return;
    }

    const { error } = await supabase
      .from('purchases')
      .insert({
        draw_number: Number(drawNumber),
        purchase_date: purchaseDate,
        number_1: convertedNumbers[0],
        number_2: convertedNumbers[1],
        number_3: convertedNumbers[2],
        number_4: convertedNumbers[3],
        number_5: convertedNumbers[4],
        number_6: convertedNumbers[5],
        purchase_amount: 200,
      });

    if (error) {
      console.error(error);
      setMessage(`登録に失敗しました: ${error.message}`);
      return;
    }

    setMessage('購入履歴を登録しました。');

    setDrawNumber('');
    setPurchaseDate('');
    setNumbers(['', '', '', '', '', '']);

    await loadPurchases();
  };

  return (
    <div>
      <h2>購入履歴登録</h2>

      <div>
        <label>
          抽選回：
          <input
            type="number"
            value={drawNumber}
            onChange={(e) => setDrawNumber(e.target.value)}
          />
          回
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          購入日：
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div>購入番号：</div>

        {numbers.map((number, index) => (
          <input
            key={index}
            type="number"
            min="1"
            max="43"
            value={number}
            onChange={(e) =>
              handleNumberChange(index, e.target.value)
            }
            style={{
              width: '50px',
              marginRight: '5px',
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={registerPurchase}
        style={{ marginTop: '15px' }}
      >
        登録
      </button>

      {message && (
        <p style={{ marginTop: '15px' }}>
          {message}
        </p>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>購入履歴</h2>

      {purchases.length === 0 ? (
        <p>購入履歴はありません。</p>
      ) : (
        <table
          style={{
            borderCollapse: 'collapse',
          }}
        >
        <thead>
            <tr>
                <th>回号</th>
                <th>購入日</th>
                <th>購入番号</th>
                <th>購入金額</th>
                <th>一致数</th>
                <th>ボーナス</th>
                <th>当選等級</th>
                <th>当選金額</th>
            </tr>
        </thead>

        <tbody>
            {purchases.map((purchase) => (
                <tr key={purchase.purchase_id}>
                <td>{purchase.draw_number}</td>

                <td>{purchase.purchase_date}</td>

                <td>
                    {[
                    purchase.number_1,
                    purchase.number_2,
                    purchase.number_3,
                    purchase.number_4,
                    purchase.number_5,
                    purchase.number_6,
                    ].join(' / ')}
                </td>

                <td>
                    {purchase.purchase_amount.toLocaleString()}円
                </td>

                <td>
                    {purchase.matched_count !== undefined
                    ? `${purchase.matched_count}個`
                    : '-'}
                </td>

                <td>
                    {purchase.bonus_matched === undefined
                    ? '-'
                    : purchase.bonus_matched
                        ? '一致'
                        : '不一致'}
                </td>

                <td>
                    {purchase.win_rank
                    ? `${purchase.win_rank}等`
                    : '－'}
                </td>

                <td>
                    {purchase.prize_amount > 0
                    ? `${purchase.prize_amount.toLocaleString()}円`
                    : '－'}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      )}
    </div>
  );
}

export default PurchaseHistory;