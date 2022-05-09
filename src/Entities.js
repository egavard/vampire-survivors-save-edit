export class Character {
    id: string;
    charName: string;
    bought: boolean;
    unlocked: boolean;

    constructor(id, charName) {
        this.id = id;
        this.charName = charName;
    }


}

export class PowerUp {
    id: string;
    name: string;
    bought: boolean;
    quantity: number;
    max: number;
}

export class Weapon {
    id: string;
    name: string;
    tips: string;
    unlocked: boolean;
    collected: boolean;
}

export class Relic {
    id: string;
    enabled: boolean;


    constructor(id: string, enabled: boolean) {
        this.id = id;
        this.enabled = enabled;
    }
}