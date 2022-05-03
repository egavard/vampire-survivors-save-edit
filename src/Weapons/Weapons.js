import React from "react";
import WeaponComponent from "./WeaponComponent";

export const Weapons = ({weapons}) => {
    return <article className={"WeaponsConfig"}>
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