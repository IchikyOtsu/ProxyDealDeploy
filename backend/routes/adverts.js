const express = require('express');
const router = express.Router();

// Données mises à jour avec des informations supplémentaires
const adverts = [
    { 
        id: 1, 
        title: "Advert 1 Title", 
        message: "Advert 1 Message",
        location: "Location 1",
        time: "14h",
        duration: "2 hours",
        date: "2023-04-01"
    },
    { 
        id: 2, 
        title: "Advert 2 Title", 
        message: "Advert 2 Message",
        location: "Location 2",
        time: "16h",
        duration: "1 hour",
        date: "2023-04-02"
    },
    { 
        id: 3, 
        title: "Advert 3 Title", 
        message: "Advert 3 Message",
        location: "Location 3",
        time: "10h",
        duration: "3 hours",
        date: "2023-04-03"
    },
];

// GET route for fetching all adverts
router.get('/', (req, res) => {
    // Envoie des données mises à jour
    res.json(adverts);
});

// GET route for fetching a single advert by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const advert = adverts.find(ad => ad.id.toString() === id);
    if (advert) {
        // Envoie des données complètes pour une annonce spécifique
        res.json(advert);
    } else {
        res.status(404).send('Advert not found');
    }
});

module.exports = router;
