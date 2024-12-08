// Importations et configuration
const mongoose = require('mongoose');
require('dotenv').config();

// Connexion à MongoDB avec votre URI
mongoose.connect('mongodb+srv://malick0206:seck0206@cluster0.26y72.mongodb.net/testdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Définition du schéma et modèle Person
const personSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ID personnalisé
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

// Créer et sauvegarder une personne avec un _id personnalisé
const createAndSavePerson = () => {
  const person = new Person({
    _id: 'custom_id_001',
    name: 'Alice',
    age: 25,
    favoriteFoods: ['Pizza', 'Pasta'],
  });

  person.save((err, data) => {
    if (err) console.error(err);
    else console.log('Personne sauvegardée :', data);
  });
};

// Créer plusieurs personnes avec des _id personnalisés
const createManyPeople = (arrayOfPeople) => {
  const peopleWithIds = arrayOfPeople.map((person, index) => ({
    ...person,
    _id: `custom_id_${index + 1}`, // Ajout d'un ID unique pour chaque document
  }));

  Person.create(peopleWithIds, (err, data) => {
    if (err) console.error(err);
    else console.log('Personnes ajoutées :', data);
  });
};

// Rechercher des personnes par nom
const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) console.error(err);
    else console.log('Personnes trouvées :', data);
  });
};

// Rechercher une personne par aliment préféré
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) console.error(err);
    else console.log('Personne trouvée :', data);
  });
};

// Rechercher une personne par ID
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) console.error(err);
    else console.log('Personne trouvée par ID :', data);
  });
};

// Ajouter un aliment et sauvegarder
const updatePersonFoods = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    else {
      person.favoriteFoods.push('Hamburger');
      person.save((err, updatedPerson) => {
        if (err) console.error(err);
        else console.log('Personne mise à jour :', updatedPerson);
      });
    }
  });
};

// Mettre à jour l'âge d'une personne par nom
const updateAgeByName = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) console.error(err);
      else console.log('Personne mise à jour :', data);
    }
  );
};

// Supprimer une personne par ID
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) console.error(err);
    else console.log('Personne supprimée :', data);
  });
};

// Supprimer plusieurs personnes par nom
const removeManyPeople = (name) => {
  Person.deleteMany({ name }, (err, result) => {
    if (err) console.error(err);
    else console.log('Résultat suppression :', result);
  });
};

// Rechercher des personnes avec des helpers
const queryChain = () => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) console.error(err);
      else console.log('Résultats filtrés :', data);
    });
};

// Exemple d'exécution
// createAndSavePerson();

const people = [
  { name: 'John', age: 30, favoriteFoods: ['Burgers', 'Salads'] },
  { name: 'Mary', age: 22, favoriteFoods: ['Sushi', 'Burritos'] },
  { name: 'Sam', age: 28, favoriteFoods: ['Steak', 'Fries'] },
];
createManyPeople(people);

// findPeopleByName('John');
// findOneByFood('Sushi');
// findPersonById('custom_id_001'); // Utilisation de l'ID personnalisé
// updatePersonFoods('custom_id_001');
// updateAgeByName('John');
// removeById('custom_id_001');
// removeManyPeople('Mary');
// queryChain();
