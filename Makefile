IMAGE_TAG ?= hagemt/cat-server:latest

HTTP_PORT ?= 3003
CONTAINER ?= feed

# runs web app outside container (local R&D only, or production)
_: dev

# WIP: runs web app in a container (don't currently work)
_ui: clean
	make docker
.PHONY: _ui

clean: stop
	-docker rmi $(IMAGE_TAG)
	@git clean -dix
.PHONY: clean

dev: node_modules
	yarn dev
.PHONY: dev

docker: sane
	[ -n "$(shell docker image ls $(IMAGE_TAG) -q)" ] \
		|| docker build --build-arg HTTP_PORT=$(HTTP_PORT) \
		-t $(IMAGE_TAG) \
		-- .
	[ -n "$(shell docker container ps -f name=$(CONTAINER) -q)" ] \
		|| docker run --rm --detach --name=$(CONTAINER) \
		-p 127.0.0.1:$(HTTP_PORT):$(HTTP_PORT)/tcp \
		-v /opt/feed:/opt/feed:rw \
		-- $(IMAGE_TAG)
.PHONY: docker

node_modules: yarn.lock
	yarn install --ignore-platform

run: node_modules
	yarn build
	yarn start
.PHONY: run

sane:
	# builders need these installed:
	[ -x "$(shell command -v docker)" ]
	[ -x "$(shell command -v git)" ]
	[ -x "$(shell command -v ngrok)" ]
	[ -x "$(shell command -v yarn)" ]
.PHONY: sane

stop: sane
	-docker stop $(CONTAINER)

tunnel: sane
	#ngrok http $PORT -subdomain=<if_you_paid> -auth=<if_you_want>
	# or: ngrok start cat # named tunnel(s) in ~/.ngrok2/ngrok.yml
.PHONY: tunnel
