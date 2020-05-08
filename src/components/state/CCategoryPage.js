import {connect} from "react-redux";
import actionCategory from "../action/actionCategory";
import CategoryPage from "../Category/CategoryPage";

const CCategoryPage = connect(null, {getData: actionCategory})(CategoryPage)
export default CCategoryPage