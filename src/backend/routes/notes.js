const Router = require('express').Router;
const Note = require('../models/notes'); // Importa o modelo Note

const router = Router();

// Rota para obter detalhes de uma nota
router.get('/notes', async (req, res) => {
    try {
      const note = await Note.find({});
  
      if (!note) {
        return res.status(404).json({ error: 'Sem notas registradas' });
      }
  
      res.json(note);
    } catch (error) {
      console.error('Erro ao buscar nota:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

// Rota para obter detalhes de uma nota
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Nota não encontrada' });
    }

    res.json(note);
  } catch (error) {
    console.error('Erro ao buscar nota:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar uma nova nota
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
    }

    const note = new Note({ title, description });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    console.error('Erro ao criar nota:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para editar uma nota
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true } // Retorna o documento atualizado e valida os campos
    );

    if (!note) {
      return res.status(404).json({ error: 'Nota não encontrada' });
    }

    res.json(note);
  } catch (error) {
    console.error('Erro ao atualizar nota:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para deletar uma nota
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Nota não encontrada' });
    }

    res.json({ message: 'Nota removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover nota:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
