import React from "react";
import {PowerUp} from "../Entities";
import './PowerUpComponent.css';

interface PowerUpProps {
    powerUp: PowerUp
}

const powerUpComponent = (props: PowerUpProps) => {
    return <fieldset key={props.powerUp.id}>
        <div className={"PowerUps"}>
            <label className={"Header-Unlocked"}><input type="checkbox" checked={props.powerUp.bought}/></label>
            <label className={"PowerUps-Quantity"}><input type="number" value={props.powerUp.quantity} min={0}
                                                        max={props.powerUp.max}/></label>
            <label>{props.powerUp.name ? props.powerUp.name : props.powerUp.id}</label>
        </div>
    </fieldset>;
}


export default powerUpComponent;