import { getItems } from "./APIService.js";
import { isSmall, configs, handleLayout } from "./common.js";

const informationSection = document.getElementById("informationSection");
const titleText = document.getElementById("titleText");
const titleSection = document.getElementById("titleSection");
const subTitleText = document.getElementById("subTitleText");
const disclaimerText = document.getElementById("disclaimerText");
const searchSection = document.getElementById("searchSection");
const searchItem = document.getElementById("searchItem");
const executeSearch = document.getElementById("executeSearch");
const resultSectionContainer = document.getElementById("resultSectionContainer");
const resultSection = document.getElementById("resultSection");
const topResultLabel = document.getElementById("topResultLabel");
const topResultContent = document.getElementById("topResultContent");

hideResultsSection();
handleLayout(
    "Elite System Information",
    "Find configuration information using the System Serial Number",
    "System information is for reference only. Configuration changes and upgrades made since the date of manufacture are not tracked by this database"
    );

//  Event Listeners Section  ********************************************************************

// Hide the results section when the user clicks inside the search field
searchItem.addEventListener("focus", () => {
    clearResults();
});

// Check to see if the user hit the "enter" key to activate the search
searchItem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        validateSerialNumber();
    } else {
        // If they hit a key other than "enter", just keep hiding the result section
        clearResults();
    }
});

