// --------------------------------------
// RANDOM QUOTE GENERATOR
// --------------------------------------


// Array containing quote objects

const quotes = [

    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        text: "Success is not final; failure is not fatal.",
        author: "Winston Churchill"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },

    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt"
    },

    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        text: "Your limitation is only your imagination.",
        author: "Unknown"
    },

    {
        text: "Push yourself, because no one else is going to do it for you.",
        author: "Unknown"
    },

    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown"
    },

    {
        text: "A little progress each day adds up to big results.",
        author: "Unknown"
    }

];


// Get HTML elements

const quoteElement =
    document.getElementById("quote");

const authorElement =
    document.getElementById("author");

const newQuoteButton =
    document.getElementById("newQuoteButton");

const shareButton =
    document.getElementById("shareButton");

const messageElement =
    document.getElementById("message");


// Store previous quote index

let previousIndex = -1;


// Function to generate random index

function getRandomIndex() {

    let randomIndex;

    do {

        randomIndex =
            Math.floor(
                Math.random() *
                quotes.length
            );

    }

    while (
        randomIndex === previousIndex
    );

    return randomIndex;
}


// Function to display quote

function generateQuote() {

    const randomIndex =
        getRandomIndex();


    const selectedQuote =
        quotes[randomIndex];


    quoteElement.textContent =
        `"${selectedQuote.text}"`;


    authorElement.textContent =
        `— ${selectedQuote.author}`;


    previousIndex =
        randomIndex;


    messageElement.textContent =
        "New quote generated!";
}


// Share quote

async function shareQuote() {

    const quote =
        quotes[previousIndex];


    const shareText =
        `"${quote.text}" — ${quote.author}`;


    try {

        // Check Web Share API

        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                    "Random Quote",

                text:
                    shareText

            });


            messageElement.textContent =
                "Quote shared successfully.";

        }

        else {

            // Copy to clipboard

            await navigator.clipboard.writeText(
                shareText
            );


            messageElement.textContent =
                "Quote copied to clipboard.";

        }

    }

    catch (error) {

        if (
            error.name !==
            "AbortError"
        ) {

            messageElement.textContent =
                "Unable to share the quote.";

        }

    }

}


// Button events

newQuoteButton.addEventListener(
    "click",
    generateQuote
);


shareButton.addEventListener(
    "click",
    shareQuote
);


// Display first quote automatically

generateQuote();