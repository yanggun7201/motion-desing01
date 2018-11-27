import { combineReducers } from "redux";

import basicInfo from "./basicInfoReducer";
import orderInfo from "./orderInfoReducer";

export default combineReducers({
    basicInfo,
    orderInfo
});
