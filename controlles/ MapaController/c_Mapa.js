'use strict';

var Mapa = require ('../../Models/m_Mapa');

async function Create(req, res) {
	res.status(200).send({message: 'Controller create Mapa  success.'});
}

async function Update(req, res) {
	res.status(200).send({message: 'Controller update Mapa  success.'});
}

async function List(req, res) {
	res.status(200).send({message: 'Controller list Mapa  success.'});
}

async function View(req, res) {
	res.status(200).send({message: 'Controller view Mapa  success.'});
}

async function Delete(req, res) {
	res.status(200).send({message: 'Controller delete Mapa  success.'});
}

