import { useState, useEffect } from "react";
import './TableRow.css';
import axios from "axios";

const TableRow = (props) => {
  const [elementData, setElementData] = useState(null);
  const [clicked, setClicked] = useState(true);
  const [elementClicked, setElementClicked] = useState(null);
  const clickHandler = (e) => {
    setElementClicked(e.target.textContent);
    setClicked(!clicked);
  };
  useEffect(() => {
    if (elementClicked) {
      axios
        .get(
          `https://api.github.com/repos/${props.username}/${elementClicked}/languages?access_token=`
        )
        .then((data) => {
          setElementData(data.data);
        });
    }
  }, [elementClicked, props.username]);

  const languageProcessing = () => {
    return Object.entries(elementData).length === 0 
    ? "No data" 
    : Object.keys(elementData).map((item) =><p><span>{item}</span><span> ({elementData[item]}B)</span></p>);
  }

  return (
    <tr onClick={clickHandler} id={Math.random()}>
      <td>{props.name}</td>
      <td>{props.stars}</td>
      {elementData && !clicked && (
        languageProcessing()
      )}
    </tr>
  );
}

export default TableRow;