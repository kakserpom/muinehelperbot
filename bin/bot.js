import { Telegraf } from 'telegraf';
import { QA } from '../src/qa.js';

const escapeHTML = function(unsafe) {
    return unsafe.replace(/[&<"']/g, function(m) {
        switch (m) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '"':
                return '&quot;';
            default:
                return '&#039;';
        }
    });
};

const qa = new QA()

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('text', async (ctx) => {
    // Explicit usage
    const match = ctx.message.text.toLocaleLowerCase().match(/^(эй\s*)?бот\s(.*)$/)
    if (!match) {
        return
    }
    const text = match[2]
    const items = await qa.search(text)
    if (!items.length) {
        await ctx.reply('😔 Пока не могу ответить на ваш вопрос.', {
            reply_to_message_id: ctx.message.message_id,
        })
        return
    }
    let msg = 'Вот, что я знаю:\n\n'
    for (const {header, link} of items) {
        msg += `👉 <a href="${escapeHTML(link)}">${escapeHTML(header)}</a>\n`
    }
    await ctx.replyWithHTML(msg, {
        reply_to_message_id: ctx.message.message_id,
        disable_web_page_preview: true,
    })
});

bot.on('callback_query', async (ctx) => {
    // Explicit usage
    await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

    // Using context shortcut
    await ctx.answerCbQuery();
});

bot.on('inline_query', async (ctx) => {
    const result = [];
    // Explicit usage
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    await ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
console.log('started')