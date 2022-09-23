# Pub/Sub Play Code for ably.com

This is a simple publish/subscribe example to play with [ably.com](https://ably.com). 

## Requirements
* Nodejs
* GNU Make (optional)

## Play Scenario

1. Get your *ably* account and your API token. 
2. Replace `__API_TOKEN__` in the code with the value of your API token. 
3. Run `make init` to install depencies 
4. In one terminal run `make listen` to start the subscriber
5. In another terminal, run `make poke` to run the publisher

## Make Targets
* `init`: installs npm packages and a simple check on the API token value 
* `listen`: runs the code as a subscriber
* `poke`: runs the code as a publisher

