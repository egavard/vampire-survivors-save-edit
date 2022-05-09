import React, {useEffect, useState} from "react";
import items from "../configurations/itemLang.json"

interface RelicsComponentParams {
    addRelic: (relic: string) => {};
    removeRelic: (relic: string) => {};
    savedRelics: [];
}

export const RelicsComponent = ({addRelic, removeRelic, savedRelics}: RelicsComponentParams) => {
    const [relics, setRelics] = useState([]);

    useEffect(() => {
        setRelics(Object.keys(items.en.translations).filter(k => k.indexOf("RELIC_") > -1));
    }, [setRelics, savedRelics])

    const pickOrUnpickRelic = (relic) => {
        if (savedRelics.find(r => r.id === relic) && savedRelics.find(r => r.id === relic).enabled) {
            removeRelic(relic);
        } else {
            addRelic(relic);
        }
    }

    const isRelicEnabled = (relic) => {
        return savedRelics.find(r => r.id === relic) && savedRelics.find(r => r.id === relic).enabled;
    }


    return (
        <article className="PowerUpsConfig">
            {relics.map((relic =>
                <fieldset key={"field_" + relic}>
                    <label>
                        <input type="checkbox"
                               checked={isRelicEnabled(relic)}
                               key={relic}
                               onClick={(_e) => pickOrUnpickRelic(relic)}/>
                        {items.en.translations[relic].name}</label>
                </fieldset>))}
        </article>
    )
}