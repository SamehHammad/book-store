import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./App.css";
import { addToFavorite, deleteFavorite } from "./slice/favoriteSlice";

function Home() {
  const favorites = useSelector((state) => state.favorite);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState();
  const favChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id);
    return boolean;
  };
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://example-data.draftbit.com/books?_limit=100")
        .then(function (response) {
          console.log(response);
          setBooks(response.data);
        });
    };
    fetchData();
  }, []);
  return (
    <Container className="Home">
      <Row>
        {books?.map((book) => (
          <Col key={book.id} className="card-cont">
            <Card style={{ width: "18rem"}} className="card">
              <Card.Img
                variant="top"
                src={book.image_url}
                className="image"
                onClick={() => navigate(`/details/${book.id}`)}
              />
              <Card.Body style={{backgroundColor:favChecker(book.id)?"grey" :"white"}}>
                <Card.Title
                  className="title"
                  onClick={() => navigate(`/details/${book.id}`)}
                >
                  {book.title}
                </Card.Title>
                <Card.Text className="auther">
                  <span>authors:</span>
                  {book.authors}
                </Card.Text>
                <Card.Text>Price: {(book.rating * 7).toFixed(2)} $</Card.Text>
                {favChecker(book.id) ? (
                  <Button
                    variant="danger"
                    className="btn-add"
                    onClick={() => dispatch(deleteFavorite(book))}
                  >
                    Delete Favorite
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="btn-add"
                    onClick={() => dispatch(addToFavorite(book))}
                  >
                    Add To Favorite
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
