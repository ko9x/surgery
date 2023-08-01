export const configs = [
    {
        id: 1,
        code: "F9XX",
        description: 'Standard C 9" Image Intensifier',
        pattern: "[Ff]9[Xx][Xx][TtXx][Xx][0-9]{5}",
    },
    {
        id: 2,
        code: "F2XX",
        description: 'Standard C 12" Image Intensifier',
        pattern: "[Ff]2[Xx][Xx][TtXx][Xx][0-9]{5}",
    },
    {
        id: 3,
        code: "FAXX",
        description: "Ergo C 21cm Flat Panel Display",
        pattern: "[Ff][Aa][Xx][Xx][TtXx][Ee][0-9]{5}",
    },
    {
        id: 4,
        code: "FBXX",
        description: "Ergo C 31cm Flat Panel Display",
        pattern: "[Ff][Bb][Xx][Xx][TtXx][Ee][0-9]{5}",
    },
    {
        id: 5,
        code: "FSXX",
        description: 'Super C 9" Image Intensifier',
        pattern: "[Ff][Ss][Xx][Xx][TtXx][Xx][0-9]{5}",
    },
    {
        id: 6,
        code: "FAHX",
        description: "Super C 21cm Flat Panel Display",
        pattern: "[Ff][Aa][Hh][Xx][TtXx][Xx][0-9]{5}",
    },
    {
        id: 7,
        code: "FBHX",
        description: "Super C 31cm Flat Panel Display",
        pattern: "[Ff][Bb][Hh][Xx][TtXx][Xx][0-9]{5}",
    },
    {
        id: 8,
        code: "FAMH",
        description: "Motorized C 21cm Flat Panel Display",
        pattern: "[Ff][Aa][Mm][Hh][TtXx][Xx][0-9]{5}",
    },
    {
        id: 9,
        code: "FBMH",
        description: "Motorized C 31cm Flat Panel Display",
        pattern: "[Ff][Bb][Mm][Hh][TtXx][Xx][0-9]{5}",
    },
];

// Constants for height and width
const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// Create a variable to differentiate between large and small screens
export const isSmall = width < 750;

// Handle layout based on the screen size
export function handleLayout(userTitle, userSubtitle, userDisclaimer) {
    if (!isSmall) {
        container.classList.add("largeContainer");
        titleSection.classList.add("largeTitleSection");
        if(typeof searchSection !== 'undefined') {
            searchSection.classList.add("largeSearchSection");
        }
        resultSection.classList.add("largeResultSection");
        titleText.innerHTML = `<h1>${userTitle}</h1>`;
        subTitleText.innerHTML = `<h3>${userSubtitle}</h3>`;
        disclaimerText.innerHTML = `<p>${userDisclaimer}</p>`;
    }
    if (isSmall) {
        container.classList.add("smallContainer");
        if(typeof executeSearch !== 'undefined') {
            executeSearch?.classList.add("smallButton");
        }
        titleText.innerHTML = `<h3>${userTitle}</h3>`;
        subTitleText.innerHTML = `<p>${userSubtitle}</p>`;
        disclaimerText.innerHTML = `<p>${userDisclaimer}</p>`;
    }
}

export function createBottomResultsArea(titleText, labelText, contentText, id) {
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
    if(typeof id !== 'undefined') {
        bottomResultItemContainer.setAttribute("id", id);
    }
    bottomResultContainer.appendChild(bottomResultItemContainer);
}
