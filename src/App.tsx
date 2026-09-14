import { useEffect, useState } from 'react';
import PurchaseHistory from './pages/PurchaseHistory';
import DrawResults from './pages/DrawResults';
import { fetchLatestLoto6Result } from './services/loto6Data';
import Income from './pages/Income';

type Page =
  | 'home'
  | 'purchase'
  | 'results'
  | 'income'
  | 'prediction';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const [latestDrawNumber, setLatestDrawNumber] = useState<number | null>(
    null
  );

  const [latestDrawDate, setLatestDrawDate] = useState<string>('');

  const [loadError, setLoadError] = useState<string>('');

  useEffect(() => {
    const loadLatestResult = async () => {
      try {
        const result = await fetchLatestLoto6Result();

        setLatestDrawNumber(result.draw_number);
        setLatestDrawDate(result.draw_date);
      } catch (error) {
        console.error(error);
        setLoadError('最新の当選結果を取得できませんでした。');
      }
    };

    loadLatestResult();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'purchase':
        return <PurchaseHistory />;

      case 'results':
        return <DrawResults />;

      case 'income':
        return <Income />;

      case 'prediction':
        return <h2>予想</h2>;

      case 'home':
      default:
        return (
          <div>
            <h2>ホーム</h2>
            <p>ロト6管理アプリへようこそ。</p>

            <hr />

            <h3>最新当選結果</h3>

            {loadError ? (
              <p>{loadError}</p>
            ) : latestDrawNumber === null ? (
              <p>取得中...</p>
            ) : (
              <p>
                第{latestDrawNumber}回　抽せん日：{latestDrawDate}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ロト6管理アプリ</h1>

      <nav style={{ marginBottom: '30px' }}>
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
        >
          ホーム
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage('purchase')}
          style={{ marginLeft: '10px' }}
        >
          購入履歴
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage('results')}
          style={{ marginLeft: '10px' }}
        >
          当選結果
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage('income')}
          style={{ marginLeft: '10px' }}
        >
          収支
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage('prediction')}
          style={{ marginLeft: '10px' }}
        >
          予想
        </button>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;