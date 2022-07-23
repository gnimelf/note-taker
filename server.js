const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3001;
const path = require("path");
const db = require("./db/db.json");
app.use(express.json());
app.use(express.static("public"));

// Root page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Display notes from db to notes page
app.get("/api/notes", (req, res) => {
  // const notes = JSON.stringify(db);
  res.send(db);
});

// Add new note from form
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  // check note info for empty data
  if (title != "" && text != "") {
    const newNote = {
      title,
      text,
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated reviews!")
        );
      }
    });
  }
});

// Delete a note from notes page
app.delete("/api/notes/:id", (req, res) => res);

// Server starts listening on a port and the long
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} http://localhost:${PORT}/`);
});
