import React from "react";
import { useHistory } from "react-router";
import classes from "./card.module.css";

export default function Card({ data }) {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(`/products/${data.id}`)}
      className={classes.item}
    >
      <div
        className={classes.card}
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <div className={classes.card__info}>
          <p>
            {data.mark.mark__avg === null
              ? "no rating"
              : `${data.mark.mark__avg} rating`}
          </p>
          <p>{data.book_author}</p>
        </div>
      </div>
      <h4>{data.title}</h4>
    </div>
  );
}
