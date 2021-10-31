const { Client, Intents, ThreadChannel, Channel } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

// Options to create a new thread

const client = new Client({ intents: myIntents });

const MessageTimes = [];


client.on('messageCreate', (message) => {
    var response = "";
    //if (message.channelId)
    var text = message.content.toLowerCase();
    if (message.author.bot) {
        return; // the bot wont respond to itself 
    }

    if (["hi", "hey", "hello", "hello there"].indexOf(text) >= 0) {
        console.log("hit");
        message.reply(getHelloGif());
        return;
    }

    if(message.mentions.users.each(m=>{
        console.log();
        console.log();
        console.log(m);
        
    }))
    if (response != "")
        message.channel.send(response)
    return;

})


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
    "https://tenor.com/view/hello-there-hi-greetings-princess-bride-mandy-patinkin-gif-17710385",
    "https://tenor.com/view/maite-perroni-proactiv-hi-hello-gif-20314223",
    "https://tenor.com/view/hey-girl-me-passing-by-my-ex-gif-9374870",
    "https://tenor.com/view/inside-out-joy-hi-hey-hello-gif-14388296",
    "https://tenor.com/view/olafs-frozen-adventure-olaf-hello-darkness-hello-frozen-gif-15584286",
    "https://tenor.com/view/milk-and-mocha-hugs-bear-couple-love-cute-gif-16209598",
    "https://tenor.com/view/baby-yoda-baby-yoda-wave-baby-yoda-waving-hi-hello-gif-15975082",
    "https://tenor.com/view/hi-husky-hello-cute-gif-15361405",
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
    "https://tenor.com/view/hey-gif-20083062",
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
    "https://tenor.com/view/hi-hello-greet-smile-wave-gif-17222872"

]
function getHelloGif() {
    return helloGifs[Math.floor(Math.random() * helloGifs.length)]
}

client.login(process.env.TOKEN).catch((e) => { console.error(e) });