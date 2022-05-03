import React from "react";
import WeaponComponent from "./WeaponComponent";

export const Weapons = ({weapons, weaponsChange}) => {
    const unlockWeapon = (weapon) => {
        weapon.unlocked = !weapon.unlocked;
        const weaponIndex = weapons.findIndex(w => w.id === weapon.id);
        const newWeaponsArray = [...weapons];
        newWeaponsArray.splice(weaponIndex, 1, weapon);

        weaponsChange(newWeaponsArray);
    }

    return <article className={"WeaponsConfig"}>
        <div>Unlocked weapons</div>
        <div className={"WeaponsHeader"}>
            <div className={"Header-Unlocked"}></div>
            <div></div>
        </div>
        {weapons && weapons.map(weapon =>
            <WeaponComponent weapon={weapon} key={weapon.id} unlockWeapon={unlockWeapon}/>
        )}
    </article>

}