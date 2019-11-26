$(function () {
  // The taskHtml method takes in a JavaScript representation of the task and produces an HTML
  // representation using <li> tags
  function taskHTML(task) {
    let checkedStatus = task.done ? "checked" : "";
    let liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
      " data-id='" + task.id + "'" +
      checkedStatus +
      '><label>' +
      task.title +
      '</label></div></li>';

    return liElement;
  }

  // toggleTask takes in an HTML representation of an event that fires from an HTML representation of the
  // toggle checkbox and preforms and API request to toggle the value of the 'done' field

  function toggleTask(e) {
    let itemId = $(e.target).data("id");

    let doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    });
  }

  $.get("/tasks").success(function (data) {
    let htmlString = "";

    $.each(data, function (index, task) {
      htmlString += taskHTML(task);
    });
    let ulTodos = $('.todo-list');
    ulTodos.html(htmlString);

    $('.toggle').change(toggleTask);

  });

  $('#new-form').submit(function (event) {
    event.preventDefault();
    let textbox = $('.new-todo');
    let payload = {
      task: {
        title: textbox.val()
      }
    }
    $.post("/tasks", payload).success(function (data) {
      let htmlString = taskHTML(data)
      let ulTodos = $('.todo-list');
      ulTodos.append(htmlString);
      $('.toggle').click(toggleTask);
    });
  });
});