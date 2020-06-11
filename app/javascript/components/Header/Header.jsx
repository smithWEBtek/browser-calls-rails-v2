import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="main-header">
        <div className="main-header__title">
          <Link to="/" role="button">
            Picture Boards
          </Link>
        </div>

        <div className="main-header__subtitle">
          Picture Boards for special needs communication.
        </div>
        <div className="main-nav">
          <button>
            <Link className="main-nav__link" to="/boards" role="button">
              View Boards
            </Link>
          </button>
          <button>
            <Link className="main-nav__link" to="/new_board" role="button">
              New Board
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
