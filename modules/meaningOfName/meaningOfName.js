var axios = require('axios');

module.exports = (bot) => {
    bot.hear(['bəli istəyirəm', 'beli isteyirem', 'bəli', 'beli'], (payload, chat) => {
        chat.conversation(convo => {
            convo.ask("Adınızı daxil edin", (payload, chat) => {
                var name = payload.message.text;
                var requestUrl = encodeURI("https://opendata.e-gov.az/api/v1/json/home/MeaningOfName/" + name)
                axios.get(requestUrl)
                    .then((response) => {
                        if (response.data.Response != null) {
                            convo.say(response.data.Response.Meaning).then(() => {
                                convo.say({
                                    text: "Adınızın mənasını təkrar öyrənmək istəyirsiniz ?",
                                    quickReplies: ['Bəli istəyirəm', 'Xeyir istəmirəm']
                                });
                            });
                            convo.end();
                        } else {
                            convo.say({
                                text: name + " adına uyğun nəticə tapılmadı. Adınızı azərbaycan hərfləri ilə yazılmasına diqqət edin. Adınızı təkrar yazmaq istəyirsiniz ?",
                                quickReplies: ['Bəli istəyirəm', 'Xeyir istəmirəm']
                            });
                            convo.end();
                        }
                    });
            });
        });
    });
};
