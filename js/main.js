// Находим элемементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []


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
    console.log(tasks)

     // Формируем css класс для новой задачи
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'


    // Формируем разметку для новой задачи
     const taskHTML = 
     `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
		<span class="${cssClass}">${newTask.text}</span>
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

    // Очищаем поле ввода и возвращаем на него фокус

    taskInput.value = ''
    taskInput.focus()

    // Скрываем сообщение "Список дел пуст"

    if(tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }

   
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

    parentNode.remove()

    // Если в списке задач нет элементов, показываем сообщение "Список дел пуст"

    if(tasksList.children.length === 1) {
        emptyList.classList.remove('none')
    }

   

}

   
function doneTask(event) {
    // Проверяем если клик был не по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return

    // Проверяем что клик был по кнопке "отметить задачу выполненной"
     const parentNode = event.target.closest('.list-group-item')
     const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

  
        
}

