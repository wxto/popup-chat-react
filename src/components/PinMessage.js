import { pipe, prop, propOr, length, ifElse } from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../assets/image.png';

function PinMessage({ pinMessage }) {
  const image = propOr(defaultImage, 'imageUrl', pinMessage);
  const title = pipe(
    prop('title'),
    ifElse(
      item => length(item) > 37,
      item => `${item.slice(0, 37)}...`,
      item => item,
    )
  )(pinMessage);
  const text = pipe(
    prop('text'),
    ifElse(
      item => length(item) > 50,
      item => `${item.slice(0, 50)}...`,
      item => item,
    )
  )(pinMessage);

  return (
    <div className='sc-pin--message'>
      <img
        className='sc-pin--message--img'
        src={image}
        alt=""
      />
      <div className='sc-pin--message--desc'>
        <div className='sc-pin--message--title'>{title}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}

PinMessage.defaultProps = {
  imageUrl: defaultImage,
};

PinMessage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PinMessage;
