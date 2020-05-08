import React, {useMemo, useState} from "react";
import CGoodsList from "../state/CGoodsList";

const CategoryPage = ({match: {params: {_id}}, getData}) => {
    const [someState, setSomeState] = useState(Math.random())
    useMemo(() => getData(_id) && false, [_id])

    return (<>
        <button onClick={() => setSomeState(Math.random())}>{someState}</button>
        <CGoodsList/>

    </>)
}
export default CategoryPage