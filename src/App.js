import './pico.min.css';
import './App.css';
import React, {useState} from "react";
import FileInput from "./FileInput";
import {Character, PowerUp, Relic, Weapon} from "./Entities";
import defaultConfig from "./configurations/defaultConfiguration.json"
import chars from "./configurations/characterLang.json"
import pwups from "./configurations/powerUpLang.json"
import pwupAmounts from "./configurations/powerUpAmount.json"
import weaps from "./configurations/weaponLang.json"
import {PowerUps} from "./PowerUps/PowerUps";
import {Weapons} from "./Weapons/Weapons";
import {Characters} from "./Characters/Characters";
import {CollectedWeapons} from "./Weapons/CollectedWeapons";
import {RelicsComponent} from "./Relics/Relics.component";

const App = () => {

    const [characters, setCharacters] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [upgradedWeapons, setUpgradedWeapons] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [relics, setRelics] = useState([]);
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
        let upgradedWeapons = [];
        for (const key of translations.keys()) {
            let weap = new Weapon();
            weap.id = key;
            weap.name = translations.get(key).name;
            weap.tips = translations.get(key).tips;
            if (translations.get(key).tips && translations.get(key).tips.indexOf("Requires:") < 0) {
                weapons.push(weap);
            } else {
                upgradedWeapons.push(weap);
            }
        }
        setWeapons(weapons);
        setUpgradedWeapons(upgradedWeapons);
    }

    const addDefaultConfig = (saveContent) => {
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
            return weapon;
        }));
        setUpgradedWeapons(upgradedWeapons.map(weapon => {
            weapon.collected = saveContent.CollectedWeapons.indexOf(weapon.id) > -1;
            return weapon;
        }));
        setRelics(Object.keys(saveContent.PickupCount).filter(k => k.indexOf("RELIC_") > -1)
            .map(relic => {
                return saveContent.PickupCount[relic] > 0 ?
                    new Relic(relic, true) : new Relic(relic, false);
            }));
        setSaveContent(saveContent);
    }


    const assignRelics = () => {
        relics.filter(r => r != null && r.enabled).forEach(r => {
            saveContent.PickupCount[r] = 1;
        })
        relics.forEach(relic => {
            const achievements = defaultConfig.achievementsForRelics[relic.id];

            if (relic.enabled) {
                achievements.forEach(achievement => {
                    if (saveContent.Achievements.indexOf(achievement) === -1) {
                        saveContent.Achievements.push(achievement);
                    }
                })
                if (relic === "RELIC_RANDOMAZZO") {
                    if (saveContent.UnlockedArcanas.indexOf("T06_SARABANDE") === -1) {
                        saveContent.UnlockedArcanas.push("T06_SARABANDE")
                    }
                }
            } else {
                achievements.forEach(a => {
                    saveContent.Achievements.splice(saveContent.Achievements.indexOf(a), 1);
                })
            }
        })
    }

    const assignCharactersItems = () => {
        saveContent.BoughtCharacters = characters.filter(c => c.bought).map(c => c.id);
        saveContent.UnlockedCharacters = characters.filter(c => c.unlocked).map(c => c.id);
        saveContent.UnlockedWeapons = weapons.filter(w => w.unlocked).map(w => w.id);
        saveContent.CollectedWeapons = upgradedWeapons.filter(w => w.collected).map(w => w.id);
        saveContent.BoughtPowerups = powerUps.filter(pw => pw.quantity > 0)
            .flatMap(pw => {
                const arr = [];
                for (let i = 0; i < pw.quantity; i++) {
                    arr.push(pw.id);
                }
                return arr;
            });
        if (saveContent.UnlockedCharacters.indexOf('VERANDA') > -1) {
            if (saveContent.KillCount['BOSS_XLLEDA']) {
                saveContent.KillCount['BOSS_XLLEDA'] = saveContent.KillCount['BOSS_XLLEDA'] + 1;
            } else {
                saveContent.KillCount['BOSS_XLLEDA'] = 1;
            }
        }
        assignRelics();
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

    const addRelic = (relic) => {
        const newRelic = new Relic(relic, true);
        const newRelics = [...relics];
        newRelics.splice(newRelics.findIndex(r => r.id === relic), 1, newRelic);
        setRelics(newRelics);
    };

    const removeRelic = (relic) => {
        const newRelic = new Relic(relic, false);
        const newRelics = [...relics];
        newRelics.splice(newRelics.findIndex(r => r.id === relic), 1, newRelic);
        setRelics(newRelics);
    };

    return (
        <>
            <article>
                <header>Vampire Survivors: Save Editor</header>
                <p>This tool will allow you to modify you save of Vampire Survivors. It comes with no warranty,
                    backup your data before using it.
                </p>
                <p>
                    Default location of the save on Windows is :
                    C:\Users\%USER%\AppData\Roaming\Vampire_Survivors\saves
                    You can access it by typing %appdata% in your explorer, and navigate to Vampire_Survivors
                    then /saves.
                </p>
                <p>
                   Default location of the save on MacOS is :
                    /Users/<user>/Library/Application Support/Vampire_Survivors/saves
                </p>
                <p>
                    At the moment, the tool does not touch to your powerUps nor weapons. You can only use it for
                    unlocking characters.
                </p>
                <footer className="App">
                    <FileInput onChange={readSave}></FileInput>
                    <button onClick={generateSave} disabled={!saveContent}>Generate save</button>
                </footer>

            </article>
            <div className={"Configs"}>
                <Characters characters={characters} charactersChange={setCharacters}/>
                <Weapons weapons={weapons} weaponsChange={setWeapons}/>
                <CollectedWeapons weapons={upgradedWeapons} weaponsChange={setUpgradedWeapons}/>
                <PowerUps powerUps={powerUps} powerUpsChange={setPowerUps}/>
            </div>
            <div className={"Configs"}>
                <RelicsComponent addRelic={addRelic} removeRelic={removeRelic} savedRelics={relics}/>
                {generated && (<article className="Save-Result"><small>
                    <fieldset className={"Save-Result-Fieldset"}>
                        {generatedSave}
                    </fieldset>
                </small>
                </article>)}
            </div>
            <div>
            </div>
        </>
    );
}


export default App;
