
// Esta es una función serverless de Vercel que maneja solicitudes de traducción.
// Usa la API de Google Translate para traducir los datos proporcionados.

export default async function handler(req, res) {
  try {
    const { payload, lang } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Traduce el JSON al idioma indicado. Devuelve SOLO JSON válido."
          },
          {
            role: "user",
            content: `Idioma: ${lang}\n\nJSON:\n${JSON.stringify(payload)}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}