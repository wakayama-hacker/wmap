#!/usr/bin/env bash

set -e

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

rm -fr .git
rm -fr .gitignore

git init
git config user.name $GIT_USER
git config user.email $GIT_EMAIL

git add config.json
git add css
git add fonts
git add index.html
git add img
git add js
git add json
git add style.css

touch .nojekyll
git add .nojekyll
git commit --quiet -m "Deploy from travis"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
