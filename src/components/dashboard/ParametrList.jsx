import React from 'react';

class ParametrList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.el.ParametrName}</td>
                    <td>{this.props.el.ParametrValue}</td>
                    <td className="flex-center"><i className="fas fa-trash-alt" onClick={this.props.deleteParametr}></i></td>
                </tr>
            </React.Fragment>
        )
    }
}

export default ParametrList;