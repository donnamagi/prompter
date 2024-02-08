
export async function callAPI(input) {
  const messages = [{ 'role': 'user', 'content': input }]
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages),
    });

    const reader = res.body.getReader();
    const textDecoder = new TextDecoder('utf-8'); 
    let resText = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) return resText;

      const text = textDecoder.decode(value, { stream: true }); // Decode each chunk
      resText += text;
    }
  } catch (err) {
    console.error(err)
  }
}
