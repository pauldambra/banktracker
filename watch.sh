#! /bin/bash

set -eu

watchman-make -p 'index.html' -t copy_index -p 'app/**/*.js' -t bundle_javascript -p 'app/**/*.css' -t copy_styles