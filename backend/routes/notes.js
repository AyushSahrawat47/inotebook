const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//ROUTE 1 : Get All The Notes using : GET "/api/notes/fetchallnotes". (Login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Notes.find({ user: req.user.id })
      res.json(notes)
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error")
   }
})


//ROUTE 2 : Add a new note using  : POST "/api/notes/addnote". (Login required)
router.get('/addnote', fetchuser,
   [
      //validates whether the information entered are ok or just any gibberish shit is entered
      body('title', 'thoda bada likh na badhwe hathon mei mehndi lagi hai kya ?').isLength({ min: 3 }),
      body('description', 'phir backchodi de raha hai').isLength({ min: 5 })
   ],
   async (req, res) => {

      try {
         //destructuring the data from the body 
         const { title, description, tag } = req.body;
         // if there are errrors return error and bad request
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }
         //saving the notes information to the Database
         const note = new Notes({
            title, description, tag, user: req.user.id
         })
         const savedNote = await note.save()
         res.json(savedNote)
      }
      catch (error) {
         console.log(error.message);
         res.status(500).send("internal server error")
      }
   })

//ROUTE 3 : update an existing note using  : PUT "/api/notes/updatenote". (Login required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      //create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      //Find the note to be updated  and update it 
      let note = await Notes.findById(req.params.id);
      if (!note) { res.status(404).send("Not Found") }

      //checking if the user loggedIn is the same user that created that note and is upadting the node
      if (note.user.toString() !== req.user.id) {                  //note.user.toString will give me the id of the user that created the note 
         return res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error")
   }
})

//ROUTE 4 : Deleting the existing note using : DELETE /api/note/deletenote. (Login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      const { title, description, tag } = req.body;

      //Find the note to be deleted  and delete it 
      let note = await Notes.findById(req.params.id);
      if (!note) { res.status(404).send("Not Found") }

      //checking if the user loggedIn is the same user that created that note and is deleting the node
      if (note.user.toString() !== req.user.id) {                  //note.user.toString will give me the id of the user that created the note 
         return res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json("Note is successfully deleted");
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error")
   }
})


module.exports = router