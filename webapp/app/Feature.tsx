import { Component } from 'react';
import * as React from 'react';
import requireAuth from './components/auth/requireAuth';

class Feature extends Component {
  render() {
    return (
        <div className="feature">
            Feature
        </div>
    );
  }
}

export default requireAuth(Feature);
