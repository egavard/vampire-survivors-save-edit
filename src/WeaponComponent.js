import React from "react";
import {Weapon} from "./Character";

interface WeaponComponentProps {
    weapon: Weapon
}

const WeaponComponent = (props: WeaponComponentProps) => {
    return (
        <div key={props.weapon.id} className="Weapons">
            <div className={"Header-Unlocked"}><input type="checkbox" checked={props.weapon.unlocked}/>
            </div>
            <div>{props.weapon.name ? props.weapon.name : props.weapon.id}</div>
        </div>
    )

}

export default WeaponComponent;