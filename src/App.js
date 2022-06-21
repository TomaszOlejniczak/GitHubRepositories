import { useState, useEffect } from "react";
import './App.css';
import Heading from "./components/Heading/Heading";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.github.com/users/${username}/repos?access_token=`)
        .then((data) => {
          console.log(data.data);
          setRepoList(data.data);
          setIsFetching(false);
        });
    }
    return () => {};
  }, [username]);
  return (
    <div className="App">
      <Heading />
      <Form setUsername={setUsername} />
      {!isFetching && <Table repoList={repoList} username={username} />}
    </div>
  );
}

export default App;
