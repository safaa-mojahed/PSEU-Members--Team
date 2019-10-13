let save = document.getElementById('save');
let members = new Array();

function createMember(name, email, major, role, biography) 
{
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.biography = biography;
}

save.addEventListener("click", function(e) {
    let memeberName = document.getElementById("name").value;
    let memberEmail = document.getElementById("email").value;
    let memberMajor = document.getElementById("major").value;
    let memberRole = document.getElementById("role").value;
    let memberBiography = document.getElementById("biography").value;
    let addBottom = document.getElementById("addToBottom").checked;
    let member = new createMember(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let valid = required(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    let unique = emailIsUnique(memberEmail);
    console.log(addBottom);
    if(valid && unique && !addBottom) 
    {
        members.push(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        let allMembers = new Array();
        allMembers = localStorage.getItem('teamMembers') ?
        JSON.parse(localStorage.getItem('teamMembers')) : []
    }
    else 
    {
        members.shift(member);
        localStorage.setItem('teamMembers', JSON.stringify(members));
        let allMembers = new Array();
        allMembers = localStorage.getItem('teamMembers') ?
        JSON.parse(localStorage.getItem('teamMembers')) : []
    }
});

function required(name, email, major, role, biography) 
{
  if (name.length === 0 || email.length === 0 || major.length === 0 ||
    role.length === 0 || biography.length === 0)
   { 
      alert("please complete the form all the fields are required.");  	
      return false; 
   }  	
   return true; 
} 

function emailIsUnique (enteredEmail){
    let validEmail = members.find( member => member.email === enteredEmail);
    if(validEmail !== undefined) {
        alert("the email account must be unique.")
        return false;
    }
    return true;
 }
