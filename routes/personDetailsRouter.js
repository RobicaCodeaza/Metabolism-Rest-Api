const personDetailsController = require('../controllers/personDetailsController.js');

const router = require('express').Router();

// if you go there you can use this
router.post('/addPerson', personDetailsController.addPerson);
router.get('/allPersons', personDetailsController.getAllPersons);

router.get('/:id', personDetailsController.getOnePerson);
router.put('/:id', personDetailsController.updatePerson);
router.delete('/:id', personDetailsController.deletePerson);
// router.delete('/deletePersonAll', personDetailsController.deletePersonAll);
module.exports = router;
