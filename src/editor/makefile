REPO=cmwd/awesome-conferences-editor
BUILD_IMAGE=$(REPO)_build
BUILD_NUMBER=$(TRAVIS_BUILD_NUMBER)

ifndef TAG
	TAG=local-env__$(shell git rev-parse --abbrev-ref HEAD)
endif

ifndef TRAVIS_BUILD_NUMBER
	BUILD_NUMBER=local-env__$(shell date +'%y-%m-%d_%H%M%S')
endif

install:
	$(info Install dependencies)
	yarn install

test:
	$(info Run tests)
	npm test

build:
	$(info Build docker image)
	mkdir -p ./temp/
	docker build -t $(BUILD_IMAGE)-$(BUILD_NUMBER) -f dockerfile.build .
	docker run $(BUILD_IMAGE)-$(BUILD_NUMBER) > ./temp/build.tar.gz
	docker build -t $(REPO):$(BUILD_NUMBER) -f dockerfile.dist .

push:
	docker tag $(REPO):$(BUILD_NUMBER) $(REPO):$(TAG)
	docker push $(REPO)

.PHONY: install test build push
