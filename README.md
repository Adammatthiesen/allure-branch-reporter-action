# allure-branch-reporter-action

Fork of [allure-report-branch-js-action](https://github.com/mgrybyk-org/allure-report-branch-js-action) for the @withstudiocms org

## Usage

1. Enable Pages in your repository settings.
![Github Pages](docs/github_pages.png "Github Pages")

2. In your workflow yaml
```yaml
permissions:
  contents: write

steps:
  - name: Checkout gh-pages
    uses: actions/checkout@v3
    if: always()
    continue-on-error: true
    with:
      ref: gh-pages # branch name
      path: gh-pages-dir # checkout path

  - name: Allure Report Action
    uses: withstudiocms/allure-branch-reporter-action@main
    if: always()
    continue-on-error: true
    id: allure # used in comment to PR
    with:
      report_id: 'self-test'
      gh_pages: 'gh-pages-dir'
      report_dir: 'allure-results'

  - name: Git Commit and Push Action
    uses: mgrybyk-org/git-commit-pull-push-action@v1
    if: always()
    with:
      repository: gh-pages-dir
      branch: gh-pages
      pull_args: --rebase -X ours
```

### Adding PR Comment

Make sure to set `id` in `withstudiocms/allure-branch-reporter-action@main` step.

```yaml
permissions:
  # required by https://github.com/thollander/actions-comment-pull-request
  pull-requests: write

steps:
  # After publishing to gh-pages
  - name: Comment PR with Allure Report link
    if: ${{ always() && github.event_name == 'pull_request' && steps.allure.outputs.report_url }}
    continue-on-error: true
    uses: thollander/actions-comment-pull-request@v2
    with:
      message: |
        ${{ steps.allure.outputs.test_result_icon }} [Allure Report](${{ steps.allure.outputs.report_url }}) | [History](${{ steps.allure.outputs.report_history_url }})
      comment_tag: allure_report
      mode: recreate
```

## API

Please see [action.yml](./action.yml)

## Troubleshooting

### Issues on push to gh-pages

Log `! [rejected]        HEAD -> gh-pages (non-fast-forward)`

Do not run your workflow concurrently per PR or branch!
```yaml
# Allow only one job per PR or branch
concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.ref }}
  cancel-in-progress: true # true to cancel jobs in progress, set to false otherwise
```

### Running in Windows or MacOS

Make sure you have Java installed in prior to running the action.
GitHub runners ubuntu-latest, windows-latest, macos-latest have Java installed so no action is required.

## Credits

- [thollander/actions-comment-pull-request](https://github.com/thollander/actions-comment-pull-request) for building Github Action that comments the linked PRs