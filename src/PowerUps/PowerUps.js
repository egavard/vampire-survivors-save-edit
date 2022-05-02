import React from "react";
import {PowerUpHeader} from "./PowerUpHeader";
import PowerUpComponent from "./PowerUpComponent";

export const PowerUps = ({powerUps}) => {
    return <div className={"PowerUpsConfig"}>
        <PowerUpHeader/>
        {powerUps && powerUps.map(powerUp => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp}/>)
        )}
    </div>

}