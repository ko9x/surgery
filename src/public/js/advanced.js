const addRanges = document.querySelectorAll(".rangeButton");

// This was only used for adding the High Voltage Cable item
// Loop through all the addRange buttons and assign the click listener that will run the addRangeField function
for(var i = 0; i < addRanges.length; i++) {
    addRanges[i].addEventListener("click", (e) => {
      addRangeField(e.target.value);
    });
  };

  // This function was created for adding the High Voltage Cable item. No other items should have overlap
function verifyOverlapOrder(controlString, checkString, config) {
    let controlConfig = controlString.slice(0, 6).toUpperCase();
    let checkConfig = checkString.slice(0, 6).toUpperCase();
    let controlSequence = controlString.slice(-5);
    let checkSequence = checkString.slice(-5);
    let errorText = "Please ensure shorter overlap ranges are entered first";

    if (controlConfig.charAt(4) === "X" && checkConfig.charAt(4) === "T") {
        removeErrorState(config);
        return true;
    }
    if (controlConfig.charAt(4) === "T" && checkConfig.charAt(4) === "X") {
        addErrorState(config, errorText);
        return false;
    }
    if (controlConfig.charAt(4) === checkConfig.charAt(4)) {
        if (controlSequence < checkSequence) {
            removeErrorState(config);
            return true;
        }
        if (controlSequence === checkSequence) {
            addErrorState(config, "Please remove any duplicated ranges");
            return false;
        }
        if (controlSequence > checkSequence) {
            addErrorState(config, errorText);
            return false;
        }
    }
}

