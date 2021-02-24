import React from 'react';
import Header from './Header';
import Slider from './Slider';
import StoreBody from './StoreBody';
import Footer from './Footer';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Slider />
        <StoreBody />
        <Footer />
      </div>
    );
  }

}

export default App;
