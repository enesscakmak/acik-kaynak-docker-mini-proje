const API_URL = "http://localhost:3000/api/notes";

async function fetchNotes() {
	const res = await fetch(API_URL);
	return res.json();
}

async function addNote(content) {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content }),
	});
	return res.json();
}

function createNoteElement(note) {
	const div = document.createElement("div");
	div.textContent = note.content;
	div.style.border = "1px solid #ccc";
	div.style.padding = "8px";
	div.style.margin = "4px 0";
	return div;
}

async function render() {
	const root = document.getElementById("root");
	root.innerHTML = "";

	const form = document.createElement("form");
	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "Yeni not ekle...";
	input.required = true;
	const btn = document.createElement("button");
	btn.type = "submit";
	btn.textContent = "Ekle";

	form.appendChild(input);
	form.appendChild(btn);
	root.appendChild(form);

	const notesDiv = document.createElement("div");
	root.appendChild(notesDiv);

	const notes = await fetchNotes();
	notes.forEach((note) => {
		notesDiv.appendChild(createNoteElement(note));
	});

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!input.value.trim()) return;
		await addNote(input.value.trim());
		input.value = "";
		const updatedNotes = await fetchNotes();
		notesDiv.innerHTML = "";
		updatedNotes.forEach((note) => {
			notesDiv.appendChild(createNoteElement(note));
		});
	});
}

render();
