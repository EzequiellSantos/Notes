const mongoose = require('mongoose');

// Define o esquema para a nota
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true }); // Adiciona campos de criação e atualização automaticamente

// Cria o modelo com base no esquema
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;