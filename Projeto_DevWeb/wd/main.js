"use-strict";

(function () {

    ///  VARIABLES
    const moviesContainer = document.querySelector("#moviesContainer");
    const dialogue = document.querySelector("#dialogue");
    const loginButton = document.querySelector("#loginButton");
    const actions = document.querySelector(".form-wrapper>form .action")
    const regForm = document.querySelector("#regForm");
    const loginForm = document.querySelector("#loginForm");
    let openMovie = null;
    let loggedUser = JSON.parse(localStorage.getItem("userSession"));
    let movies = JSON.parse(localStorage.getItem("movies"));

    if(loggedUser){
        document.querySelector("#userLoginName").innerHTML = loggedUser.name;
        buildBackoffice();
    }

    /// LOCAL STORAGE MOVIES VALIDATION
    if (!movies) {
        fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("movies", JSON.stringify(data));
            movies = JSON.parse(localStorage.getItem("movies"));
            loadMovies();
        });
    }

    function loadMovies() {
        if (movies.length > 0) {
            movies.forEach((movie) => {
                moviesContainer.innerHTML += `<div id="${movie.id}" class="movie-card">
                <img src="${movie.thumbnail}"/>
                <h1>${movie.title}</h1>
            </div>`;
            });
            moviesContainer.addEventListener("click", movieDetails);
        } else {
            moviesContainer.innerHTML += `NO MOVIES`;
        }
    }
    if(movies){
       loadMovies();
    }

    loginButton.addEventListener("click", () => {
        if(!loggedUser){
            dialogue.classList.add("show");
        }else{
            document.querySelector("#backoffice").classList.add("show");
        }
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formElements = event.currentTarget.children;
        const users = JSON.parse(localStorage.getItem("users"));
        if (!users || users.length == 0) {
            alert("No user is registered!");
        } else {
            const user = users.find((u) => {
                if (u.userName === formElements["userName"].value && u.password === formElements["userPassword"].value) {
                    return u;
                }
            });
            if (user) {
                loggedUser = user;
                localStorage.setItem("userSession", JSON.stringify(loggedUser));
                document.querySelector("#userLoginName").innerHTML = loggedUser.name;
                dialogue.classList.remove("show");
                buildBackoffice();
                alert("You are now logged in!");
            } else {
                alert("Invalid Credentials, please try again!");
            }
        }
    });

    regForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formElements = event.currentTarget.children;
        const users = JSON.parse(localStorage.getItem("users"));
        if (formElements["regUserPassword"].value === formElements["regUserRepPassword"].value) {
            if (!users || users.length == 0) {
                localStorage.setItem("users", JSON.stringify([{
                    name: formElements["regName"].value,
                    userName: formElements["regUserName"].value,
                    email: formElements["regUserEmail"].value,
                    password: formElements["regUserPassword"].value,
                    favourites:[]
                }]));
            } else {
                const user = users.find((u) => {
                    if(u.userName === formElements["regUserName"].value || u.email === formElements["regUserEmail"].value){
                        return u;
                    }
                });
                if (user) {
                    alert("Username already exists, please try other!");
                    return;
                } else {
                    const user = {
                        id: guid(),
                        name: formElements["regName"].value,
                        userName: formElements["regUserName"].value,
                        email: formElements["regUserEmail"].value,
                        password: formElements["regUserPassword"].value,
                        favourites:[]
                    };
                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                }
            }
            alert("User registered with success!");
            dialogue.classList.remove("show");
        } else {
            alert("Passwords don't match, please try again!");
        }
    });

    document.querySelector("#goToLogin").addEventListener("click", () => {
        document.querySelector("#loginForm").classList.add("show");
        document.querySelector("#regForm").classList.remove("show");
    });

    document.querySelector("#goToRegister").addEventListener("click", () => {
        document.querySelector("#regForm").classList.add("show");
        document.querySelector("#loginForm").classList.remove("show");
    });

    function movieDetails(event) {
        openMovie = movies.find(movie => movie.id === event.target.id);

        if (openMovie) {
            document.querySelector("#movieDetails").innerHTML = `
                <img src="${openMovie.thumbnail}"/>
                <div class="details">
                    <h1>${openMovie.title}</h1>
                    <p><b>Genre</b>: ${openMovie.genre}</p>
                    <p><b>Director</b>: ${openMovie.director}</p>
                    <p><b>Producer</b>: ${openMovie.producer}</p>
                    <p><b>Cast</b>: ${openMovie.cast}</p>
                    <p><b>Location</b>: ${openMovie.location}</p>
                    <p><b>Description</b>: ${openMovie.description}</p>
                </div>
            `;
            document.querySelector(".movie-details").classList.add("show");
        }
    }

    document.querySelector("#closeDialogue").addEventListener("click", () => {
        dialogue.classList.remove("show");
    });

    document.querySelector("#closeDetails").addEventListener("click", () => {
        document.querySelector(".movie-details").classList.remove("show");
        openMovie = null;
    });

    document.querySelector("#lunchTrailer").addEventListener("click", () => {
        window.open(openMovie.trailerUrl, "_blank");
    });

    document.querySelector("#addToFavourites").addEventListener("click", () => {
        if(!loggedUser){
            alert("You have to login!");
        }else{
            loggedUser.favourites.push(openMovie);
            localStorage.setItem("userSession",JSON.stringify(loggedUser));
            alert("Movie added to favourites!");
            document.querySelector(".movie-details").classList.remove("show");
            buildBackoffice();
        }
    });

    document.querySelector("#navigation").addEventListener("click", (event)=>{
        let scroll = null;
        if(event.target.id === "goToAbout"){
            scroll = {
                top: document.querySelector("#aboutSection").offsetTop-80,
                behavior: 'smooth'
              }
        }else{
            scroll = {
                top: document.querySelector("#moviesSection").offsetTop-80,
                behavior: 'smooth'
              }
        }
        window.scrollTo(scroll);
    });

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

      function buildBackoffice(){
        if(loggedUser.favourites){
            document.querySelector("#movieList").innerHTML = "";
            loggedUser.favourites.forEach((movie)=>{
                let html = ` <tr>
                    <td><img src="${movie.thumbnail}"</td>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.producer}</td>
                    <td>${movie.cast}</td>
                    <td>${movie.description}</td>
                    <td><a href="${movie.trailerUrl}" target="blank"><span class="mdi mdi-play-box"></span></a></td>
                    <td><span class="mdi mdi-pencil" id="edit_${movie.id}"></span></td>
                    <td><span class="mdi mdi-delete" id="delete_${movie.id}"></span></td>
                </tr>`;
                document.querySelector("#movieList").innerHTML += html;
            });
        
            const actions =  document.querySelectorAll("td>span");
        
            actions.forEach(a => {
                a.addEventListener("click", triggerAction);
            });
        }
      }

      function triggerAction(event){
        const actionType = event.target.id.split("_")[0];
        const objectId = event.target.id.split("_")[1];

        if(actionType === "edit"){
            alert("This action will only be available on the second part of this project!");
        }else if(actionType === "delete"){
            loggedUser.favourites = loggedUser.favourites.filter(m => m.id != objectId);
            localStorage.setItem("userSession", JSON.stringify(loggedUser));
            buildBackoffice();
        }
    }

    document.querySelector("#closeBackoffice").addEventListener("click", ()=>{
        document.querySelector("#backoffice").classList.remove("show");
    });

}());