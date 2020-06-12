import React from "react";
import { Link } from "react-router-dom";

class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      items: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/boards/";
    const { name, description, items } = this.state;

    const body = {
      name,
      description,
      items,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("[NewBoard.js][response]", response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.props.history.push(`/boards/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Add a new Board to the collection.</h1>

            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="boardName">Board name</label>
                <input
                  type="text"
                  name="name"
                  id="boardName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="5"
                required
                onChange={this.onChange}
              />

              <h3>Items form control here, using Items component</h3>
              <button type="submit" className="btn custom-button mt-3">
                Create Board
              </button>
              <Link to="/boards" className="btn btn-link mt-3">
                Back to Boards
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBoard;
