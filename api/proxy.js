export default async function handler(req, res) {
  const target = "http://85.215.229.230:9389";

  const url = target + req.url.replace("/api", "");

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
