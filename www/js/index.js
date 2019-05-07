

//Select Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH ="lineThrough";

// Variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");

// Check to see whether the data is empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // This will set id to the last one on the list
    loadList(LIST); // This helps load the list to the UI
}else{
    // If the data isnt empty
    LIST = [];
    id = 0;
}

// Loading items to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clearing local stoage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Shows today date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Function for to add list
function addToDo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `
                <li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li> 
                  `;


    const position = "beforeend";


    list.insertAdjacentHTML(position, item);


                 

}

// Function to add item using enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13) {
        const toDo = input.value;
        
        // If the input isnt empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++;

            input.value = "";

            // get item from local storage (code must be added to the list array)
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }


    }
});

// Function for completing the To do List
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Function to remove the to do list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Function to target item dynamically
list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element in the list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element); 
    }else if(elementJob == "delete"){  
        removeToDo(element);
    }

    // get item from local storage (code must be added to the list array)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
