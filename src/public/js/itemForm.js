import { storeItem } from "./APIService.js";
import { isSmall, configs } from "./common.js";

const container = document.getElementById("container");
const formSection = document.getElementById("formSection");
const itemForm = document.getElementById("itemForm");
const collapseSection = document.querySelectorAll(".sectionTitleButton");
const preCutInButton = document.querySelectorAll(".preCutInButton");
const preCutInClearButton = document.querySelectorAll(".preCutInClearButton");
const postCutInButton = document.querySelectorAll(".postCutInButton");
const postCutInClearButton = document.querySelectorAll(".postCutInClearButton");
const addExceptions = document.querySelectorAll(".exceptionButton");
const watchEndsAt = document.querySelectorAll(".ends_at");
const watchStartsAt = document.querySelectorAll(".starts_at");

const addRanges = document.querySelectorAll(".rangeButton");

//  Event Listeners Section **************************************************************

// Loop through all the addRange buttons and assign the click listener that will run the addRangeField function
for(var i = 0; i < addRanges.length; i++) {
    addRanges[i].addEventListener("click", (e) => {
      addRangeField(e.target.value);
    });
  };

// Loop over all the ends_at inputs and add an eventListener
for (var i = 0; i < watchEndsAt.length; i++) {
    watchEndsAt[i].addEventListener("keyup", (e) => {
        findAndFillSiblingInput(e.target, "end");
    });
}

// Loop over all the starts_at inputs and add an eventListener
for (var i = 0; i < watchStartsAt.length; i++) {
    watchStartsAt[i].addEventListener("keyup", (e) => {
        findAndFillSiblingInput(e.target, "start");
    });
}

// Set the description for all the pre cut-in descriptions
preCutInButton[0].addEventListener("click", (e) => {
    // Pass the controlPrefix "pre"
    setCutInDescription("pre");
});

// Clear the description for all the pre cut-in descriptions
preCutInClearButton[0].addEventListener("click", (e) => {
    // Pass the controlPrefix "pre"
    clearCutInDescription("pre");
});

// Set the description for all the post cut-in descriptions
postCutInButton[0].addEventListener("click", (e) => {
    // Pass the controlPrefix "post"
    setCutInDescription("post");
});

// Clear the description for the post cut-in descriptions
postCutInClearButton[0].addEventListener("click", (e) => {
    // Pass the controlPrefix "post"
    clearCutInDescription("post");
});

// Loop through all the sectionTitles and assign the click listener that will run the collapseSection function
for (var i = 0; i < collapseSection.length; i++) {
    collapseSection[i].addEventListener("click", (e) => {
        userCollapseSection(e.target.id);
    });
}

// Loop through all the addException buttons and assign the click listener that will run the addExceptionField function
for (var i = 0; i < addExceptions.length; i++) {
    addExceptions[i].addEventListener("click", (e) => {
        addExceptionField(e.target.value);
        // Loop over all the starts_at inputs and add an eventListener
        const watchExceptions = document.querySelectorAll(".exception");
        for (var i = 0; i < watchExceptions.length; i++) {
            watchExceptions[i].addEventListener("keyup", (e) => {
                verifyExceptionOutOfRange(e.target);
            });
        }
    });
}

// Check to see if the user click the "Submit" button
itemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let itemObj = {};
    let ranges = [];
    let exceptions = [];

    let itemInfo = document
        .getElementById("itemInfo")
        .getElementsByTagName("input");

    itemObj = {
        name: itemInfo[1].value,
        creator: itemInfo[0].value,
    };

    // Loop through each element that has a class name which matches one of the config codes
    for (var config of configs) {
        let itemRanges = document.getElementsByClassName(config.code);

        // Group each range and create an object to pass to the ranges array
        for (var range of itemRanges) {
            var rangeInputs = range.getElementsByTagName("input");
            var rangeTextarea = range.getElementsByTagName("textarea")[0].value;

            let rangeObj = {
                name: config.code,
                starts_at: rangeInputs[0].value.toUpperCase(),
                ends_at: rangeInputs[1].value.toUpperCase(),
                details: rangeTextarea,
            };
            ranges.push(rangeObj);

            // We reference the exception by ClassName because the ById and ByName methods only exist on the document object
            // The getElementsByClassName method exists on all HTML elements
            var exceptionInputs = range.getElementsByClassName("exception");

            // Group each exception with the corresponding range information and add the object to the exceptions array
            for (var exceptionInput of exceptionInputs) {
                let exceptionObj = {
                    name: config.code,
                    serial: exceptionInput.value.toUpperCase(),
                    details: rangeTextarea,
                };
                exceptions.push(exceptionObj);
            }
        }
    }
    // Check to see if the user covered the entire serial range
    checkRangeCoverage(ranges);

    // If checkRangeCoverage stored no errors in the errorArray, check for exception duplicates
    if (errorArray.length < 1) {
        checkExceptionsForDuplicates(exceptions);
    }

    // If checkRangeCoverage and checkExceptionsForDuplicates stored no errors in the errorArray, build the object
    if (errorArray.length < 1) {
        itemObj = {
            ...itemObj,
            ranges: ranges,
            exceptions: exceptions,
        };
    }

    // If the errorArray is empty and the itemObj is not empty, call the APIService function that sends the itemObj to the backend
    if (
        errorArray.length < 1 &&
        Object.getOwnPropertyNames(itemObj).length > 0
    ) {
        console.log("send the object", itemObj); //@DEBUG
        storeItem(itemObj);
    }
});

