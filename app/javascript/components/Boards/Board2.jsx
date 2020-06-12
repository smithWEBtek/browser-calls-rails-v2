import React from "react";
import { Link } from "react-router-dom";

const Board = (props) => {
  const renderedItems = props.board.items.map((item, index) => {
    return (
      <div key={index} className="board-item">
        {item.name}: {item.description}
      </div>
    );
  });

  return (
    <div>
      <div key={props.board.id} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{props.board.name}</h5>
            <h5 className="card-subtitle">{props.board.description}</h5>
            <Link
              to={`/boards/${props.board.id}`}
              className="btn custom-button"
            >
              View Board
            </Link>
          </div>
        </div>
      </div>

      {renderedItems}
    </div>
  );
};

export default Board;
