import React from 'react';

class InventoryItem extends React.Component {

    render() {
        console.log(this.props.el)
        return (
            <div className="flex-row mb-10 p-10 inventoryItem">
                <img className="img-thumbnail wd-20" src={this.props.el.photo} alt="" />
                <div className="flex-row wd-80">

                    <div className="wd-30 ml-10 text-center">
                        <span>ID produktu:</span><br /> {this.props.el.id}</div>

                    <div className="wd-30 ml-10 text-center">
                        <span>Nazwa:</span><br /> {this.props.el.name}</div>

                    <div className="wd-30 ml-10 text-center">
                        <span>Cena:</span><br />{this.props.el.price} zł</div>

                    <div className="wd-10 text-center">
                        <p><b className="mb-5">Akcje:</b></p>
                        <div className="flex-row mt-5">
                            <i className="text-center fas fa-edit mr-10"></i>
                            <i className="text-center fas fa-times"></i>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
export default InventoryItem;