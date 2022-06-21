import axios from "axios";

const processResponse = (response) => {
  const res = response
    .map((repo) => [repo.name, repo.stargazers_count])
    .sort((a, b) => b[1] - a[1]);
  return res;
};

const fetchNameStars = async function (name, setResponse) {
  try {
    await axios
      .get(`https://api.github.com/users/${name}/repos?access_token=`)
      .then((data) => {
        setResponse(processResponse(data.data));
      });
  } catch (e) {
    console.log(e);
    setResponse([]);
  }
};
const fetchLangBytes = async function (repoName, setRepoData, username) {
  try {
    await axios
      .get(`https://api.github.com/repos/${username}/${repoName}/languages`)
      .then((data) => {
        setRepoData(data.data);
        console.log(data.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export default { fetchNameStars, fetchLangBytes };
