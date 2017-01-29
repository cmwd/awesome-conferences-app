REPO=cmwd/awesome-conferences-webserver
BUILD_IMAGE=$(REPO)_build
BUILD_NUMBER=$(TRAVIS_BUILD_NUMBER)

ifndef TAG
  TAG=local-env__$(shell git rev-parse --abbrev-ref HEAD)
endif

ifndef TRAVIS_BUILD_NUMBER
  BUILD_NUMBER=local-env__$(shell date +'%y-%m-%d_%H%M%S')
endif

build:
	docker build -t $(REPO):$(BUILD_NUMBER) .

push:
	docker tag $(REPO):$(BUILD_NUMBER) $(REPO):$(TAG)
	docker push $(REPO)

.PHONY: build push

