var tasks = [];
var iRobots = [{
        id: 1,
        Name: 'Robot 1',
        status: "unsigned"
    },
    {
        id: 2,
        Name: 'Robot 2',
        status: "unsigned"
    },
    {
        id: 3,
        Name: 'Robot 3',
        status: "unsigned"
    },
    {
        id: 4,
        Name: 'Robot 4',
        status: "unsigned"
    }
];

var fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

function addNewTask() {
    var next_task = tasks.length + 1;

    var d = new Date();
    var t = d.toLocaleTimeString();

    tasks.push({
        id: next_task,
        Name: "Taks " + next_task,
        Time: "" + t,
        state_of_task: "1",
        worktime: 0,
        iRobotId: 0
    });
    console.log(tasks);
}

setInterval(addNewTask, 8000);

function LoadTasks() {
    var back_obj = document.getElementById('backlog_tasks');
    var todo_obj = document.getElementById('todo_tasks');
    var inpro_obj = document.getElementById('inpro_tasks');
    var done_obj = document.getElementById('done_tasks');

    var back_obj_footer = document.getElementById('backlog_tasks_footer');
    var todo_obj_footer = document.getElementById('todo_tasks_footer');
    var inpro_obj_footer = document.getElementById('inpro_tasks_footer');
    var done_obj_footer = document.getElementById('done_tasks_footer');

    back_obj.innerHTML = "";
    todo_obj.innerHTML = "";
    inpro_obj.innerHTML = "";
    done_obj.innerHTML = "";

    var back_counter = 0;
    var todo_counter = 0;
    var inpr_counter = 0;
    var done_counter = 0;

    for (var i = 0; i < tasks.length; i++) {
        var divtest = document.createElement("div");
        klasa = "";

        var dodatak = '';
        if (tasks[i].worktime > 0)
            dodatak = '&nbsp; &nbsp; &nbsp; worktime: ' + tasks[i].worktime;

        divtest.innerHTML = '<div id="' + tasks[i].id + '" state_of_task=' + tasks[i].state_of_task + ' class="alert alert-info  alert-dismissible" draggable="true" ondragstart="drag(event)" ><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong><i class="fa fa-bar-chart" style="font-size:20px"></i> &nbsp; ' + tasks[i].Name + '</strong> ' + tasks[i].Time + '' + dodatak + '</div>';

        switch (tasks[i].state_of_task) {
            case "1":
                back_obj.appendChild(divtest);
                back_obj_footer.innerHTML = "Tasks counter: " + (++back_counter);
                break;
            case "2":
                todo_obj.appendChild(divtest);
                todo_obj_footer.innerHTML = "Tasks counter: " + (++todo_counter);
                break;
            case "3":
                inpro_obj.appendChild(divtest);
                inpro_obj_footer.innerHTML = "Tasks counter: " + (++inpr_counter);

                if (tasks[i].worktime > 0)
                    tasks[i].worktime--;
                else {
                    tasks[i].state_of_task = "4";
                    for (var i = 0; i < iRobots.length; i++) {
                        if (iRobots[i].id == tasks[i].iRobotId)
                            iRobots[i].status = "unsigned";
                    }
                }

                break;
            case "4":
                done_obj.appendChild(divtest);
                done_obj_footer.innerHTML = "Tasks counter: " + (++done_counter);
                break;
        }


    }

    numberOfFreeIRobots();
}

setInterval(LoadTasks, 1000);


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var task_id = ev.dataTransfer.getData("text");
    debugger;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == task_id)
            tasks[i].state_of_task = "2";
    }

    ev.target.appendChild(document.getElementById(task_id));
}


function numberOfFreeIRobots() {
    attachIRobot();
    var brojac = 0;
    for (var i = 0; i < iRobots.length; i++) {
        if (iRobots[i].status == "unsigned")
            brojac++;
    }

    document.getElementById('inpro_irobots_counter').innerHTML = "In progress tasks  &nbsp; &nbsp; &nbsp; &nbsp;<B>(Free iRobots: " + brojac + ")</b>";
}

function attachIRobot() {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].state_of_task == "2") {
            for (var j = 0; j < iRobots.length; j++) {
                console.log("proveravam robota " + j);
                if (iRobots[j].status == "unsigned") {
                    iRobots[j].status = "signed";

                    tasks[i].state_of_task = "3";
                    tasks[i].iRobotId = iRobots[j].id;
                    tasks[i].worktime = fib[Math.floor(Math.random() * 13)];
                    break;
                }
            }
        }
    }
}

