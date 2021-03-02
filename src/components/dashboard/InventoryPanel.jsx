import React from 'react';
import { fbase } from '../../fbase';
import InventoryItem from './InventoryItem';

class InventoryPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            inventory: []


        }
    }



    getInventory = () => {
        fbase.fetch('inventory', {
            context: this,
            asArray: true
        }).then(data => {
            const newData = Array.from(data)
            this.setState({
                inventory: [
                    ...newData
                ]
            })
        }).catch(error => {
            //handle error
        })
    }

    componentDidMount() {
        this.getInventory()
    }

    render() {
        let inventoryList = <div className="mt-10">Aktualnie nie ma żadnych przedmiotów w sklepie!</div>
        if (this.state.inventory !== undefined)
            inventoryList = this.state.inventory.map((el) => {
                return <InventoryItem el={el} key={el.id} />
            })

        return (<div>
            <h3 className="text-center mb-20">ZARZĄDZAJ PRODUKTAMI:</h3>
            {inventoryList}
        </div>)
    }
}
export default InventoryPanel;