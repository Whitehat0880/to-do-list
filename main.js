window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from localStorage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(savedTask => {
        createTaskElement(savedTask);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim(); // Trim to remove leading and trailing whitespaces

        if (task !== "") {
            createTaskElement(task);

            // Save tasks to localStorage
            saveTasksToLocalStorage();
		}
			else{
				alert("Edited task cannot be empty.");
			}

        input.value = '';
    });

    function createTaskElement(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Remove';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                const editedTask = task_input_el.value.trim(); // Trim to remove leading and trailing whitespaces

                if (editedTask !== "") {
                    task_edit_el.innerText = "Edit";
                    task_input_el.setAttribute("readonly", "readonly");

                    // Save tasks to localStorage after editing
                    saveTasksToLocalStorage();
                } else {
                    alert("Edited task cannot be empty.");
                }
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);

            // Save tasks to localStorage after deleting
            saveTasksToLocalStorage();
        });
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map(task_el => {
            return task_el.querySelector('.text').value;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
