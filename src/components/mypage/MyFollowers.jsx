import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { IMAGE_URL } from '../../constants/Api';

class MyFollowers extends Component {
  static props = {
    myFollowers: propsTypes.array,
  }

  static defaultProps = {
    myFollowers: []
  }

  render() {
    return (
      <div className="my-follower-list">
        <ul className="list">
          {
            this.props.myFollowers.map((item, key) =>
              <li className="item" key={key}>
                <div className="follower-item">
                  <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/${item.profile_pic})`}}>
                  </div>
                  <p className="username">ジョンパーク</p>
                </div>
              </li>
            )}
        </ul>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default MyFollowers;

