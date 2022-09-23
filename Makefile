# 
# Simple makefile for play-ably
#
.DEFAULT_GOAL:=test

.PHONY: 

JS_FILE=play-ably.js

init: _checkToken
	npm install

listen: _checkToken
	node $(JS_FILE) listen

poke: _checkToken
	node $(JS_FILE) poke	 

_checkToken: 
	@grep -v "^//" $(JS_FILE) | grep -q "__API_TOKEN__"; \
		if [ $$? -eq 0 ]; then echo "Replace '__API_TOKEN__' with your API token."; exit 1; fi

