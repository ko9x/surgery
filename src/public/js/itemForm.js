import { storeItem } from "./APIService.js";
import { isSmall, configs } from "./common.js";

const container = document.getElementById("container");
const formSection = document.getElementById("formSection");
const itemForm = document.getElementById("itemForm");
const collapseSection = document.querySelectorAll(".sectionTitleButton");
const preCutInButton = document.querySelectorAll(".preCutInButton");
const postCutInButton = document.querySelectorAll(".postCutInButton");
const addExceptions = document.querySelectorAll(".exceptionButton");
const watchEndsAt = document.querySelectorAll(".ends_at");
const watchStartsAt = document.querySelectorAll(".starts_at");

//  Event Listeners Section **************************************************************

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

// Set the description for all the post cut-in descriptions
postCutInButton[0].addEventListener("click", (e) => {
    // Pass the controlPrefix "post"
    setCutInDescription("post");
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
            // Check for overlap (This was only used to add the High Voltage Cable item. No other items should have overlap)
            // if (ranges[i].starts_at === ranges[i + 1].starts_at) {
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
    // The add range button was only used for adding the High Voltage Cable item
    // const addRangeButton = document.getElementById(`addRangeButton${configChars}`);
    const collapseText = document.getElementById(sectionId);
    if (collapseSection.classList.contains("hideElement")) {
        collapseSection.classList.remove("hideElement");
        // addRangeButton.classList.remove('hideElement');
        collapseText.innerHTML = "(collapse section)";
    } else {
        collapseSection.classList.add("hideElement");
        // addRangeButton.classList.add('hideElement');
        collapseText.innerHTML = "(show section)";
    }
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
    const siblingInput =
        mainContainer.children[atValue === "end" ? 1 : 0].children[0].children[
            atValue === "end" ? 0 : 1
        ].children[1];
    // Verify the user entered a serial number that matches the pattern and is 11 characters long
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
