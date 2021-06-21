dev: node_modules
	yarn dev
.PHONY: dev

node_modules: yarn.lock
	yarn install --ignore-platform
