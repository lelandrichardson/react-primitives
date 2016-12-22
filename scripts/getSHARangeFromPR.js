#!/usr/bin/env node

const github = require('octonode');

const {
  TRAVIS_PULL_REQUEST,
  TRAVIS_REPO_SLUG,
  GH_ACCESS_TOKEN,
} = process.env;

const client = github.client(GH_ACCESS_TOKEN);

const ghPR = client.pr(TRAVIS_REPO_SLUG, TRAVIS_PULL_REQUEST);

function handleError(err) {
  if (err) {
    process.stderr.write(`Error: ${err}\n`);
    process.exit(1);
  }
}

ghPR.info((prErr, prData) => {
  handleError(prErr);

  // The base SHA that we get back from the GitHub API references the latest
  // HEAD SHA of the branch the PR is opened on. If the PR branch hasn't been
  // rebased in a while, there might be extra commits in there than what we
  // want.
  //
  // In order to get the correct SHA, we need to look at the number of
  // commits before the HEAD SHA. We do this instead of simply returning SHA~#
  // so that GitHub will linkify the commit range for us properly.
  //
  // There might be a way to do this that does not require chained API calls,
  // but given the data we get, I don't currently see one. We could, however,
  // decide to take screenshots of the base branch's HEAD, and the merge
  // commit's HEAD, which might even give us better protection, but I think that
  // would actually end up being unexpected and confusing so I decided to not go
  // down that route.
  const ghRepo = client.repo(TRAVIS_REPO_SLUG);

  ghRepo.commit(`${prData.head.sha}~${prData.commits}`, (commitErr, commitData) => {
    handleError(commitErr);
    process.stdout.write(`${commitData.sha}...${prData.head.sha}\n`);
  });
});
