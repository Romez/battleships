make install:
	npm ci

lint:
	npx eslint .

start:
	npx webpack-dev-server --open

build:
	npx webpack -p --env production

test:
	npm test
