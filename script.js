const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data

const cardsData = getCardsData();

const cardsDataInit = [
    {
        question: 'What is JavaScript?',
        answer: 'JavaScript is a client-side as well as server side scripting language that can be inserted into HTML pages and is understood by web browsers. JavaScript is also an Object based Programming language'
    },
    {
        question: 'What are the two basic groups of dataypes in JavaScript?',
        answer: 'Primitive types are number and Boolean data types. Reference types are more complex types like strings and dates.'
    },
    {
        question: 'Why it is not advised to use innerHTML in JavaScript?',
        answer: 'innerHTML content is refreshed every time and thus is slower. There is no scope for validation in innerHTML and, therefore, it is easier to insert rouge code in the document and, thus, make the web page unstable.'
    },
     {
        question: 'What are the various functional components in JavaScript?',
        answer: 'First-class functions: Functions in JavaScript are utilized as first class objects. This usually means that these functions can be passed as arguments to other functions, returned as values from other functions, assigned to variables or can also be stored in data structures.Nested functions: The functions, which are defined inside other functions, are called Nested functions. They are called \'everytime\' the main function is invoked.'
    },
    {
        question: 'What is the data type of variables of in JavaScript?',
        answer: 'All variables in the JavaScript are object data types.'
    },
    {
        question: 'How are DOM utilized in JavaScript?',
        answer: 'DOM stands for Document Object Model and is responsible for how various objects in a document interact with each other. DOM is required for developing web pages, which includes objects like paragraph, links, etc. These objects can be operated to include actions like add or delete. DOM is also required to add extra capabilities to a web page. On top of that, the use of API gives an advantage over other existing models.'
    },
    {
        question: 'What do mean by NULL in Javascript?',
        answer: 'The NULL value is used to represent no value or no object. It implies no object or null string, no valid boolean value, no number and no array object.'
    },
    {
        question: 'What is the function of delete operator?',
        answer: 'The delete keyword is used to delete the property as well as its value.'
    },
    {
        question: 'What are undeclared and undefined variables?',
        answer: 'Undeclared variables are those that do not exist in a program and are not declared. If the program tries to read the value of an undeclared variable, then a runtime error is encountered.Undefined variables are those that are declared in the program but have not been given any value. If the program tries to read the value of an undefined variable, an undefined value is returned.'
    },
    {
        question: 'Which company developed JavaScript',
        answer: 'Netscape is the software company who developed JavaScript.'
    },
];

// Create all cards
function createCards(){
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create initial data
function createInitCards() {
    cardsDataInit.forEach(element => cardsData.push(element));
}

// Create a single card in DOM
function createCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0){
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>
            ${data.question}
        </p>
    </div>
    <div class="inner-card-back">
        <p>
            ${data.answer}
        </p>
    </div>
    </div>
    `;

    card.addEventListener('click', () =>
        card.classList.toggle('show-answer')
    );
    // Add to DOM cards 
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();

}

// Show number of cards
function updateCurrentText(){
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// Set initial data
if(localStorage.getItem('init') === null){
    localStorage.setItem('init',JSON.stringify(1)); 
}else {
    localStorage.setItem('init',JSON.stringify(0)); 
};
let init = JSON.parse(localStorage.getItem('init'));
if (init === 1) {
    createInitCards();
    setCardsData(cardsData);
}

// Set data to DOM
createCards();


// Event listeners
// Next Button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard++;

    if(currentActiveCard > cardsEl.length - 1){
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();

});

//Previous Button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard--;

    if(currentActiveCard < 0){
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();

});

// Show add container 
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container 
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click',() => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if(question.trim() && answer.trim()){
        const newCard = {
            question,
            answer
        };
        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);

    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cards');
    cardsContainer.innerHTML = '';
    window.location.reload();
});