Deno.serve(async (_req) => {
  const url =
    'https://www.mizuhobank.co.jp/takarakuji/check/loto/index.html';

  try {
    const response = await fetch(url);

    return new Response(
      JSON.stringify({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }
});