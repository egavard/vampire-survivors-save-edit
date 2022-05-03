import React from "react";

export const CharacterComponent = ({character, unlockCharacter, buyCharacter}) => {
    return <fieldset key={character.id}>
        <div className={"Characters"}>
            <label className={"Header-Unlocked"}>
                <input type={"checkbox"}
                       checked={character.unlocked} key={character.id + "_unlocked"}
                       name={character.id + "_unlocked"} onChange={() => {
                    unlockCharacter(character)
                }}/></label>
            <label className={"Header-Bought"}><input type={"checkbox"}
                                                      checked={character.bought} key={character.id + "_bought"}
                                                      name={character.id + "_bought"} onChange={() => {
                buyCharacter(character)
            }}/></label>
            <label>{character.charName ? character.charName : character.id}</label>
        </div>
    </fieldset>;
}