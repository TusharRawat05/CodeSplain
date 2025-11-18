"use server";

export async function explain(prevState, formData) {
  const code = formData.get("code");
  const language = formData.get("language");

  try {
    // Log URL to confirm it's correct
    // console.log("Requesting:", `${import.meta.env.VITE_API_BASE_URL}/api/explain-code`);

    const res = await fetch(`https://codesplain-zxzr.onrender.com/api/explain-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Failed to fetch results. Server responded with status ${res.status}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };

  } catch (error) {
    return {
      success: false,
      error: `An error occurred: ${error?.message}`,
    };
  }
}
