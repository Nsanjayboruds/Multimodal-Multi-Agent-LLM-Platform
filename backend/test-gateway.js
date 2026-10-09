const test = async () => {
  try {
    const res = await fetch('http://localhost:9000/api/agent/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'give a landing page code',
        conversationId: '6a7ef4632e4c5b60abb4bee5',
        agent: 'coding'
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '6a7ef456be4998441e36d1f6'
      }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
test();
