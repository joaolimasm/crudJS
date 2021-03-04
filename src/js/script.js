window.addEventListener('load', start);

let globalNames = ['JV', 'DZ', 'DN', 'KL'];
let globalInputName = null;
let isEditing = false;
let currentIndex = null;
function start() {

    globalInputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();

}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }
    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(newName) {
        globalNames.push(newName);
    }

    function updateName(newName) {

        globalNames[currentIndex] = newName;

    }


    function handleTyping(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            if (isEditing) {
                updateName(event.target.value)
            } else {
                insertName(event.target.value)
            }
            isEditing = false;
            clearInput();
            render();

        }

    }
    globalInputName.addEventListener('keyup', handleTyping)
    globalInputName.focus();

}

// dentro do render, função pra deletar 
function render() {

    function createDeleteButton(index) {
        function deleteName() {

            globalNames.splice(index, 1);
            render();

        }
        let button = document.createElement('button');
        button.classList.add('deletButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);
        return button;
    }

    function createSpan(name, index) {
        function editItem() {
            globalInputName.value = name;
            globalInputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        //criando span 
        let span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);
        return span;
    }

    //elemento de inserção de nome e limpando 
    let divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    //elementos de lista
    let ul = document.createElement('ul');
    // percorrendo todos os nomes 
    for (let i = 0; i < globalNames.length; i++) {

        let currentName = globalNames[i];

        //criando botão
        let li = document.createElement('li');
        let button = createDeleteButton(i);
        let span = createSpan(currentName, i);




        //inserção
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);

        //li.textContent = currentName;

    }
    //insere ul na div e limpa o input 
    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {

    globalInputName.value = '';
    globalInputName.focus();
}