import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSuburbs, fetchMaterials, fetchColours } from "../../../actions/basicInfoActions";
class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: props.customerName
        };
        this.props.dispatch(fetchSuburbs());
        this.props.dispatch(fetchMaterials());
        this.props.dispatch(fetchColours());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customerName: nextProps.customerName
        });
    }

    handleChangeField = e => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleUpdateData = e => {
        const fieldValue = e.target.value;
        const { customerName } = this.props;
        if (customerName !== fieldValue) {
            this.onChangeBasicInfo(e);
        }
    };

    onChangeBasicInfo = e => {
        this.props.onChangeBasicInfo(e.target.name, e.target.value);
    };

    handleChangeSuburb = e => {
        this.onChangeBasicInfo(e);
    };
    handleChangeMaterial = e => {
        this.onChangeBasicInfo(e);
    };
    handleChangeColour = e => {
        this.onChangeBasicInfo(e);
    };

    render() {
        const { suburbInfo, materialInfo, colourInfo, suburb, material, colour } = this.props;
        const { customerName } = this.state;

        return (
            <div className="row basic-info">
                <div className="col-md-3 mb-3">
                    <label htmlFor="customerName" className="customer">
                        Customer
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        name="customerName"
                        placeholder="Your name"
                        defaultValue={customerName}
                        onChange={this.handleChangeField}
                        onBlur={this.handleUpdateData}
                    />
                    <div className="invalid-feedback">Customer name is required.</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="suburb">Suburb</label>
                    <select
                        className="custom-select d-block w-100"
                        id="suburb"
                        name="suburb"
                        onChange={this.handleChangeSuburb}
                        value={suburb}
                    >
                        <option value="">Suburb...</option>
                        {suburbInfo &&
                            suburbInfo.fetched &&
                            suburbInfo.data.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}, {item.city}
                                    </option>
                                );
                            })}
                    </select>
                    <div className="invalid-feedback">Please provide a valid suburb.</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="material">Material</label>
                    <select
                        className="custom-select d-block w-100"
                        id="material"
                        name="material"
                        onChange={this.handleChangeMaterial}
                        value={material}
                    >
                        <option value="">Material...</option>
                        {materialInfo &&
                            materialInfo.fetched &&
                            materialInfo.data.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>
                    <div className="invalid-feedback">Please provide a valid material.</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="colour">Colour</label>
                    <select
                        className="custom-select d-block w-100"
                        id="colour"
                        name="colour"
                        onChange={this.handleChangeColour}
                        value={colour}
                    >
                        <option value="">Colour...</option>
                        {colourInfo &&
                            colourInfo.fetched &&
                            colourInfo.data.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>
                    <div className="invalid-feedback">Please provide a valid colour.</div>
                </div>
            </div>
        );
    }
}

BasicInfo.propTypes = {
    suburb: PropTypes.string,
    material: PropTypes.string,
    colour: PropTypes.string,
    customerName: PropTypes.string
};

export default connect(store => {
    return {
        suburbInfo: store.basicInfo.suburbInfo,
        materialInfo: store.basicInfo.materialInfo,
        colourInfo: store.basicInfo.colourInfo
    };
})(BasicInfo);
