import React from "react";
import {PowerUpHeader} from "./PowerUpHeader";
import PowerUpComponent from "./PowerUpComponent";

export const PowerUps = ({powerUps}) => {
    return <article className={"PowerUpsConfig"}>
        <PowerUpHeader/>
        {powerUps && powerUps.map(powerUp => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp}/>)
        )}
    </article>

}