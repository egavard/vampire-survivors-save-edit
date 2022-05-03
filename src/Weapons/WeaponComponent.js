import React from "react";
import {Weapon} from "../Entities";

interface WeaponComponentProps {
    weapon: Weapon;
    unlockWeapon: (weapon: Weapon) => {};
}

const WeaponComponent = ({unlockWeapon, weapon}: WeaponComponentProps) => {
    return (
        <fieldset>
            <div className="Weapons">
                <label className={"Header-Unlocked"}>
                    <input type="checkbox" checked={weapon.unlocked} key={`unlock_${weapon.id}`}
                           onChange={(_e) => unlockWeapon(weapon)}/>
                </label>
                <label>{weapon.name ? weapon.name : weapon.id}</label>
            </div>
        </fieldset>
    )

}

export default WeaponComponent;