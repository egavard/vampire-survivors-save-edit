import React from "react";
import {PowerUp} from "../Entities";
import './PowerUpComponent.css';

interface PowerUpProps {
    powerUp: PowerUp;
    quantityChange: (powerUp: PowerUp, quantity: number) => {};
}

const powerUpComponent = (props: PowerUpProps) => {
    return <fieldset>
        <div className={"PowerUps"}>
            <label className={"PowerUps-Quantity"}>
                <input type="number" value={props.powerUp.quantity} min={0}
                       max={props.powerUp.max} key={props.powerUp.id}
                       onChange={(_e) => props.quantityChange(props.powerUp, _e.target.valueAsNumber)}
                /></label>
            <label>{props.powerUp.name ? props.powerUp.name : props.powerUp.id}</label>
        </div>
    </fieldset>;
}


export default powerUpComponent;