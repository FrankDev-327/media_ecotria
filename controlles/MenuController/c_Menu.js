'use strict';

var { MenuModel } = require('../../models/index');

async function Create(req, res) {
	res.status(200).send({message: 'Controller create Menu  success.'});
}

async function Update(req, res) {
	res.status(200).send({message: 'Controller update Menu  success.'});
}

async function List(req, res) {
	res.status(200).send({message: 'Controller list Menu  success.'});
}

async function View(req, res) {
	res.status(200).send({message: 'Controller view Menu  success.'});
}

async function Delete(req, res) {
	res.status(200).send({message: 'Controller delete Menu  success.'});
}

module.exports = {
	Create,
	Update,
	View,
	Delete,
	List
}