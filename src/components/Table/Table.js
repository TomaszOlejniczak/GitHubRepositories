import TableRow from "./TableRow";
import './Table.css'

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Repo's name</th>
          <th>Stars</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {props.repoList &&
          props.repoList.map((el) => {
            return (
              <TableRow
                key={el.name}
                name={el.name}
                stars={el.stargazers_count}
                username={props.username}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default Table;
