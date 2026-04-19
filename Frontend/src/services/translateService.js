export const translateBatch = async (payload, lang) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // ⚠️ CAMBIA ESTO
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Traduce el JSON al idioma indicado. Devuelve SOLO JSON válido, sin ``` ni texto extra."
          },
          {
            role: "user",
            content: `Idioma: ${lang}\n\nJSON:\n${JSON.stringify(payload)}`
          }
        ]
      })
    });

    if (!res.ok) {
      console.error("Error API:", res.status);
      return payload;
    }

    const data = await res.json();

    let text = data.choices?.[0]?.message?.content || "";

    // 🔥 LIMPIEZA PRO (CLAVE)
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔥 PARSE SEGURO
    try {
      return JSON.parse(text);
    } catch (err) {
      console.warn("JSON inválido, devolviendo original");
      return payload;
    }

  } catch (error) {
    console.error("Translation error:", error);
    return payload;
  }
};