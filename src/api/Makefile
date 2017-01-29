# APP CONFIG
APP_DIR=.
# TOOLS
JEST=./node_modules/.bin/jest
NODEMON=./node_modules/.bin/nodemon
REPO=cmwd/awesome-conferences-api
BUILD_IMAGE=$(REPO)_build
BUILD_NUMBER=$(TRAVIS_BUILD_NUMBER)

ifndef TAG
  TAG=local-env__$(shell git rev-parse --abbrev-ref HEAD)
endif

ifndef TRAVIS_BUILD_NUMBER
  BUILD_NUMBER=local-env__$(shell date +'%y-%m-%d_%H%M%S')
endif

install:
	yarn install

run:
	@NODE_PATH=$(APP_DIR) \
		node ./server.js

run-dev:
	@NODE_PATH=$(APP_DIR) \
		supervisor -n -w src ./server.js

run-inspector:
	@NODE_PATH=$(APP_DIR) \
		node \
			--inspect \
			--debug-brk \
			./server.js

# TESTS
TEST_PATH=./test/**/*.test.js
TEST_DB_NAME=aclTest
ENV_TEST=test
REPORTER=spec
TEST_APP_PORT=8009

test:
	$(info Run tests for $(TEST_PATH))

	@NODE_ENV=$(ENV_TEST) \
	NODE_PATH=$(APP_DIR) \
	DB_NAME=$(TEST_DB_NAME) \
	APP_PORT=$(TEST_APP_PORT) \
	$(JEST)

test-watch:
	$(info Run tests and set watch for $(TEST_PATH))

	@NODE_ENV=$(ENV_TEST) \
	NODE_PATH=$(APP_DIR) \
	DB_NAME=$(TEST_DB_NAME) \
	APP_PORT=$(TEST_APP_PORT) \
	$(JEST) \
		--watch


test-inspector:
	$(info Run tests inspector for $(TEST_PATH))

	@NODE_ENV=$(ENV_TEST) \
	NODE_PATH=$(APP_DIR) \
	DB_NAME=$(TEST_DB_NAME) \
	$(JEST) \
		--inspect \
		--debug-brk

build:
	$(info Build docker image)
	mkdir -p ./temp/
	docker build -t $(BUILD_IMAGE)-$(BUILD_NUMBER) -f dockerfile.build .
	docker run $(BUILD_IMAGE)-$(BUILD_NUMBER) > ./temp/build.tar.gz
	docker build -t $(REPO):$(BUILD_NUMBER) -f dockerfile.dist .

push:
	docker tag $(REPO):$(BUILD_NUMBER) $(REPO):$(TAG)
	docker push $(REPO)

.PHONY: run run-dev run-inspector test test-watch test-inspector install build push
