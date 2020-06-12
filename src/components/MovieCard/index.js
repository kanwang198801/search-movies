import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { EyeInvisibleOutlined, HeartTwoTone } from '@ant-design/icons';
import Share from '../Share';

const { Meta } = Card;
function MovieCard({ movie, addToWishlist, removeFromWishlist, toggleLike }) {
   let card = '';
   if (removeFromWishlist) {
      card = (
         <Card
            style={{ width: '100%', margin: '10px auto' }}
            actions={[
               <EyeInvisibleOutlined
                  onClick={() => removeFromWishlist(movie.Title)}
               />,
               <HeartTwoTone
                  onClick={() => toggleLike(movie.Title)}
                  twoToneColor={movie.like && '#eb2f96'}
               />,
            ]}
         >
            <div>
               <Meta title={movie.Title} />
               <br />
               <Share movie={movie} />
            </div>
         </Card>
      );
   } else {
      card = (
         <Card
            style={{ width: '100%', maxWidth: 300, margin: '10px auto' }}
            cover={
               movie.Poster !== 'N/A' && <img alt='movie' src={movie.Poster} />
            }
            actions={[
               <Button key='addWishlist' onClick={() => addToWishlist(movie)}>
                  Add to watchlist
               </Button>,
            ]}
         >
            <div>
               <Meta title={movie.Title} />
               <br />
               YEAR - {movie.Year}
               <br />
               Rated - {movie.Rated}
               <br />
               Country - {movie.Country}
               <br />
               <Share movie={movie} />
            </div>
         </Card>
      );
   }
   return <>{card}</>;
}
export default MovieCard;

MovieCard.propTypes = {
   movie: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Rated: PropTypes.string.isRequired,
      Country: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      like: PropTypes.bool.isRequired,
   }).isRequired,
   addToWishlist: PropTypes.func,
   removeFromWishlist: PropTypes.func,
   toggleLike: PropTypes.func,
};
