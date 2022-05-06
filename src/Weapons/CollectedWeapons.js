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

    const unlockAllWeapon = () => {
        props.weaponsChange([...props.weapons].map(w => {
            w.collected = true;
            return w;
        }));
    }

    return <article className={"WeaponsConfig"}>
        <div className={"WeaponsHeader"}>
            <div className={"Header-Unlocked"}></div>
            <div>Collected weapons</div>
            <button onClick={unlockAllWeapon}>Unlock all</button>
        </div>
        {props.weapons && props.weapons.map(weapon =>
            <CollectedWeaponComponent weapon={weapon} key={weapon.id} collectWeapon={collectWeapon}/>
        )}
    </article>

}