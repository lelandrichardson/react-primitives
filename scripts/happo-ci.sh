#!/bin/bash

# Exit immediately if we encounter any errors. This will make it so any error
# that happens during the execution of this script will break the build. We want
# to use `set -ex` instead of the `-ex` option in the shebang so that this
# behavior applies even when executing this script via methods like `sh
# ./script.sh`.
set -ex

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  # This build is not triggered by a pull request or a push to an existing pull
  # request, so we won't have any place to post a comment if there are diffs.
  echo "This is not a pull request build, so skipping Happo."
  exit 0
fi

# Tell Happo where to find its config file.
export HAPPO_CONFIG_FILE="${TRAVIS_BUILD_DIR}/.happo.js"

run_happo_ci() {
  echo "Checking out $1"
  # Checkout the commit
  git checkout --quiet "$1"

  # Install dependencies and build the JavaScript bundle
  npm install
  npm run build:webpack

  # Run Happo for the current commit. We use `xvfb-run` so that we can run
  # Happo (which uses Firefox) in a headless display environment.
  xvfb-run -a happo run
}

# TRAVIS_COMMIT points to a shadow merge commit for PR builds. This is awkward,
# so we want to get the previous and current commits from the GitHub API based
# on the current PR.
COMMIT_RANGE=$(node scripts/getSHARangeFromPR.js)
PREVIOUS_COMMIT=$(echo "$COMMIT_RANGE" | cut -d. -f1)
CURRENT_COMMIT=$(echo "$COMMIT_RANGE" | cut -d. -f4)

# Check out the previous version and generate baseline snapshots
echo "Running Happo on previous version ($PREVIOUS_COMMIT)..."
run_happo_ci "$PREVIOUS_COMMIT"

# Check out the latest version and check for diffs
echo "Running Happo on latest version ($CURRENT_COMMIT)..."
run_happo_ci "$CURRENT_COMMIT"

URL_TO_DIFFS=$(happo upload)
echo "URL to diffs: $URL_TO_DIFFS"

export HAPPO_COMMIT_RANGE="$PREVIOUS_COMMIT...$CURRENT_COMMIT"

# update the PR with a link to the diff
node scripts/updatePR.js "$URL_TO_DIFFS"