let counter = 0;
let compareSerial;
let errorArray = [];

function checkRangeCoverage(ranges) {
    let indexCounter = 1;
    // Loop through all the ranges
    for (let i = 0; i < ranges.length - 1; i++) {
        // store the previous range index to be used in case of overlap
        let previousRange = ranges[i - 1];
        // Only compare the ranges if they are the same config
        if (ranges[i].name === ranges[i + 1].name) {
            let config = ranges[i].name;
            // Check for overlap (Used for an outdated cutin range for HV Cables. No cutins should ever have overlap)
            // if (ranges[i].starts_at === ranges[i + 1].starts_at) {
            //     console.log('overlap detected', ); //@DEBUG
            //     while (
            //         ranges[i + indexCounter] &&
            //         ranges[i + indexCounter].name === config
            //     ) {
            //         // Verify the overlapping ranges are in the correct order
            //         if (
            //             verifyOverlapOrder(
            //                 ranges[i].ends_at,
            //                 ranges[i + indexCounter].ends_at,
            //                 config
            //             )
            //         ) {
            //             indexCounter++;
            //         } else {
            //             return;
            //         }
            //     }
            //     // Find the last overLapping range to compare with the previousRange
            //     return checkSerialPlusOne(
            //         previousRange.ends_at,
            //         ranges[i + (indexCounter - 1)].starts_at,
            //         config
            //     );
            // }
            checkSerialPlusOne(
                ranges[i].ends_at,
                ranges[i + 1].starts_at,
                config
            );
        }
    }
}

function checkExceptionsForDuplicates(exceptionArr) {
    const serialNumbers = exceptionArr.map((exception) => exception.serial);
    let hasDuplicate = serialNumbers.some((val, i) => {
        if (serialNumbers.indexOf(val) !== i) {
            let config = val.slice(0, 4).toUpperCase();
            addErrorState(
                config,
                "Please remove any duplicated exception serial numbers"
            );
        } else {
            let config = val.slice(0, 4).toUpperCase();
            removeErrorState(config);
        }
    });
    return hasDuplicate;
}

function addErrorState(config, errorText) {
    let showErrorBorder = document.getElementById(`sectionContainer${config}`);
    let showErrorText = document.getElementById(`errorText${config}`);
    showErrorBorder.classList.add("showError");
    showErrorText.removeAttribute("hidden");
    showErrorText.innerHTML = errorText;
    // Add the config to the errorArray unless it is already in there
    if (errorArray.includes(config)) {
        return;
    } else {
        errorArray.push(config);
    }
}
function removeErrorState(config) {
    let showErrorBorder = document.getElementById(`sectionContainer${config}`);
    let showErrorText = document.getElementById(`errorText${config}`);
    showErrorBorder.classList.remove("showError");
    showErrorText.setAttribute("hidden", "true");
    let configError = errorArray.indexOf(config);
    // Remove the config from the errorArray
    if (configError !== -1) {
        errorArray.splice(0, 1);
    }
    return;
}

function checkSerialPlusOne(controlString, checkString, config) {
    let controlConfig = controlString.slice(0, 6).toUpperCase();
    let checkConfig = checkString.slice(0, 6).toUpperCase();
    let controlSequence = controlString.slice(-5);
    let checkSequence = checkString.slice(-5);
    let errorText = "Please ensure entire serial range is covered";

    // Check if the range break happens at the introduction of the tablet. If so, let the range pass validation.
    if (controlString.charAt(4) === "X" && controlSequence === "99999") {
        if (checkString.charAt(4) === "T" && checkSequence === "00001") {
            return removeErrorState(config);
        }
    }

    // Compare each pair of serial strings
    if (controlConfig === checkConfig) {
        if (Number(checkSequence) === Number(controlSequence) + 1) {
            // If there are no gaps in the sequence remove the error state if necessary
            removeErrorState(config);
        } else {
            // If there are gaps in the sequence add the error state
            addErrorState(config, errorText);
        }
    } else {
        // If the configuration doesn't match add the error state
        addErrorState(config, errorText);
    }
}

