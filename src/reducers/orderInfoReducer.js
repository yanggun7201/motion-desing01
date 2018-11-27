export default function reducer(
    state = {
        orderInfo: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
    action
) {
    switch (action.type) {
        case "STORE_ORDERS": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    fetching: true
                }
            };
        }
        case "STORE_ORDERS_REJECTED": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    fetching: false,
                    error: action.payload
                }
            };
        }
        case "STORE_ORDERS_FULFILLED": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    fetching: false,
                    fetched: true,
                    data: action.payload
                }
            };
        }
        case "FETCH_ORDERS": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    fetching: true
                }
            };
        }
        case "FETCH_ORDERS_REJECTED": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    fetching: false,
                    error: action.payload
                }
            };
        }
        case "FETCH_ORDERS_FULFILLED": {
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
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
