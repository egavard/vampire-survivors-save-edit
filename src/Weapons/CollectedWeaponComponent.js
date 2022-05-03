import React from "react";
import {Weapon} from "../Entities";

interface WeaponComponentProps {
    weapon: Weapon
}

const WeaponComponent = (props: WeaponComponentProps) => {
    return (
        <fieldset key={props.weapon.id}>
        <div className="Weapons">
            <label className={"Header-Unlocked"}><input type="checkbox" checked={props.weapon.collected}/>
            </label>
            <label>{props.weapon.name ? props.weapon.name : props.weapon.id}</label>
        </div>
        </fieldset>
    )

}

export default WeaponComponent;