import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            showState: {
                showCheckout: true,
                showMyData: false,
                showMyAdres: false,
                showMyHistory: false
            }

        }
    }

    showAction = (event) => {
        console.log(event.target.getAttribute('name'));
        this.setState({
            showState: {
                [event.target.getAttribute('name')]: 'true'
            }
        })
    }
    render() {
        return (<div>
            <Header />
            <Slider />
            <div className="bcg-lightgray pbt-30">
                <div className="wrapper-50 bcg-white p-30 h500">
                    <h3 className="text-center mb-30">Panel użytkownika:</h3>
                    <div className="flex-row">
                        <div className="wd-20 p-10 bcg-pink" onClick={this.showAction} >
                            <p className="mb-20" name="showCheckout">Koszyk:</p>
                            <p className="mb-20" name="showMyData">Moje dane:</p>
                            <p className="mb-20" name="showMyAdres">Moje adresy:</p>
                            <p className="mb-20" name="showMyHistory">Historia zakupów:</p>
                        </div>
                        <div className="wd-80 bcg-pink p-10 ml-30">
                            {this.state.showState.showCheckout &&
                                <p>To jest koszyk!</p>}

                            {this.state.showState.showMyData &&
                                <p>To są moje dane!</p>}

                            {this.state.showState.showMyAdres &&
                                <p>To są moje adresy!</p>}

                            {this.state.showState.showMyHistory &&
                                <p>To jest moja historia!</p>}

                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </div>)
    }
}

export default Dashboard;