import React from 'react';
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <Link to={`/movie/${props.id}`} className="cardanchor">
      <div className="card">
        <img src={props.image} alt="" className='card-img' />
        <h2 className='card-title'>{props.title}</h2>
        <p className='card-description'>{props.release}</p>
      </div>
    </Link>
  );
}

export default Card;