import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import AddMovies from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import Login from './components/Login/Login';
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route path="/addmovies" component={AddMovies} />
        <Route path="/editmovie/:movieId" component={EditMovie} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
