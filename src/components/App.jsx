import React from 'react';
import Header from './Header';
import Slider from './Slider';
import StoreBar from './StoreBar';
import StoreBody from './StoreBody';
import Footer from './Footer';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Slider />
        <div className="flex-row">
          <StoreBar />
          <StoreBody />
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
