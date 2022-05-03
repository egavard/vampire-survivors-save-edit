import './App.css';
import React, {useState} from "react";
import FileInput from "./FileInput";
import {Character, PowerUp, Weapon} from "./Character";
import defaultConfig from "./configurations/defaultConfiguration.json"
import chars from "./configurations/characterLang.json"
import pwups from "./configurations/powerUpLang.json"
import pwupAmounts from "./configurations/powerUpAmount.json"
import weaps from "./configurations/weaponLang.json"
import {PowerUps} from "./PowerUps/PowerUps";
import {Weapons} from "./Weapons/Weapons";
import {Characters} from "./Characters/Characters";

const App = () => {

    const [characters, setCharacters] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [saveContent, setSaveContent] = useState(undefined);
    const [generated, setGenerated] = useState(false);
    const [generatedSave, setGeneratedSave] = useState("");
    let shouldLoadConf = true;

    React.useEffect(() => {
        loadCharacters();
        loadPowerUps();
        loadWeapons();
    }, [shouldLoadConf]);


    const loadCharacters = () => {
        let translations = new Map(Object.entries(chars.en.translations));
        let characters = [];
        for (const key of translations.keys()) {
            characters.push(new Character(key, translations.get(key).charName));
        }
        setCharacters(characters);
    }

    const loadPowerUps = () => {
        let translations = new Map(Object.entries(pwups.en.translations));
        let powerUps = [];
        for (const key of translations.keys()) {
            let pwup = new PowerUp();
            pwup.id = key;
            pwup.name = translations.get(key).name;
            pwup.max = pwupAmounts[pwup.id];
            powerUps.push(pwup);
        }
        setPowerUps(powerUps);

    }

    const loadWeapons = () => {
        let translations = new Map(Object.entries(weaps.en.translations));
        let weapons = [];
        for (const key of translations.keys()) {
            let weap = new Weapon();
            weap.id = key;
            weap.name = translations.get(key).name;
            weap.tips = translations.get(key).tips;
            weapons.push(weap);
        }
        setWeapons(weapons);

    }

    const addDefaultConfig = (saveContent) => {
        console.log(defaultConfig);
        for (let index in defaultConfig.defaultUnlockedChar) {
            saveContent.UnlockedCharacters.push(defaultConfig.defaultUnlockedChar[index]);
        }
        for (let index in defaultConfig.defaultPurchasedChar) {
            saveContent.BoughtCharacters.push(defaultConfig.defaultPurchasedChar[index]);
        }
        for (let index in defaultConfig.defaultUnlockedWeapons) {
            saveContent.UnlockedWeapons.push(defaultConfig.defaultUnlockedWeapons[index]);
        }
        saveContent.UnlockedWeapons = removeDuplicateEntry(saveContent.UnlockedWeapons);
        saveContent.UnlockedCharacters = removeDuplicateEntry(saveContent.UnlockedCharacters);
        saveContent.BoughtCharacters = removeDuplicateEntry(saveContent.BoughtCharacters);
    }

    const removeDuplicateEntry = (array) => {
        return [...new Set(array)]
    }

    const readSave = (save: string) => {
        let saveContent = JSON.parse(save);
        saveContent.checksum = "";
        addDefaultConfig(saveContent);
        setCharacters(characters.map(char => {
            char.bought = saveContent.BoughtCharacters.indexOf(char.id) > -1;
            char.unlocked = saveContent.UnlockedCharacters.indexOf(char.id) > -1;
            return char
        }));
        setPowerUps(powerUps.map(powerUp => {
            powerUp.bought = saveContent.BoughtPowerups.indexOf(powerUp.id) > -1;
            powerUp.quantity = saveContent.BoughtPowerups.filter(p => p === powerUp.id).length;
            return powerUp;
        }));
        setWeapons(weapons.map(weapon => {
            weapon.unlocked = saveContent.UnlockedWeapons.indexOf(weapon.id) > -1;
            weapon.collected = saveContent.CollectedWeapons.filter(w => w.id === weapon.id).length;
            return weapon;
        }));
        setSaveContent(saveContent);
    }


    const assignCharactersItems = () => {
        saveContent.BoughtCharacters = characters.filter(c => c.bought).map(c => c.id);
        saveContent.UnlockedCharacters = characters.filter(c => c.unlocked).map(c => c.id);
        saveContent.UnlockedWeapons = weapons.filter(w => w.unlocked).map(w => w.id);
    }

    const generateSave = async () => {
        saveContent.checksum = "";
        assignCharactersItems();
        const encoder = new TextEncoder();
        let encodedString = await crypto.subtle.digest("SHA-256", encoder.encode(JSON.stringify(saveContent)));
        const hashHex = buf2hex(encodedString);
        saveContent.checksum = hashHex;
        setGeneratedSave(JSON.stringify(saveContent));
        setGenerated(true);
    }

    const buf2hex = (buffer) => { // buffer is an ArrayBuffer
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }


    const updateCharacters = (characters) => {
        setCharacters(characters);
    }

    return (
        <>
            <header>
                <p>This tool will allow you to modify you save of Vampire Survivors. It comes with no warranty,
                    backup your data before using it.
                </p>
                <p>
                    Default location of the save on Windows is :
                    C:\Users\%USER%\AppData\Roaming\Vampire_Survivors\saves
                    You can access it by typing %appdata% in your explorer, and navigate to Vampire_Survivors
                    then /saves.
                </p>
            </header>
            <div className="App">
                <FileInput onChange={readSave}></FileInput>
                <button onClick={generateSave}>Generate save</button>
            </div>
            <div>
            </div>
            <div className={"Configs"}>
                <Characters characters={characters} charactersChange={updateCharacters}/>
                <Weapons weapons={weapons}/>
                <PowerUps powerUps={powerUps}/>
                {generated && (<fieldset>
                    {generatedSave}
                </fieldset>)}
            </div>
        </>
    );
}


export default App;
