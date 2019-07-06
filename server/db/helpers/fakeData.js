var faker = require('faker');


var generateNames = () => {
    let names = []
    for(let i = 0; i < 20; i++) {
        names.push(faker.name.findName())
    };
    console.log(names);
}



// var caption = faker.lorem.sentence(); 

// console.log(caption);