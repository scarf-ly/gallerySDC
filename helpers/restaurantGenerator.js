const faker = require('faker');

//Code that generates random, techie sounding restaurant names to use across the app. 

const makeRestaurantName = () => {
    const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen', 'Sushi'];
    const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar']; 
    let adjective = faker.hacker.adjective()
    adjective = adjective[0].toUpperCase() + adjective.slice(1); 
    return adjective + ' ' + foodTypes[Math.floor(Math.random() * foodTypes.length)] + ' ' + foodPlaces[Math.floor(Math.random() * foodPlaces.length)]
};