const { Client, IntentsBitField, GatewayIntentBits, ThreadChannel, Channel } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()
const myIntents = new IntentsBitField();
myIntents.add(
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers);

var activities = [
    "checking for delay bypassers",
    "answering questions",
    "replying to hi",
    "doing nothing",
    "being bored",
    "fixing bugs",
    "adding features",
    "checking for bugs",
    "searching for projects",
    "selling CoflCoins",
    "learning new things",
    "watching the chat",
    "devlog is long",
    "hacking the mainframe",
    "replying to hello",
    "reading a useless argument",
    "programming",
    "optimizing code",
    "searching for flips",
    "waiting for hypixel update",
    "reminding people of rule 1",
    "reminding people of rule 2",
];

const client = new Client({ intents: myIntents });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // set with the bot's activity no playing, watching, listening, or streaming
    client.user.setActivity("eating a cookie", { type: 4 });
    setInterval(() => {
        client.user.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: 4 });
    }, 1000 * 60 * 2);
});
const MessageTimes = [];

const responses = [{
    triggers: [/is this trusted/, /is this safe/, /is the mod safe/],
    response: "Hello you,\n" +
        "the mod in <#890682907889373257>  does not intentionally do shady things. (**no** token logging or similar)\n" +
        "It can send commands as you. This is necessary to open auctions, but a potential security risk. (because it could also send other commands)\n" +
        "At present it is in early alpha, but apparently already considered useful by most of our users.\n" +
        "I personally do not use it as I am busy improving the flip finding itself as well as developing other cool services/things."
}, {
    triggers: [/^is this legit/, /is the mod legit/i],
    response: "Yes"
}, {
    triggers: [/this irl trading/, /this is irl trading/],
    response: "the thing at sky.coflnet.com is a hosted service (like minecraft server) you can host it yourself if you want to.\n" +
        "You only pay for the hosting.\n" +
        "You do NOT pay for coins, we don't guarantee you coins we only host a service that shows you effective ways to earn them yourself. (think of it like an interactive youtube video)\n" +
        "ergo. no irl trading here => not disallowed"
}, {
    triggers: [/904334586195087370/],
    response: "Calling <@267680402594988033> "
}, {
    triggers: [/\/ah.*(cheap|buy)/i],
    response: "Please don't violate rule #2, you will be kicked on your next violation."
}, {
    triggers: [/^what.*best setting/i],
    response: "The 'best' settings depend on what you want to accomplish. \n"
        + "If you are new and want low risk flips enable the `median sniper` flip finder and adjust your min profit to where you manage to get flips but can still sell them.\n"
        + "I generally recommend buying anything you see with more than 2 volume. The `EstProfitperHour` filter may also be useful to you.\n"
}, {
    triggers: [/this.*is a rat/i],
    response: "Hello there\n"
        + "There is, in fact, no rat in any mods I put into <#890682907889373257>.\n"
        + "You are welcome to decompile it or take a look at the source code at https://github.com/coflnet/skyblockmod \n"
        + "If you got ratted recently please provide all mod files of your modfolder in <#669976123714699284>"
}, {
    triggers: [/.{0,10}is this a rat/i, /is the mod a rat/i, /is this mod a rat/i, /is the mod a virus/i, /is the mod a trojan/i],
    response: "No it is not\n"
        + "Go check via https://isthisarat.com or decompile it yourself"
}, {
    triggers: [/^I got ratted/i],
    response: "Hello there,\n"
        + "Sorry to hear that. If you have the impression that this was caused by our mod, please write in <#669976123714699284> with more context."
}, {
    triggers: [/is .*(prem\+|premium\+).*worth/i],
    response: "Premium+ gives you a slight edge over premium. It's our best tier but is purposefully unproportionately more expensive to keep the competition lower than on premium. If you can afford it, please consider supporting us through prem+."
},
{
    triggers: [/How much does premium cost/i],
    response: "Premium costs about ~8€/month depending on your payment method and length. You can see details at https://sky.coflnet.com/premium"
},
{
    triggers: [/^is prem.* good/i],
    response: "Yes"
},
{
    triggers: [/^Howdy girl/i],
    response: "https://tenor.com/view/howdy-cowboy-toy-story-gif-12394471"
},
{
    triggers: [/(how|to).*(blacklist| block).*(seller|people|ah|player)/i],
    response: "with `/cl bl add forceblacklist=true seller=ign` you can blacklist sellers. (replace `ign` with the sellers name)"
},
{
    triggers: [/can I pause .*premium/i],
    response: "No, you can't pause premium. Its a prepaid service and not a subscription. You can use it on another minecraft account if you want to. Just join with the other account and verify it."
},
{
    triggers: [/flips .*web.* (than|not) .*game(\?|$)/i],
    response: "You may see more flips show up on the website because it shows already sold flips, flips that exceed your purse, and it doesn't have spam protection. These flips are usually not shown in game because you just wouldn't be able to buy them and it clogs up the chat. You can check the exact reason why a flip was blocked with `/cofl blocked <auction id>`. If you have prem+, every reason is stored for a week."
},
{
    triggers: [/(people|how|ppl).*(claiming|buy|snipe).*(fast|quick)/i],
    response: "They enabled a custom gui with `/cofl setgui cofl` and use the `Open best/next flip` keybind to open the next flip as soon as it arrives. (its in the minecraft settings)"
}, {
    triggers: [/^how.{3,20}verify/i],
    response: "You verify your minecraft account with our mod from https://sky.coflnet.com/mod\n"
        + "Upon joining hypixel skyblock it will tell you to first click a link to find out which google account id you have (thats uses to sync settings and check who invited you).\n"
        + "Next it tells you a certain 3 digit code that you have to bid on an auction.\n"
        + "Our server than verifies with hypixel that its the correct amount and you are verified.\n"
        + "See this video for more details: https://www.youtube.com/watch?list=PLDpPmxIcq9tAssQlyJMBlSmSg5JOpq699&v=Ysqn_JaC13A"
}]



