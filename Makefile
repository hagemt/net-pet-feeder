.PHONY: default dev run

default: dev

dev: node_modules
	yarn dev

node_modules: yarn.lock
	yarn install --ignore-platform

run: node_modules
	yarn build
	yarn start

tunnel:
	#ngrok http $PORT -subdomain=<if_you_paid> -auth=<if_you_want>
	# or: ngrok start cat # named tunnel(s) in ~/.ngrok2/ngrok.yml
