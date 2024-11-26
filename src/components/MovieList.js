import React from "react";
import { Grid, Card, CardMedia, CardActions } from "@mui/material";

const MovieList = ({ movies, handleFavouritesClick, favouriteComponent: FavouriteComponent }) => {
  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      {movies.map((movie, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="500"
              image={movie.Poster}
              alt={movie.Title}
            />
            <CardActions sx={{ justifyContent: "center" }}>
              <FavouriteComponent onClick={() => handleFavouritesClick(movie)} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
