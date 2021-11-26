function onPageLoad() {
    // create even handlers
    document.getElementById("createBtn").onclick = onCreateBtnClicked;
    document.getElementById("cancelBtn").onclick = onCancelBtnClicked;
    document.getElementById("newBtn").onclick = onNewBtnClicked;
    document.getElementById("rerollBtn").onclick = onRerollClicked;

    // // populate the table
    var items = modelGetAllCharacter();
    for (var i = 0; i < items.length; i++) {
        addTableItem(items[i]);
    }


    // reset input form
    clearInputForm();
}


function diceStats() {
    var dice = {
        sides: 6,
        roll: function () {
            var randomNumber = Math.floor(Math.random() * this.sides) + 1;
            return randomNumber;
        }
    }
    sumDice = 0
    for (var i = 0; i < 3; i++) {
        sumDice += dice.roll()
    }
    return sumDice;
}


function onNewBtnClicked() {
    document.getElementById("formTitle").innerText = "Create New Character";
    document.getElementById('characterEditArea').style.display = "block";
    document.getElementById('characterListArea').style.display = "none";
    document.getElementById('createBtn').style.display = "inline";
    document.getElementById('updateBtn').style.display = "none";

    document.getElementById("strengthEdit").innerText = diceStats();
    document.getElementById("dexterityEdit").innerText = diceStats();
    document.getElementById("constitutionEdit").innerText = diceStats();
    document.getElementById("intelligenceEdit").innerText = diceStats();
    document.getElementById("wisdomEdit").innerText = diceStats();
    document.getElementById("charismaEdit").innerText = diceStats();
}


function onCancelBtnClicked() {
    clearInputForm();
}

function onEditBtnClicked(id) {
    var character = modelGetCharacter(id);
    if (!character) {
        alert("Unable to find character ID + " + id);
    }

    document.getElementById("formTitle").innerText = "Edit Character";
    var form = document.forms["editForm"];
    form.nameEdit.value = character.name;
    // figure out radio buttons for gender
    if (character.gender === "male") {
        form.gender[0].checked = true;
    } else if (character.gender === "female") {
        form.gender[1].checked = true;
    } else {
        form.gender[2].checked = true;
    }
    form.idEdit.value = character.id;
    for (var race in form.raceSelect.options) {
        var option = form.raceSelect.options[race];
        if (option.value === character.race) {
            option.selected = true;
        }
    }

    for (var rpgClass in form.classSelect.options) {
        var option = form.classSelect.options[rpgClass];
        if (option.value === character.rpgClass) {
            option.selected = true;
        }
    }

    parseInt(form.strengthEdit.value) = character.strength;
    parseInt(form.dexterityEdit.value) = character.dexterity;
    parseInt(form.contstitutionEdit.value) = character.constitution;
    parseInt(form.intelligenceEdit.value) = character.intelligence;
    parseInt(form.wisdomEdit.value) = character.wisdom;
    parseInt(form.charismaEdit.value) = character.charisma;


    // form.strengthEdit.value = character.strength;
    document.getElementById('characterEditArea').style.display = "block";
    document.getElementById('characterListArea').style.display = "none";
    document.getElementById("createBtn").style.display = "none";

    var updateBtn  = document.getElementById("updateBtn");
    updateBtn.style.display = "inline";
    updateBtn.onclick = function () {
        onUpdateBtnClicked(character.id);
    }
}


