## GitHubRepositories

## General info
GitHub Repo Name allows to get list of repositories that GitHub user has been pushed remote.\
The list is filtered descending by pupular (stars given) and there is also a possibility to get more data about each repository.\
By clicking on name you gain an extra data about languages used in project with the size.

## Assumptions
App has two versions.\
The first one had written in Vanilla JS and it is available on master.\
There is the second version based on the previous one, written in React available on branch react_solution.
GitHub delivers API for all theirs public data - I used some of the requests.\
There is a request limit without authorization which I managed to reach.\
Adding '?access_token=' - empty token at the end of url solved this problem.\
Closer research is needed to consider it as bug.\
Error handling has implemented in sensitive code parts.\
Clean code rules were singposts for code refactoring as needed.\
The mockup of the application was created in accordance with UI/UX assumptions.
For styles simplicity there is a reason to use Tailwind e.g.\
GitHub Pages has been used as staging - working page url is available at the bottom.

## Technologies
Project is created with:
* HTML5
* CSS
* React
* Axios

## Tools
The following tools were used:
* Git
