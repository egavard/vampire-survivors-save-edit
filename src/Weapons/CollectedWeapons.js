import React from "react";
import CollectedWeaponComponent from "./CollectedWeaponComponent";
import {Weapon} from "../Entities";

interface CollectedWeaponsParams {
    weapons: Weapon[];
    weaponsChange: () => {};
}

export const CollectedWeapons = (props: CollectedWeaponsParams) => {
    const collectWeapon = (weapon: Weapon) => {
        weapon.collected = !weapon.collected;
        const weaponIndex = props.weapons.findIndex(w => w.id === weapon.id);
        const newWeaponsArray = [...(props.weapons)];
        newWeaponsArray.splice(weaponIndex, 1, weapon);
        props.weaponsChange(newWeaponsArray)
    }
    return <article className={"WeaponsConfig"}>
        <div>Collected weapons</div>
        <div className={"WeaponsHeader"}>
            <div className={"Header-Unlocked"}></div>
        </div>
        {props.weapons && props.weapons.map(weapon =>
            <CollectedWeaponComponent weapon={weapon} key={weapon.id} collectWeapon={collectWeapon}/>
        )}
    </article>

}