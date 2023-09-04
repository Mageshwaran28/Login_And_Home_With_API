function get(ele) {
    return document.querySelector(ele);
}

get('.signout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.history.forward();
    location.href = 'Login_Form.html';
})

get('.grid-table .grid').addEventListener('click', () => {
    get('.grid-table').className = 'grid-table grid';
    get('.cards').className = 'cards grid';
    get('.head').className = 'head grid';
})

get('.grid-table .table').addEventListener('click', () => {
    get('.grid-table').className = 'grid-table table';
    get('.cards').className = 'cards table';
    get('.head').className = 'head';
})


if (localStorage.getItem('user')) {
    let user_det = JSON.parse(localStorage.getItem('user'));
    document.querySelector('.user-name').innerHTML = user_det.email;
}

const req = new XMLHttpRequest();
req.onload = function () {
    createCards(JSON.parse(this.responseText));
}
req.open('GET', 'https://mocki.io/v1/9748c103-9a4b-4b9d-9e82-10682d43888f');
req.send();

let cards = document.createElement('div');
cards.className = 'cards grid';

function createCards(arr) {
    for (const obj of arr) {
        cards.appendChild(createCard(obj));
    }
}

function createCard(obj) {
    let card = document.createElement('div');
    card.className = 'card';

    let cardGrp = document.createElement('div');
    cardGrp.className = 'card-grp';

    let img = document.createElement('img');
    img.src = obj.image;

    cardGrp.appendChild(img);

    let name = document.createElement('h5');
    name.appendChild(document.createTextNode(obj.name));
    name.className = 'name'

    cardGrp.appendChild(name);

    let desc = document.createElement('div');
    desc.appendChild(document.createTextNode(obj.description));
    desc.className = 'description';

    cardGrp.appendChild(desc);

    card.appendChild(cardGrp)

    return card;
}

get('section').appendChild(cards);

get('.search-bar').addEventListener('input', (event) => {
    let cards = document.querySelectorAll('.card-grp');
    let search = event.target.value.toLowerCase();

    cards.forEach((card) => {
        let grp = card.childNodes;
        if (grp[1].innerHTML.toLowerCase().includes(search) || grp[2].innerHTML.toLowerCase().includes(search)) {
            card.parentElement.style.display = 'grid';
        }
        else {
            card.parentElement.style.display = 'none';
        }
    })
})