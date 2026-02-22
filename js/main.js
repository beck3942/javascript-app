// Находим элемементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach (task => renderTask(task) )
}

 checkEmptyList()


// Добавление задачи

form.addEventListener('submit', addTask)

// Удаление и отметка задачи выполненной

tasksList.addEventListener('click', deleteTask)

// Функция добавления задачи

tasksList.addEventListener('click', doneTask)



// Функции

function addTask(event) {
     // Отменяем стандартное поведение формы

	event.preventDefault()

    // Получаем значение из поля ввода

    const taskText = taskInput.value 

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask)

    // Сохраняем список в хранилище браузера Local Storage
     saveToLocalStorage()

     renderTask(newTask)
   

    // Очищаем поле ввода и возвращаем на него фокус

    taskInput.value = ''
    taskInput.focus()
    
    checkEmptyList()

   
   
}


function deleteTask(event) {
    // Проверяем что клик был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return

   // Проверяем что клик был по кнопке "удалить задачу"
    const parentNode =  event.target.closest('.list-group-item') 

      // Находим id задачи
   const id = Number(parentNode.id)

    // // Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id)
    //     parentNode.remove()

    // // Удаляем задачу из массива tasks
    // tasks.splice(index, 1)

    tasks = tasks.filter((task) => task.id !== id)

    // Сохраняем список в хранилище браузера Local Storage
     saveToLocalStorage()

    parentNode.remove()

    checkEmptyList()
  

   

}

   
function doneTask(event) {
    // Проверяем если клик был не по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return

    // Проверяем что клик был по кнопке "отметить задачу выполненной"
     const parentNode = event.target.closest('.list-group-item')

     // Определяем id задачи
     const id = Number(parentNode.id)
    // Находим задачу в массиве tasks
    const task = tasks.find(function (task) {
        if (task.id === id) {
            return true
        }
     })

     // сокращаем код выше до одной строки 
    // const task = tasks.find((task) => task.id ===id)

     // Меняем статус задачи на противоположный
     task.done = !task.done

     // Сохраняем список в хранилище браузера Local Storage
     saveToLocalStorage()
    

     // Находим элемент с названием задачи внутри элемента списка и меняем его класс
     const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

  
        
}


function checkEmptyList() {
        if (tasks.length === 0) {
            const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                    <div class="empty-list__title">Список дел пуст</div>
                </li>`
            tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
        }

        if (tasks.length > 0) {
            const emptyListEl = document.querySelector('#emptyList')
            emptyListEl ? emptyListEl.remove() : null
        }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
       // Формируем css класс для новой задачи
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'


    // Формируем разметку для новой задачи
     const taskHTML = 
     `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
		<span class="${cssClass}">${task.text}</span>
		 <div class="task-item__buttons">
		  <button type="button" data-action="done" class="btn-action">
			<img src="./img/tick.svg" alt="Done" width="18" height="18">
		   </button>
		 <button type="button" data-action="delete" class="btn-action">
			<img src="./img/cross.svg" alt="Done" width="18" height="18">
		   </button>
		</div>
	 </li>`
    
    // Добавляем задачу в список

    tasksList.insertAdjacentHTML('beforeend', taskHTML)

}