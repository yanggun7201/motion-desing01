import React, { Component } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";

import store from "./store/store";
import { Provider } from "react-redux";

import Header from "./components/layouts/Header";
import OrderPage from "./components/pages/order/OrderPage";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <Header />
                    <OrderPage />
                </React.Fragment>
            </Provider>
        );
    }
}

export default App;
