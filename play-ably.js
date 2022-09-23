/*
 * A super simple pub/sub client code to play with ably.com
 * 
 * Based on the quickstart guide published by ably. 
 */

// replace the content of `apiToken` with your token
const apiToken = '__API_TOKEN__';

const Ably = require('ably');
const ably = new Ably.Realtime(apiToken);

main();

// the main function
function main() {
    const pokeMode = getPokeMode();

    // Connect to Ably
    ably.connection.on('connected', () => {
      console.log('Connected to Ably!');
    });
    
    // Get the channel to connect to
    const channel = ably.channels.get('roozbeh');
    
    if (pokeMode) {
        console.log('About to poke.');
        poke(channel, 'hello!');
        poke(channel, 'hola!');
        poke(channel, 'Živjo!');
        poke(channel, 'dorud!');
    } else {
        console.log('About to listen.');
        listen(channel);
    }
    
    // Register connection close callback
    ably.connection.on('closed', () => {
      console.log('Closed the connection to Ably.');
    });
    
    var timeout = 2000;
    if (!pokeMode) {
        timeout = 10 * timeout;
    }
    
    // close the connection after `timeout` milliseconds
    setTimeout(() => {
      // Close the connection
      ably.connection.close();
    }, timeout);    
}

// listens to whoever poking
function listen(channel) {
    // Subscribe to the channel
    channel.subscribe('poke', (message) => {
        console.log(`Received a poke: ${message.data}`);
    });
}

// pokes whoever listening
function poke(channel, message) {
    channel.publish('poke', message);
    console.log('poke: ' + message);
}

// decides on the operation mode based on a simple cli args evaluation
function getPokeMode() {
    if (process.argv.length < 3) {
        showUsage();
    }
    var pokeMode = (process.argv[2] == 'poke');
    
    if (!pokeMode && process.argv[2] != 'listen') {
        showUsage();
    }
    return pokeMode;
}

// show usage and exit with an error code
function showUsage() {
    console.log('Usage: test-ably <poke|listen>');
    process.exit(1);
}

