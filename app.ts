//Define Fruit Object type with required properties like id, name, image, unit and price
class Fruit {
    private _id: string;
    private _name: string;
    private _image: string;
    private _unit: string;
    private _price: number;

    constructor(id: string, name: string, image: string, unit: string, price: number) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._unit = unit;
        this._price = price;
    }

    // Getter methods
    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get image(): string { return this._image; }
    get unit(): string { return this._unit; }
    get price(): number { return this._price; }
}

// Note:As per test requirement, Fruits API should be running on port 3000
function getFruits() {
    //Return the promise returned by the fetch() method
    //Successful promise callback function should convert the response body text to json object and return the promise as result.
    const getPromise = fetch('http://localhost:3000/fruits/')
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
    return getPromise
        .then(response => {
            transform(response)
        })

    //Returned successful promise callback should call `transform()` method by passing the json object as argument
}

//Inside transform() function, iterate the json data passed as parameter.
//Then transform each fruit to transformedFruit object that mirrors Fruit type 
function transform(fruits: Fruit[]) {
    //call showFruit() function for each transformedFruit object
    for (const fruit of fruits) {
        const transformedFruit = new Fruit(fruit.id, fruit.name, fruit.image, fruit.unit, fruit.price)
        showFruit(transformedFruit)
    }
}

//Inside showFruit() function, pass transformedFruit object as parameter
function showFruit(transformedFruit: Fruit) {

    const fruitsContainer = document.getElementById("fruits-container")

    const fruitCard = document.createElement('div');
    fruitCard.classList.add('fruit-box');
    const imgBox = document.createElement('div');
    imgBox.classList.add('img-box');
    const fruitImage = document.createElement('img');
    fruitImage.setAttribute('src', transformedFruit.image)
    const textArea = document.createElement('div');
    const cardTitle = document.createElement('h2');
    const cardDescription = document.createElement('p')


    cardTitle.textContent = transformedFruit.name;
    cardDescription.textContent = `Price: $ ${transformedFruit.price} per ${transformedFruit.unit}`;

    textArea.appendChild(cardTitle)
    textArea.appendChild(cardDescription)

    imgBox.appendChild(fruitImage)

    fruitCard.appendChild(imgBox)
    fruitCard.appendChild(textArea)

    //display each transformedFruit as card by creating HTML code as string and 
    //appending it to the div container
    if (fruitsContainer){
        fruitsContainer.appendChild(fruitCard);
    }
}

//compiler error for "module" will be resolved once node_modules folder is generated by giving 'npm install' command in the terminal
// do not delete the code given below, it is written to export the functions to be tested

module.exports = {
    getFruits
}
