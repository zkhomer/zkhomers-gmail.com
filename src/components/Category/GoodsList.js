import Good from "./Good";
import Pending from "../state/Pending";
import React from "react";

const GoodsList = ({goods}) => goods ? (
    <>
        {goods.map(good => <Good good={good}/>)}

    </>
) : <Pending/>
export default GoodsList