// Add another range to the form that is styled correctly and in the correct location
// This was only used to add the High Voltage Cable.
function addRangeField(rangeField) {
    // The id from the button is passed in so we know where to add the new range field
    const rangeSection = document.getElementById(`${rangeField}`);

    // We use this to match the id of the exceptionSection and button
    const rangeSectionIndex = rangeSection.children.length;

    // We use this to match the id of the exceptionSection and button
    const rangeConfigChars = rangeField.substr(rangeField.length - 4);

    // Find the correct regex pattern to validate the inputs
    const configPattern = findPatternByConfig(rangeConfigChars);

    // Then we create the element to add to the DOM
    // Create rangeContainer
    var rangeContainer = document.createElement("div");
    rangeContainer.classList.add("rangeContainer");
    rangeContainer.setAttribute("name", rangeConfigChars);

    // Create a container for the rangeRemoveButton
    var rangeRemoveButtonContainer = document.createElement("div");
    rangeRemoveButtonContainer.classList.add("removeRangeCardButtonContainer");

    // Create a button for the user to remove the added range card
    var rangeRemoveButton = document.createElement("button");
    rangeRemoveButton.setAttribute("type", "button");
    rangeRemoveButton.innerHTML = "X";
    rangeRemoveButton.classList.add("removeRangeCardButton");

    // Append the rangeRemoveButton to its container
    rangeRemoveButtonContainer.appendChild(rangeRemoveButton);

    // Create rangeInputContainer which contains the divs that hold the input/label
    var rangeInputContainer = document.createElement("div");
    rangeInputContainer.classList.add("rangeInputContainer");

    // Create rangeInputStart which is the div that wraps the input and the label
    var rangeInputStart = document.createElement("div");
    rangeInputStart.classList.add("rangeInput");

    // Create the rangeInputStartsAtLabel
    var rangeInputStartsAtLabel = document.createElement("label");
    rangeInputStartsAtLabel.innerHTML = "Starts at";
    rangeInputStartsAtLabel.classList.add("rangeLabel");

    // Create the rangeInputStartsAt input
    var rangeInputStartsAt = document.createElement("input");
    rangeInputStartsAt.setAttribute("type", "text");
    rangeInputStartsAt.setAttribute("name", "starts_at");
    rangeInputStartsAt.setAttribute("id", "starts_at");
    rangeInputStartsAt.setAttribute("placeholder", rangeConfigChars);
    rangeInputStartsAt.setAttribute("required", true);
    rangeInputStartsAt.setAttribute("pattern", configPattern);
    rangeInputStartsAt.setAttribute(
        "title",
        `Valid serial starting with ${rangeConfigChars}`
    );

    // Append the rangeInputStart elements
    rangeInputStart.appendChild(rangeInputStartsAtLabel);
    rangeInputStart.appendChild(rangeInputStartsAt);

    // Create rangeInputEnd which is the div that wraps the input and label
    var rangeInputEnd = document.createElement("div");
    rangeInputEnd.classList.add("rangeInput");

    // Create the rangeInputEndsLabel
    var rangeInputEndsAtLabel = document.createElement("label");
    rangeInputEndsAtLabel.innerHTML = "Ends at";
    rangeInputEndsAtLabel.classList.add("rangeLabel");

    // Create the rangeInputEndsAt input
    var rangeInputEndsAt = document.createElement("input");
    rangeInputEndsAt.setAttribute("type", "text");
    rangeInputEndsAt.setAttribute("name", "ends_at");
    rangeInputEndsAt.setAttribute("id", "ends_at");
    rangeInputEndsAt.setAttribute("placeholder", rangeConfigChars);
    rangeInputEndsAt.setAttribute("required", true);
    rangeInputEndsAt.setAttribute("pattern", configPattern);
    rangeInputEndsAt.setAttribute(
        "title",
        `Valid serial starting with ${rangeConfigChars}`
    );

    // Append the rangeInputEnd elements
    rangeInputEnd.appendChild(rangeInputEndsAtLabel);
    rangeInputEnd.appendChild(rangeInputEndsAt);

    // Append the rangeInputStart and rangeInputEnd to rangeInputContainer
    rangeInputContainer.appendChild(rangeInputStart);
    rangeInputContainer.appendChild(rangeInputEnd);

    // Create the exceptionSection. This is where the input for adding exception serial numbers will display
    var exceptionSection = document.createElement("div");
    exceptionSection.setAttribute(
        "id",
        `exceptionSection${rangeSectionIndex}${rangeConfigChars}`
    );

    // Create the exceptionButton which will display an input for the user to enter an exception serial number
    var exceptionButton = document.createElement("button");
    exceptionButton.setAttribute("type", "button");
    exceptionButton.setAttribute(
        "id",
        `exceptionSection${rangeSectionIndex}${rangeConfigChars}`
    );
    exceptionButton.setAttribute(
        "title",
        "An exception is a serial number outside the set range where the Display description still applies"
    );
    exceptionButton.classList.add("exceptionButton");
    exceptionButton.innerHTML = "Add exception";
    exceptionButton.onclick = (e) => addExceptionField(e.target.id);

    // Create the rangeTextAreaContainer which is the div that contains the rangeTextArea element and label
    var rangeTextAreaContainer = document.createElement("div");
    rangeTextAreaContainer.classList.add("rangeTextAreaContainer");

    // Create the rangeInputStartsAtLabel
    var rangeTextAreaLabel = document.createElement("label");
    rangeTextAreaLabel.innerHTML = "Display";
    rangeTextAreaLabel.classList.add("rangeLabel");

    // Create the rangeTextArea element
    var rangeTextArea = document.createElement("textarea");
    rangeTextArea.classList.add("rangeTextArea");
    rangeTextArea.setAttribute("name", "display");
    rangeTextArea.setAttribute("id", "display");
    rangeTextArea.setAttribute("required", true);
    rangeTextArea.setAttribute("minlength", "7");
    rangeTextArea.setAttribute(
        "placeholder",
        "Enter the description the user will see for this serial number range."
    );

    // Append the rangeTextArea and label to the rangeTextAreaContainer
    rangeTextAreaContainer.appendChild(rangeTextAreaLabel);
    rangeTextAreaContainer.appendChild(rangeTextArea);

    // Append the containers to the rangeContainer
    rangeInputContainer.appendChild(rangeRemoveButtonContainer);
    rangeContainer.appendChild(rangeInputContainer);
    rangeContainer.appendChild(exceptionSection);
    rangeContainer.appendChild(exceptionButton);
    rangeContainer.appendChild(rangeTextAreaContainer);

    // Append the rangeContainer to the hard coded rangeSection div in the HTML
    rangeSection.insertBefore(rangeContainer, rangeSection.childNodes[2]);

    // Append the onclick function to the button after all other appends are done so the parent and child elements exist
    rangeRemoveButton.onclick = () =>
        removeChildInstanceFromParentInstance(rangeSection, rangeContainer);
}