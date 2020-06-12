import React from "react";
import { Link } from "react-router-dom";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        name: "",
        description: "",
        items: [],
      },
    };

    this.deleteBoard = this.deleteBoard.bind(this);
  }

  componentDidMount() {
    const url = `/api/v1/boards/${this.props.board.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ board: response }))
      .catch(() => this.props.history.push("/boards"));
  }

  deleteBoard() {
    const url = `/api/v1/boards/${this.props.board.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/items"))
      .catch((error) => console.log(error.message));
  }

  render() {
    const { board } = this.state;

    let renderedItems = "No items for this board";
    board.items.length > 0
      ? board.items.map((item) => <div className="item">{item.name}</div>)
      : null;

    return (
      <div className="board">
        <h1 className="board__name">{board.name}</h1>
        <p className="boards__description">{board.description}</p>
        <ul>{renderedItems}</ul>

        <div className="button">
          <button
            type="button"
            className="button__delete"
            onClick={this.deleteBoard}
          >
            Delete Board
          </button>
        </div>

        <div className="button">
          <button
            type="button"
            className="button__items"
            onClick={this.showItems}
          >
            Show items
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
