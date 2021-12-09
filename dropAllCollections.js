const mongoose = require('mongoose');

const dropAllCollections = async () => {
  await mongoose.connection.dropCollection('appointments');
  await mongoose.connection.dropCollection('diagnoses');
  await mongoose.connection.dropCollection('doctors');
  await mongoose.connection.dropCollection('hospitals');
  await mongoose.connection.dropCollection('prescriptions');
  await mongoose.connection.dropCollection('users');
};

module.exports = dropAllCollections;
