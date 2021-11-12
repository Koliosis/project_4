const characters = [
    {
        name: 'Balrog of Morgoth',
        race: 'Beast',
        class: 'Druid',
        gender: 'Unknown',
        strength: '12',
        dexterity: '14',
        constitution: '10',
        intelligence: '18',
        wisdom: '12',
        charisma: '9'
    },
    {
        name: 'Gandalf the Grey',
        race: 'Maiar',
        class: 'Wizard',
        gender: 'Male',
        strength: '11',
        dexterity: '11',
        constitution: '18',
        intelligence: '11',
        wisdom: '10',
        charisma: '13'
    },
    {
        name: 'Aragorn son of Arathorn',
        race: 'Numenorean',
        class: 'Ranger',
        gender: 'Male',
        strength: '12',
        dexterity: '12',
        constitution: '12',
        intelligence: '15',
        wisdom: '7',
        charisma: '16'
    },
    {
        name: 'Legolas',
        race: 'Elf',
        class: 'Ranger',
        gender: 'Male',
        strength: '7',
        dexterity: '10',
        constitution: '17',
        intelligence: '9',
        wisdom: '14',
        charisma: '18'
    }
]


let visable = false;
let handle = 0;
function toggle() {
    visable = !visable;
    if (visable) {
        btn.textContent = "Hide answer";
        aDiv.setAttribute('class', 'shown');
        handle = setTimeout(toggle, 5000);
    } else {
        btn.textContent = "Show answer"
        aDiv.setAttribute('class', 'hidden')
        clearTimeout(handle);
    }
}


function createItems(n, r, c, g) {
    // create section
    const section = document.createElement("section");
    //create div to house list of characters
    const div = document.createElement("div");
    div.setAttribute("class", "grid-container")
    section.appendChild(div);
    // create grid items to house each item
    const charItems = document.createElement('item');
    charItems.setAttribute("class", "grid-item")
    div.appendChild(charItems)
    charItems.textContent = `Name: ${n}, Race: ${r}, Class: ${c}, Gender: ${g}`;
    return section;
}


// create a button
const btn = document.createElement('button');
btn.textContent = 'Hide Stuff'
btn.addEventListener('click', toggle);
section.appendChild(btn);


const charactersDiv = document.querySelector('div#exampleCharacters')

for (char of characters) {
    const section = createItems(char.name, char.race, char.class, char.gender);
    charactersDiv.appendChild(section);
}