import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Slider from 'react-slick';
import { IMAGE_URL } from '../../constants/Api';

class PhotoSlider extends Component {
  static props = {
    data: propsTypes.array.isRequired,
  }

  static defaultProps = {
    data: {}
  }

  settings = {
    dots: false,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: "30px"
  }

  render() {
    const { data } = this.props;

    if (!data || data.length === 1) {
      this.settings.slidesToShow = 1;
    }

    return (
      <Slider className="slider-content" {...this.settings}>
        {
          data.map((photo, k) => {
            return (
              <img key={k} src={`${IMAGE_URL}/resPhoto/${photo}`} alt=""/>
            );
          })
        }
      </Slider>
    );
  }
}

export default PhotoSlider;

