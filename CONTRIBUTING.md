# Abbreve contributing guidelines

Thank you for taking the time to contribute to our project. Please take a moment to read the following guidelines before contributing:

- [Code of Conduct](https://github.com/Njong392/Abbreve/blob/structure/CODE_OF_CONDUCT.md)
- [Appending new abbreviations](#appending-new-abbreviations)
- [Issues](#issues)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Making pull requests](#making-pull-requests)


## Appending new abbreviations

- You can append common abbreviations/acronyms used for communicating through the internet (social media) to the list of definitions in the abbreviations database.
- Do not make duplicate entries (always confirm that an entry does not exist by searching through the JSON file.
- Only English abbreviations are currently allowed.
- Ensure that your entries are error-free by double-checking before staging your files.
- Your entries should be in **T**itle **C**ase (e.g lgtm: **L**ooks **G**ood **To** **Me**, not looks good to me.)

## Issues

- Always create [issues](https://github.com/Njong392/Abbreve/issues) before making Pull Requests.
- Always ensure that your Pull Requests are linked to their corresponding Issues.

- Before you create an **Issue** ensure that there is no open issue that is similar to the one you want to create by visiting the [issues](https://github.com/Njong392/Abbreve/issues)


## Prerequisites

- Open Source Etiquette: If you've never contributed to an open source project before, have a read of [Basic etiquette](https://developer.mozilla.org/en-US/docs/MDN/Community/Open_source_etiquette) for open source projects.
- Basic familiarity with Git and GitHub: If you are also new to these tools, visit [GitHub for complete beginners](https://developer.mozilla.org/en-US/docs/MDN/Contribute/GitHub_beginners) for a comprehensive introduction to them
- [Node.js](https://nodejs.org/) is installed.

## Setup


### Setting up the project and making changes using CLI

Setting up the project and making changes


1. Fork this project by clicking the <a href="https://github.com/Njong392/Abbreve/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="15px" width="15px"></a> button in the top-right corner.
2. Assuming that your GitHub username is **emy**, open your terminal and do the following:

```sh
cd ~/Desktop
git clone git@github.com:emy/Abbreve.git 
```

3. Now, you will create a remote which will be used in tracking changes and keeping your local clone as well as your fork up-to-date:

```sh
cd Abbreve
git remote add abbreve git@github.com:mdn/content.git
```

> **Note**:  You can give any name to your remote. For this example, we are using `abbreve`

Now, you are ready to start making changes.

4. Run `git branch` to confirm that you are on the `main` branch. Then,
pull the latest changes and create a new branch (**my-changes** or whatever you want to call it) by doing the following:

```sh
git checkout main
git pull abbreve main
git checkout -b my-changes
```

> **Note**: Use a self-descriptive name for your feature branch (e.g `feat-featureName`, `bugFix-bugName`, `patch-patchName`). This helps us track it down in the future if we need to.

5. Next, you'll want to start the local preview service to see how the changes you'll make would look in production. Once started, this preview would be available at `http://localhost:3000/` within your browser. To do this, open a **new** terminal and run the following:

```sh
# switch to a new terminal
npm install
npm run dev
```

6. Make your desired changes to any of db.json, index.html, etc using your preferred editor. **Bear this in mind when making these changes:**
    - **Large chunks of work can be difficult to review, so try to group your changes into the smallest logical chunks that make sense, and create a separate pull request for each logical chunk.**

7. Once you're happy with your changes, add and commit them to your branch,
and then push the branch to your fork. Remember, the default name that
`git` assigned to the remote that represents your fork is `origin`.

    ```sh
    cd ~/abbreve
    git add .
    git commit
    git push -u origin my-work
    ```

    > **Note**: Do not commit package.json and/or package-lock.json file(s).

8. Perform a merge to sync your current branch with the upstream branch.

 ```bash
git fetch upstream
git merge upstream/main
```


### Setting up the project using GUI

#### NOTE

- Ensure that you have GitHub Desktop installed
- If not, then download it from [here](https://desktop.github.com/), getting the version for your system

1. Fork this project by clicking the <a href="https://github.com/Njong392/Abbreve/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="15px" width="15px"></a> button in the top-right corner.

2. Go to your forked repo in your account and click the green **code** dropdown button which presents you with a list of ways in which you can use to clone your fork

3. Choose the **open with GitHub Desktop** which opens up GitHUb Desktop on your machine, follow the on-screen guide

4. Click on the <a href="https://github.com/Njong392/Abbreve/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="15px" width="15px"></a> and create a new branch, which switches you to your new created branch

5. Open the project in your favourite editor (GitHub Desktop has a button that lets you open the project in VS Code)

6. Next, you'll want to start the local preview service to see how the changes you'll make would look in production. Once started, this preview would be available at `http://localhost:3000/` within your browser. To do this, open a **new** terminal and run the following:

```sh
# switch to a new terminal
npm install
npm run dev
```

7. Add your changes to your files and commit them by opening GitHub Desktop again (only if you closed it), type your commit message and commit your changes by simply clicking the **commit to yourBranchName**

8. Push your changes to your remote by clicking the **push** button


Now, it's time to make your PR

## Making pull requests

1. When you submit a pull request, several tests are automatically run
   as GitHub Actions. If
   any of these tests fail, it is your responsibility to try and
   resolve the underlying issue(s). If you don't know how to resolve the
   underlying issue(s), you can ask for help.

2. If your pull request has merge conflicts with the `main` branch (GitHub
   checks for this automatically and notifies you), you are responsible for
   resolving them. You can do this by merging the `main` branch into your
   branch (`git pull abbreve main`), and then pushing the updated branch to
   your fork (`git push`).

3. Each pull request should contain a single logical change or related set
   of changes that make sense to submit together. If a pull request becomes
   too large or contains too many unrelated changes, it becomes too difficult
   to review. In such cases, the reviewer has the right
   to close your pull request and ask that you submit a separate pull request
   for each logical set of changes that belong together.

4. Link the issue you have resolved in the Pull Request Template (e.g Closes/Fixes #392).
5. Use [Conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/) for your changes.
6. Do not re-open a pull request that a reviewer has closed.
    - Make sure to tick the "Allow edits from maintainers" box. This allows us to directly make minor edits / refactors and saves a lot of time.

- If adding a new feature:
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
  
- If fixing a bug:
  - The name of your PR should be a summary of the changes you are making. (For example fix: fix non-responsive navbar, feat: add prettier for code formatting)
  Provide a detailed description of the bug in the PR. Screenshots are nice.


## Remarks

If something is missing here, or you feel something is not well described, either directly create a PR or [create an issue](https://github.com/Njong392/Abbreve/issues).
