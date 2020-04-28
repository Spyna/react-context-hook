yarn test && \
yarn build && \
yarn prepare && \
yarn predeploy && \
yarn deploy && \
yarn release && \
git push --follow-tags origin master && npm publish
