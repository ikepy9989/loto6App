import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type DrawResult = {
  draw_number: number;
  draw_date: string;

  winning_number_1: number;
  winning_number_2: number;
  winning_number_3: number;
  winning_number_4: number;
  winning_number_5: number;
  winning_number_6: number;

  bonus_number: number;

  prize_1: number;
  prize_2: number;
  prize_3: number;
  prize_4: number;
  prize_5: number;

  sales_amount: number;
  carry_over: number;
};

function DrawResults() {
  const [results, setResults] = useState<DrawResult[]>([]);
  const [message, setMessage] = useState('');

  const loadResults = async () => {
    const { data, error } = await supabase
      .from('draw_results')
      .select('*')
      .order('draw_number', { ascending: false });

    if (error) {
      console.error(error);
      setMessage(`当選結果取得エラー: ${error.message}`);
      return;
    }

    setResults(data ?? []);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div>
      <h2>当選結果</h2>

      {message && <p>{message}</p>}

      {results.length === 0 ? (
        <p>当選結果はありません。</p>
      ) : (
        <div>
          {results.map((result) => (
            <div
              key={result.draw_number}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '15px',
              }}
            >
              <h3>
                第{result.draw_number}回
              </h3>

              <p>
                抽選日：{result.draw_date}
              </p>

              <p>
                本数字：
                {' '}
                {[
                  result.winning_number_1,
                  result.winning_number_2,
                  result.winning_number_3,
                  result.winning_number_4,
                  result.winning_number_5,
                  result.winning_number_6,
                ].join(' / ')}
              </p>

              <p>
                ボーナス数字：
                {' '}
                {result.bonus_number}
              </p>

              <table
                style={{
                  borderCollapse: 'collapse',
                  marginTop: '10px',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                      }}
                    >
                      等級
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                      }}
                    >
                      当選金額
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      1等
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {result.prize_1.toLocaleString()}円
                    </td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      2等
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {result.prize_2.toLocaleString()}円
                    </td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      3等
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {result.prize_3.toLocaleString()}円
                    </td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      4等
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {result.prize_4.toLocaleString()}円
                    </td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      5等
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {result.prize_5.toLocaleString()}円
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                販売実績額：
                {' '}
                {result.sales_amount.toLocaleString()}円
              </p>

              <p>
                キャリーオーバー：
                {' '}
                {result.carry_over.toLocaleString()}円
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DrawResults;