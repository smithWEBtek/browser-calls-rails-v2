import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Boards from "../components/Boards/Boards";
import Board from "../components/Boards/Board";
import NewBoard from "../components/Boards/NewBoard";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/boards" exact component={Boards} />
      <Route path="/new_board" exact component={NewBoard} />
      <Route path="/boards/:id" exact component={Board} />
    </Switch>
  </Router>
);
