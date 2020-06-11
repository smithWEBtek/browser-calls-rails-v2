import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header/Header";

export default () => (
  <div className="layout-wrapper ">
    <Header />
    <section className="section">
      <div className="section__title">You can: </div>
      <div className="section__content">
        <ul>
          <li>Create PictureBoards with custom Items</li>
          <li>Use any image, name and describe as you wish.</li>
          <li>Any Item can be included in any Board.</li>
          <li>Print PictureBoards for portable use.</li>
        </ul>
      </div>
    </section>
  </div>
);
