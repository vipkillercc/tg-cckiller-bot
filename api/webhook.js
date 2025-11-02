export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  const update = req.body;
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = update.message?.chat?.id;
  const text = update.message?.text || '';

  if (chatId && text) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: `You said: ${text}` })
    });
  }

  return res.status(200).json({ ok: true });
}
