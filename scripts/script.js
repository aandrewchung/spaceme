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
    const transition = "width 1s cubic-bezier(.42,.11,.93,.33)";

    // Set the width of the generative bars to the right boundary with a transition
    generativeBarLeft.style.transition = transition;
    generativeBarLeft.style.width = boundary;

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

function handleEnterKey() {
    editGenerativeBars();

    // Remove the textarea element and image as before
    const textareaContainer = document.querySelector(".textarea-container");
    const textarea = document.querySelector("textarea");
    const image = document.querySelector(".right-image");
    // textareaContainer.removeChild(textarea);
    // textareaContainer.removeChild(image);

    // Adjust the styles of the circle container DOES THIS DO ANYTHING?
    const circleContainer = document.querySelector(".circle-container");
    circleContainer.style.padding = "0"; // Remove vertical padding

    // Disable further Enter key presses by removing the event listener
    textarea.removeEventListener("keydown", handleEnterKey);
}
