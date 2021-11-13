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





function createTable(n, r, c, g) {
    // change this whole thing to use tables.
    // create section
    const section = document.createElement("section");
    //create div to house list of characters
    const div = document.createElement("div");
    section.appendChild(div);
    // create table to house characters
    const charTable = document.querySelector('table#characterTable');
    const charRow = document.createElement('tr');
    const charName = document.createElement('td')
    const charRace = document.createElement('td')
    const charClass = document.createElement('td')
    const charGender = document.createElement('td')
    for (char in characters) {
        charName.textContent = n;
        charRace.textContent = r;
        charClass.textContent = c;
        charGender.textContent = g;
    }
    div.appendChild(charTable);
    charTable.appendChild(charRow);
    charRow.appendChild(charName);
    charRow.appendChild(charRace);
    charRow.appendChild(charClass);
    charRow.appendChild(charGender);
    return section;
}


// initialize everything
function initialize() {
    console.log("hello");
    const charactersDiv = document.querySelector('div#exampleCharacters')
    const btn = document.createElement('button');
    btn.textContent = 'Hide Stuff'
    // see if you can do a lambda function to pass in the button function instead of having its own function on line 89
    // btn.addEventListener('click', toggle(btn));
    charactersDiv.appendChild(btn);
    for (char of characters) {
        const section = createTable(char.name, char.race, char.class, char.gender);
        charactersDiv.appendChild(section);
    }
}



// let visable = true;
// let handle = 0;
// function toggle(b) {
//     visable = !visable;
//     if (visable) {
//         b.textContent = "Hide answer";
//         const charactersDiv = document.querySelector('div#exampleCharacters')  
//         aDiv.setAttribute('class', 'shown');
//         handle = setTimeout(toggle, 5000);
//     } else {
//         b.textContent = "Show answer"
//         aDiv.setAttribute('class', 'hidden')
//         clearTimeout(handle);
//     }
// }




