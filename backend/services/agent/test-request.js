import axios from 'axios';
const test = async () => {
  try {
    const res = await axios.post('http://localhost:9003/chat', {
      prompt: 'give a landing page code',
      conversationId: 'test1234',
      agent: 'coding'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
test();
