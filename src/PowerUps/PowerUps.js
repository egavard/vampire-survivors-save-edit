import React from "react";
import {PowerUpHeader} from "./PowerUpHeader";
import PowerUpComponent from "./PowerUpComponent";

export const PowerUps = (props) => {
    return <article className={props.disabled ? "Disabled PowerUpsConfig" : "PowerUpsConfig"}>
        <PowerUpHeader/>
        {props.powerUps && props.powerUps.map(powerUp => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp}/>)
        )}
    </article>

}