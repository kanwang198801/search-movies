
import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';

const { Meta } = Card;
function MovieCard({ movie, addToWishlist, removeFromWishlist }) {
    return (
        <Card
            style={{ width: '100%', maxWidth: 300, margin: '10px auto' }}
            cover={
                movie.Poster !== "N/A" &&
                <img
                    alt="movie"
                    src={movie.Poster}
                />
            }
            actions={
                removeFromWishlist ?
                    [
                        <Button key="removeFromWishlist" onClick={() => removeFromWishlist(movie.Title)} >Remove</Button>,
                    ] : [
                        <Button key="addWishlist" onClick={() => addToWishlist(movie)} >Add to wishlist</Button>,
                    ]
            }
        ><div>
                <Meta
                    title={movie.Title}
                />
                <br />
                YEAR - {movie.Year}<br />
                Rated - {movie.Rated}<br />
                Country - {movie.Country}<br />
            </div>
        </Card>
    );
}
export default MovieCard;

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Rated: PropTypes.string.isRequired,
        Country: PropTypes.string.isRequired,
        Poster: PropTypes.string,
    }).isRequired,
    addToWishlist: PropTypes.func,
    removeFromWishlist: PropTypes.func,
};