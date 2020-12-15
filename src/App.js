import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MovieList from './containers/MovieList';
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
          <Switch>
            <Route path="/" component={MovieList} />
          </Switch>
          <Switch>
            <Route path="/:movieId" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
