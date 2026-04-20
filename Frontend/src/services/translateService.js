export const translateBatch = async (payload, lang) => {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload, lang })
    });

    if (!res.ok) {
      console.error("Error API:", res.status);
      return payload;
    }

    const data = await res.json();

    let text = data.choices?.[0]?.message?.content || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      return JSON.parse(text);
    } catch {
      return payload;
    }

  } catch (error) {
    console.error("Translation error:", error);
    return payload;
  }
};