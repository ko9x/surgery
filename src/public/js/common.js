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
