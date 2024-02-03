import StudentCard from "./components/studentCard";
import { Route, Switch, Redirect } from "react-router-dom";
import CreatEdit from "./components/creat_edit";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={StudentCard} />
        <Route path="/creat_edit" component={CreatEdit} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
