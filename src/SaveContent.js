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
    checksum: string;
}

export default SaveContent;