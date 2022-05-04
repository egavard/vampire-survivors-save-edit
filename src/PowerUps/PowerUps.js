import React from "react";
import {PowerUpHeader} from "./PowerUpHeader";
import PowerUpComponent from "./PowerUpComponent";

export const PowerUps = (props) => {

    const quantityChange = (powerUp, quantity) => {
        powerUp.quantity = quantity;
        const powerUpIndex = props.powerUps.findIndex(p => p.id === powerUp.id);
        const newPowerUpArray = [...(props.powerUps)];
        newPowerUpArray.splice(powerUpIndex, 1, powerUp);
        props.powerUpsChange(newPowerUpArray)
    }

    return <article className="PowerUpsConfig">
        <PowerUpHeader/>
        {props.powerUps && props.powerUps.map(powerUp => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp} quantityChange={quantityChange}/>)
        )}
    </article>

}