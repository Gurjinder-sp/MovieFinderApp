import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddToFavourites"
import RemoveFavourites from "./components/RemoveFavourites";


const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites,setFavourites] = useState([]);

        const getMovieRequest = async (searchValue) => {
          const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=4a7ea9d3`;

          const response = await fetch(url);
          const responseJson = await response.json();

          if (responseJson.Search){
            setMovies(responseJson.Search);
          }
        };

        useEffect(() => {
          getMovieRequest(searchValue);
        }, [searchValue]);

        const addFavoriteMovie = (movie) => {
            /*
            accepts a movie, takes current favourites array,copies it, adds the new movie to it,
            and saves everything back into state.
             */
            const newFavoriteList = [...favourites,movie];
            setFavourites(newFavoriteList);
        }

        const removeFavouriteMovie = (movie) => {
            const newFavoriteList = favourites.filter((favorite) => favorite.imdbID !== movie.imdbID
            );

            setFavourites(newFavoriteList);
        }
	 
	return (
		<div className='container-fluid movie-app'>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
			<div className='row'>
          <MovieList
              movies={movies}
              favouriteComponent={AddFavourite}
              handleFavouritesClick = {addFavoriteMovie}/>
			</div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading='Favourites'/>
            </div>
            <div className="row">
                <MovieList
                    movies={favourites} favouriteComponent={RemoveFavourites}  handleFavouritesClick={removeFavouriteMovie}/>
            </div>
		</div>
	);
};

export default App;