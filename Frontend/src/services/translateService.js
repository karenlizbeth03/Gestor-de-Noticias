const cache = new Map();

export const translateBatch = async (data, targetLang) => {
  if (targetLang === "es") return data;

  const cacheKey = JSON.stringify({ data, targetLang });

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/elephant-alpha",
        messages: [
          {
            role: "system",
            content: "You are a translator. Return ONLY valid JSON. Do not explain anything."
          },
          {
            role: "user",
            content: `Translate this JSON to ${targetLang}: ${JSON.stringify(data)}`
          }
        ]
      })
    });

    const json = await res.json();
    const text = json.choices?.[0]?.message?.content;

    const parsed = JSON.parse(text);

    cache.set(cacheKey, parsed);

    return parsed;

  } catch (error) {
    console.error("Batch translation error:", error);
    return data;
  }
};