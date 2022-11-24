 #!make
.PHONY: init run all

all: run

init:
	node /app/bin/init.js
run:
	npx prisma migrate deploy
	node /app/bin/bot.js
