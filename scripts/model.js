var characterList = []

function Character(
    name,
    race,
    rpgClass,
    gender,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
) {
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
    charisma
) {
    var newCharacter = Character(name, race, rpgClass, gender, strength, dexterity, constitution, intelligence, wisdom, charisma);
    characterList.push(newCharacter);
    return newCharacter;
};

function modelGetAllCharacter() {
    return characterList;
};

function modelGetCharacter(name) {
    for (x in characterList) {
        if (characterList[x].name === name) {
            return characterList[x];
        }
    }
    return undefined;
};