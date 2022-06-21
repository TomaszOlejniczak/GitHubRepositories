const button = document.getElementById("getList");
const repoList = document.getElementById("repoList");
const repoName = document.getElementById("repoName");
const repoStars = document.getElementById("repoStars");
const repoLang = document.getElementById("repoLang");
const input = document.getElementsByClassName("input");
const placeholder = document.getElementById("placeholder");
const table = document.getElementById("table");
// variables initialization

button.addEventListener("click", () => { // starting the whole action on Search button click
  dataValidation();
});

const getList = async () => { // request for general data about user
  const baseURL = `https://api.github.com/users/`;
  try {
    const username = document.getElementById("username").value;

    if (username === "") { // validation due empty input
      table.style.visibility = "hidden";
      repoLang.style.visibility = 'hidden';
      placeholder.innerHTML = 'Fill user name field, please!';
    } else {
      const response = await fetch(`${baseURL}${username}/repos?access_token=`);
      const data = await response.json();

      return [data, username];
    }
  } catch (err) {
    return [{ message: err }, ""];
  }
};

const dataValidation = () => { // validation and useful data selection
  try {
    getList().then((data) => {
      const [{ message }, username] = data;

      const response = data[0];
      if (typeof message === "string") { // validation due user cannot be found
        table.style.visibility = "hidden";
        repoLang.style.visibility = 'hidden';
        placeholder.innerHTML = 'User not found!';
      } else {
        dataInject(username, processResponse(response));
      }

    });
  } catch (err) {
    placeholder.innerHTML = message;
  }
};

const getCodeLang = async (repoName, userName) => {
  try {
    const baseURL = `https://api.github.com/repos`;

    const response = await fetch(`${baseURL}/${userName}/${repoName}/languages?access_token=`);
    const data = await response.json();

    return data;
  } catch (err) {
    placeholder.innerHTML = err.message;
  }
};

const dataInject = (username, response) => { // creating elements and further data filling using prepared data
  repoLang.style.visibility = 'hidden';
  placeholder.innerHTML = `<span>${username}</span> has pushed <span>${response.length}</span> remote repos`;
  // general counts of the response
  if (response.length !== 0) {
    table.style.visibility = 'visible';
  } else {
    table.style.visibility = 'hidden';
  }// validation through repositories total amount
  repoList.innerHTML = '';

  response.forEach((item) => {
    const repoName = item[0];
    const starsCount = item[1];
    const rowCell = document.createElement("tr");
    const langCell = document.createElement("td"); // initialization ingredients for data injection

    const repoCell = rowCell.appendChild(document.createElement("td"));
    repoCell.innerText = repoName; // filling cells with repositories names
    repoCell.style.textAlign = 'left';
    repoCell.style.cursor = 'pointer';

    const starsCell = rowCell.appendChild(document.createElement("td"));
    starsCell.innerText = starsCount; // filling cells with stars counts which sort the order of the names
    starsCell.style.textAlign = 'right';

    repoCell.addEventListener("click", () => {
      getCodeLang(repoName, username).then((data) => { // action with earlier promise
        try {
          const langNames = Object.keys(data);
          if (langNames.length == 0) {
            langCell.innerText = 'No data!'; // validation due no language data
          } else {
            repoLang.style.visibility = 'visible';
            
            langCell.innerHTML = langNames.map((item) => `<b>${item}</b> (${data[item]} B)<br>`).join('');
            // filling cell (on click action) with fetched data about repository language used
            langCell.style.fontSize = '13px';
          }
        } catch (err) {
          langCell.innerText = err.message;
        }
        rowCell.appendChild(langCell);
      });
    });

    repoList.appendChild(rowCell);
  });
};

const processResponse = (response) => {
  return response
    .map((repo) => [repo.name, repo.stargazers_count])
    .sort((a, b) => b[1] - a[1]);
}; /* function for create list with repositories names and popular rating 
with descending filtering */

document.addEventListener(
  "keyup",
  (logKey = (event) => {
    if (event.key === 13 || event.keyCode === 13) {
      button.click();
    }
  })
); // function for searching via hitting enter when focus in input
