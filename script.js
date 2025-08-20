const searchBtn=document.getElementById("searchBtn");
const usernameInput=document.getElementById("username");
const userProfileDiv=document.getElementById("userProfile");
const reposDiv=document.getElementById("repos");

searchBtn.addEventListener("click",()=>{
    const username=usernameInput.value.trim();
    if(username){
        fetchUser(username);
    }else{
        alert("please enter a GitHub username");
    }
});
function fetchUser(username){
    userProfileDiv.innerHTML="<p>loading..</p>";
    reposDiv.innerHTML="";
    axios.get(`https://api.github.com/users/${username}`)
    .then (res=>{
        
        displayUser(res.data);
        fetchRepos(username);
    })
    .catch(err=>{
        console.log(err)
        userProfileDiv.innerHTML=`<p style ="color:red;">user not found </p>`;
    });
}
function displayUser(user){
    userProfileDiv.innerHTML=`<div class="profile-card">
                                <img src="${user.avatar_url}" alt="${user.login}">
                                <div>
                                     <h2>${user.name}||${user.login}</h2>
                                     <p>${user.bio || "No bio available"}</p>
                                     <p>followers:${user.followers} | following:${user.following}</p>
                                     <p>Public Repos:${user.public_repos}</p>
                                     <a href ="${user.html_url}" target="_blank">View Profile</a>
                                 </div>
                               </div>`;
}
function fetchRepos(username){
    axios.get(`https://api.github.com/users/${username}/repos?sort=updated &per_page=5`)
    .then(res=>{
        displayRepos(res.data);
    });
}
function diplayRepos(repos){
    resultDiv.innerHTML="<h3>Latest Repositories</h3>";
    repos.forEach(repo=>{
        reposDiv.innerHTML +=`<div class="repo-card">
                    <a href ="${repo.html_url}" target ="_blank">${repo.name}</a>
                    <p>${repo.description || "No description"}</p>
                    </div>`;
    });
}