const textarea = document.querySelector("textarea");
const image = document.querySelector(".right-image");

textarea.addEventListener("input", function(e) {
    textarea.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;

    if (textarea.value === "") {
        image.src = "../images/icons/icon4.png"; // Change image to grey
    } else {
        image.src = "../images/icons/icon3.png"; // Change image to black
    }
});


textarea.addEventListener("keydown", function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent the default Enter key behavior
        handleEnterKey(); // Call your custom function
    }
});


let enterKeyEnabled = true; // Add a flag to track whether Enter key is enabled

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function editGenerativeBars() {
    // Get references to the generative bars
    const generativeBarLeft = document.querySelector(".generative-bar-left");
    const generativeBarRight = document.querySelector(".generative-bar-right");
    const generativeBarMiddleLeft = document.querySelector(".generative-bar-middle-left");
    const generativeBarMiddleRight = document.querySelector(".generative-bar-middle-right");

    // Calculate the boundary of the text wrapper (wrapper length minus 50px)
    const textWrapper = document.querySelector(".textarea-container");
    const boundary = (textWrapper.clientWidth - 50) / 4 + 20 + "px";
    const transition = "width 2.4s cubic-bezier(.31,2.05,.94,-1.44)";
    // const transition = "width 1s linear";

    // Set the width of the generative bars to the right boundary with a transition
    generativeBarLeft.style.transition = transition;
    generativeBarLeft.style.width = boundary;
    generativeBarLeft.style.left = "10px"; // Start from the right with a 10px offset

    generativeBarRight.style.transition = transition;
    generativeBarRight.style.width = boundary;
    generativeBarRight.style.right = "0";

    // Set the width of the generative middle bars to the right boundary with a transition
    generativeBarMiddleLeft.style.transition = transition;
    generativeBarMiddleLeft.style.width = boundary;

    generativeBarMiddleRight.style.transition = transition;
    generativeBarMiddleRight.style.width = boundary;
    generativeBarMiddleRight.style.right = "0"; // Start from the center
}

function shrinkTextarea() {
    const textarea = document.querySelector("textarea");
    const story = textarea.value;

    // Reduce the height by 10 pixels
    const currentHeight = textarea.clientHeight;
    const cutHeight = currentHeight - 20;
    textarea.style.height = 0 + "px";

    // Remove the top and bottom padding
    textarea.style.paddingTop = "0";
    textarea.style.paddingBottom = "0";

    // Set the border width to 0 to make the border disappear
    textarea.style.borderWidth = "0";


    // Remove the placeholder value
    textarea.removeAttribute("placeholder");

    // Add a CSS transition to smoothly animate the height change
    const cubicBezier = "cubic-bezier(.31,2.05,.94,-1.44)";
    textarea.style.transition = `height 2.4s ${cubicBezier}, padding-top 2.4s ${cubicBezier}, padding-bottom 2.4s ${cubicBezier}`;
    
    // Remove the image icon
    const image = document.querySelector(".right-image");
    if (image) {
        image.remove();
    }

    // Remove the text in the textarea
    textarea.value = "";
    return story;
}

async function dotBars() {
    const textWrapper = document.querySelector(".textarea-container");
    const amount = (textWrapper.clientWidth - 50) / 4 - 93.36 + 681.11;
    console.log(amount);
    const boundary = amount + "px";
    const transition = "width 5s cubic-bezier(.31,2.05,.94,-1.44)";


    const generativeBar = document.querySelector(".blue-bar-1");
    generativeBar.style.transition = transition;
    generativeBar.style.width = boundary;
    generativeBar.style.left = "10px"; // Start from the right with a 10px offset


    // Wait for the transition of the current bar to complete
    await new Promise((resolve) => {
    generativeBar.addEventListener("transitionend", resolve);
});

}

let animationInProgress = false; // Initialize the flag

async function handleEnterKey() {
    if (!enterKeyEnabled || animationInProgress) {
        return; // Exit the function if Enter key is not enabled or animation is in progress
    }

    enterKeyEnabled = false; // Disable Enter key
    animationInProgress = true; // Set the animation flag

    editGenerativeBars();
    const story = shrinkTextarea();

    // Disable the textarea to prevent further keyboard input
    const textarea = document.querySelector("textarea");
    textarea.disabled = true;

    // Add a delay before calling combineBarsTextArea
    await delay(2400); // Adjust the delay (in milliseconds) as needed

    // Hide the circle container
    const circleContainer = document.querySelector(".circle-container");
    circleContainer.style.display = "none";

    // Complete the animation, if any, and remove the flag
    animationInProgress = false;

    // Move the red-circle-container above the other circle container within the wrapper
    const redCircleContainer = document.querySelector(".red-circle-container");
    redCircleContainer.style.visibility = "visible";

    const wrapper = document.querySelector(".wrapper");
    const otherCircleContainer = document.querySelector(".circle-container");
    
    // Insert redCircleContainer before otherCircleContainer
    wrapper.insertBefore(redCircleContainer, otherCircleContainer);

    await dotBars();

    await delay(250);
    // window.location.href = 'comic.html';
}


// script.js
// export const myValue = "Hello from script.js!";
