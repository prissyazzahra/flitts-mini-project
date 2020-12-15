import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MovieList from './containers/MovieList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MovieList} />
      </Switch>
      <Switch>
        <Route path="/:movieId" />
      </Switch>
    </Router>
  );
}

export default App;
