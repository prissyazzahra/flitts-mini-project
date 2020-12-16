import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";

import MovieList from './containers/MovieList';
import MovieDetail from './containers/MovieDetail';

function App() {
  return (
    <div className="container">
      <Router>
          <Switch>
            <Route exact path="/" component={MovieList} />
          </Switch>
          <Switch>
            <Route exact path="/:movieId" component={MovieDetail} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
