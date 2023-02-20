const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearbtn = document.getElementById('clear');
const addItems = (e) => {
    e.preventDefault();
    //validate input

    if (itemInput.value === '') {
        alert('Please enter the item');
        return;
    }
    //create list items

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(itemInput.value));
    console.log(li);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
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

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }

}

const clearItem = (e) => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}
//Event Listners

itemForm.addEventListener('submit', addItems);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', removeItem);
clearbtn.addEventListener('click', clearItem);
