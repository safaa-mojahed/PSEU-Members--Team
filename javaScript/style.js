let save = document.getElementById('save');
let item = document.getElementById('card');
let cancel = document.getElementById('cancel-bourd-button');
let deleteItem = document.getElementById('delete-bourd-button');
let close = document.getElementById('close-artboard');
members = localStorage.getItem('teamMembers') ?
    JSON.parse(localStorage.getItem('teamMembers')) : []

function displayItems() {
    document.getElementById("card").innerHTML = "";
    members.forEach(element => {
        document.getElementById("card").innerHTML += displayCard(element.name,
            element.email, element.major, element.role, element.biography);
    });
}

displayItems();
displayNoOfItems();

function createMember(name, email, major, role, biography) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.biography = biography;
    this.date = Date();
}

save.addEventListener("click", function(e) {
    let memeberName = document.getElementById("name").value;
    let memberEmail = document.getElementById("email").value;
    let memberMajor = document.getElementById("major").value;
    let memberRole = document.getElementById("role").value;
    let memberBiography = document.getElementById("biography").value;
    let addBottom = document.getElementById("add-bottom").checked;
    let index = document.getElementById("index").value;
    let member = new createMember(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let valid = required(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let unique = emailIsUnique(memberEmail);
    if (valid && unique && !addBottom && index == "") {
        members.push(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    } else
    if (valid && unique && index == "") {
        members.unshift(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    } else
    if (valid && unique && !addBottom) {
        members.splice(index, 0, member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    }
    console.log(members);
});

function required(name, email, major, role, biography) {
    if (name.length === 0 || email.length === 0 || major.length === 0 ||
        role.length === 0 || biography.length === 0) {
        alert("All fields are required please enter all the required fields.");
        return false;
    }
    return true;
}

function emailIsUnique(enteredEmail) {
    let validEmail = members.find(member => member.email === enteredEmail);
    if (validEmail !== undefined) {
        alert("This email address is already exists")
        return false;
    }
    return true;
}

function displayCard(name, email, major, role, biography) {
    return ` <div class="right-content-cards">
        <div class="delete-icon">
            <img src="images/delete-icon.png" alt="delete">
        </div>
        <div id="card-content">
            <b id="member-name">${name}</b>
            <p><b id="details">${email} / ${major} / ${role} </b></p>
            <p> ${biography} </p>
        </div>
        </div>`
}

function displayNoOfItems() {
    document.getElementById("no-of-items").innerHTML = "";
    let noOfItems = `<p>${members.length} ITEMS</p>`
    document.getElementById("no-of-items").innerHTML = noOfItems;
}

item.addEventListener("click", function() {
    let name = this.name;
    let email = this.email;
    let major = this.major;
    let role = this.role;
    let biography = this.biography;
    let displayMember = displayItem(name, email, major, role, biography);
    document.getElementById("second-artboard").style.display = "inline";
});

function displayItem(name, email, major, role, biography) {
    document.getElementById("member-name").innerHTML = name;
    document.getElementById("member-deatails").innerHTML = email;
    document.getElementById("member-major").innerHTML = major;
    document.getElementById("member-role").innerHTML = role;
    document.getElementById("member-biography").innerHTML = biography;
}

cancel.addEventListener("click", function() {
    document.getElementById("second-artboard").style.display = "none";
})

close.addEventListener("click", function() {
    document.getElementById("second-artboard").style.display = "none";
})