// Hide the rangeSection and the addRange button when the user clicks "collapse section"
function userCollapseSection(sectionId) {
    const configChars = sectionId.substr(sectionId.length - 4);
    const collapseSection = document.getElementById(
        `rangesContainer${configChars}`
    );
    const addRangeButton = document.getElementById(`addRangeButton${configChars}`);
    const collapseText = document.getElementById(sectionId);
    if (collapseSection.classList.contains("hideElement")) {
        collapseSection.classList.remove("hideElement");
        addRangeButton.classList.remove('hideElement');
        collapseText.innerHTML = "(collapse section)";
    } else {
        collapseSection.classList.add("hideElement");
        addRangeButton.classList.add('hideElement');
        collapseText.innerHTML = "(show section)";
    }
}

function verifyExceptionOutOfRange(focusedException) {
    console.log('focusedException',focusedException.value); //@DEBUG
}

// Once the user enters a valid serial number in an input, find the sibling and fill it with the start or end of the next range
function findAndFillSiblingInput(focusedInput, atValue) {
    // Don't allow a serial number ending in 00000 because they don't exist.
    if (focusedInput.value.slice(-5) === "00000") {
        alert("A serial number ending in 00000 does not exist.");
        return (focusedInput.value = "");
    }
    const configPattern = new RegExp(focusedInput.pattern);
    const mainContainer = document.getElementById(
        `rangesContainer${focusedInput.placeholder}`
    );
    let greatGreatGrandParent = focusedInput.parentNode.parentNode.parentNode.parentNode;
    let greatGrandParent = focusedInput.parentNode.parentNode.parentNode;
    let childIndex = Array.prototype.indexOf.call(greatGreatGrandParent.children, greatGrandParent);
    const siblingInput =
        mainContainer.children[atValue === "end" ? childIndex + 1 : childIndex - 1].children[0].children[
            atValue === "end" ? 0 : 1
        ].children[1];
    if (
        configPattern.test(focusedInput.value) &&
        focusedInput.value.length === 11
    ) {
        // The pre cut-in range cannot end at TX99999
        if (
            atValue === "end" &&
            (focusedInput.value.slice(-7).toUpperCase() === "TX99999") || (focusedInput.value.slice(-7).toUpperCase() === "TE99999")
        ) {
            alert("The pre cut-in range cannot end at TX99999 or TE99999");
            return (focusedInput.value = "");
        }
        // Non-table 99999 puts tablet 00001 in the sibling input
        if (
            atValue === "end" &&
            focusedInput.value.slice(-7).toUpperCase() === "XX99999"
        ) {
            const config = focusedInput.value.substring(0, 4);
            return (siblingInput.value = `${config}TX00001`);
        }
        if (
            atValue === "end" &&
            focusedInput.value.slice(-7).toUpperCase() === "XE99999"
        ) {
            const config = focusedInput.value.substring(0, 4);
            return (siblingInput.value = `${config}TE00001`);
        }
        // The post cut-in range cannot start at XX00001
        if (
            atValue === "start" &&
            (focusedInput.value.slice(-7).toUpperCase() === "XX00001") || (focusedInput.value.slice(-7).toUpperCase() === "XE00001")
        ) {
            alert("The post cut-in range cannot start with XX00001 or XE00001");
            return (focusedInput.value = "");
        }
        // Tablet 00001 puts non-tablet 99999 in the sibling input
        if (
            atValue === "start" &&
            focusedInput.value.slice(-7).toUpperCase() === "TX00001"
        ) {
            const config = focusedInput.value.substring(0, 4);
            return (siblingInput.value = `${config}XX99999`);
        }
        if (
            atValue === "start" &&
            focusedInput.value.slice(-7).toUpperCase() === "TE00001"
        ) {
            const config = focusedInput.value.substring(0, 4);
            return (siblingInput.value = `${config}XE99999`);
        }
        const config = focusedInput.value.substring(0, 6);
        const sequenceNum = focusedInput.value.slice(-5);
        const startSequenceNum = Number(sequenceNum) + 1;
        const endSequenceNum = Number(sequenceNum) - 1;
        const paddedSequenceNum =
            atValue === "end"
                ? startSequenceNum.toString().padStart(5, "0")
                : endSequenceNum.toString().padStart(5, "0");
        siblingInput.value = `${config}${paddedSequenceNum}`;
    } else {
        siblingInput.value = "";
    }
}

