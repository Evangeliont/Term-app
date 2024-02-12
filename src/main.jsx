import { createRoot } from "react-dom/client";
import { TermList } from "./TermList";
import "./index.css";

function saveTermList(terms) {
  localStorage.setItem("termList", JSON.stringify(terms));
}

function restoreTermsList() {
  const rawTermList = localStorage.getItem("termList");

  if (!rawTermList) {
    return [];
  }

  return JSON.parse(rawTermList);
}

let terms = restoreTermsList();

const descriptionList = document.getElementById("description-list");

const reactRoot = createRoot(descriptionList);

function syncTermList() {
  saveTermList(terms);
  reactRoot.render(<TermList terms={terms} onDelete={deleteItem} />);
}

function addTerm(title, description) {
  terms.push({
    id: Date.now(),
    title,
    description,
  });

  terms.sort((termLeft, termRight) =>
    termLeft.title < termRight.title ? -1 : 1
  );

  syncTermList();
}

function deleteItem(id) {
  terms = terms.filter((term) => term.id !== id);

  syncTermList();
}

const form = document.getElementById("add-description");

syncTermList();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.elements["title"].value;
  const description = form.elements["description"].value;

  form.reset();

  addTerm(title, description);
});
