 let save = document.getElementById('save');
let members = new Array();

function createMember(name, email, major, role, biography) {
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
    let member = new createMember(memeberName, memberEmail, memberMajor, memberRole, memberBiography);
    members.push(member);
    localStorage.setItem('teamMembers', JSON.stringify(members));
    let allMembers = new Array();
    allMembers = localStorage.getItem('teamMembers') ?
    JSON.parse(localStorage.getItem('teamMembers')) : []
});


