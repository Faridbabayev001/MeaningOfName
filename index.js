'use strict';

const BootBot = require("bootbot");
const config = require("config");
const meaningOfName = require("./modules/meaningOfName/meaningOfName");
const bot = new BootBot({
    accessToken: config.get("FB_ACCESS_TOKEN"),
    verifyToken: config.get("FB_VERIFY_TOKEN"),
    appSecret: config.get("FB_APP_SECRET")
});
bot.module(meaningOfName);


bot.setGreetingText('Bu səhifədə adınızın mənasını öyrənə bilərsiz.');
bot.setGetStartedButton((payload, chat) => {
    chat.getUserProfile().then((user) => {
        chat.say(`Salam, ${user.first_name}!`).then(() => {
            chat.say({
                text: 'Adının mənasını öyrənmək istəyirsən? ',
                quickReplies: ['Bəli istəyirəm', 'Xeyir istəmirəm']
            });
        });
    });
});

bot.setPersistentMenu([
    {
        type: 'web_url',
        title: 'Developer ilə əlaqə',
        url: 'https://www.facebook.com/Faridbabayev001'
    }
]);

bot.hear(['salam'], (payload, chat) => {

    chat.getUserProfile().then((user) => {
        chat.say(`Salam, ${user.first_name}!`).then(() => {
            chat.say({
                text: 'Adının mənasını öyrənmək istəyirsən? ',
                quickReplies: ['Bəli istəyirəm', 'Xeyir istəmirəm']
            });
        });
    });
});



bot.start();
