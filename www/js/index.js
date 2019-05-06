

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
            addToDo(toDo);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++;

            // get item from local storage (code must be added to the list array)
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }


    }
});

// Function for completing the To do List
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector("text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Function to remove the to do list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Function to target item dynamically
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element); // return the clicked element in the list
    }else if(elementJob == "delete"){  // complete or delete
        removeToDo(element);
    }

    // get item from local storage (code must be added to the list array)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let app = {
    init: function(){
        document.getElementById('btn').addEventListener('click',app.takephoto);

    },
    takephoto: function(){
        let opts = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
         };

        navigator.camera.getPicture(app.ftw, app.wtf, opts);

    },
    ftw: function(imgURI){

        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;
    },
    wtf: function(msg){

        document.getElementById('msg').textContext = msg;

    }
};

document.addEventListener('deviceready', app.init);