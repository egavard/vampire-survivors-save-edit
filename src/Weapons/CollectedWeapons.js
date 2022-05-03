import React from "react";
import CollectedWeaponComponent from "./CollectedWeaponComponent";

export const CollectedWeapons = (props) => {
    return <article className={props.disabled ? "WeaponsConfig Disabled" : "WeaponsConfig"}>
        <div>Collected weapons</div>
        <div className={"WeaponsHeader"}>
            <div className={"Header-Unlocked"}></div>
            <div></div>
        </div>
        {props.weapons && props.weapons.map(weapon =>
            <CollectedWeaponComponent weapon={weapon} key={weapon.id}/>
        )}
    </article>

}