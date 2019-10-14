let save = document.getElementById('save');
let item = document.getElementById("card");
let secondArtbourd = document.getElementById("secound-artbourd");
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

function createMember(name, email, major, role, biography) 
{
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
    let addBottom = document.getElementById("addToBottom").checked;
    let index = document.getElementById("index").value;
    let member = new createMember(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let valid = required(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let unique = emailIsUnique(memberEmail);
    if(valid && unique && !addBottom && index == "") {
            members.push(member);
            localStorage.setItem('teamMembers', JSON.stringify(members));
            displayItems();
            displayNoOfItems();
        }
    else 
        if(valid && unique && index == "") {
                members.unshift(member);
                localStorage.setItem('teamMembers', JSON.stringify(members));
                displayItems();
                displayNoOfItems();
            }
    else 
        if(valid && unique && !addBottom ) {
                members.splice(index, 0, member);
                localStorage.setItem('teamMembers', JSON.stringify(members));
                displayItems();
                displayNoOfItems();
            }
    console.log(members);
});

function required(name, email, major, role, biography) 
{
  if (name.length === 0 || email.length === 0 || major.length === 0 ||
    role.length === 0 || biography.length === 0)
   { 
      alert("All fields are required please enter all the required fields.");  	
      return false; 
   }  	
   return true; 
} 

function emailIsUnique (enteredEmail){
    let validEmail = members.find( member => member.email === enteredEmail);
    if(validEmail !== undefined) {
        alert("This email address is already exists")
        return false;
    }
    return true;
 }

 function displayCard(name, email, major, role, biography ) {
    return ` <div class="rightContentCards">
        <div class="deleteIcon">
            <img src="images/delete-icon.png" alt="delete">
        </div>
        <div class="cardContent">
            <b id="memberName">${name}</b>
            <p><b id="details">${email} / ${major} / ${role} </b></p>
            <p> ${biography} </p>
        </div>
        </div>`
 }

 function displayNoOfItems() {
    document.getElementById("noOfItems").innerHTML = "";
     let noOfItems = `<p>${members.length} ITEMS</p>`
    document.getElementById("noOfItems").innerHTML = noOfItems;
 } 

 item.addEventListener("click", function() {
    let name = this.name;
    let email = this.email;
    let major = this.major;
    let role = this.role;
    let biography = this.biography;
    let displaymember = displayItem(name, email, major, role, biography);
    document.getElementById("secound-artbourd").style.display = "inline";
    display();
});

function displayItem(name, email, major, role, biography ) {
        return `<div>
        <p id="close-bourd">x</p>
    </div>
    <div class="bourd-content">
        <b id="member-name"${name}</b>
        <div class="member-details">
            <p><b id="member-deatails">${email}/</b></p>
            <select class="member-major">
                <option value="major" selected disabled value=" ">${major}</option>
                <option value="computerScience" >Computer Science</option>
                <option value="computerEngineering">Computer Engineering</option>
                <option value="informationTechnology">Information Technology</option>
                <option value="informationSystem">Information System</option>
            </select>
            <p>/</p>
            <select class="member-role">
                <option value="role" selected disabled value=" ">${role}</option>
                <option value="frontEndDeveloper">Front-End Developer</option>
                <option value="backEndDeveloper">Back-End Developer</option>
                <option value="fullStackDeveloper">Full-Stack Developer</option>
                <option value="designer">UI/UX Designer</option>
            </select>
        </div>
        <p id="member-biography">${biography}</p>
    </div>
    <div class="bourd-buttons">
        <button id="delete-bourd-button">DELETE</button>
        <button id="save-bourd-button">SAVE</button>
        <button id="cancel-bourd-button">CANCEL</button>
    </div>`
 }

 function display() {
    document.getElementById("secondArtbourd").innerHTML = "";
    document.getElementById("secondArtbourd").innerHTML += displayItem(element.name,
    element.email, element.major, element.role, element.biography);
    }
