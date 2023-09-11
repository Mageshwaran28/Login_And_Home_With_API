function get(ele) {
    return document.querySelector(ele);
}

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

    let name = document.createElement('textarea');
    name.appendChild(document.createTextNode(obj.name));
    name.className = 'name'

    cardGrp.appendChild(name);

    let desc = document.createElement('textarea');
    desc.appendChild(document.createTextNode(obj.description));
    desc.className = 'description';

    cardGrp.appendChild(desc);

    let del = document.createElement('i');
    del.classList = 'fa-regular fa-trash-can';
    cardGrp.appendChild(del);

    card.appendChild(cardGrp)

    return card;
}

function add() {
    let path = get('.path').value;
    let imgName = get('.img-name').value;
    let desc = get('.img-desc').value;
    let obj = {
        image: path,
        name: imgName,
        description: desc,
    }
    addCard(obj);
    addToggle();
    cards.appendChild(createCard(obj));
    noData();
    cardDelete = document.querySelectorAll('.card-grp i');
    cardArr = document.querySelectorAll('.cards .card');
    del();
    textHeight();
}

function addCard(obj) {
    let arr = JSON.parse(localStorage.getItem('cards'));
    console.log(JSON.stringify(arr));
    if(arr.length){
        arr[arr.length] = obj;
    }
    else{
        arr[0] = obj;
    }
    localStorage.setItem('cards', JSON.stringify(arr));
}

function addToggle() {
    get('.path').value = '';
    get('.img-name').value = '';
    get('.img-desc').value = '';
    get('.add').classList.toggle('active');
}

function noTable() {
    get('.grid-table').className = 'grid-table grid';
    get('.cards').className = 'cards';
    get('.head').className = 'head grid';
}

function noData() {
    let no_data = get('.no-data');
    if (!get('.cards').childNodes[0]) {
        no_data.className = 'no-data active';
        noTable();
    }
    else {
        no_data.className = 'no-data';
    }
}

function deleteData(i) {
    let arr = JSON.parse(localStorage.getItem('cards'));
    arr.splice(i, 1);
    localStorage.setItem('cards', JSON.stringify(arr));
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
    if (!get('.cards').childNodes[0]) {
        noTable();
        return;
    }
    get('.grid-table').className = 'grid-table table';
    get('.cards').className = 'cards table';
    get('.head').className = 'head';
    textHeight();
})

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

get('.delete-all').addEventListener('click', () => {
    localStorage.removeItem('cards');
    get('.cards').innerHTML = '';
    if (get('.head').className == "head") {
        noTable();
    }
    noData();
});

get('.add-card').addEventListener('click', addToggle);

if (localStorage.getItem('user')) {
    let user_det = JSON.parse(localStorage.getItem('user'));
    document.querySelector('.user-name').innerHTML = user_det.email;
}

let cards = document.createElement('div');
cards.className = 'cards grid';

if (!localStorage.getItem('cards')) {
    const req = new XMLHttpRequest();
    req.onload = function () {
        localStorage.setItem('cards', this.responseText);
        createCards(JSON.parse(this.responseText));
    }
    req.open('GET', 'https://mocki.io/v1/9748c103-9a4b-4b9d-9e82-10682d43888f');
    req.send();
}
else {
    createCards(JSON.parse(localStorage.getItem('cards')))
}

get('section').appendChild(cards);


del();

function del() {
    let cardDelete = document.querySelectorAll('.card-grp i');
    for (let i = 0; i < cardDelete.length; i++) {
        cardDelete[i].addEventListener('click', () => {
            reload(i);
            deleteData(i);
            noData();
            textHeight();
        })
    }
}

function reload(i) {
    let arr = document.querySelectorAll('.cards .card');
    let cardsElement = get('.cards');
    cardsElement.innerHTML = '';
    for (let j = 0; j < arr.length; j++) {
        if (j != i) {
            cardsElement.innerHTML += arr[j].outerHTML.toString();
        }
    }
    del();
}

textHeight();

function textHeight() {
    let textArea = document.querySelectorAll('textarea');

    textArea.forEach((text) => {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
    })

    for (let i = 0; i < textArea.length; i++) {
        textArea[i].addEventListener('input', (event) => {
            textArea[i].innerHTML = event.target.value;
            updateData(event.target.value, i);
            textArea[i].style.height = 'auto';
            textArea[i].style.height = textArea[i].scrollHeight + 'px';
        })
    }
}

function updateData(data, index) {
    let arr = JSON.parse(localStorage.getItem('cards'))
    if (index % 2 == 0) {
        arr[Math.floor(index / 2)].name = data;
    }
    else {
        arr[Math.floor(index / 2)].description = data;
    }
    localStorage.setItem('cards', JSON.stringify(arr));
}

noData();
