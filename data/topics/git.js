export const gitContent = {
  slug: "git",
  briefDescription: [
    "Git is a distributed version control system that tracks changes to your code over time. Every project folder that uses Git has a hidden .git directory storing the full history. You initialize a repo with git init. The three zones in Git are: the Working Directory (your actual files), the Staging Area (files prepared for the next commit via git add), and the Repository (committed history). The workflow is: make changes → git add <file> → git commit -m 'message'. Use git status to see what changed and git log to see commit history.",
    "Branching is Git's superpower. A branch is just a pointer to a commit. You create one with git branch feature-name or git checkout -b feature-name (create + switch in one). The default branch is usually called main (or master in older repos). Merging integrates changes from one branch into another: switch to the target branch, then git merge source-branch. If the same lines were changed in both branches, you get a merge conflict — Git marks the conflicting sections in the file and you manually resolve them, then stage and commit. Rebasing (git rebase) replays your commits on top of another branch for a cleaner, linear history.",
    "GitHub is a hosting platform for Git repositories that adds collaboration features. After pushing your local repo to GitHub with git push, teammates can clone it (git clone url), create pull requests (PRs) to propose changes, and review each other's code before merging. The fork + PR workflow is standard for open source: fork the repo to your account, clone your fork, make changes on a new branch, push, then open a PR to the original repo. Important commands: git pull (fetch + merge remote changes), git fetch (download without merging), git stash (temporarily save uncommitted work), git reset and git revert for undoing changes.",
  ],
  keyConcepts: [
    "git init: initialize a new git repo in the current directory",
    "git clone <url>: download a remote repository to your machine",
    "git status: show changed, staged, and untracked files",
    "git add <file> / git add .: stage changes for the next commit",
    "git commit -m 'message': save staged changes to history with a descriptive message",
    "git log / git log --oneline: view commit history",
    "git branch <name> / git checkout -b <name>: create a branch",
    "git checkout <branch> / git switch <branch>: switch to a branch",
    "git merge <branch>: merge another branch into the current branch",
    "git push origin <branch>: push commits to remote (GitHub)",
    "git pull: fetch remote changes and merge into current branch",
    "git stash / git stash pop: temporarily save/restore uncommitted work",
    ".gitignore: list files/folders Git should NOT track (node_modules, .env, etc.)",
  ],
  codeExample: {
    language: "bash",
    title: "Git Workflow — Init, Add, Commit, Branch, Merge, Push, Pull Request",
    code: `# ── Start a new project ──
git init                          # creates .git folder
git add .                         # stage all files
git commit -m "Initial commit"

# ── Connect to GitHub ──
git remote add origin https://github.com/user/repo.git
git push -u origin main           # push + set upstream

# ── Clone an existing repo ──
git clone https://github.com/user/repo.git
cd repo

# ── Daily workflow ──
git status                        # what changed?
git diff                          # see exact changes
git add src/components/Button.jsx # stage specific file
git add .                         # stage everything
git commit -m "feat: add Button component"
git push                          # push to remote

# ── Branching for a new feature ──
git checkout -b feature/user-auth  # create + switch
# ... make changes ...
git add .
git commit -m "feat: add JWT authentication"
git push origin feature/user-auth

# ── Merge branch into main ──
git checkout main                 # switch to main
git pull                          # get latest changes
git merge feature/user-auth       # merge the feature
git push                          # push merged main

# ── Resolve merge conflict ──
# Git marks conflicts in the file:
# <<<<<<< HEAD
# your version
# =======
# their version
# >>>>>>> feature/user-auth
# Edit the file to keep the right code, then:
git add conflicted-file.js
git commit -m "resolve merge conflict"

# ── Undo changes ──
git checkout -- file.js           # discard uncommitted changes to a file
git reset HEAD file.js            # unstage a file
git revert <commit-hash>          # undo a commit (creates new commit)
git reset --hard HEAD~1           # dangerous: erase last commit entirely

# ── Stash work in progress ──
git stash                         # save current changes temporarily
git checkout main                 # switch to fix a bug
# ... fix bug, commit ...
git checkout feature/user-auth
git stash pop                     # restore your work

# ── View history ──
git log --oneline                 # one line per commit
git log --graph --all             # visual branch tree
git show <commit-hash>            # show details of one commit

# ── .gitignore (create this file in project root) ──
# node_modules/
# .env
# .env.local
# dist/
# .DS_Store`,
  },
}
