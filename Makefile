build:
	docker build -t "client" ./client
	docker build -t "api" ./api

run:
	docker-compose up

stop:
	docker-compose down