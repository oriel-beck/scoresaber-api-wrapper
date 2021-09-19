# [scoresaber-api-wrapper](https://www.npmjs.com/package/scoresaber-api-wrapper)
Class based wrapper for **[ScoreSaber](https://new.scoresaber.com)**'s API with TypeScript typings.

## Installation

```npm install scoresaber-api-wrapper```

 - This module uses **[`petitio`](https://www.npmjs.com/package/petitio)** to make the API requests

## Usage

### Get a player
```js
const player = await getPlayer('1234...')

console.log(player.name) // example_name
```

### Find a player
```js
const players = await getPlayers('potato')

console.log(players) // Array of smaller player objects

// get full player profile
const player1 = players[0].getFullPlayer()
```

### Find a player score
## Method 1
```js
const player = await getPlayer('1234...')

const scores = await player.getScores('recent')

console.log(scores) // Array of scores
```
## Method 2
```js
const scores = await getPlayerScores('1234...', 'recent')

console.log(scores) // Array of scores
```

### Build a simple Discord Bot with [`discord.js`](https://www.npmjs.com/package/discord.js)

```js
const { getPlayer } = require("scoresaber-api-wrapper");
const Discord = require("discord.js");

const client = new Discord.Client();

const TOKEN = "abc123";
const PREFIX = "!";

client.once("ready", () => {
    console.log(`${client.user.tag} is logged in!`);
})

client.on("message", async (message) => {
    if (message.author.bot) return;
    //Check if the user used the !player command (make sure to check if they provided a player ID)
    if (message.content.startsWith(`${PREFIX}player`)) {
        const player = await getPlayer(message.content.split(' ')[1])

        message.channel.send(`Found the player ${player.name}`)
    }
})

//Login to Discord
client.login(TOKEN);
```
