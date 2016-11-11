# APP CONFIG
APP_DIR=.
# TOOLS
WEBPACK=./node_modules/.bin/webpack
NODE=./node_modules/.bin/babel-node
ESLINT=./node_modules/.bin/eslint
ESLINT_FORMATTER=./node_modules/eslint-codeframe-formatter

# APP
run:
	@NODE_PATH=$(APP_DIR) $(WEBPACK) -p & \
	NODE_PATH=$(APP_DIR) BABEL_ENV=node $(NODE) ./server/server

run-dev:
	@NODE_PATH=$(APP_DIR) $(WEBPACK) -w & \
	NODE_PATH=$(APP_DIR) BABEL_ENV=node $(NODE) ./server/server

run-inspector:
	@NODE_PATH=$(APP_DIR) BABEL_ENV=node \
		$(NODE) \
			--inspect \
			--debug-brk \
			./server/server

test-linter:
	$(ESLINT) --format=$(ESLINT_FORMATTER) .


.PHONY: run run-dev run-inspector test-linter
