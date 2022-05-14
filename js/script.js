// global variables
const overview = document.querySelector(".overview");
// overview element will inc profile info

const username = "wesiptea";

const repoList = document.querySelector(".repo-list");

const repos = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");


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

// display repos onscreen
const displayRepo = function (repos) {
  for (const data of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${data.name}</h3>`;
    repoList.append(listItem);
    // The above line of code adds (appends) elements to the list of repos onscreen using the newly created html list (repoList - global var)
  }
};

// turning each repo name into a click event
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    specificRepoInfo(repoName);
  } 
});

// this async function grabs specific info about each repos
const specificRepoInfo = async function (repoName) {
  const fetchRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  // Ask about the endpoint data; where was this found? I was unsure of where this was shown, except that it is also a variable named in the async function above.
  const repoInfo = await fetchRepo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch (repoInfo.languages_url);
  // I had to look up the code in above parenthesis - I don't recall this format for a fetch sequence.
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  // creating a language list
  const languages = [];
  // empty array used to add languages to list
  for (const language in languageData) {
    languages.push(language);
    console.log(languages);
  }
};

 const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";

  const div = document.createElement("div")
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;

  repoData.append(div);
  repoData.classList.remove("hide");
  repos.classList.add("hide");
 };