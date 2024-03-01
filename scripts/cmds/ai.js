const axios = require('axios');

const Prefixes = [
  'asta',
  'ai',
  'chatgpt',
  'gpt',
  'bot',
];

module.exports = {
  config: {
    name: "chatgpt",
    version: 1.0,
    author: "Aryan Chauhan",
    longDescription: "AI",
    category: "CHATGPT",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("⚔️ASTA⚔️:\n\nHeyo,how you have an insane amount of energy in the question you want to ask me.");
        return;
      }


      const response = await axios.get(`https://AryanAPI.replit.app/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(`⚔️ASTA⚔️:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}
