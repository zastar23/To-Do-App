const themeToggle = document.querySelector(".header-theme-toggle") as HTMLImageElement;
const clearAll = document.querySelector(".clear") as HTMLSpanElement;
const itemsLeft = document.querySelector(".counter") as HTMLSpanElement;
const filtersContainer = document.querySelector(".main-filters") as HTMLDivElement;
const header = document.querySelector(".header");
const body = document.querySelector("body");

themeToggle.addEventListener("click", function changeTheme() {
	if (themeToggle.dataset.pressed === "false") {
		themeToggle.setAttribute("data-pressed", "true");
		themeToggle.src = "./images/icon-moon.svg";
		body?.classList.add("light-theme");
		body?.classList.remove("dark-theme");
	} else {
		themeToggle.setAttribute("data-pressed", "false");
		themeToggle.src = "./images/icon-sun.svg";
		body?.classList.add("dark-theme");
		body?.classList.remove("light-theme");
	}
});

// add tasks
const input = document.querySelector(".input") as HTMLInputElement;
const ul = document.querySelector(".list") as HTMLUListElement;
const completedTasks: HTMLLIElement[] = [];

let taskCounter = 0;

const createTask = function (e: KeyboardEvent) {
	if (e.key !== "Enter") return;
	if (!input.value) return;
	if (e.key === "Enter" && input.value.length !== 0) {
		taskCounter++;
		// create task component
		const li = document.createElement("li");
		const circle = document.createElement("div");
		const check = document.createElement("img");
		const span = document.createElement("span");
		const deleteBtn = document.createElement("button");

		li.classList.add("task");
		li.classList.add("dark-theme-components");
		li.dataset.number = `${taskCounter}`;
		circle.classList.add("circle");
		check.src = "./images/icon-check.svg";
		check.classList.add("check");
		check.classList.add("hidden");
		span.classList.add("task-text");
		span.innerText = `${input.value}`;
		deleteBtn.classList.add("delete-task");

		circle.appendChild(check);
		li.appendChild(circle);
		li.appendChild(span);
		li.appendChild(deleteBtn);
		ul.prepend(li);

		input.value = "";
		const tasksArr = document.querySelectorAll(".task");
		if (tasksArr.length === 1) {
			itemsLeft.textContent = `${tasksArr.length} item left`;
		} else {
			itemsLeft.textContent = `${tasksArr.length} items left`;
		}
	}
};

// delete task
const deleteTask = function (e: MouseEvent) {
	const target = e.target as Element;
	if (target.classList.contains("check")) {
		target.classList.toggle("hidden");

		if (!target.classList.contains("hidden")) {
			target.parentElement!.parentElement!.id = "checked";
		} else {
			target.parentElement!.parentElement!.removeAttribute("id");
		}
	}

	if (target.classList.contains("delete-task") && target.parentElement!.id === "checked") {
		target.closest("li")!.remove();
		completedTasks.push(target.closest("li")!);
		const tasksArr = document.querySelectorAll(".task");
		if (tasksArr.length === 1) {
			itemsLeft.textContent = `${tasksArr.length} item left`;
		} else {
			itemsLeft.textContent = `${tasksArr.length} items left`;
		}
	}
	// check and delete tasks that are completed

	if (target.classList.contains("clear")) {
		const tasks = document.querySelectorAll(".task");
		tasks.forEach((task) => {
			if (task.id === "checked") {
				ul.removeChild(task);
				completedTasks.push(task);
			}
			const tasksArr = document.querySelectorAll(".task");
			if (tasksArr.length === 1) {
				itemsLeft.textContent = `${tasksArr.length} item left`;
			} else {
				itemsLeft.textContent = `${tasksArr.length} items left`;
			}
		});
	}
};

filtersContainer.addEventListener("click", function filterTasks(e) {
	const target = e.target as Element;
	const activeButton = document.querySelector(".active") as HTMLSpanElement;
	const completedButton = document.querySelector(".completed") as HTMLSpanElement;
	const allButton = document.querySelector(".all") as HTMLSpanElement;
	const tasks = document.querySelectorAll(".task");
	// show all active tasks only
	if (target === activeButton) {
		activeButton.classList.add("active-button");
		completedButton.classList.remove("active-button");
		allButton.classList.remove("active-button");

		tasks.forEach((task) => {
			if (task.id) {
				ul.removeChild(task);
			}
		});
	}

	// show all completed tasks only
	if (target === completedButton) {
		activeButton.classList.remove("active-button");
		completedButton.classList.add("active-button");
		allButton.classList.remove("active-button");

		if (completedTasks.length !== 0) {
			completedTasks.forEach((task) => {
				if (task.id === "checked") {
					ul.prepend(task);
				}
			});
		}
	}

	// show all tasks
	if (target === allButton) {
		allButton.classList.add("active-button");
		activeButton.classList.remove("active-button");
		completedButton.classList.remove("active-button");

		tasks.forEach((task) => {
			if (task.id || !task.id) {
				ul.prepend(task);
			}
		});
	}
});

input.addEventListener("keyup", createTask);
ul.addEventListener("click", deleteTask);
