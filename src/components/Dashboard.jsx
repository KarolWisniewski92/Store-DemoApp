import React from 'react';
import Header from './Header';
import Slider from './Slider';

class Dashboard extends React.Component {
    render() {
        return (<div>
            <Header />
            <Slider />
        </div>)
    }
}

export default Dashboard;