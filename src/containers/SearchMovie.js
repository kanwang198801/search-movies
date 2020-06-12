import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import api from '../api';
import Theme from '../components/Theme';
import MovieCard from '../components/MovieCard';
import Watchlist from './Watchlist';

function SearchMovie() {
   const [loading, setLoading] = useState(false);
   const [movie, setMovie] = useState(null);
   const [watchlist, setWishlist] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

   useEffect(() => {
      const data = localStorage.getItem('my-watchlist');
      if (data) {
         setWishlist(JSON.parse(data));
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('my-watchlist', JSON.stringify(watchlist));
   });

   const searchMovie = async (title) => {
      await fetch(`${api.URL}/?t=${title}&apikey=${api.KEY}`)
         .then((res) => res.json())
         .then(async (response) => {
            if (response.Response === 'False') {
               message.warning('The movie is not found, please try again');
            } else {
               const movie = {
                  imdbID: response.imdbID,
                  Title: response.Title,
                  Year: response.Year,
                  Rated: response.Rated,
                  Country: response.Country,
                  Poster: response.Poster,
                  like: false,
               };
               setMovie(movie);
            }
         })
         .catch((error) => console.log(error));
      setLoading(false);
   };

   const onSearchChange = (event) => {
      setMovie(null);
      setLoading(true);
      const { value } = event.target;
      if (searchInputTimeout) {
         clearTimeout(searchInputTimeout);
      }
      setSearchAInputTimeout(
         setTimeout(() => {
            searchMovie(value);
            setLoading(false);
         }, 1500)
      );
   };

   const addToWishlist = (movie) => {
      if (!watchlist.find((m) => m.Title === movie.Title)) {
         setWishlist([...watchlist, movie]);
         message.success(`${movie.Title} is added to watchlist`);
      } else {
         message.warn(`${movie.Title} has aleady been added`);
      }
   };
   const removeFromWishlist = (title) => {
      const newWishlist = watchlist.filter((movie) => movie.Title !== title);
      setWishlist(newWishlist);
      message.success(`${title} is removed from watchlist`);
   };

   const toggleLike = (title) => {
      const newWishlist = watchlist.map((movie) => {
         if (movie.Title === title) {
            movie.like = !movie.like;
         }
         return movie;
      });
      setWishlist(newWishlist);
   };

   return (
      <Theme>
         <Helmet>
            <title>Movies</title>
            <meta name='description' content='Movies' />
         </Helmet>
         <Button onClick={() => setModalShow(true)}>
            <EyeOutlined />
            Watchlist {watchlist.length}
         </Button>
         <Watchlist
            modalShow={modalShow}
            setModalShow={setModalShow}
            watchlist={watchlist}
            setWishlist={setWishlist}
            removeFromWishlist={removeFromWishlist}
            toggleLike={toggleLike}
         />
         <Divider>Search a movie by name</Divider>
         <Input
            type='search'
            placeholder='search by movie title'
            onChange={onSearchChange}
         />
         <Divider />
         {!loading ? (
            movie && <MovieCard movie={movie} addToWishlist={addToWishlist} />
         ) : (
            <LoadingOutlined style={{ fontSize: '36px' }} />
         )}
      </Theme>
   );
}

export default SearchMovie;
