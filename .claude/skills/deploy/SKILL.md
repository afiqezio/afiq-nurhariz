---
name: deploy
description: Build, check and publish the portfolio to GitHub Pages at harizafiq.com. Use only when the user asks to deploy or publish the site.
disable-model-invocation: true
---

# Deploy the portfolio

`npm run deploy` publishes whatever is already in `dist/` and does not build, so a deploy without a fresh build ships stale files. Follow these steps in order and stop at the first failure.

1. Run `git status`. The deploy publishes a build of the working tree, not of a commit. If there are uncommitted changes, list them and confirm with the user that they are meant to go live.
2. Run `npm run lint` and report any problems in files changed since the last deploy.
3. Run `npm run build`. It type-checks and then builds. If it fails, stop: do not deploy the old `dist/`.
4. Run `npm run preview` and check the homepage and one case study load without console errors.
5. Run `npm run deploy`. It pushes `dist/` to the `gh-pages` branch with the `harizafiq.com` CNAME.
6. Confirm the site responds: `curl -sI https://harizafiq.com` should return 200. GitHub Pages can take a minute or two to serve the new build.
7. Report what was deployed, from which commit or working-tree state, and which checks ran.
