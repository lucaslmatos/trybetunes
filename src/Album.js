import React from 'react';
import Header from './components/Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search">Album</div>
      </div>
    );
  }
}

export default Album;
