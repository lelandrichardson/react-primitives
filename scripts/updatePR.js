#!/usr/bin/env node

const github = require('octonode');

const {
  HAPPO_COMMIT_RANGE,
  TRAVIS_PULL_REQUEST,
  TRAVIS_COMMIT,
  TRAVIS_COMMIT_RANGE,
  TRAVIS_EVENT_TYPE,
  TRAVIS_REPO_SLUG,
  GH_ACCESS_TOKEN,
} = process.env;

const LABEL = 'Visual diffs';

process.stdout.write(`PR Number: ${TRAVIS_PULL_REQUEST}\n`);
process.stdout.write(`Commit SHA: ${TRAVIS_COMMIT}\n`);
process.stdout.write(`Commit range: ${TRAVIS_COMMIT_RANGE}\n`);
process.stdout.write(`Happo commit range: ${HAPPO_COMMIT_RANGE}\n`);
process.stdout.write(`Reason for Travis build: ${TRAVIS_EVENT_TYPE}\n`);

const client = github.client(GH_ACCESS_TOKEN);

const ghIssue = client.issue(TRAVIS_REPO_SLUG, TRAVIS_PULL_REQUEST);

const diffURL = process.argv[2];

function handleError(err) {
  if (err) {
    process.stderr.write(`Error: ${err}\n`);
    process.exit(1);
  }
}

if (diffURL) {
  // There were visual diffs, so we want to post a comment to the PR and add a
  // label.

  const commitsInBuild = HAPPO_COMMIT_RANGE
    || TRAVIS_COMMIT_RANGE
    || TRAVIS_COMMIT;

  ghIssue.createComment({
    body: `:lipstick: [Visual diffs or new examples were found](${diffURL}) for ${commitsInBuild}.`,
  }, handleError);

  ghIssue.info((err, data) => {
    handleError(err);

    // Get all the labels as an array of strings.
    const labels = data.labels.map(label => label.name);

    // If the label hasn't been added, add it.
    if (labels.indexOf(LABEL) === -1) {
      labels.push(LABEL);
      ghIssue.update({ labels }, handleError);
    }
  });
} else {
  // There were no visual diffs, so we want to remove the label if it was
  // previously added.
  ghIssue.info((err, data) => {
    handleError(err);

    // Get all the labels as an array of strings.
    const labels = data.labels.map(label => label.name);

    // If the label has been added, remove it.
    const labelIndex = labels.indexOf(LABEL);
    if (labelIndex !== -1) {
      labels.splice(labelIndex, 1);
      ghIssue.update({ labels }, handleError);
    }
  });
}
