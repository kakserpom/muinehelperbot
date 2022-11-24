 #!make
.PHONY: init run all

all: init run

init:
	npx prisma migrate deploy
	#node /app/bin/init.js
run:
	node /app/bin/bot.js
