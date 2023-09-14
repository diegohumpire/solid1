interface Spell {
    cast(mageName: string): string;
}

class Fireball implements Spell {
    cast(mageName: string): string {
        return `${mageName} lanza una bola de fuego!`;
    }
}

class Frostbolt implements Spell {
    cast(mageName: string): string {
        return `${mageName} lanza un rayo de hielo!`;
    }
}

class Mage {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    castSpell(spell: Spell): string {
        console.log(spell.cast(this.name));
        return spell.cast(this.name);
    }
}

const mage1 = new Mage("Gandalf");
const mage2 = new Mage("Jaina");

const fireball = new Fireball();
const frostbolt = new Frostbolt();

mage1.castSpell(fireball);
mage1.castSpell(frostbolt);
mage2.castSpell(frostbolt);
