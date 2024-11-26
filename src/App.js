import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Logged-in user email
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  // Fetch movies based on search value
  const getMovieRequest = async (searchValue) => {
    if (!searchValue) return;
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=a67306e3`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        setMovies(responseJson.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  // Load favourites from localStorage on initial render
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  // Save favourites to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem(
      "react-movie-app-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const addFavouriteMovie = (movie) => {
    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavourites);
  };

  // Account Management
  const handleAccountCreation = (email) => {
    const accounts = JSON.parse(localStorage.getItem("movieAppAccounts")) || [];
    if (!accounts.includes(email)) {
      accounts.push(email);
      localStorage.setItem("movieAppAccounts", JSON.stringify(accounts));
      alert("Account created successfully!");
    } else {
      alert("Account already exists.");
    }
  };

  const handleLogin = (email) => {
    const accounts = JSON.parse(localStorage.getItem("movieAppAccounts")) || [];
    if (accounts.includes(email)) {
      setUserEmail(email);
      setIsLoggedIn(true);
    } else {
      alert("No account found. Please create one first.");
    }
  };

  const handleLogout = () => {
    setUserEmail("");
    setIsLoggedIn(false);
  };

  // Login Page UI
  const renderLoginPage = () => (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Movie App
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TextField
          id="emailInput"
          label="Enter your email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleAccountCreation(
                  document.getElementById("emailInput").value
                )
              }
            >
              Create Account
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() =>
                handleLogin(document.getElementById("emailInput").value)
              }
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  // Movie App UI
  const renderMovieApp = () => (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <MovieListHeading heading="Favourites" />
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="body1">Logged in as: {userEmail}</Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );

  return isLoggedIn ? renderMovieApp() : renderLoginPage();
};

export default App;
