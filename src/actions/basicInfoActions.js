import axios from "axios";

export function fetchSuburbs() {
    return function(dispatch) {
        dispatch({ type: "FETCH_SUBURBS" });

        axios
            .get("/suburbs")
            .then(response => {
                dispatch({ type: "FETCH_SUBURBS_FULFILLED", payload: response.data });
            })

            .catch(err => {
                console.log(err.response);
                dispatch({ type: "FETCH_SUBURBS_REJECTED", payload: err.response.data.error });
            });
    };
}

export function fetchMaterials() {
    return function(dispatch) {
        dispatch({ type: "FETCH_MATERIALS" });

        axios
            .get("/materials")
            .then(response => {
                dispatch({ type: "FETCH_MATERIALS_FULFILLED", payload: response.data });
            })

            .catch(err => {
                console.log(err.response);
                dispatch({ type: "FETCH_MATERIALS_REJECTED", payload: err.response.data.error });
            });
    };
}

export function fetchColours() {
    return function(dispatch) {
        dispatch({ type: "FETCH_COLOURS" });

        axios
            .get("/materials")
            .then(response => {
                dispatch({ type: "FETCH_COLOURS_FULFILLED", payload: response.data });
            })

            .catch(err => {
                console.log(err.response);
                dispatch({ type: "FETCH_COLOURS_REJECTED", payload: err.response.data.error });
            });
    };
}
