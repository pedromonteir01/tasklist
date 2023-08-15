
let aux = -1;

class Task {
    constructor(title, id, status) {
        this.title = title;
        this.id = id;
        this.status = status;
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    checkTask(id) {
        this.tasks.forEach(task => {
            if (task.id == id) {
                task.status = !task.status;
            }
        });
        document.getElementById(id + "-conclued").classList.toggle("unfinished");
        document.getElementById(id + "-conclued").classList.toggle("green");
    }
}

function randomId() {
    return Math.floor(Math.random() * 9998) + 1;
}

const taskList = new TaskList();

function newTask() {
    let title = document.getElementById("title").value;
    if (aux == -1) {
        let task = new Task(title, randomId(), false);

        taskList.addTask(task);
    } else {
        taskList.tasks[aux].title = title;
        aux = -1;
    }

    document.getElementById("title").value = "";
    document.getElementById("posts-dad").classList.remove("hidden");

    showHTML();

}

function showHTML() {
    let listHTML = "";

    let list = document.getElementById("posts-dad");


    taskList.tasks.forEach((task, index) => {
        listHTML += `
        <div id="posts">
            <p id="${task.id}">${task.title}</p>
            <div id="action_button">
                <button id="${task.id}-conclued" class="unfinished" onclick="realized(${task.id})">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button id="${task.id}-edit" class="edit" onclick ="edit(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button id="${task.id}-delete" class="delete" onclick="delet(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>`
    });

    list.innerHTML = listHTML;

}

function delet(index) {
    taskList.tasks.splice(index, 1);
    showHTML();

    if (taskList.tasks.length == 0) {
        document.getElementById("posts").classList.add("hidden");
    }
}

function realized(id) {
    taskList.checkTask(id);
}

function edit(index) {
    aux = index;
    document.getElementById("title").value = taskList.tasks[index].title;
}





