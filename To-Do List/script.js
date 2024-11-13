const list = document.getElementById("ToDoList");
const inputToDo = document.getElementById('addToDo');
const button = document.getElementById('enter');
const resetBut = document.getElementById('reset');
const listContainer = document.getElementById('listContainer');
const editContainer = document.getElementById('functionaity');

let createToDo;
let removeBut;
let editBut;
let divText;
let functionWraper;
let liElement;
let liText;
let changeButton;

//the adding functionality
function addBut(event){

    if(inputToDo.value === ''){ //Check for empty input
        alert('How about writing something first =)?');
    }else if(event.target.textContent === 'add'){ // If button text is "add", create to-do
        creatingToDos();
    }
}

//adding elements
button.addEventListener('click', addBut );

//input added when 'Enter' pressed
inputToDo.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        if(inputToDo.value === ''){
            alert('How about writing something first =)?');
        }else if(list.parentElement.childNodes[7].classList.value === 'changeContainer'){ //'list.parentElement.childNodes[7].classList.value' this gets the class name that applied to the #functionality div
            replaceLiElement(liElement, changeButton);
        }else{
            creatingToDos();
        }
    }
})

// saves current list state to localStorage
function saveList(){
    localStorage.setItem('list', ToDoList.innerHTML);
}

//retrives the li elements that i created and puts it in the ul
function getList() {
    // retrieve and set the saved list from localStorage
    ToDoList.innerHTML = localStorage.getItem('list') || '';

    // for each span in the saved list, add the remove and edit functionality
    document.querySelectorAll('#ToDoList span').forEach((span) => {
        span.addEventListener('click', (event) => {
            // check if the clicked button is 'x' for deletion
            if (event.target.textContent === 'x') {
                event.target.parentElement.parentElement.remove();
                saveList();
            }

            // edit functionality for items loaded from localStorage
            if (event.target.textContent === 'edit') {
                let liElement = event.target.parentElement.parentElement;
                let liText = liElement.querySelector('div').textContent;

                // place text in input and remove existing edit button if present
                inputToDo.value = liText;

                // check for existing change button and add only if missing
                if (!document.querySelector('.change')) {
                    let changeButton = document.createElement('button');
                    changeButton.textContent = 'edit';
                    changeButton.classList.add('change');

                    editContainer.classList.add('changeContainer');
                    editContainer.appendChild(changeButton);

                    // temporarily disable add button's functionality during editing
                    button.removeEventListener('click', addBut);

                    // confirm edit with the change button or Enter key
                    let confirmEdit = () => replaceLiElement(liElement, changeButton);

                    // confirm edit when 'edit' button or 'Enter' is pressed
                    changeButton.addEventListener('click', confirmEdit);

                    inputToDo.addEventListener('keyup', (e) => {
                        if (e.key === 'Enter') {
                            confirmEdit();
                        }
                    });
                }
            }
        });
    });

    // restore complete functionality on each div in ToDoList
    document.querySelectorAll('#ToDoList div').forEach((div) => {
        div.addEventListener('click', (event) => {
            let liDone = event.target.parentElement;

            // toggles 'done' state and repositions item based on state
            if (event.target.classList.contains('done') && event.target.nodeName === 'DIV') {
                event.target.classList.remove('done');
                list.insertBefore(event.target.parentElement, list.firstElementChild);
            } else if (event.target.nodeName === 'DIV' && !event.target.classList.contains('done')) {
                event.target.classList.add('done');
                list.appendChild(liDone);
            }

            saveList();
        });
    });
}


// clears the list
resetBut.addEventListener('click', () => {

    localStorage.removeItem('list');
    ToDoList.innerHTML = '';

})

// creates a new to-do list item
function creatingToDos(){

    liCreation(); // builds the structure for the list item

    list.appendChild(createToDo);

    //adding a 'remove on click' functionality to every new to do list SPAN item 
    removeFunctionality()

    //adding an edit functionality to each new div
    editFunctionality();

    //adding the 'complete' func on the li elemnts
    complete();

    //emptying the input box
    inputToDo.value = '';

    //saving the entered item
    saveList();
}

function removeFunctionality(){

    // adding a 'remove on click' functionality to every new to do list SPAN item 
    removeBut.addEventListener('click', (event) => {

        event.target.parentElement.parentElement.remove();
        saveList();

    })

}

function complete(){

    createToDo.addEventListener('click', (event) => {

        let liDone = event.target.parentElement;

        //checks if the li elemnt is alreadey marked as done
        if (event.target.classList.contains('done') && event.target.nodeName == 'DIV') {
            
            event.target.classList.remove('done');
            //when unchecked it returns back on top
            list.insertBefore(event.target.parentElement, list.firstElementChild);

        } else if(event.target.nodeName == 'DIV' && !event.target.classList.contains('done')) {
            
            event.target.classList.add('done');

            //puts the completed list item at the end
            list.appendChild(liDone);
            
        }
    
    saveList();

    })

}

// builds the elements for a single list item
function liCreation(){

    //wrapping the todo text in a div
    divText = document.createElement('div');
    divText.textContent = inputToDo.value;

    //wrapping the functionalities in a section
    functionWraper = document.createElement('section');
    functionWraper.classList.add('functions');

    //adding 'x' as a remove functionality when clicked
    removeBut = document.createElement('span');
    removeBut.textContent = 'x';
    removeBut.classList.add('removeBut');
    functionWraper.appendChild(removeBut);

    //adding 'edit' as a remove functionality when clicked
    editBut = document.createElement('span');
    editBut.textContent = 'edit';
    editBut.classList.add('removeBut', 'editBut');
    functionWraper.appendChild(editBut);

    //creating an li elemnt and giving it the input value and adding it to the ul
    createToDo = document.createElement('li');
    createToDo.appendChild(divText); 
    createToDo.appendChild(functionWraper);

}

// adds 'edit' functionality
function editFunctionality(){

    let flag = 0;
    
        // adding and edit functionality to each new div
        editBut.addEventListener('click', (event) => {

            // gets the li element that is specified to be edited
            liElement = event.target.parentElement.parentElement;
            // gets the div in the li that has the text
            liText = liElement.querySelector('div').textContent;

            // put the text in the input box
            inputToDo.value = liText;
            if(flag == 0){
            // adding a 'edit' button next to the 'clear' button
            changeButton = document.createElement('button');
            changeButton.textContent = 'edit';
            changeButton.classList.add('change');
            
            editContainer.classList.add('changeContainer');
            editContainer.appendChild(changeButton);

            flag = 1;
            }

            button.removeEventListener('click', addBut); // temporarily disable add button
            
            changeButton.addEventListener('click', () => replaceLiElement(liElement, changeButton));

        })
}

// replaces an existing item with updated content
function replaceLiElement(liElement, changeButton) {
    liCreation();

    // check if liElement exists in the DOM
    if (list.contains(liElement)) {
        // replace the old li element with the updated one
        list.replaceChild(createToDo, liElement);
        inputToDo.value = '';

        // only try to remove changeButton if it exists
        if (changeButton) {
            changeButton.remove();
        }
        
        editContainer.classList.remove('changeContainer');
        
        // add event listeners back after replacing the element
        editFunctionality();
        removeFunctionality();
        complete();

        // enable the 'add' button functionality again
        button.addEventListener('click', addBut);

        saveList();
    } else {
        // If the element was removed, clear the input and remove styling safely

        if (changeButton) {
            changeButton.remove();
        }
        
        editContainer.classList.remove('changeContainer');

        button.addEventListener('click', addBut);
    }
}

// initialize list on page load
getList();