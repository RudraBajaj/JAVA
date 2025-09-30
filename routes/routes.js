import express from 'express';
import { cards } from '../data/cards.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(cards);
});

router.get('/:id', (req, res) => {
  const cardId = parseInt(req.params.id); 
  const card = cards.find(c => c.id === cardId);

  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});


router.post('/', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ message: 'Suit and Value are required' });
  }

  const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;
  const newCard = { id: newId, suit, value };
  cards.push(newCard);

  res.status(201).json({ message: 'Card added', card: newCard });
});


router.delete('/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === cardId);

  if (index > -1) {
    const removed = cards.splice(index, 1);
    res.json({ message: 'Card removed', card: removed[0] });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

export default router;
