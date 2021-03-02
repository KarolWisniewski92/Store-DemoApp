import React from 'react';

class AddNewItemForm extends React.Component {

    constructor() {
        super();
        this.state = {
            newItem: {
                name: "",
                description: "",
                price: "",
                onStock: "",
                photo: "",

            },
            newParametr: {
                newParametrName: '',
                newParametrValue: ''
            }
        }
    }
    handleChange = (event) => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [event.target.name]: event.target.value
            }

        })
    }

    newParametrHandleChange = (event) => {
        this.setState({
            newParametr: {
                ...this.state.newParametr,
                [event.target.name]: event.target.value
            }
        })
    }

    addNewItem = () => {

    }

    addNewParametr = (event) => {
        event.preventDefault();
        if (this.state.newItem.parametr !== undefined) {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    parametr: [
                        ...this.state.newItem.parametr,
                        this.state.newParametr
                    ]
                }
            })
        } else {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    parametr: [
                        this.state.newParametr
                    ]
                }
            })
        }

        this.setState({
            newParametr: {
                newParametrName: '',
                newParametrValue: ''

            }
        })


    }

    render() {
        return (<div>
            <h3 className="text-center">DODAJ NOWY PRODUKT:</h3>
            <form onSubmit={this.addNewParametr} className="flex-column">
                <input type="text" placeholder="Nazwa produktu" name="name" onChange={this.handleChange} value={this.state.newItem.name} />
                <input type="number" placeholder="Cena" name="price" onChange={this.handleChange} value={this.state.newItem.price} />

                <textarea className="h150" type="text" placeholder="Opis produktu" name="description" onChange={this.handleChange} value={this.state.newItem.description} />

                <div className="mbt-10">
                    <input type="text" placeholder="Nazwa parametru" name="newParametrName" onChange={this.newParametrHandleChange} value={this.state.newParametr.newParametrName} />
                    <input className="ml-5" type="text" placeholder="Wartość" name="newParametrValue" onChange={this.newParametrHandleChange} value={this.state.newParametr.newParametrValue} />
                    <button type="submit" className="btn-2 btn-green" onClick={this.addNewParametr}>Dodaj parametr</button>
                </div>

                <button type="submit" className="btn-2 btn-blue">Dodaj</button>
            </form>
        </div>)
    }
}
export default AddNewItemForm;