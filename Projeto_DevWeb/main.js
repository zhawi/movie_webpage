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
        localStorage.setItem("movies", JSON.stringify(
            [{
                "id":"7e4a8b9a-f74c-4339-b270-18dd562f37ad",
                "title":"Action",
                "director":"Sundar C.",
                "cast":"Vishal Reddy, Tamannaah Bhatia, Aishwarya Lekshmi, Ramki, Yogi Babu",
                "genre":"action",
                "location":"Azerbaijan",
                "producer":"R. Ravindran",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BOTdkNGY5YjItOWU5OC00NTA0LTkxMGEtZDRlNWZmMmI2ZGZmXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_UY268_CR43,0,182,268_AL_.jpg",
                "description":"An agent, sent by the Indian army to observe a terrorist, finds his mission complicated when he discovers undercover agents in his own country.",
                "trailerUrl":"https://www.youtube.com/watch?v=74FI1-yNOOg&ab_channel=Muzik247"
              },
              {
                "id":"67644c84-5be1-4b99-9ce2-25b1915eafce",
                "title":"Truth or Dare",
                "director":"Jeff Wadlow",
                "cast":"Lucy Hale, Tyler Posey, Violett Beane, Hayden Szeto, Sophia Ali, Nolan Gerard Funk, Landon Liboiron",
                "genre":"action",
                "location":"California",
                "producer":"Jason Blum",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BOGU2YTZmMjYtZDUwYi00NTc1LTlkMjAtM2ViZDkzOTlhNGNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"A harmless game of Truth or Dare among friends turns deadly when someone - or something - begins to punish those who tell a lie or refuse the dare.",
                "trailerUrl":"https://www.youtube.com/watch?v=Cgnk3MLw9TM&ab_channel=MovieclipsTrailers"
              },
              {
                "id":"27654f38-edef-4f6f-8fa3-fbd63e7c0cd0",
                "title":"Pulp Fiction",
                "director":"Quentin Tarantino",
                "cast":"Tim Roth, Amanda Plummber, Laura Lovelace, John Travolta, Samuel L. Jackson, Phil LaMarr, Frank Whaley",
                "genre":"action",
                "location":"California",
                "producer":"Lawrence Bender",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg",
                "description":"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                "trailerUrl":"https://www.youtube.com/watch?v=s7EdQ4FqbhY&ab_channel=Movieclips"
              },
              {
                "id":"f25260ec-5a97-45b8-9e0f-4f1efe6cb13c",
                "title":"Anchorman: The Legend of Ron Burgundy",
                "director":"Adam McKay",
                "cast":"Will Ferrell, Christina Applegate, Paul Rudd, Steve Carell, David Koechner, Fred Willard, Chris Parnell",
                "genre":"action",
                "location":"California",
                "producer":"Judd Apatow",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BMTQ2MzYwMzk5Ml5BMl5BanBnXkFtZTcwOTI4NzUyMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.",
                "trailerUrl":"https://www.youtube.com/watch?v=QvJ1K0_JzFI&ab_channel=MovieclipsClassicTrailers"
              },
              {
                "id":"710a139c-c669-46e3-9c58-1370fa540a85",
                "title":"321 Action",
                "director":"Shady Al Ramly",
                "cast":"Rakan Abdulwahed, Dyler, Majed Fawaz, Fai Fouad, Zyad Bin Hijab, Jodi, Rakan Bo Khaled",
                "genre":"action",
                "location":"Saudi Arabia",
                "producer":"Shady Al Ramly",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BYTRmYzgyZjEtN2UyZS00NDYxLTlkMDctMGJjZjY0ODExNWE5XkEyXkFqcGdeQXVyNjI2ODk3NTM@._V1_UY268_CR24,0,182,268_AL_.jpg",
                "description":"The events of the film revolve around a solitary actress devoted to caring for her daughter, but she decides to retire and return to acting through a new movie, and many comedic ironies occur during the filming of this new movie.",
                "trailerUrl":"https://www.youtube.com/watch?v=Z2gnqZX5G4E&ab_channel=NSTARS"
              },
              {
                "id":"b6d23a04-04e4-4e67-9a1d-38a4467fda51",
                "title":"Attraction",
                "director":"Fedor Bondarchuk",
                "cast":"Irina Starshenbaum, Alexander Petrov, Rinal Mukhametov, Oleg Menshikov, Sergey Garmash, Lyudmila Maksakova",
                "genre":"action",
                "location":"Russia",
                "producer":"Aleksandr Andryushchenko",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BODNkNTFlMWItZWNkYS00YTUwLWJkN2YtYWQxMGJlZDA0OGFlXkEyXkFqcGdeQXVyMjcxNjI4NTk@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"An alien ship crash lands onto a Russian city, many who saw it and the occupants start to question their own existence, while there are those who demand the aliens leave Earth.",
                "trailerUrl":"https://www.youtube.com/watch?v=lElqBmOEfPQ&ab_channel=DarkSkyFilms"
              },
              {
                "id":"6c6f1ac9-f7c5-47b4-88bb-6229bc28689e",
                "title":"Abduction",
                "director":"John Singleton",
                "cast":"Jake Andolina, Oriah Acima Andrews, Ken Arnold, Maria Bello, Steve Bello, Derek Burnell, Holly Scott Cavanaugh",
                "genre":"action",
                "location":"Pennsylvania",
                "producer":"Patrick Crowley",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BMTkxNzU3OTg0Nl5BMl5BanBnXkFtZTcwNDY5MDY2Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"A young man sets out to uncover the truth about his life after finding his baby photo on a missing persons website.",
                "trailerUrl":"https://www.youtube.com/watch?v=CEVkp5Je7m0&ab_channel=LionsgateMovies"
              },
              {
                "id":"608976cf-039f-43c5-934c-c29ba1d502d8",
                "title":"Extinction",
                "director":"Ben Young",
                "cast":"Michael Peña, Lizzy Caplan, Amelia Crouch, Erica Tremblay, Lex Sharpnel, Emma Booth, Lilly Aspell, Mike Colter, Israel Broussard",
                "genre":"action",
                "location":"Servia",
                "producer":"David Hoberman",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BMTU5OTYzMzcwOF5BMl5BanBnXkFtZTgwNTkzMzk4NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"A father has a recurring dream of losing his family. His nightmare turns into reality when the planet is invaded by a force bent on destruction. Fighting for their lives, he comes to realize an unknown strength to keep them safe from harm.",
                "trailerUrl":"https://www.youtube.com/watch?v=-ePDPGXkvlw&ab_channel=Netflix"
              },
              {
                "id":"cebd4c12-860f-4fff-b2d7-fc851998e9be",
                "title":"Allien: Resurrection",
                "director":"Jean-Pierre Jeunet",
                "cast":"Sigourney Weaver, Winona Ryder, Dominique Pinon, Ron Perlman, Gary Dourdan, Michael Wincott, Kim Flowers, Dan Hedaya, J.E. Freeman, Brad Dourif",
                "genre":"action",
                "location":"California",
                "producer":"Bill Badalato",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BNDljNGZkNmItNDlmMi00YzJhLWJiYWUtNGY4OGEwNmY0ODg4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR1,0,182,268_AL_.jpg",
                "description":"200 years after her death, Ellen Ripley is revived as a powerful human/alien hybrid clone. Along with a crew of space pirates, she must again battle the deadly aliens and stop them from reaching Earth.",
                "trailerUrl":"https://www.youtube.com/watch?v=15g12dGxWX4&ab_channel=TrailersPlaygroundHD"
              },
              {
                "id":"03b73a63-b0e6-473a-899d-c7904871fa39",
                "title":"Transformers: Age of Extinction",
                "director":"Michael Bay",
                "cast":"Mark Wahlberg, Stanley Tucci, Kelsey Grammer, Nicola Peltz, Jack Reynor, Titus Welliver, Sophia Myles",
                "genre":"action",
                "location":"Austin, Texas",
                "producer":"Michael Bay",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"When humanity allies with a bounty hunter in pursuit of Optimus Prime, the Autobots turn to a mechanic and his family for help.",
                "trailerUrl":"https://www.youtube.com/watch?v=dYDGqmxMZFI&ab_channel=MovieclipsTrailers"
              },
              {
                "id":"726adbb0-7879-4304-b484-1057d09e5603",
                "title":"The Purge: Election Year",
                "director":"James DeMonaco",
                "cast":"Frank Grillo, Elizabeth Mitchel, Mykelti Williamson, Joseph Julian Soria, Betty Gabriel, Terry Serpico, Edwin Hodge, Kyle Secor",
                "genre":"action",
                "location":"Rhode Island",
                "producer":"Michael Bay",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BMjI3MDI0MTA1N15BMl5BanBnXkFtZTgwOTk4NjU5ODE@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"Former Police Sergeant Barnes becomes head of security for Senator Charlie Roan, a Presidential candidate targeted for death on Purge night due to her vow to eliminate the Purge.",
                "trailerUrl":"https://www.youtube.com/watch?v=RXMp9fBomJw&ab_channel=UniversalPictures"
              },
              {
                "id":"2ee10000-5584-498e-bc83-1be0f7101151",
                "title":"Resident Evil: Extinction",
                "director":"Russell Mulcahy",
                "cast":"Milla Jovovich, Oded Fehr, Ali Larter, Iain Glen, Ashanti, Christopher Egan, Spencer Locke, Matthew Marsden, Linden Ashby, Jason O'Mara",
                "genre":"action",
                "location":"Mexico City",
                "producer":"Paul W.S. Anderson",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BNDQ0MWI3MmEtMzM0OC00Y2ViLWE4MDItMzNhNmY1ZTdjMWE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"Survivors of the Raccoon City catastrophe travel across the Nevada desert, hoping to make it to Alaska. Alice joins the caravan and their fight against the evil Umbrella Corp.",
                "trailerUrl":"https://www.youtube.com/watch?v=eDMjVARsCOk&ab_channel=MovieclipsClassicTrailers"
              },
              {
                "id":"f4c83653-3ffb-4088-81e2-e4c26d51116c",
                "title":"Star Trek: Insurrection",
                "director":"Jonathan Frakes",
                "cast":"Patrick Stewart, Jonathan Frakes, Brent Spiner, LeVar Burton, Michael Dorn, Gates McFadden, Marina Sirtis, F.Murray Abrahan, Donna Murphy",
                "genre":"action",
                "location":"Hollywood",
                "producer":"Rick Berman",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BNWEzZDI0NjEtY2FkMC00ZjQwLWI2YzgtZDEyMzMwZmRlZDlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"When the crew of the Enterprise learn of a Federation conspiracy against the inhabitants of a unique planet, Captain Picard begins an open rebellion.",
                "trailerUrl":"https://youtu.be/hg3pFV0yIhA"
              },
              {
                "id":"726bc45e-8d75-4417-90ed-23ca50781c50",
                "title":"A Civil Action",
                "director":"Steven Zaillian",
                "cast":"John Travolta, Robert Duvall, Tony Shalhoub, William H. Macy, Zeljko Ivanek, Bruce Norris, John Lithgow, Kathleen Quinlan, Peter Jacobson, Mary Mara, James Gandolfini",
                "genre":"action",
                "location":"Boston",
                "producer":"Rachel Pfeffer",
                "thumbnail":"https://m.media-amazon.com/images/M/MV5BZmEzNjhiZWEtNTM5OS00ZmQyLThhYjEtNjY4ZDZhOGFkMzI4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
                "description":"A tenacious lawyer takes on a case involving a major company responsible for causing several people to be diagnosed with leukemia due to the town's water supply being contaminated, at the risk of bankrupting his firm and career.",
                "trailerUrl":"https://www.youtube.com/watch?v=Y4WOo8IJzVg&ab_channel=ParamountMoviesDigital"
              }]
        ));
        movies = JSON.parse(localStorage.getItem("movies"));
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
    loadMovies();

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
                window.open("./backoffice/", "_target");
                dialogue.classList.remove("show");
                buildBackoffice();
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
                }]));

            } else {
                const user = users.find((u) => {
                    if(u.userName === formElements["regUserName"].value || u.email === formElements["regUserEmail"].value){
                        return u;
                    }
                });
                if (user) {
                    alert("Username already exists, please try other!");
                } else {
                    const user = {
                        id: guid(),
                        name: formElements["regName"].value,
                        userName: formElements["regUserName"].value,
                        email: formElements["regUserEmail"].value,
                        password: formElements["regUserPassword"].value,
                    };
                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                    alert("User registered with success!");
                    dialogue.classList.remove("show");
                }
            }
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

    function debounce( fn, threshold ) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
          clearTimeout( timeout );
          var args = arguments;
          var _this = this;
          function delayed() {
            fn.apply( _this, args );
          }
          timeout = setTimeout( delayed, threshold );
        };
      }

      function buildBackoffice(){
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

      function triggerAction(event){
        const actionType = event.target.id.split("_")[0];
        const objectId = event.target.id.split("_")[1];

        if(actionType === "edit"){
            alert("This action will only be available on the second part of this project!");
        }else if(actionType === "delete"){
            loggedUser.favourites = loggedUser.favourites.filter(m => m.id != objectId);
            localStorage.setItem("userSession", JSON.stringify(loggedUser));
            setTimeout(()=>{
                window.location.reload();
            },1000);
        }
    }

    document.querySelector("#closeBackoffice").addEventListener("click", ()=>{
        document.querySelector("#backoffice").classList.remove("show");
    });

}());