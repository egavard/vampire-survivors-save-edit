import React from "react";
import {Weapon} from "../Entities";

interface WeaponComponentProps {
    weapon: Weapon;
    collectWeapon: (weapon: Weapon) => {};
}

const WeaponComponent = ({weapon, collectWeapon}: WeaponComponentProps) => {
    return (
        <fieldset>
            <div className="Weapons">
                <label className={"Header-Unlocked"}>
                    <input type="checkbox" checked={weapon.collected} key={weapon.id}
                           onChange={(_e) => collectWeapon(weapon)}/>
                </label>
                <label>{weapon.name ? weapon.name : weapon.id}</label>
            </div>
        </fieldset>
    )

}

export default WeaponComponent;