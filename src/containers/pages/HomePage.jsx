import React, { Component } from 'react';
import { MasterLayout } from '../../components/layouts';

class HomePage extends Component {
  render() {
    return (
      <MasterLayout>
        <section className="main-container" style={{minHeight: '500px'}}>
          <div>
            Home
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

export default HomePage;