// Copy the description from the textArea to the rest of the textAreas that match the controlPrefix
function setCutInDescription(controlPrefix) {
    // Find the element that contains the text the user wants to copy to the other textAreas
    const userDescription = document.getElementById(
        `${controlPrefix}CutInF9XX`
    );
    // Loop over all the text areas and only assign the userDescription to areas that match the controlPrefix
    const allTextAreas = document.getElementsByClassName("rangeTextArea");
    for (var i = 0; i < allTextAreas.length; i++) {
        let checkPrefix = allTextAreas[i].id.substring(
            0,
            allTextAreas[i].id.length - 9
        );
        if (checkPrefix === controlPrefix) {
            allTextAreas[i].value = userDescription.value;
        }
    }
}
// Clear all the description textAreas for the selected controlPrefix
function clearCutInDescription(controlPrefix) {
    // Loop over all the text areas and only clear the textareas that match the controlPrefix
    const allTextAreas = document.getElementsByClassName("rangeTextArea");
    for (var i = 0; i < allTextAreas.length; i++) {
        let checkPrefix = allTextAreas[i].id.substring(
            0,
            allTextAreas[i].id.length - 9
        );
        if (checkPrefix === controlPrefix) {
            allTextAreas[i].value = "";
        }
    }
}

function addExceptionField(exceptionField) {
    const exceptionSection = document.getElementById(`${exceptionField}`);

    // Find the config of the section this exception is being added to
    const configChars = exceptionField.substr(exceptionField.length - 4);

    // Find the correct regex pattern to validate the input
    const configPattern = findPatternByConfig(configChars);

    // Create exceptionInputContainer which is the div that wraps the input and the label
    var exceptionInputContainer = document.createElement("div");
    exceptionInputContainer.classList.add("rangeInput");

    // Create the exceptionInputLabel
    var exceptionInputLabel = document.createElement("label");
    exceptionInputLabel.innerHTML = "Exception serial number";
    exceptionInputLabel.classList.add("inputAndButtonLabel");

    //  Create a container for the input and the remove button
    var inputAndButtonContainer = document.createElement("div");
    inputAndButtonContainer.classList.add("inputAndButton");

    // Create the exceptionInput input element
    var exceptionInput = document.createElement("input");
    exceptionInput.setAttribute("type", "text");
    exceptionInput.setAttribute("name", "exception");
    exceptionInput.setAttribute("placeholder", configChars);
    exceptionInput.setAttribute("pattern", configPattern);
    exceptionInput.setAttribute("required", true);
    exceptionInput.setAttribute(
        "title",
        `Valid serial starting with ${configChars}`
    );
    exceptionInput.classList.add("exception");

    //  Create the removeExceptionButton
    var removeExceptionButton = document.createElement("button");
    removeExceptionButton.setAttribute("type", "button");
    removeExceptionButton.innerHTML = "X";
    removeExceptionButton.classList.add("removeRangeCardButton");

    //  Append the input and remove button to the inputAndButtonContainer
    inputAndButtonContainer.appendChild(exceptionInput);
    inputAndButtonContainer.appendChild(removeExceptionButton);

    // Append the exception elements to the exceptionInputContainer
    exceptionInputContainer.appendChild(exceptionInputLabel);
    exceptionInputContainer.appendChild(inputAndButtonContainer);

    // Append the exceptionInputContainer to the exceptionSection
    exceptionSection.appendChild(exceptionInputContainer);

    // Append the onclick function to the button after all other appends are done so the parent and child elements exist
    removeExceptionButton.onclick = () =>
        removeChildInstanceFromParentInstance(
            exceptionSection,
            exceptionInputContainer
        );
}

function findPatternByConfig(configChars) {
    let myPattern;
    configs.find((config) => {
        if (config.code === configChars) {
            myPattern = config.pattern;
        }
    });
    return myPattern;
}

function removeChildInstanceFromParentInstance(parentInstance, childInstance) {
    parentInstance.removeChild(childInstance);
}

// This function was created to verify that the overlapping is in the correct order
// This function was only ever used for adding the High Voltage Cable item. Item overlap should always be avoided
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
    // Create rangeContainer and add the correct classes so it's the same as a hard coded rangeContainer
    var rangeContainer = document.createElement("div");
    rangeContainer.classList.add("rangeContainer");
    rangeContainer.classList.add(rangeConfigChars);

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
     // Add the findAndFillSibling event listener
     rangeInputStart.addEventListener("keyup", (e) => {
        findAndFillSiblingInput(e.target, "start");
    });

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
    // Add the findAndFillSibling event listener
    rangeInputEnd.addEventListener("keyup", (e) => {
        findAndFillSiblingInput(e.target, "end");
    });

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
    rangeSection.insertBefore(rangeContainer, rangeSection.childNodes[rangeSection.children.length]);

    // Append the onclick function to the button after all other appends are done so the parent and child elements exist
    rangeRemoveButton.onclick = () =>
        removeChildInstanceFromParentInstance(rangeSection, rangeContainer);
}
