import * as React from 'react';
import PropTypes from 'prop-types';
import {
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
} from 'react-share';
import styles from './styles.module.css';

function Share({ movie }) {
   return (
      <div className={styles.Share}>
         <FacebookShareButton url={movie.Poster} quote={movie.Title}>
            <FacebookIcon size={32} />
         </FacebookShareButton>
         <TwitterShareButton url={movie.Poster} title={movie.Title}>
            <TwitterIcon size={32} />
         </TwitterShareButton>
      </div>
   );
}
export default Share;

Share.propTypes = {
   movie: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Rated: PropTypes.string.isRequired,
      Country: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      like: PropTypes.bool.isRequired,
   }).isRequired,
};
