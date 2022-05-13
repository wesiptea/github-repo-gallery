const overview = document.querySelector(".overview");
// overview element will inc profile info
const username = "wesiptea";
// my github user name
const reposList = document.querySelector(".repo-list");

// fetch profile information using an API
const profileInfo = async function () {
    const myInfoFetch = await fetch (`https://api.github.com/users/${username}`);
    const data = await myInfoFetch.json();
    displayUserData(data);
    // console.log(data);
};
profileInfo();

// create a div for bio info
const displayUserData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div> 
      `;
  overview.append(div);
  repoAPI();
}

// fetch the repos using an API
const repoAPI = async function () {
  const repoFetch = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  // Endpoints for this API are: "sort" by most recently "updated" and "100" repos "per_page" - these endpoints were found in document for API
  const repoData = await repoFetch.json();
  // console.log(repoData);

  displayRepo(repoData);
  // Calling the function created to display repo info; passing the JSON response data as the argument
};
// repoAPI(); 

// display repos onscreen
const displayRepo = function (repos) {
  for (const data of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${data.name}</h3>`;
    reposList.append(listItem);
    // The above line of code adds (appends) elements to the list of repos onscreen using the newly created html list (repoList - global var)
  }
};

