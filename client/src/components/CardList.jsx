import React from 'react';
import Card from './Card';

function CardList(props) {
  return (
    <div className='cardlisthead'>
      <h2>{props.heading}</h2>
      <div className='container'>
        {props.listofmovies ? props.listofmovies.map((movie, index) => (
          <Card
            key={index}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            release={movie.release}
          />
        ))
        :<></>}
      </div>
    </div>
  );
}

export default CardList;
