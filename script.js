var today = moment();
$("#actualDay"). text(today.format("dddd, MMMM Do"));

// task to store in localStorage
var tasks = {
    "9": [],
    "10":[],
    "11":[],
    "12":[],
    "13": [],
    "14":[],
    "15":[],
    "16":[],
    "17":[],

};

var setTask = function() {
    localStorage.setItem("task", JSON.stringify(tasks));
}

var getTasks = function() {
    /* load the tasks from localStorage and create tasks in the right row */

    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks = loadedTasks

        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

    auditTasks()
}

var createTask = function(taskText, hourDiv) {
    /*Making sure that the task is aligned with the appropriate hour*/

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
    taskDiv.html(taskP);    
}

var auditTasks = function() {
    /* update the background of each row based on the time of day */

    var currentHour = moment().hour();
    $(".task-info").each( function() {
        var elementHour = parseInt($(this).attr("id"));

        // handle past, present, and future
        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};