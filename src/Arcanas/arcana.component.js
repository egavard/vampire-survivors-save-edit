export const ArcanaComponent = ({arcana, unlockArcana, lockArcana}) => {

    const lockUnlockArcana = () => {
        arcana.enabled ? lockArcana(arcana) : unlockArcana(arcana)

    }

    return (
        <fieldset>
            <label>
                <input type="checkbox" onChange={lockUnlockArcana} checked={arcana.enabled} />
                {arcana.name}
            </label>
        </fieldset>
    )
}