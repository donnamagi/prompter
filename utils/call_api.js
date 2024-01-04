
export async function callAPI(input) {
  try {
    
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    const api_response = data.result[data.result.length - 1];
    return api_response.content;
    
  } catch(error) {
    console.error(error);
    alert(error.message);
  }
}
