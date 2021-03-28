'use strict';

var { NewsModel } = require('../../models/index');

async function CreateNoticia(req, res) {
  try {
    var params = req.body
    var noticias = new NewsModel({
      noticia: params.noticia,
      mensaje: params.mensaje,
      fuente: params.fuente,
      fecha_creacion: new Date().toISOString()
    });
    var info_noticia = await noticias.save();
    if (!info_noticia) res.status(404).json({ message: 'Error generating the news' });
    else res.status(200).json({ info_noticia });
  } catch (error) {
    res.status(500).json({ message: error.mensaje });
  }
}

async function UpdateNoticia(req, res) {
  var idNoticia = { _id: req.params.id };
  try {
    var info_noticia = await NewsModel.findByIdAndUpdate(idNoticia, req.body, { new: true });
    if (!info_noticia) res.status(404).json({ message: 'Error updating the news' });
    else res.status(200).json({ info_noticia });
  } catch (error) {
    res.status(500).json({ message: error.mensaje });
  }
}

async function ListNoticia(req, res) {
  try {
    var info_noticia = await NewsModel.find({});
    if (!info_noticia) res.status(404).json({ message: 'Error displaying news' });
    else res.status(200).json({ info_noticia });
  } catch (error) {
    res.status(500).json({ message: error.mensaje });
  }
}

async function DeleteNoticia(req, res) {
  var idNoticia = { _id: req.params.id };
  try {
    var requestDeleteNoticia = await NewsModel.findByIdAndRemove(idNoticia);
    if (!requestDeleteNoticia) res.status(404).json({ message: 'Failed to delete News' });
    else res.status(200).json({ requestDeleteNoticia });
  } catch (error) {
    res.status(500).json({ message: error.mensaje });
  }
}

module.exports = {
  CreateNoticia, UpdateNoticia,
  ListNoticia, DeleteNoticia
}
