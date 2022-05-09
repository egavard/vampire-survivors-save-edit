interface SaveContent {
    BoughtCharacters: Array<string>;
    BoughtPowerups: Array<string>;
    CollectedWeapons: Array<string>;
    UnlockedWeapons: Array<string>;
    UnlockedCharacters: Array<string>;
    Achievements: Array<string>;
    UnlockedStages: Array<string>;
    UnlockedHypers: Array<string>;
    UnlockedArcanas: Array<string>
    PickupCount: Map<string, number>;
    checksum: string;
}

export default SaveContent;