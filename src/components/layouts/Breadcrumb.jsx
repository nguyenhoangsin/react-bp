import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {
    data: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'エリア検索',
      },
      {
        name: '東京',
      },
      {
        name: '歌舞伎町',
      },
      {
        name: 'アジアン'
      }
    ]
  }

  render() {
    let { data } = this.props;

    return (
      <div className="breadcrumb-container">
        <ul className="list">
          {
            data && data.map((item, k) => (
              <li key={k}>
                {
                  item.icon &&
                  <span className={item.icon} />
                }
                <Link to={item.link || '/'} dangerouslySetInnerHTML={{__html: item.name}} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Breadcrumb;
