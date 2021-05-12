yarn test && \
yarn build && \
yarn declaration:build && \
yarn prepare && \
yarn predeploy && \
yarn deploy && \
yarn release && \
git push --follow-tags origin master && npm publish
