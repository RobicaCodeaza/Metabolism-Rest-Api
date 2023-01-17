const { sequelize } = require('../models');
const db = require('../models');

// Create main Model
const Persons = db.persons;

// Main Work

// 1.Create Product
const addPerson = async (req, res) => {
  console.log('entered this function');
  let info = {
    fullname: req.body.fullname,
    age: req.body.age,
    heightCM: req.body.heightCM,
    weightKG: req.body.weightKG,
  };
  const person = await Persons.create(info);
  console.log(person);
  res.status(200).send(person);
};

// 2.Get all products

const getAllPersons = async (req, res) => {
  let persons = await Persons.findAll();
  res.status(200).send(persons);
};

// 3.Get Single Product

const getOnePerson = async (req, res) => {
  let id = req.params.id;
  let person = await Persons.findOne({ where: { id: id } });
  console.log(person);

  res.status(200).send(person);
};

// 4.Update product

const updatePerson = async (req, res) => {
  let ide = req.params.id;
  const person = await Persons.update(req.body, { where: { id: ide } });
  console.log(person);
  res.status(200).send(person);
};

// 5.Delete single product by id

const deletePerson = async (req, res) => {
  let id = req.params.id;
  await Persons.destroy({ where: { id: id } });
  res.status(200).send('Person is deleted');
};

// const deletePersonAll = async (req, res) => {
//   sequelize.query('DELETE FROM persons');
//   res.status(200).send('All registrations were deleted');
// };
// 6.Get published product

module.exports = {
  addPerson,
  getAllPersons,
  getOnePerson,
  updatePerson,
  deletePerson,
  // deletePersonAll,
};
