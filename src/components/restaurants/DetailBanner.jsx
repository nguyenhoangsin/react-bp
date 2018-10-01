import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { IMAGE_URL } from '../../constants/Api';

class DetailBanner extends Component {
  static props = {
    data: propsTypes.object,
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const { data } = this.props;

    return (
      <div className="banner-item">
      {
        data.restaurantPhoto && data.restaurantPhoto.slice(0, 1).map((photo, k) => (
          <img src={`${IMAGE_URL}/resPhoto/${photo}`} alt="" key={k}/>
        ))
      }
      </div>
    );
  }
}

export default DetailBanner;

