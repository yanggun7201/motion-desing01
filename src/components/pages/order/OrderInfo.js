import React, { Component } from "react";
import PropTypes from "prop-types";
class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.cloneData(props)
        };
    }

    cloneData = props => {
        return props.data ? JSON.parse(JSON.stringify(props.data)) : [];
    };
    init = props => {
        this.setState({ data: this.cloneData(props) });
    };
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    handleChangeField = (e, index) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState(prevState => {
            const data = prevState.data;
            data[index][fieldName] = fieldValue;
            return {
                data
            };
        });
    };

    handleUpdateData = (e, index) => {
        const fieldForUpdate = this.getFieldForUpdate(e, index);
        if (fieldForUpdate) {
            this.props.onUpdateData(fieldForUpdate.index, fieldForUpdate.fieldName, fieldForUpdate.fieldValue);
        }

        return true;
    };

    getFieldForUpdate = (e, index) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const propsData = this.props.data;

        if (propsData[index][fieldName] !== fieldValue) {
            return {
                index,
                fieldName,
                fieldValue
            };
        }
        return null;
    };

    handlePressTabKey = (e, index) => {
        if (this.state.data.length - 1 !== index) {
            return;
        }
        if (e.key === "Tab" && !e.shiftKey) {
            this.handleUpdateData(e, index);
            this.handleAddRow();
        }
    };

    renderData = () => {
        const { data } = this.state;

        return data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <input
                            type="text"
                            name="room"
                            className="form-control"
                            placeholder="Room..."
                            value={item.room}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="length"
                            className="form-control"
                            placeholder="Length..."
                            value={item["length"]}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="width"
                            className="form-control"
                            placeholder="Width..."
                            value={item["width"]}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="pleats"
                            className="form-control"
                            placeholder="Pleats..."
                            value={item["pleats"]}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="style"
                            className="form-control"
                            placeholder="Style..."
                            value={item["style"]}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="notes"
                            className="form-control"
                            placeholder="Notes..."
                            value={item["notes"]}
                            onChange={e => this.handleChangeField(e, index)}
                            onBlur={e => this.handleUpdateData(e, index)}
                            onKeyDown={e => this.handlePressTabKey(e, index)}
                        />
                    </td>
                </tr>
            );
        });
    };

    handleAddRow = () => {
        this.props.onAdd();
    };

    render() {
        return (
            <div className="order-info">
                <div className="row">
                    <h4>Curtains:</h4>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Room</th>
                                <th scope="col">Length</th>
                                <th scope="col">Width</th>
                                <th scope="col">Pleats</th>
                                <th scope="col">Style</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderData()}</tbody>
                    </table>
                </div>
                <div className="row pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.handleAddRow}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

OrderInfo.defaultProps = {
    data: []
};

OrderInfo.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            room: PropTypes.string,
            length: PropTypes.string,
            width: PropTypes.string,
            pleats: PropTypes.string,
            style: PropTypes.string,
            notes: PropTypes.string
        }).isRequired
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
    onUpdateData: PropTypes.func.isRequired
};

export default OrderInfo;