client.on('messageCreate', async (message) => {
    try {
        processMessage(message)
    } catch (error) {
        console.log("error occured", error);
    }
})

function processMessage(message) {
    var response = "";
    //if (message.channelId)
    var text = message.content.toLowerCase();
    if (message.author.bot) {
        return; // don't respond to bots
    }

    if (["hi", "hey", "hello", "hello there", "hello!", "hello?", "hey!", "hey?", "servus", "hi there",
        "salutations",
        "howdy", "hola", "ni hao", "buenos dias", "guten tag", "hello there!", "hola amores"].indexOf(text) >= 0) {
        const delaySec = Math.floor(Math.random() * 11) + 5;
        setTimeout(() => {
            message.reply(getHelloGif()).catch(err => console.error('Failed to send hello gif:', err));
        }, delaySec * 1000);
        return;
    }
    let cancel = false;
    if (message.channelId == "669976123714699284")
        cancel = true;
    responses.forEach(element => {
        if (cancel) return;
        element.triggers.forEach(trigger => {
            if (cancel) return;
            if (trigger.test(message)) {
                message.reply(element.response)
                cancel = true;
            }
        })
    });
    if (cancel) return;

    if (message.member.displayName == "testacc") {
        console.log("its test");
        let member = message.member;
    }

    if (message.mentions.users.each(m => {
        console.log();
        console.log();
        console.log(m);

    }))
        if (response != "")
            message.channel.send(response)
    return;
}

/**
 * Map of joins in the same hour
 */
const joinList = {};

client.on("guildMemberAdd", async function (member) {
    console.log(`a user joined: ${JSON.stringify(member)}`);
    var bucket = Math.round(member.user.createdTimestamp / 3600_000);
    var count = joinList[bucket];
    if (!count) {
        count = 1;
        console.log(`banable ${member.bannable}: ${member.user.createdTimestamp}`);
    } else {
        if (count > 2) {
            // this is a weirdly high number, flag that user as likely bot
            await member.roles.add(member.guild.roles.resolve('936726920148713543'))
        }
        count++;
        console.log(`There were ${count} users at ${bucket}`);
    }
    joinList[bucket];

});


