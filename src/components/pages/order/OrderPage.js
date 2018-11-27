import React, { Component } from "react";
import BasicInfo from "./BasicInfo";
import OrderInfo from "./OrderInfo";

import { connect } from "react-redux";
import { fetchOrderInfo, storeOrderInfo } from "../../../actions/orderInfoActions";

const defaultState = { customerName: "", suburb: "0", material: "0", colour: "0", data: [] };

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(defaultState));
        this.state.historyState = [];
        this.props.dispatch(fetchOrderInfo());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderInfo && nextProps.orderInfo.data) {
            this.setState(
                {
                    customerName: nextProps.orderInfo.data.customerName,
                    suburb: nextProps.orderInfo.data.suburb,
                    material: nextProps.orderInfo.data.material,
                    colour: nextProps.orderInfo.data.colour,
                    data: nextProps.orderInfo.data.data || []
                },
                this.backupData
            );
        }
    }

    backupData = () => {
        const { historyState, data, customerName, suburb, material, colour } = this.state;
        historyState[historyState.length] = JSON.parse(
            JSON.stringify({ data, customerName, suburb, material, colour })
        );

        this.setState({
            historyState
        });
    };

    handleUpdateData = (index, fieldName, fieldValue) => {
        this.setState((state, props) => {
            const data = state.data;
            data[index][fieldName] = fieldValue;
            return {
                data
            };
        }, this.backupData);
    };

    saveData = () => {
        const { data, suburb, material, colour, customerName } = this.state;
        this.props.dispatch(storeOrderInfo({ data, suburb, material, colour, customerName }));
    };

    rollbackState = () => {
        const { historyState } = this.state;
        if (historyState.length <= 1) {
            return;
        }
        const newHistoryState = historyState.slice(0);
        newHistoryState.splice(newHistoryState.length - 1);

        const newState =
            newHistoryState.length > 0
                ? newHistoryState[newHistoryState.length - 1]
                : JSON.parse(JSON.stringify(defaultState));

        this.setState({
            ...newState,
            data: newState.data,
            historyState: newHistoryState
        });
    };

    handleBasicInfo = (name, value) => {
        this.setState(
            {
                [name]: value
            },
            this.backupData
        );
    };

    handleAddRow = () => {
        this.setState(state => {
            const data = state.data;

            data[data.length] = {
                room: "",
                length: "",
                width: "",
                pleats: "",
                style: "",
                notes: ""
            };
            return {
                data
            };
        }, this.backupData);
    };

    render() {
        const { data, suburb, material, colour, customerName } = this.state;

        return (
            <main role="main" className="container">
                <div className="row">
                    <h2>Product View</h2>
                </div>
                <BasicInfo
                    onChangeBasicInfo={this.handleBasicInfo}
                    suburb={suburb}
                    material={material}
                    colour={colour}
                    customerName={customerName}
                />
                <OrderInfo data={data} onAdd={this.handleAddRow} onUpdateData={this.handleUpdateData} />
                <div className="row order-button-box">
                    <button
                        type="button"
                        className="btn btn-danger col-md-3 col-sm-6 col-xs-6"
                        onClick={this.rollbackState}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="btn btn-success col-md-3 col-sm-6 col-xs-6"
                        onClick={this.saveData}
                    >
                        Save all changes
                    </button>
                </div>
            </main>
        );
    }
}

export default connect(store => {
    return {
        orderInfo: store.orderInfo.orderInfo
    };
})(OrderPage);
