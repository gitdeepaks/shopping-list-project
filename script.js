const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearbtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        addItemToDom(item)
    });
    checkUI();
};

const onAddItemsSubmit = (e) => {
    e.preventDefault();
    //validate input

    if (itemInput.value === '') {
        alert('Please enter the item');
        return;
    }
    //create item DOM element
    addItemToDom(itemInput.value)

    //Add items to storage
    addItemToStorage(itemInput.value)


    checkUI();
    itemInput.value = '';
}

const addItemToDom = (item) => {

    //create list items
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    console.log(li);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    //Add li to the DOM
    itemList.appendChild(li);

}


const addItemToStorage = (item) => {
    let itemFromStorage = getItemsFromStorage();

    //Adding item to storage
    itemFromStorage.push(item);

    //convert to JSON string and set to,local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));

}

const getItemsFromStorage = () => {
    let itemFromStorage;
    if (localStorage.getItem('items') === null) {
        itemFromStorage = [];
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;
}


const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}


const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}


const removeItem = (item) => {
    if (confirm('Are you sure')) {

        //Remove item from DOM
        item.remove();

        //remove item from storage

        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

const removeItemFromStorage = (item) => {
    let itemFromStorage = getItemsFromStorage();
    //Filter out item to be removes
    itemFromStorage = itemFromStorage.filter((i) => {
        i !== item
    });

    //Rest tolocal storage

    localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

const clearItem = (e) => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from local storage

    localStorage.removeItem('items')

    checkUI();
}

const filterItems = (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

}

const checkUI = () => {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearbtn.style.display = 'none';
        itemFilter.style.display = 'none';

    } else {
        clearbtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//Initialize app

const init = () => {

    //Event Listners

    itemForm.addEventListener('submit', onAddItemsSubmit);
    itemList.addEventListener('click', onClickItem);
    itemList.addEventListener('click', removeItem);
    clearbtn.addEventListener('click', clearItem);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();

