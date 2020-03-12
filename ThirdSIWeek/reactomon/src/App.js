import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import PokemonList from "./components/pages/PokemonList";
import TypeList from "./components/pages/TypeList";
import Axios from "axios";

class App extends Component {
  state = {
    pokemons: [],
    types: []
  };
  componentDidMount() {
    Axios.get("https://pokeapi.co/api/v2/pokemon").then(res =>
      this.setState({ pokemons: res.data.results })
    );
  }

  componentDidUpdate() {
    Axios.get("https://pokeapi.co/api/v2/type").then(res =>
      this.setState({ types: res.data.results })
    );
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Navbar />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <PokemonList pokemons={this.state.pokemons} />
                </React.Fragment>
              )}
            ></Route>
            <Route path="/pokemons">
              <React.Fragment>
                <PokemonList pokemons={this.state.pokemons} />
              </React.Fragment>
            </Route>

            <Route
              path="/types"
              render={props => <TypeList {...props} types={this.state.types} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
