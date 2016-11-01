# APP CONFIG
APP_DIR=.
# TOOLS
MOCHA=./node_modules/.bin/mocha
NODEMON=./node_modules/.bin/nodemon

# APP
run:
	@NODE_PATH=$(APP_DIR) \
		node ./server.js

run-dev:
	@NODE_PATH=$(APP_DIR) \
		supervisor -n -w src ./server.js

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
	$(MOCHA) \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TEST_PATH)

test-watch:
	$(info Run tests and set watch for $(TEST_PATH))

	@NODE_ENV=$(ENV_TEST) \
	NODE_PATH=$(APP_DIR) \
	DB_NAME=$(TEST_DB_NAME) \
	APP_PORT=$(TEST_APP_PORT) \
	$(NODEMON) \
		--quiet \
		--exec " \
				$(MOCHA) \
		 			--reporter $(REPORTER) \
		 			--ui tdd \
		 			--growl $(TEST_PATH)"

test-inspector:
	$(info Run tests inspector for $(TEST_PATH))

	@NODE_ENV=$(ENV_TEST) \
	NODE_PATH=$(APP_DIR) \
	DB_NAME=$(TEST_DB_NAME) \
	$(MOCHA) \
		--inspect \
		--debug-brk \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TEST_PATH)

.PHONY: test test-watch test-inspector
