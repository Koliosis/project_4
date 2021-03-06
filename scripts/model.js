var characterList = []

var nextCharacterId = 1000;

class Character {
    constructor(name,
        race,
        rpgClass,
        gender,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma) {
        this.id = nextCharacterId++;
        this.name = name;
        this.race = race;
        this.rpgClass = rpgClass;
        this.gender = gender;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
    }
};

function modelCreateCharacter(
    name,
    race,
    rpgClass,
    gender,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
) {
    var newCharacter = new Character(name, race, rpgClass, gender, strength, dexterity, constitution, intelligence, wisdom, charisma);
    characterList.push(newCharacter);
    return newCharacter;
};

function modelGetAllCharacter() {
    return characterList;
};

function modelGetCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            return characterList[x];
        }
    }
    return undefined;
};

function modelUpdateCharacter(id, name, race, rpgClass, gender, strength, dexterity, constitution, intelligence, wisdom, charisma) {
    var character = modelGetCharacter(id);
    if (!character) {
        return undefined;
    }

    character.name = name;
    character.race = race;
    character.rpgClass = rpgClass;
    character.gender = gender;
    character.strength = strength;
    character.dexterity = dexterity;
    character.constitution = constitution;
    character.intelligence = intelligence;
    character.wisdom = wisdom;
    character.charisma = charisma;

    return character;
}

function modelDeleteCharacter(id) {
    for (var x in characterList) {
        if (characterList[x].id === id) {
            characterList.splice(x, 1);
            break;
        }
    }
}