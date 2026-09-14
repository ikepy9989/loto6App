import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type Purchase = {
  purchase_amount: number;
  prize_amount: number;
};

function Income() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPurchases = async () => {
      const { data, error } = await supabase
        .from('purchases')
        .select('purchase_amount, prize_amount');

      if (error) {
        console.error(error);
        setError('購入履歴を取得できませんでした。');
        return;
      }

      setPurchases(data ?? []);
    };

    loadPurchases();
  }, []);

  const totalPurchaseAmount = purchases.reduce(
    (sum, purchase) => sum + purchase.purchase_amount,
    0
  );

  const totalPrizeAmount = purchases.reduce(
    (sum, purchase) => sum + purchase.prize_amount,
    0
  );

  const totalIncome = totalPrizeAmount - totalPurchaseAmount;

  return (
    <div>
      <h2>収支</h2>

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>累計購入額：{totalPurchaseAmount.toLocaleString()}円</p>
          <p>累計当選額：{totalPrizeAmount.toLocaleString()}円</p>
          <p>累計収支：{totalIncome.toLocaleString()}円</p>
        </>
      )}
    </div>
  );
}

export default Income;