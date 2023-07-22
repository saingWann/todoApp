const inputeEle = document.querySelector('[inputEle]');
const addBtnEle = document.querySelector('[addBtnEle]')
const displayEle = document.querySelector('[displayListContainer]');
let isNewItemAdded = true;
const todoList = JSON.parse(localStorage.getItem('task')) || [];

const addTodo = () => {
    // to prevent from pushing empty string to the display  
    if(!inputeEle.value){
        return;
    }
    inputTodovalue = inputeEle.value;
    todoList.push(inputTodovalue);
    localStorage.setItem('task',JSON.stringify(todoList))
//    console.log(todoList);
}

function updateProgress(){
    const progress = document.getElementById('progress');
    progress.innerText = `Tasks To be Done (${todoList.length})`;
    // console.log(progress)
}


renderTodo (todoList)

function renderTodo (todoList){
    
    displayEle.innerHTML = null;
    todoList.forEach((element ,index) => {
        const newTodoContainer = document.createElement('div');
        displayEle.append(newTodoContainer);
        newTodoContainer.classList.add('newTodoContainer');
        let newTodoContainerStyle = {
            position: 'relative'
        }
        Object.assign(newTodoContainer.style,newTodoContainerStyle);
        
        if (isNewItemAdded) {

            // meaining the last element of the array will 
            // only add the class 
            if(index === todoList.length - 1){
            newTodoContainer.classList.add('fade-in');
            isNewItemAdded = false; // Reset the flag
             }
        }
        console.log(isNewItemAdded);

        const newTodo = document.createElement('p');
        newTodo.innerText =`${index +1 }. ${element}`;
        newTodoContainer.append(newTodo);

        // to make it editable
        const editInputEle = document.createElement('input');
        editInputEle.classList.add('edit-input');
        newTodoContainer.append(editInputEle);
        editInputEle.classList.add('edit-value');
        const editValue = document.querySelector('.edit-value');

        const editInputEleStyle = {
            display: 'none',
            position: 'absolute',
            insect: '0',
            width: '100%',
            border: 'none',
            background: 'transparent',
            outline: 'none'
          } 
          Object.assign(editInputEle.style,editInputEleStyle);
        
        // edit button
        const editBtnEle = document.createElement('button');
        editBtnEle.innerText = 'Edit';
        newTodoContainer.append(editBtnEle);
        editBtnEle.classList.add('edit-btn-ele')

        editBtnEle.onclick = () => {
            doneBtnEle.style.display = 'none'
            newTodo.style.display = 'none';
            editBtnEle.style.display = 'none';

            editInputEle.style.display = 'block';
            editInputEle.style.padding = '5px';
            editInputEle.style.marginBlockEnd= '50px';
            editInputEle.style.marginBlockStart= '40px';
            editInputEle.style.borderBottom = '1px solid black';
            editInputEle.placeholder = 'you can edit here';
            editInputEle.value = newTodo.innerText;
            editInputEle.focus();
        }
        editInputEle.onblur = () =>{
            newTodo.style.display = 'inline-block';
            doneBtnEle.style.display = 'block';
            editInputEle.style.display = 'none';
            editBtnEle.style.display = 'block';
            console.log(editInputEle.value);
            newTodo.innerText =`${index+1}. ${editInputEle.value}`;
             todoList[index] = editInputEle.value;
            //  console.log(element);
            //  console.log(todoList);
        }

        editInputEle.onkeyup = (event) =>{
            if(event.key === 'Enter'){

            newTodo.style.display = 'inline-block';
            doneBtnEle.style.display = 'block';
            editInputEle.style.display = 'none';
            editBtnEle.style.display = 'block';
            console.log(editInputEle.value);
            newTodo.innerText =`${index+1}. ${editInputEle.value}`;
             todoList[index] = editInputEle.value;
            //  console.log(element);
            //  console.log(todoList);
            }
        }
        updateProgress();

         //Done button
         const doneBtnEle = document.createElement('button');
         doneBtnEle.innerText = 'Done';
         doneBtnEle.classList.add('doneBtnEle')
         newTodoContainer.append(doneBtnEle);
 
        // done button will remove the todo from the list
        doneBtnEle.onclick = () =>{
            newTodo.style.textDecoration = 'line-through';
            newTodo.style.transformOrigin = 'left'; 

        setTimeout(()=>{
            todoList.splice(index,1)
            localStorage.setItem('task',JSON.stringify(todoList));
            // console.log(todoList);
            renderTodo(todoList)
            updateProgress();
        },500)
        
        }

    } );

    styling();
   
}

addBtnEle.onclick = () =>{
    isNewItemAdded = true; // Set the flag to true when a new item is added

    if(!inputeEle.value){
        alert ('add something to do first!')
    }
    addTodo();
    renderTodo(todoList);
    styling();
    inputeEle.value = null;
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

inputeEle.onkeyup = (event) => {

    if(event.key === 'Enter'){
        isNewItemAdded = true; // Set the flag to true when a new item is added
        addTodo();
        renderTodo(todoList);
        styling();
        inputeEle.value = null;

    }
}