build:
	docker build . -t itseris/portfolio:latest

push: build
	docker push itseris/portfolio:latest

lint:
	npx standard --fix

run: build
	docker run -p 8080:80 -it itseris/portfolio:latest

run-dev: build
	docker run -p 8080:80 -v $(PWD):/usr/share/nginx/html:ro -it itseris/portfolio:latest
