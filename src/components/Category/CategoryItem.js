import {Link} from "react-router-dom";
import React from "react";

const CategoryItem = ({category}) => <div>
    <Link to={`/category/${category._id}`}>
        {category.name}
    </Link>
</div>
export default CategoryItem