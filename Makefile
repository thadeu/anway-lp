.PHONY: tag patch minor major

BUMP := $(filter patch minor major,$(MAKECMDGOALS))

tag: ## Tag the next version and push it: make tag patch|minor|major
	@test -n "$(BUMP)" || { echo "usage: make tag patch|minor|major"; exit 1; }
	@test "$$(git branch --show-current)" = "main" || { echo "tag from main only"; exit 1; }
	@test -z "$$(git status --porcelain)" || { echo "working tree is not clean"; exit 1; }
	@git fetch --quiet origin main
	@test "$$(git rev-parse HEAD)" = "$$(git rev-parse origin/main)" || { echo "main is not in sync with origin/main"; exit 1; }
	@script/tag $(BUMP)

patch minor major:
	@:
