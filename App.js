
const centersList = document.getElementById('centersList');
const searchBar = document.getElementById('searchBar');

document.getElementById("city").addEventListener("click", () => {
    removeFocus();
    var element = document.getElementById("city");
    element.classList.add("focus");
});
document.getElementById("name").addEventListener("click", () => {
    removeFocus();
    var element = document.getElementById("name");
    element.classList.add("focus");
});
document.getElementById("state").addEventListener("click", () => {
    removeFocus();
    var element = document.getElementById("state");
    element.classList.add("focus");
});


let isroCenter = [];
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    if (searchString.length > 2) {
        if (document.getElementById("name").classList.contains("focus")) {

            const filtercenters = isroCenter["centres"].filter(center => {
                return (center["name"].toLowerCase().includes(searchString));
            });

            displaycenters(filtercenters);

        } else if (document.getElementById("city").classList.contains("focus")) {
            const filtercenters = isroCenter["centres"].filter(center => {
                return (center["Place"].toLowerCase().includes(searchString));
            });
            displaycenters(filtercenters);
        } else if (document.getElementById("state").classList.contains("focus")) {
            const filtercenters = isroCenter["centres"].filter(center => {
                return (center["State"].toLowerCase().includes(searchString));
            });
            displaycenters(filtercenters);
        }
    }
});

const loadcenters = async () => {
    try {
        const res = await fetch("https://isro.vercel.app/api/centres");
        isroCenter = await res.json();
        displaycenters(isroCenter["centres"]);
        const favoritebutton = document.querySelectorAll('.favorite-btn');
        favoritebutton.forEach((button, index) => {
            button.addEventListener('click', () => {
                addtofav(index);
            })
        })
    } catch (err) {
        console.error(err);
    }
};

const displaycenters = (centers) => {
    const htmlString = centers
        .map((center) => {
            return `
            <div class="wrapper">
            <button class="favorite-btn">fav</button>
            <div class="center">
            <h1>CENTER</h1>
            <p class="cent">${center.name}</p>
            </div>
            <div class="city">
            <h1>CITY</h1>
            <p class="cit">${center.Place}</p>
            </div>
            <div class="state">
            <h1>STATE</h1>
            <p class="st">${center.State}</p>
            </div>
            </div>
            `;
        })
        .join('');
    centersList.innerHTML = htmlString;
};

loadcenters();
function removeFocus() {
    const allElements = document.querySelectorAll('.btn');
    allElements.forEach((element) => {
        element.classList.remove('focus');
    });
}

const addtofav = (index) => {
    const selectedcen = isroCenter["centres"][index];
    const favoriteitem = document.createElement('div');
    favoriteitem.classList.add("favt");

    const ci = document.createElement('p');
    ci.textContent = `city: ${selectedcen.name}`;
    const si = document.createElement('p');
    si.textContent = `city: ${selectedcen.State}`;
    const ni = document.createElement('p');
    ni.textContent = `city: ${selectedcen.Place}`;

    const removebtn = document.createElement('button');
    removebtn.textContent = 'Remove';
    removebtn.addEventListener('click', () => {
        favoriteitem.remove();
    });

    favoriteitem.appendChild(ci);
    favoriteitem.appendChild(si);
    favoriteitem.appendChild(ni);
    favoriteitem.appendChild(removebtn);

    const favcontainer = document.getElementById('favcen');
    favcontainer.appendChild(favoriteitem);
}




