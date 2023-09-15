const textarea = document.querySelector("textarea");
const image = document.querySelector(".right-image");

textarea.addEventListener("input", function(e) {
    textarea.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;

    if (textarea.value === "") {
        image.src = "../images/icon2.png"; // Change image to grey
    } else {
        image.src = "../images/icon1.png"; // Change image to black
    }
});

textarea.addEventListener("keydown", function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent the default Enter key behavior
        handleEnterKey(); // Call your custom function
    }
});

function editGenerativeBars() {
    // Get references to the generative bars
    const generativeBarLeft = document.querySelector(".generative-bar-left");
    const generativeBarRight = document.querySelector(".generative-bar-right");
    const generativeBarMiddleLeft = document.querySelector(".generative-bar-middle-left");
    const generativeBarMiddleRight = document.querySelector(".generative-bar-middle-right");

    // Calculate the boundary of the text wrapper (wrapper length minus 50px)
    const textWrapper = document.querySelector(".textarea-container");
    const boundary = (textWrapper.clientWidth - 50) / 4 + 10 + "px";
    const transition = "width 1.25s cubic-bezier(.42,.11,.93,.33)";
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

    // Reduce the padding on both left and right sides by 25 pixels
    const currentPaddingLeft = parseInt(getComputedStyle(textarea).paddingLeft, 10);
    const currentPaddingRight = parseInt(getComputedStyle(textarea).paddingRight, 10);
    
    // Reduce the height by 10 pixels
    const currentHeight = textarea.clientHeight;
    textarea.style.paddingLeft = currentPaddingLeft - 25 + "px";
    textarea.style.paddingRight = currentPaddingRight - 25 + "px";
    textarea.style.height = currentHeight - 30 + "px";

    // Add a CSS transition to smoothly animate the padding and height change
    textarea.style.transition = "padding-left 1s, padding-right 1s, height 1s"; // Adjust the duration as needed
}




let enterKeyEnabled = true; // Add a flag to track whether Enter key is enabled

function handleEnterKey() {
    if (!enterKeyEnabled) {
        return; // Exit the function if Enter key is not enabled
    }

    enterKeyEnabled = false; // Disable Enter key

    editGenerativeBars();
    // shrinkTextarea();

    // Remove the textarea element and image as before
    const textareaContainer = document.querySelector(".textarea-container");
    const textarea = document.querySelector("textarea");
    const image = document.querySelector(".right-image");

    // Adjust the styles of the circle container DOES THIS DO ANYTHING?
    const circleContainer = document.querySelector(".circle-container");
    circleContainer.style.padding = "0"; // Remove vertical padding

    // Disable further Enter key presses by removing the event listener
    textarea.removeEventListener("keydown", handleEnterKey);
}
