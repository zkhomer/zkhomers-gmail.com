import {connect} from "react-redux";
import GoodsList from "../Category/GoodsList";
const CGoodsList = connect((state) => ({
    goods: state.promise.category &&
        state.promise.category.payload &&
        state.promise.category.payload.data.CategoryFindOne.goods
}))(GoodsList)
export default CGoodsList