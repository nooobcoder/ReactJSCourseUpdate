import {useState, Fragment} from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

const App = () => {
  const [usersList, setUsersList] = useState([]);

  const addInputsToUsers = (uName, uAge) => {
    setUsersList((prevState) => [
      ...prevState,
      {name: uName, age: uAge, id: Math.random().toString()},
    ]);
  };

  return (
    <Fragment>
      <AddUser addUser={(name, age) => addInputsToUsers(name, age)}/>
      {usersList.length > 0 && <UsersList users={usersList}/>}
    </Fragment>
  );
};


export default App;
