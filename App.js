import express, { json } from "express";
const app = express();
const PORT = 3000;

app.use(json());

// In-memory card collection
let cards = [
    { id: 1, suit: "Hearts", value: "A" },  
    { id: 2, suit: "Spades", value: "K" },
    { id: 3, suit: "Diamonds", value: "10" },
    { id: 4, suit: "Clubs", value: "7" },
];

// RESTful Routes
app.get("/cards", (req, res) => {
    const { suit, value } = req.query;
    let result = cards;

    if (suit) result = result.filter(c => c.suit.toLowerCase() === suit.toLowerCase());
    if (value) result = result.filter(c => c.value.toLowerCase() === value.toLowerCase());

    res.json(result);
});

app.get("/cards/:id", (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
});

app.post("/cards", (req, res) => {
    const { suit, value } = req.body;
    if (!suit || !value) return res.status(400).json({ message: "Suit and value required" });

    const newCard = { id: cards.length + 1, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

app.put("/cards/:id", (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (!card) return res.status(404).json({ message: "Card not found" });

    card.suit = req.body.suit || card.suit;
    card.value = req.body.value || card.value;
    res.json(card);
});

app.delete("/cards/:id", (req, res) => {
    const index = cards.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Card not found" });

    const removed = cards.splice(index, 1);
    res.json({ message: "Deleted", removed });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