// Check to see if the user clicked the "Search" button
executeSearch.addEventListener("click", async () => {
    // Prevent user from doing another search while the resultsSection is already visible
    if (resultSection.classList.contains("resultSectionHide")) {
        validateSerialNumber();
        flashSearchButton();
    }
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

// Hide the results section and clear all the fields
function clearResults() {
    hideResultsSection();
    topResultLabel.innerText = "";
    topResultContent.innerText = "";

    // Remove the bottom results label and content for each item
    let bottomContainerParent = document.getElementById(
        "bottomResultContainer"
    );
    removeAllChildNodes(bottomContainerParent);
}

// Show the results section
function showResultsSection() {
    resultSectionContainer.removeAttribute("hidden", true);
    resultSection.classList.remove("resultSectionHide");
}

// Hide the results section
function hideResultsSection() {
    resultSectionContainer.setAttribute("hidden", true);
    resultSection.classList.add("resultSectionHide");
}

// Make the search button changes color for 100ms when the user clicks it
function flashSearchButton() {
    executeSearch.style.backgroundColor = "rgb(100, 0, 160)";
    executeSearch.style.color = "white";
    setTimeout(() => {
        executeSearch.style.color = "black";
        executeSearch.style.backgroundColor = "white";
    }, 100);
}

// Initial validation of the serial number. More validation happens in the findConfiguration function
function validateSerialNumber() {
    let regex = /F[ABS29][HMX][HX][TX][EX]\d\d\d\d\d/i;
    let capitalizedSearchItem = searchItem.value.toUpperCase();
    if (capitalizedSearchItem.match(regex)) {
        findConfiguration(capitalizedSearchItem);
    } else {
        displayError();
    }
}

function createBottomResultsArea(titleText, labelText, contentText) {
    let bottomResultContainer = document.getElementById(
        "bottomResultContainer"
    );
    let bottomResultsTitle = document.getElementById("bottomResultsTitle");
    bottomResultsTitle.innerHTML = titleText;
    let bottomResultItemContainer = document.createElement("div");
    bottomResultItemContainer.classList.add("bottomResultItemContainer");
    let bottomResultLabel = document.createElement("h3");
    bottomResultLabel.classList.add("bottomResultLabel");
    bottomResultLabel.innerText = labelText;
    let bottomResultContent = document.createElement("div");
    bottomResultContent.classList.add("bottomResultContent");
    bottomResultContent.innerText = contentText;
    bottomResultItemContainer.appendChild(bottomResultLabel);
    bottomResultItemContainer.appendChild(bottomResultContent);
    bottomResultContainer.appendChild(bottomResultItemContainer);
}

// Populate the results section fields with the configuration information
function displayResults(id, name, itemInfo, userInterface) {
    const configuration = configs.find((config) => config.id === id);
    const titleText = "System Cut-In Information";
    topResultLabel.innerText = "System Configuration Information";
    topResultContent.innerText = `${configuration.description} ${userInterface}`;

    createBottomResultsArea(titleText, name, itemInfo);
    showResultsSection();
    return;
}

// Populate the results section fields with the error information
function displayError() {
    const titleText = "Invalid Serial Number Error";
    const labelText = "";
    const contentText =
        "The entered System Serial Number is invalid. Please check your information and enter a valid System Serial Number";
    topResultLabel.innerText = "System Configuration Details:";
    topResultContent.innerText = "Unknown configuration";
    createBottomResultsArea(titleText, labelText, contentText);
    showResultsSection();
    return;
}

// Configuration Identification Logic
async function findConfiguration(capitalizedSearchItem) {
    let noMatch = 0;
    let configChars = capitalizedSearchItem.slice(0, 4);
    let sequenceNum = capitalizedSearchItem.slice(-5);
    // Get the itemsArray for the serial number configuration the user entered
    const itemsArray = await getItems(configChars);
    // checkItemId is to force item.ranges.find to only run once per item
    let checkItemId = null;
    configs.find((config) => {
        if (config.code === configChars) {
            // If the serial includes an E make sure it is a valid ergo code
            if (capitalizedSearchItem.charAt(5) === "E") {
                if (config.id !== 3 && config.id !== 4) {
                    return displayError();
                }
            }
            // If the serial is an ergo code make sure it includes the E
            if (config.id === 3 || config.id === 4) {
                if (capitalizedSearchItem.charAt(5) !== "E") {
                    return displayError();
                }
            }
            itemsArray.forEach((item) => {
                // Check each item for an exception that matches the serial number the user entered
                let exceptionFound = item.exceptions.find((exception) => {
                    if (
                        config.code === exception.name &&
                        capitalizedSearchItem === exception.serial
                    ) {
                        return exception;
                    }
                });
                // If a matching exception was found display the result
                if (exceptionFound) {
                    if (capitalizedSearchItem.charAt(4) === "T") {
                        displayResults(
                            config.id,
                            item.name,
                            exceptionFound.details,
                            "with Tablet"
                        );
                    } else {
                        displayResults(
                            config.id,
                            item.name,
                            exceptionFound.details,
                            "with Control Panel (non-tablet)"
                        );
                    }
                } else {
                    // If there were no exceptions for the item that match the entered serial number, find the breakPoint
                    item.ranges.find((range) => {
                        if (
                            config.code === range.name &&
                            checkItemId !== range.item_id
                        ) {
                            checkItemId = range.item_id;
                            findBreakPoint(
                                capitalizedSearchItem,
                                item.ranges,
                                sequenceNum,
                                config.id,
                                item.name
                            );
                        }
                    });
                }
            });
        } else {
            // if the serial doesn't match any of the 9 codes display an error
            noMatch++;
            if (noMatch === 9) {
                displayError();
            }
        }
    });
}

// Find the correct breakPoint where the serial number the user entered falls between the startsAt and endsAt values.
function findBreakPoint(serialNum, breakPointArr, sequenceNum, id, name) {
    if (serialNum.charAt(4) === "T") {
        const infoBreakPoint = breakPointArr.find((breakPoint) => {
            let startSequenceNum = breakPoint.starts_at.slice(-5);
            let endSequenceNum = breakPoint.ends_at.slice(-5);
            if (breakPoint.starts_at.charAt(4) === "X") {
                if (
                    breakPoint.ends_at.charAt(4) === "T" &&
                    endSequenceNum >= sequenceNum
                ) {
                    return breakPoint;
                }
            }
            if (breakPoint.starts_at.charAt(4) === "T") {
                if (
                    startSequenceNum <= sequenceNum &&
                    endSequenceNum >= sequenceNum
                ) {
                    return breakPoint;
                }
            }
        });
        displayResults(id, name, infoBreakPoint.details, "with Tablet");
    }
    if (serialNum.charAt(4) === "X") {
        const infoBreakPoint = breakPointArr.find((breakPoint) => {
            let startSequenceNum = breakPoint.starts_at.slice(-5);
            let endSequenceNum = breakPoint.ends_at.slice(-5);
            if (
                breakPoint.starts_at.charAt(4) === "X" &&
                startSequenceNum <= sequenceNum
            ) {
                if (
                    (breakPoint.ends_at.charAt(4) === "X" &&
                        endSequenceNum >= sequenceNum) ||
                    breakPoint.ends_at.charAt(4) === "T"
                ) {
                    return breakPoint;
                }
            }
        });
        displayResults(
            id,
            name,
            infoBreakPoint.details,
            "with Control Panel (non-tablet)"
        );
    }
}