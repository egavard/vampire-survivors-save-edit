import React from "react";
import WeaponComponent from "./WeaponComponent";

export const Weapons = ({weapons, disabled}) => {
    return <article className={disabled ? "WeaponsConfig Disabled" : "WeaponsConfig"}>
        <div>Unlocked weapons</div>
        <div className={"WeaponsHeader"}>
            <div className={"Header-Unlocked"}></div>
            <div></div>
        </div>
        {weapons && weapons.map(weapon =>
            <WeaponComponent weapon={weapon} key={weapon.id}/>
        )}
    </article>

}