const helloGifs = [
    "https://tenor.com/view/hello-hi-minion-gif-16235329",
    "https://tenor.com/view/adele-hello-gif-18931507",
    "https://tenor.com/view/jerry-knocking-r-you-there-tom-and-jerry-are-you-there-hello-gif-15137335",
    "https://tenor.com/view/hello-there-private-from-penguins-of-madagascar-hi-wave-hey-there-gif-16043627",
    "https://tenor.com/view/hello-there-baby-yoda-mandolorian-hello-gif-20136589",
    "https://tenor.com/view/hello-gif-19947459",
    "https://tenor.com/view/hey-tom-hanks-forrest-gump-gif-5114770",
    "https://tenor.com/view/you-there-jim-carrey-looking-for-you-gif-4810969",
    "https://tenor.com/view/hi-hello-there-hello-sup-swag-gif-17652416",
    "https://tenor.com/view/hi-hello-there-hello-sup-swag-gif-17652416",
    "https://tenor.com/view/oh-hello-there-sassy-fab-gif-14129058",
    "https://tenor.com/view/looney-tunes-daffy-duck-hello-greetings-well-hello-there-gif-17075737",
    "https://tenor.com/view/hello-hi-jump-squirrel-gif-9499692",
    "https://tenor.com/view/hello-wave-cute-anime-cartoon-gif-7537923",
    "https://tenor.com/view/dog-cute-hello-hellothere-gif-20141152",
    "https://tenor.com/view/hello-kitty-hello-wave-hi-cute-gif-8672464",
    "https://tenor.com/view/hi-hello-wave-bear-gif-5154793",
    "https://tenor.com/view/hi-hello-wave-bear-gif-5154793",
    "https://tenor.com/view/maite-perroni-proactiv-hi-hello-gif-20314223",
    "https://tenor.com/view/hey-girl-me-passing-by-my-ex-gif-9374870",
    "https://tenor.com/view/inside-out-joy-hi-hey-hello-gif-14388296",
    "https://tenor.com/view/olafs-frozen-adventure-olaf-hello-darkness-hello-frozen-gif-15584286",
    "https://tenor.com/view/milk-and-mocha-hugs-bear-couple-love-cute-gif-16209598",
    "https://tenor.com/view/baby-yoda-baby-yoda-wave-baby-yoda-waving-hi-hello-gif-15975082",
    "https://tenor.com/view/dog-husky-dog-door-hi-gif-17284157",
    "https://tenor.com/view/whale-whale-hello-there-well-hello-there-hello-hi-gif-3556242",
    "https://tenor.com/view/hi-friends-baby-goat-saying-hello-saying-hi-hi-neighbor-gif-14737423",
    "https://tenor.com/view/arlo-hello-puppet-gif-13856332",
    "https://tenor.com/view/hello-there-hi-rat-cute-wave-gif-16917440",
    "https://tenor.com/view/sly-sneaky-fox-hello-there-gif-12693600",
    "https://tenor.com/view/groot-hello-hi-its-me-your-mom-gif-16391054",
    "https://tenor.com/view/hey-squirrel-me-calling-my-friends-gif-5058950",
    "https://tenor.com/view/hello-there-hi-there-greetings-gif-9442662",
    "https://tenor.com/view/hello-there-private-from-penguins-of-madagascar-hi-wave-hey-there-gif-16043627",
    "https://tenor.com/view/lucifer-well-hello-there-hello-devil-lucifer-morningstar-gif-18390186",
    "https://tenor.com/view/star-wars-baby-yoda-the-mandalorian-hello-there-wave-gif-16179356",
    "https://tenor.com/view/surprise-hi-there-oh-hi-hello-hey-gif-13847997",
    "https://tenor.com/view/cat-hi-cute-paw-adorable-gif-15365720",
    "https://tenor.com/view/husky-hi-tinder-match-gif-14672196",
    "https://tenor.com/view/jimmy-fallon-hi-haaaay-horse-gif-5247867",
    "https://tenor.com/view/servus-hallo-moin-gif-14596061",
    "https://tenor.com/view/hi-hey-hello-there-kitten-cute-gif-16697937",
    "https://tenor.com/view/hola-hallo-hello-penguins-wave-waving-gif-16163630",
    "https://tenor.com/view/jklsouth-jkltelugu-brahmi-hi-hello-gif-17453281",
    "https://tenor.com/view/adam-driver-just-smile-and-wave-smile-and-wave-star-wars-smiling-and-waving-gif-19258459",
    "https://tenor.com/view/good-afternoon-hi-wave-gif-12693080",
    "https://tenor.com/view/jensen-ackles-wave-hello-hey-hi-gif-10085746",
    "https://tenor.com/view/bye-hey-wave-freshprince-willsmith-gif-4997921",
    "https://tenor.com/view/elmo-hi-hello-waving-hey-gif-4890900",
    "https://tenor.com/view/the-little-mermaid-ariel-hi-hey-hello-gif-4563081",
    "https://tenor.com/view/baby-groot-guardians-of-the-galaxy-salut-bonjour-wave-gif-12518484",
    "https://tenor.com/view/hi-hello-greet-smile-wave-gif-17222872",
    "https://tenor.com/view/cat-cute-hello-there-hi-notice-me-gif-13516138",
    "https://tenor.com/view/mr-bean-funny-hello-hi-wave-gif-14824039",
    "https://tenor.com/view/leigh574-critical-role-marisha-ray-hello-darkness-friend-gif-13660541",
    "https://tenor.com/view/horse-laugh-hello-there-funny-animals-tongue-out-gif-12138451",
    "https://tenor.com/view/what-horse-hello-there-funny-animals-gif-12138450",
    "https://tenor.com/view/hey-sexy-lady-psy-dance-dance-party-gif-11731282",
    "https://tenor.com/view/handshake-ignore-modi-69-gif-13417556",
    "https://tenor.com/view/cats-cuteness-cute-cat-funny-funny-animals-gif-14796882",
    "https://tenor.com/view/the-good-the-bad-and-the-ugly-clint-eastwood-man-with-no-name-howdy-hello-gif-11628498",
    "https://tenor.com/view/howdy-cowboy-toy-story-gif-12394471",
    "https://tenor.com/view/horse-hi-whats-up-howdy-handshake-gif-16791307",
    "https://tenor.com/view/howdy-cute-dog-hat-hello-gif-17122582",
    "https://tenor.com/view/hi-cute-cat-hey-waving-howdy-gif-16434085",
    "https://tenor.com/view/howdy-partner-ho-gif-23450154",
    "https://tenor.com/view/wyld-jimbo-howdy-spin-point-cowboy-gif-16410228",
    "https://tenor.com/view/howdy-analmike-hello-hi-beard-gif-13632974",
    "https://tenor.com/view/hello-hey-corgi-hi-howdy-gif-13203090",
    "https://tenor.com/view/howdy-brad-pitt-gif-4956729",
    "https://tenor.com/view/howdy-cowgirl-cowboy-hat-texas-gif-15566698",
    "https://tenor.com/view/critical-role-crit-role-arsequeef-laura-bailey-cowboy-gif-13618685",
    "https://tenor.com/view/jimmy-fallon-tonightshow-hi-hello-gif-13958590",
    "https://tenor.com/view/madagascar-alex-the-lion-hi-there-hello-there-hey-there-gif-23421002",
    "https://tenor.com/view/hi-hey-there-wassup-hey-gurl-gif-22273737",
    "https://tenor.com/view/ted-hey-teddy-bear-gif-24792726",
    "https://tenor.com/view/hey-derek-muller-veritasium-hey-there-hi-gif-24985514",
    "https://tenor.com/view/hello-hello-there-hello-its-me-hi-hey-gif-21707523",
    "https://tenor.com/view/homie-sup-sup-homie-kristen-wiig-nod-gif-5654782",
    "https://tenor.com/view/hu-tao-genshin-heyhihello-eggstvick-discorduwu-gif-23555593",
    "https://media.tenor.com/y6aIM8CBK2cAAAAM/hey-fr-stuart-long.gif",
    "https://media.tenor.com/GIwH1TBlPUMAAAAM/elmo-hello.gif",
    "https://media.tenor.com/6mJBKtHHpMcAAAAd/mexicandad_rgv-hola.gif",
    "https://media.tenor.com/K4g5xM87CScAAAAM/hola-amores-laura-sanchez.gif",
    "https://media.tenor.com/W3ZRznuUAYEAAAAM/hola-mi-t%C3%ADo.gif",
    "https://media.tenor.com/YuHWmsYK6B8AAAAM/esteisi-isisnur.gif",
    "https://media.tenor.com/8xMVD9xwQZIAAAAM/hello-mayuka-ayaka-hello-niziu.gif",
    "https://media.tenor.com/N2JlFsx-xycAAAAM/hey-kajal.gif",
    "https://media.tenor.com/xWUVeusufFsAAAAM/galactic-republic-obi-wan-kenobi.gif",
    "https://media.tenor.com/vUawL7DT8PcAAAAM/hello-elijah.gif",
    "https://media1.tenor.com/m/DYPK6ZMqOu8AAAAd/laroche.gif",
    "https://media.tenor.com/dk0P7N0SlR8AAAAM/glados-portal.gif",
    "https://media.tenor.com/nL877OB3oT8AAAAM/project-sekai-shizuku-hinomori.gif",
    "https://media.tenor.com/okxvhyfjFiIAAAAM/hi-babybeans.gif",
    "https://media.tenor.com/Si06tFiR4NQAAAAM/maite-mainte.gif",
    "https://media1.tenor.com/m/47OJ5GEWSooAAAAd/ummed-umed.gif",
    "https://media.tenor.com/8cnbr1VZmDAAAAAM/johnn-depp-hi.gif",
    "https://media.tenor.com/yxNA07XPSagAAAAM/salutation-hi.gif",
    "https://media.tenor.com/lmeq7lTGWSAAAAA1/cat-greetings.webp",
    "https://media.tenor.com/PctcOEJVBEAAAAAM/salutations-greetings.gif",
    "https://media.tenor.com/lk4YvaVhjmUAAAAM/greetings-snail.gif",
    "https://media.tenor.com/H4d2npT9IEEAAAAM/greetings-and-salutations-darius-jeremy-pierce.gif",
    "https://media.tenor.com/yC09NhG2XxMAAAAM/salute-nigel-sylvester.gif",
    "https://media.tenor.com/0-VTD69L7OQAAAAM/cat-hat.gif",
    "https://media.tenor.com/dwZu8wjAsbEAAAAM/bom-dia-good-morning.gif",
    "https://media.tenor.com/DXghCAbmhpYAAAAM/hi-hello.gif",
    "https://media.tenor.com/qSNpDpFm5gUAAAAM/oh-hey-oh-hi.gif",
    "https://media.tenor.com/Xls8jPCIoN0AAAAM/ren%C3%A9e-slater.gif",
    "https://c.tenor.com/ajn2y5bPtZIAAAAd/tenor.gif",
    "https://c.tenor.com/TkfuPnvqHmUAAAAd/tenor.gif",
    "https://media.tenor.com/O5-Uwtc-C_4AAAA1/hello-chat-good-morning.webp"
]
function getHelloGif() {
    return helloGifs[Math.floor(Math.random() * helloGifs.length)]
}

client.login(process.env.TOKEN).catch((e) => { console.error(e) });