const inputeEle = document.querySelector('[inputEle]');
const addBtnEle = document.querySelector('[addBtnEle]')
console.log(inputeEle);
console.log(addBtnEle);
const displayEle = document.querySelector('[displayListContainer]');




const todoList = JSON.parse(localStorage.getItem('task')) || [];
console.log(todoList.length);
const addTodo = () => {

    // to prevent from pushing empty string to the display  
    if(!inputeEle.value){
        return;
    }
    inputTodovalue = inputeEle.value;
    todoList.push(inputTodovalue);
    localStorage.setItem('task',JSON.stringify(todoList))
   console.log(todoList);
}

function updateProgress(done){
    const progress = document.getElementById('progress');
    progress.innerText = `Tasks To be Done (${todoList.length})`
    console.log(progress);
}
renderTodo (todoList)
function renderTodo (todoList){
    displayEle.innerHTML = null;
    todoList.forEach((element ,index) => {
        const newTodoContainer = document.createElement('div');
        displayEle.append(newTodoContainer);
        newTodoContainer.classList.add('newTodoContainer');

        const newTodo = document.createElement('p');
        newTodo.innerText =`${index +1 } . ${element}`;
        newTodoContainer.append(newTodo);
        // button
        const doneBtnEle = document.createElement('button');
        doneBtnEle.innerText = 'Done';
        doneBtnEle.classList.add('doneBtnEle')
        newTodoContainer.append(doneBtnEle);
        displayEle.append(newTodoContainer);
        
        console.log(element,index);
        console.log(doneBtnEle);


        updateProgress(todoList.length);
 
        // done button will remove the todo from the list
        doneBtnEle.onclick = (index) =>{
        todoList.splice(index,1)
        localStorage.setItem('task',JSON.stringify(todoList));
        console.log(todoList);
        renderTodo(todoList)
        console.log('clicked');
        updateProgress();
        }

    } );

    styling();
   
}

addBtnEle.onclick = () =>{

    if(!inputeEle.value){
        alert ('add something to do first!')
    }
    addTodo();
    renderTodo(todoList);
    styling();
    inputeEle.value = null;
}

function doneBtn (index){
   
}
styling();
function styling(){
    if(todoList.length > 0){
        displayEle.classList.remove('displayListContainer');
        const cssStylesForDisplayEle = {
            height: 'fit-content',
            // opacity : '0.5'
          };

        displayEle.classList.add('show');
    }else {
        displayEle.classList.add('displayListContainer');
        displayEle.classList.remove('show')

    }
}

