import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../constants/Api';

class IndexReview extends Component {
  static props = {
    data: propsTypes.array,
  }

  static defaultProps = {
    data: []
  }

  getUrl = (restaurant) => (restaurant.isPremium ? `/premium/${restaurant.id}` : `/free/${restaurant.id}`);

  render() {
    const { data } = this.props;

    return (
      <div className="evaluation-content">
        <ul className="evaluation-list">
          {
            data.map((item, key) =>
              <li className="item" key={key}>
                {
                  item.user &&
                  item.user.profilePicThum &&
                  <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/thumbnail/${item.user.profilePicThum})`}}>
                    {/* <img src={`${IMAGE_URL}/profile/thumbnail/${data.user.profilePicThum}`} alt="" /> */}
                  </div>
                }
                <div className="content">
                  <ul className="list">
                    <li><span className="text">{item.restaurantId.mainArea}</span></li>
                    <li><span className="name">{item.restaurantId.subArea}</span></li>
                    <li><span className="category pr0">{item.restaurantId.restaurantName}</span></li>
                  </ul>
                  <div className="row">

                    {/*<!-- Need to put id of restaurant here later -->*/}
                    <Link to={this.getUrl(item.restaurantId)} className="text-link">続き<span className="ficon-next"></span></Link>
                    <p className="title">{item.title}</p>
                  </div>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default IndexReview;

