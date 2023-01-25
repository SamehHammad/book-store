import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./details.css";
import { addToFavorite, deleteFavorite } from "./slice/favoriteSlice";

const Details = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite);
  const { book } = useParams();
  const [bookDetails, setBookDetails] = useState();
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://example-data.draftbit.com/books/${book}`)
        .then(function (response) {
          console.log(response);
          setBookDetails(response.data);
        });
    };
    fetchData();
  }, [book]);
  const favChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id);
    return boolean;
  };
  return ( 
    <Container className="Home mt-5">
      <div className="details-card">
        <img
          src={bookDetails?.image_url}
          alt={bookDetails?.title}
          style={{ width: "28rem", height: "35rem" }}
        />
        <div className="book-info">
          <Card.Title className="title">{bookDetails?.title}</Card.Title>
          <Card.Text className="auther">
            <span>authors:</span>
            {bookDetails?.authors}
          </Card.Text>
          <Card.Text>{bookDetails?.description}</Card.Text>
          <Card.Text>Price: {bookDetails?.rating * 5} $</Card.Text>
          {favChecker(bookDetails?.id) ? (
            <Button
            variant="danger"
            className="btn-add"
              onClick={() => dispatch(deleteFavorite(bookDetails))}
            >
              Delete Favorite
            </Button>
          ) : (
            <Button
              variant="primary"
              className="btn-add"
              onClick={() => dispatch(addToFavorite(bookDetails))}
            >
              Add To Favorite
            </Button>
          )}
        </div>
        
      </div>
    </Container>
  );
};

export default Details;
