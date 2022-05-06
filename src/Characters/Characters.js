import React from "react";
import {CharacterComponent} from "./CharacterComponent";
import {Character} from "../Entities";

interface CharactersProps {
    characters: Character[];
    charactersChange: Function
}

export const Characters = (props: CharactersProps) => {

    const characterChanged = (character) => {
        const charIndex = props.characters.findIndex(c => c.id === character.id);
        const newCharsArray = [...props.characters];
        newCharsArray.splice(charIndex, 1, character);
        props.charactersChange(newCharsArray);
    }

    const unlockCharacter = (character) => {
        character.unlocked = !character.unlocked;
        characterChanged(character);
    }

    const buyCharacter = (character) => {
        character.bought = !character.bought;
        characterChanged(character);
    }

    const unlockAllCharacters = () => {
        props.charactersChange(
            [...props.characters].map(c => {
                c.bought = true;
                c.unlocked = true
                return c;
            })
        )
    }

    return (<article className={"CharactersConfig"}>
        <div className={"CharactersHeader"}>
            <div className={"Header-Unlocked"}>Unlocked</div>
            <div className={"Header-Bought"}>Bought</div>
            <div className={"Header-Title"}>Character name</div>
            <button onClick={unlockAllCharacters}>Unlock & buy all</button>
        </div>
        <div>
            {props.characters && props.characters.map(character => <CharacterComponent key={character.id}
                                                                                       character={character}
                                                                                       unlockCharacter={() => {
                                                                                           unlockCharacter(character)
                                                                                       }}
                                                                                       buyCharacter={() => {
                                                                                           buyCharacter(character)
                                                                                       }
                                                                                       }/>)}
        </div>
    </article>)
}