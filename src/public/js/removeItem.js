import { isSmall, handleLayout } from "./common.js";

handleLayout(
    "Elite System Information",
    "Select an Item to be Removed from the Database",
    "Removing an item from the database cannot be undone"
    );

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

createBottomResultsArea('hello', 'label', 'some content');