function onCreateBtnClicked() {
    if(!validateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var newCharacter = modelCreateCharacter(
        form.nameEdit.value,
        form.raceSelect.value,
        form.classSelect.value,
        form.gender.value,
        //might need to change these to parseInt() later
        parseInt(form.strengthEdit.value),
        parseInt(form.dexterityEdit.value),
        parseInt(form.constitutionEdit.value),
        parseInt(form.intelligenceEdit.value),
        parseInt(form.wisdomEdit.value),
        parseInt(form.charismaEdit.value),
        parseInt(form.id.value),
    );

    addTableItem(newCharacter);

    clearInputForm();
}


function onUpdateBtnClicked(id) {
    if (!validateControls()) {
        return;
    }
    var form = document.forms["editForm"];
    var character = modelUpdateCharacter(
        id,
        form.nameEdit.value,
        form.raceSelect.value,
        form.classSelect.value,
        form.gender.value,
        //might need to change these to parseInt() later
        parseInt(form.strengthEdit),
        parseInt(form.dexterityEdit.value),
        parseInt(form.constitutionEdit.value),
        parseInt(form.intelligenceEdit.value),
        parseInt(form.wisdomEdit.value),
        parseInt(form.charismaEdit.value),
        parseInt(form.id.value),
    );

    if (!character) {
        alert("Unable to update character ID =" + id);
        return;
    }

    var tr = document.getElementById("row" + id);
    tr.childNodes[0].innerText = character.name;
    tr.childNodes[1].innerText = character.race;
    tr.childNodes[2].innerText = character.rpgClass;
    tr.childNodes[3].innerText = character.gender;



    clearInputForm();    
}


function onRerollClicked() {
    document.getElementById("strengthEdit").innerText = diceStats();
    document.getElementById("dexterityEdit").innerText = diceStats();
    document.getElementById("constitutionEdit").innerText = diceStats();
    document.getElementById("intelligenceEdit").innerText = diceStats();
    document.getElementById("wisdomEdit").innerText = diceStats();
    document.getElementById("charismaEdit").innerText = diceStats();
}


function addTableItem(character) {
    var table = document.getElementById("characterTable");

    var row = table.insertRow(table.rows.length);
    row.id = 'row' + character.id;

    var cell = row.insertCell(0);
    cell.innerText = character.name;

    cell = row.insertCell(1);
    cell.innerText = character.race;

    cell = row.insertCell(2);
    cell.innerText = character.rpgClass;

    cell = row.insertCell(3);
    cell.innerText = character.gender;

    var editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
        onEditBtnClicked(character.id);
    }

    cell = row.insertCell(4);
    cell.appendChild(editBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Delete"
    deleteBtn.onclick = function () {
        onDeleteBtnClicked(character.id);
    }

    cell = row.insertCell(5);
    cell.appendChild(deleteBtn);
}


function validateControls() {
    var form = document.forms["editForm"];
    var isValidated = true;

    if (form.nameEdit.value === "") {
        document.getElementById("nameError").innerText = "Name is required";
        isValidated = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }
    if (form.raceSelect.selectedIndex === "-1") {
        document.getElementById("raceError").innerText = "Race is required";
        isValidated = false;
    } else {
        document.getElementById("raceError").innerText = "";
    }
    if (!form.genderMaleRadio.checked && !form.genderFemaleRadio.checked && !form.genderUnknownRadio.checked) {
        document.getElementById('genderError').innerText = "Gender is required";
        isValidated = false;
    } else {
        document.getElementById('genderError').innerText = "";
    }
    if (form.idEdit.value == "") {
        document.getElementById('idError').innerText = "ID is required";
        isValidated = false
    } else if (isNaN(parseInt(form.idEdit.value))) {
        document.getElementById('idError').innerText = "ID must be a number";
        isValidated = false;
    } else {
        document.getElementById('idError').innerText = "";
    }

    if (form.raceSelect.selectedIndex === -1) {
        document.getElementById('raceError').innerText = "Race is required";
        isValidated = false;
    } else {
        document.getElementById('raceError').innerText = "";
    }

    return isValidated;
}


function clearInputForm() {
    // Hide form and show contact list
    document.getElementById('characterEditArea').style.display = "none";
    document.getElementById('characterListArea').style.display = "block";

    var form = document.forms["editForm"];

    form.nameEdit.value = "";
    document.getElementById("nameError").innerText = "";


    form.genderMaleRadio.checked = false;
    form.genderFemaleRadio.checked = false;
    form.genderUnknownRadio.checked = false;
    document.getElementById("genderError").innerText = "";


    form.classSelect.selectedIndex = -1;
    document.getElementById("classError").innerText = "";

    form.strengthEdit.value = "";
    document.getElementById("strengthError").innerText = "";

    form.dexterityEdit.value = "";
    document.getElementById("dexterityError").innerText = "";

    form.constitutionEdit.value = "";
    document.getElementById("constitutionError").innerText = "";

    form.intelligenceEdit.value = "";
    document.getElementById("intelligenceError").innerText = "";

    form.wisdomEdit.value = "";
    document.getElementById("wisdomError").innerText = "";

    form.charismaEdit.value = "";
    document.getElementById("charismaError").innerText = "";

    form.raceSelect.selectedIndex = -1;
    document.getElementById('raceError').innerText = "";

    form.id.value = "";
    document.getElementById("idError").innerText = "";

}