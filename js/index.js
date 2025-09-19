const todoInput = document.getElementById("todo");
const tglBuat = document.getElementById("tgl-buat");
const statusInput = document.getElementById("status");
const deadlineInput = document.getElementById("deadline");
const prioritasInput = document.getElementById("prioritas");
const addBtn = document.getElementById("add");
const todoOutput = document.getElementById("todo-output");

let editRow = null;

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const todoValue = todoInput.value.trim();
  const tglBuatValue = tglBuat.value;
  const statusValue = statusInput.value;
  const deadlineValue = deadlineInput.value;
  const prioritasValue = prioritasInput.value;

  if (!todoValue || !tglBuatValue || !statusValue || !deadlineValue || !prioritasValue) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (editRow) {
    editRow.cells[0].innerText = todoValue;
    editRow.cells[1].innerText = tglBuatValue;
    editRow.cells[2].innerText = statusValue;
    editRow.cells[3].innerText = deadlineValue;
    editRow.cells[4].innerText = prioritasValue;

    addBtn.value = "Add ToDo";
    editRow = null;
  } else {

    const newRow = todoOutput.insertRow();

    newRow.insertCell(0).innerText = todoValue;
    newRow.insertCell(1).innerText = tglBuatValue;
    newRow.insertCell(2).innerText = statusValue;
    newRow.insertCell(3).innerText = deadlineValue;
    newRow.insertCell(4).innerText = prioritasValue;

    const actionCell = newRow.insertCell(5);
    actionCell.innerHTML = `
      <button class="action-btn edit-btn">Edit</button>
      <button class="action-btn delete-btn">Delete</button>
    `;
  }

  resetForm();
});

todoOutput.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    editRow = e.target.closest("tr");

    todoInput.value = editRow.cells[0].innerText;
    tglBuat.value = editRow.cells[1].innerText;
    statusInput.value = editRow.cells[2].innerText;
    deadlineInput.value = editRow.cells[3].innerText;
    prioritasInput.value = editRow.cells[4].innerText;

    addBtn.value = "Update ToDo";
  }

  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    row.remove();

    if (editRow === row) {
      editRow = null;
      addBtn.value = "Add ToDo";
      resetForm();
    }
  }
});


function resetForm() {
  todoInput.value = "";
  tglBuat.value = "";
  statusInput.value = "Pending";
  deadlineInput.value = "";
  prioritasInput.value = "Rendah";
}

const filterStatusBtns = document.querySelectorAll(".filter-btn[data-filter]");
filterStatusBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-filter");

    Array.from(todoOutput.rows).forEach(row => {
      const rowStatus = row.cells[2].innerText;
      row.style.display = (filterValue === "all" || rowStatus === filterValue) ? "" : "none";
    });
  });
});


const filterPrioritasBtns = document.querySelectorAll(".filter-btn[data-prioritas]");
filterPrioritasBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-prioritas");

    Array.from(todoOutput.rows).forEach(row => {
      const rowPrioritas = row.cells[4].innerText;
      row.style.display = (filterValue === "all" || rowPrioritas === filterValue) ? "" : "none";
    });
  });
});
