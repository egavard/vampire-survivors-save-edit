import React from "react"
import {ArcanaComponent} from "./arcana.component";

export const Arcanas = ({arcanas, arcanasChanged}) => {

  const lockArcana = (arcana) => {
    const newArcanas = [...arcanas];
    arcana.enabled = false;
    newArcanas.splice(newArcanas.findIndex(a => a.id === arcana.id), 1, arcana);
    arcanasChanged(newArcanas);
  }

  const unlockArcana = (arcana) => {
    const newArcanas = [...arcanas];
    arcana.enabled = true;
    newArcanas.splice(newArcanas.findIndex(a => a.id === arcana.id), 1, arcana);
    arcanasChanged(newArcanas);
  }

  return (<article>
    {arcanas.map(
        arcana => <ArcanaComponent arcana={arcana} key={"arcana_" + arcana.id}
                                   lockArcana={() => lockArcana(
                                       arcana)}
                                   unlockArcana={() => unlockArcana(
                                       arcana)}></ArcanaComponent>)}
  </article>)
}
