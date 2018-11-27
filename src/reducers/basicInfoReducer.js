export default function reducer(
    state = {
        suburbInfo: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        },
        materialInfo: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        },
        colourInfo: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
    action
) {
    switch (action.type) {
        case "FETCH_SUBURBS": {
            return {
                ...state,
                suburbInfo: {
                    ...state.suburbInfo,
                    fetching: true
                }
            };
        }
        case "FETCH_SUBURBS_REJECTED": {
            return {
                ...state,
                suburbInfo: {
                    ...state.suburbInfo,
                    fetching: false,
                    error: action.payload
                }
            };
        }
        case "FETCH_SUBURBS_FULFILLED": {
            return {
                ...state,
                suburbInfo: {
                    ...state.suburbInfo,
                    fetching: false,
                    fetched: true,
                    data: action.payload
                }
            };
        }
        case "FETCH_MATERIALS": {
            return {
                ...state,
                materialInfo: {
                    ...state.materialInfo,
                    fetching: true
                }
            };
        }
        case "FETCH_MATERIALS_REJECTED": {
            return {
                ...state,
                materialInfo: {
                    ...state.materialInfo,
                    fetching: false,
                    error: action.payload
                }
            };
        }
        case "FETCH_MATERIALS_FULFILLED": {
            return {
                ...state,
                materialInfo: {
                    ...state.materialInfo,
                    fetching: false,
                    fetched: true,
                    data: action.payload
                }
            };
        }
        case "FETCH_COLOURS": {
            return {
                ...state,
                colourInfo: {
                    ...state.colourInfo,
                    fetching: true
                }
            };
        }
        case "FETCH_COLOURS_REJECTED": {
            return {
                ...state,
                colourInfo: {
                    ...state.colourInfo,
                    fetching: false,
                    error: action.payload
                }
            };
        }
        case "FETCH_COLOURS_FULFILLED": {
            return {
                ...state,
                colourInfo: {
                    ...state.colourInfo,
                    fetching: false,
                    fetched: true,
                    data: action.payload
                }
            };
        }
        default:
            return state;
    }
}
