import React from "react";
import {PowerUp} from "../Character";
import './PowerUpComponent.css';

interface PowerUpProps {
    powerUp: PowerUp
}

const powerUpComponent = (props: PowerUpProps) => {
    return <div className={"PowerUps"}>
        <div className={"Header-Unlocked"}><input type="checkbox" checked={props.powerUp.bought}/></div>
        <div className={"PowerUps-Quantity"}><input type="number" value={props.powerUp.quantity} min={0} max={props.powerUp.max}/></div>
        <div>{props.powerUp.name ? props.powerUp.name : props.powerUp.id}</div>
    </div>;
}


export default powerUpComponent;