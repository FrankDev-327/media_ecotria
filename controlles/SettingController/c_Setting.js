'use strict';

var Setting = require ('../../Models/m_Setting');

async function Create(req, res) {
	res.status(200).send({message: 'Controller create Setting  success.'});
}

async function Update(req, res) {
	res.status(200).send({message: 'Controller update Setting  success.'});
}

async function List(req, res) {
	res.status(200).send({message: 'Controller list Setting  success.'});
}

async function View(req, res) {
	res.status(200).send({message: 'Controller view Setting  success.'});
}

async function Delete(req, res) {
	res.status(200).send({message: 'Controller delete Setting  success.'});
}

