import React from "react";

export const CharacterComponent = ({character, unlockCharacter, buyCharacter}) => {
    return <div key={character.id} className={"Characters"}>
        <div className={"Header-Unlocked"}><input type={"checkbox"}
                                                  checked={character.unlocked} key={character.id + "_unlocked"}
                                                  name={character.id + "_unlocked"} onChange={() => {
            unlockCharacter(character)
        }}/></div>
        <div className={"Header-Bought"}><input type={"checkbox"}
                                                checked={character.bought} key={character.id + "_bought"}
                                                name={character.id + "_bought"} onChange={() => {
            buyCharacter(character)
        }}/>
        </div>
        <div className={"Header-CharacterName"}>{character.charName ? character.charName : character.id}</div>
    </div>;
}