export default async function handler(req, res) {
  const { service, ticker } = req.query;

  if (!service || !ticker) return res.status(400).json({ error: "Missing parameters" });

  try {
    let url;
    let options = { headers: {} };

    if (service === "tiingo") {
      url = `https://api.tiingo.com/tiingo/daily/${encodeURIComponent(ticker)}?token=${apiKey}`;
    } else if (service === "finnhubQuote") {
      url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`;
    } else if (service === "finnhubNews") {
      const today = new Date();
      const yesterdayDate = new Date(today);
      yesterdayDate.setDate(today.getDate() - 1);
      const dateStrToday = today.toISOString().split("T")[0];
      const yesterday = yesterdayDate.toISOString().split("T")[0];
      url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${yesterday}&to=${dateStrToday}&token=${process.env.FINNHUB_API_KEY}`;
    } else if (service === "gemini") {
      url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";
      options.headers["x-goog-api-key"] = process.env.GEMINI_API_KEY;
      options.headers["Content-Type"] = "application/json";
      options.method = req.method;
      options.body = req.body;
    }

    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed fetching data" });
  }
}
