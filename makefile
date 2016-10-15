
.DEFAULT_GOAL:= build

ensure_dist:
	mkdir -p dist

clean_dist: ensure_dist
	rm -rf dist/*

copy_index: clean_dist
	cp ./index.html dist/index.html

bundle_javascript:
	./node_modules/.bin/browserify --entry ./app/start.js --outfile ./dist/bundle.js --transform [ babelify ]

build: copy_index bundle_javascript

dev: build
	cd dist && python -m SimpleHTTPServer