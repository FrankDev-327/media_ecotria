'use strict';

var { MapModel } = require('../../models/index');

async function Create(req, res) {
	res.status(200).send({message: 'Controller create Map  success.'});
}

async function Update(req, res) {
	res.status(200).send({message: 'Controller update Map  success.'});
}

async function List(req, res) {
	res.status(200).send({message: 'Controller list Map  success.'});
}

async function View(req, res) {
	res.status(200).send({message: 'Controller view Map  success.'});
}

async function Delete(req, res) {
	res.status(200).send({message: 'Controller delete Map  success.'});
}

module.exports = {
	Create,
	Update,
	View,
	Delete,
	List
}