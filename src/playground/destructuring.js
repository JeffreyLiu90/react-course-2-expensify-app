//-------------------------Object Destructuring-------------------

// console.log("hello");

// const person = {
//   age: 28,
//   location: {
//     city: "Toronto",
//     temperature: 12
//   }
// };

// const { name = "Jack", age, location } = person;

// const { city, temperature: temp } = location;

// console.log(`My name is ${name}`);

// const book = {
//   title: "Ego is the enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     // name: "Penguin"
//   }
// };

// const { title, author, publisher } = book;
// const { name: publisherName = "Self-Published " } = publisher;

// console.log(publisherName);

//-------------------------Array Destructuring-------------------

// const address = ["8110 Birchmount Rd", "Toronto", "Ontario", "L6G 0E3"];

// const [, city, province = "New York"] = address;

// console.log(`You are in ${province}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [coffee, priceS, priceM, priceL] = item;

console.log(`A Medium ${coffee} costs ${priceM}`);
