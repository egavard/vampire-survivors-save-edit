import React from "react";

export const PowerUpHeader = ({unlockAll}) => {
    return <div className={"PowerUpsHeader"}>
        <div className={"Header-Bought"}>Quantity</div>
        <div className={"Header-Title"}>Name</div>
        <button onClick={unlockAll}>Buy all</button>
    </div>

}