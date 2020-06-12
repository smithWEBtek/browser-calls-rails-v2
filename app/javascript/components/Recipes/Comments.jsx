import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      comments: [
        { id: 1, user: 'John', comment: 'I like the burger recipe.'},
        { id: 2, user: 'Mary', comment: 'I like the shrimp recipe.'},
        { id: 3, user: 'Fred', comment: 'I am full, cannot eat a thing.'}
      ] 
    }
  };

  render (){
    const renderedComments = this.state.comments.map(c => {
      return (
        <div key={c.id}>
          <h1>{c.user}</h1> 
          <p>{c.comment}</p>
        </div>
      )
    }) 
  return (
    <div>
      {renderedComments}
    </div>)
  }
}

export default Comments;
