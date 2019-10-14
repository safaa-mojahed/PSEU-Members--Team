// set variablies to get elements from index.html file using id.
let save = document.getElementById('save');
let item = document.getElementById('card');
let cancel = document.getElementById('cancel-board-button');
let deleteItem = document.getElementById('delete-bourd-button');
let close = document.getElementById('close-artboard');
/* if statement to check if we have a local storage or not, so if it's exists,
  we will equal members array to it after parse it to objects, if not then members will be empty. */
members = localStorage.getItem('teamMembers') ?
    JSON.parse(localStorage.getItem('teamMembers')) : []

//this function display all the members stored in the array in the right content of the page.
function displayItems() {
    document.getElementById("card").innerHTML = "";
    members.forEach(element => {
        document.getElementById("card").innerHTML += displayCard(element.name,
            element.email, element.major, element.role, element.biography);
    });
}

displayItems();
displayNoOfItems();

//this function for create new object.
function createMember(name, email, major, role, biography) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.biography = biography;
    //include the date and time in local storage.
    this.date = Date();
}

//add eventListener on save button.
save.addEventListener("click", function(e) {
    //after the user enter the values for all fields, they will be saved in variablies.
    let memeberName = document.getElementById("name").value;
    let memberEmail = document.getElementById("email").value;
    let memberMajor = document.getElementById("major").value;
    let memberRole = document.getElementById("role").value;
    let memberBiography = document.getElementById("biography").value;
    //take the resualt of the checkbox and index input.
    let addBottom = document.getElementById("add-bottom").checked;
    let index = document.getElementById("index").value;
    //after save the values in variablies, these values will be used to create new object.
    let member = new createMember(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    //call function required to check if all fieldl are not empty.
    let valid = required(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    //call function emailIdUnique to check if the email address if unique.
    let unique = emailIsUnique(memberEmail);
    if (valid && unique && !addBottom && index == "") {
        //if the user dosn't choose the checkbox or index the object wil be added by default at top.
        //first I push the element to members array and then I parse the array to string 
        //and and then add it to localstorage.
        members.push(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    } else
    if (valid && unique && index == "") {
        //if checkbox value is true, then the object will be added at the bottom of the local storage 
        //by using unshift function.
        members.unshift(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    } else
    if (valid && unique && !addBottom) {
        //if user choose index field, then the object will be added to local storage at the specified index.
        members.splice(index, 0, member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        displayItems();
        displayNoOfItems();
    }
    console.log(members);
});

//this function check the validation, if all fields are not empty,
// if one is empty then an alart message will appear.
function required(name, email, major, role, biography) {
    if (name.length === 0 || email.length === 0 || major.length === 0 ||
        role.length === 0 || biography.length === 0) {
        alert("All fields are required please enter all the required fields.");
        return false;
    }
    return true;
}

//this function check if the email address is unique, if not an alart message will appear.
function emailIsUnique(enteredEmail) {
    let validEmail = members.find(member => member.email === enteredEmail);
    if (validEmail !== undefined) {
        alert("This email address is already exists")
        return false;
    }
    return true;
}

//this function will display all the members  in the right content of the page.
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

//this functioin display the number of member appeared in the page
function displayNoOfItems() {
    document.getElementById("no-of-items").innerHTML = "";
    let noOfItems = `<p>${members.length} ITEMS</p>`
    document.getElementById("no-of-items").innerHTML = noOfItems;
}

//add eventListener to 
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