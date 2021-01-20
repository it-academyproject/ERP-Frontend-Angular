# ITProject-ERP-Frontend

## I. Project Seed

For this project, whe have a given repo named ITProject-ERP-Frontend,
with a GitHub remote URL:  https://github.com/it-academyproject/ITProject-ERP-Frontend.git

In this documentation:

* We will use 'localProjectFolderName' as a generic alias for the local folder's name
* We will use 'repoURL' as a generic alias for the remote repo's URL
* We will use 'featureBranchName' as a generic for the branches generated from 'Dev'
* We will use 'yourGitHubName' and 'yourGitHubEmail' as alias for your user name and email registered in your GitHub account

Given a GitHub remote repo with files '.gitignore' and 'README.md' already in it, and wanting to set up a fresh Angular 'ERP' project inside that repo, follow next steps in terminal or console:

****

### REQUIREMENTS

Skip the steps of this section if you already have Node.js, git and Angular installed in your local machine, and a valid GitHub account.
If not, follow required steps: 

1. Download and install git CLI if you haven't yet
https://git-scm.com/

2. Register in GitHub if you have any account created yet
https://github.com/

Then check for its version, if installation whent OK.
Type this in your terminal or console: git --version

Then, in your machine, open a terminal or console and...

2.1. Set up your name and email for local git CLI.
It must match the name and email you registered in GitHub when you signed up before.
* git config –-global user.name yourGitHubName
* git config –-global user.email yourGitHubEmail

2.2. Check existing name and email. They must match what you typed in before.
* git config –-global user.name
* git config –-global user.email

3. Downlad and install Node.js if you haven't yet
https://nodejs.org/es/
Check that installation whent OK. Node version should appear in terminal or console if you type: node -v

4. Downlad and install Angular if you haven't yet
https://angular.io/
Install Angular CLI globally in your machine: npm install -g @angular/cli
Then check for its version, if installation whent OK. Type this in your terminal or console: ng v 

****

### THEN FOLLOW NEXT STEPS

1. Clone the repo from remote to local:	git clone repoURL

2. Access that folder in local: cd localProjectFolderName
IMPORTANT: For the following steps, you must be inside the localProjectFolderName folder
* (optional) check the branch we're in is "main": git branch

3. Pull Dev branch, for safety reasons: git pull origin Dev
* (optional) check the branch. Although Dev was pulled, it doesn't show yet: git branch

4. Switch to Dev branch: git checkout Dev (console give us feedback of branch switched)

5. (optional) check that branches Dev and main exist: git branch (now Dev is shown)
Make sure we're on Dev branch. Checkout branch if needed.

6. Create new feature branch with ID as stated in SCRUM: 
git checkout -b featureBranchName
* (optional) check the branch we're in is featureBranchName: git branch
Checkout branch if needed.

7. Copy .gitignore and README files in a backup folder outside the localProjectFolderName
 
8. Erase .gitignore and README inside localProjectFolderName, since Angular CLI will fail to init project in that folder because those 2 files already exist.
* (optional) check previous deletion was registered in git: git status
A warning message related deletion of  .gitignore and README files should arise.
Don't worry. We will recover those 2 original files from the bckup folder later
 
9. Finally, init Angular project without overriding existing git folder.
To do so, make sure you're in localProjectFolderName. Then enter following command...
ng new localProjectFolderName --skip-git --directory=./
This command wil init Angular project in localProjectFolderName, not in a subfolder, and it will be done without overriding original git file. When configurating the project, select: SPA (Routing yes) and SASS
* (optional) check .gitignore and README are modified and all the rest of Angular's installation appear as new fiels: git status

10. Now, erase Angular's .gitignore and README from localProjectFolderName 
* (optional) check .gitignore and README were deleted: git status

11. And recover old original Angular's .gitignore and README files from backup folder. Remember? And paste them in localProjectFolderName 
 
12. Check all the recovery process went fine: git status
Now, no warnings related to .gitignore and README should appear.
 
13. Modify .gitignore, to ignore node_modules, when pushing to GitHub.
NOTE: Remember to use the command npm update, to download node-modules as stated in package.json of your Angular project, when you're cloning a repo to local. But never push node-modules to GitHiub, since the folder is too big sized.
So just add this lines to top of .gitignore file: 

/node_modules

NOTE: In Visual Studio Code, ignored files and olders apperar in gray color in project tree.

And as said before, download node-modules for your project, if you haven't yet.
Just type in your terminal or console: npm update

14. Pull Dev branch state before pushing featureBranchName:  git pull origin Dev

15. Add changes (we did in .gitignore) to Stage. Then Commit with a message.
Example message: "project init + node-modules ignored"
* (optional) check there's no warning: git status

16. Pull Dev branch state before pushing featureBranchName:  git pull origin Dev

21. Push featureBranchName: git push origin featureBranchName

22. Ask for a pull request in GitHub, from base 'Dev' to compared 'featureBranchName'

****

### ANGULAR COMMANDS

In your terminal or console, type the following commands to...

* open development server: ng serve -o 

* restart development server: ng serve

* run Kharma test runner: ng test 

* run test coverage and create coverage folder in project: ng test --no-watch –code-coverage
(Open its index.html in browser to see the coverage UI)

* stop server or stop test runner: Ctr+C (in Windows, Linux) , Cmd+C (in Mac)

* build for development: ng build

* build for production: ng build --prod
