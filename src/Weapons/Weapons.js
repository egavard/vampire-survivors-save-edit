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

    const unlockAllWeapon = () => {
        weaponsChange(
            [...weapons].map(w => {
                w.unlocked = true;
                return w;
            })
        );
    }

    return <article className={"WeaponsConfig"}>

        <div className={"WeaponsHeader"}>
            <div>Unlocked weapons</div>
            <div className={"Header-Unlocked"}></div>
            <div></div>
            <button onClick={unlockAllWeapon}>Unlock all</button>
        </div>
        {weapons && weapons.map(weapon =>
            <WeaponComponent weapon={weapon} key={weapon.id} unlockWeapon={unlockWeapon}/>
        )}
    </article>

}