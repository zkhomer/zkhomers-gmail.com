import CategoryItem from "./CategoryItem";
import Pending from "../state/Pending";
import {connect} from "react-redux";
import React from "react";

const CategoriesList = ({categories}) => categories ? (
    <>
        {categories.map(category => <CategoryItem category={category}/>)}
    </>
) : <Pending/>
const CCategoriesList = connect((state) => ({
    categories: state.promise.categories &&
        state.promise.categories.payload &&
        state.promise.categories.payload.data.CategoryFind
}))(CategoriesList)
export default CCategoriesList