const items = document.getElementById("items");

/**
 * Appends a new item to the end of items list
 * @param {any} e - Event listener
 */
function appendList(e) {
  e.preventDefault();
  const input = document.getElementById("inputItem").value;
  if (input === "") return;

  const newListItem = document.createElement("li");
  newListItem.className = "list-group-item";
  newListItem.appendChild(document.createTextNode(input));

  const newListItemBtn = document.createElement("button");
  newListItemBtn.className = "delete btn btn-danger float-end";
  newListItemBtn.appendChild(document.createTextNode("X"));
  newListItem.appendChild(newListItemBtn);

  items.appendChild(newListItem);
}

/**
 * Deletes item that is the parent of the delete button after checking that the event was created by a button
 * @param {any} e - Event listener
 */
function deleteItem(e) {
  if (!e.target.classList.contains("delete")) return;

  items.removeChild(e.target.parentElement);
}

// button.addEventListener("click", appendList);
addEventListener("submit", appendList);
items.addEventListener("click", deleteItem);
