export const translateBatch = async (payload, lang) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", 
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