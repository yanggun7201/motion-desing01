import axios from "axios";

export function storeOrderInfo(data) {
    return function(dispatch) {
        dispatch({ type: "STORE_ORDERS" });

        axios
            .post("/data", { data })
            .then(response => {
                dispatch({ type: "STORE_ORDERS_FULFILLED", payload: data });
            })

            .catch(err => {
                console.log(err.response);
                dispatch({ type: "STORE_ORDERS_REJECTED", payload: err.response.data });
            });
    };
}

export function fetchOrderInfo() {
    return function(dispatch) {
        dispatch({ type: "FETCH_ORDERS" });

        axios
            .get("/data")
            .then(response => {
                dispatch({ type: "FETCH_ORDERS_FULFILLED", payload: response.data.data });
            })

            .catch(err => {
                console.log(err.response);
                dispatch({ type: "FETCH_ORDERS_REJECTED", payload: err.response.data.error });
            });
    };
}
