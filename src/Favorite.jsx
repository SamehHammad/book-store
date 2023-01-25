import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFavorite } from "./slice/favoriteSlice";

const Favorite = () => {
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const handleDelete = (book) => {
    dispatch(deleteFavorite(book));
  };

  return (
    <Container className="mt-5 ">
      {favorites.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>BOOK TITLE</th>
              <th>IMAGE</th>

              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {favorites?.map((book) => (
              <tr  key={book.id} style={{ verticalAlign: "center"}}>
                <td>{book.id}</td>
                <td onClick={() => navigate(`/details/${book.id}`)} style={{cursor:"pointer"}}>
                  {book.title}
                </td>
                <td>
                  <img
                    src={book.image_url}
                    alt={book.title}
                    style={{ width: "5rem", height: "5rem" ,cursor:"pointer"}}
                    onClick={() => navigate(`/details/${book.id}`)}
                  />
                </td>

                <td>
                  <Button variant="danger" onClick={() => handleDelete(book)}>
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="mt-5">
          <h1>You don't have books In Favorite List</h1>
        </div>
      )}
    </Container>
  );
};

export default Favorite;
