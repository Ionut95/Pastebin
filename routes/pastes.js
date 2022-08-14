var express = require('express');
var router = express.Router();

var functions = require('../db/pastes');
var { insertPaste, getTitles, getPasteById, updatePaste, deletePaste } = functions;

/* GET home page. */
router.get('/', function(req, res, next) {
  const flashMessage = req.flash('flMess')
  res.render('index', { flashMessage });
});

router.post('/', function(req, res, next) {
  let formData = req.body;
  if(insertPaste(formData) == 'success') {
    req.flash('flMess', 'Data succesfully inserted!')
    res.redirect('/');
  } else {
    console.log('Error message' + err);
  }
});

router.get('/paste/list', async function(req, res, next) {
  const flashMessage = req.flash('flMess')
  let data = await getTitles();
  res.render('paste/list', { data, flashMessage });
});

router.get('/paste/:id/edit', async function(req, res, next) {
  const flashMessage = req.flash('flMess')
  let id = req.params.id;
  let paste = await getPasteById(id);
  res.render('paste/edit', { paste, flashMessage });
});

router.post('/paste/:id/edit', async function(req, res, next) {
  let id = req.params.id;
  let title = req.body.title_paste;
  let text = req.body.text_paste;
  let message = await updatePaste(title, text, id);
  if (message == 'Success') {
    req.flash('flMess', 'Data was updated succesfully!')
    res.redirect('/paste/' + id + '/edit');
  } else {
    res.redirect('/paste/' + id + '/edit');
  }
});

router.get('/paste/:id/delete', async function(req, res, err) {
  let id = req.params.id;
  let message = await deletePaste(id);
  if (message == 'Success') {
    req.flash('flMess', 'Record was succesfully deleted!')
    res.redirect('/paste/list');
  } else {
    res.redirect('/paste/list');
  }
});

module.exports = router;