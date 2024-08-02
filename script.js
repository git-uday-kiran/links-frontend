'use strict';

let link = getLink(
    1,
    "http://loclhost:80/api0",
    ["reference", "blog", "book", "pdf", "video", "podcast", "tutorial", "career guidance", "conference", "other-useful"],
    ["java", "c", "cpp", "rust", "python", "js", "html", "css", "not-a-language"],
    "strongly_recommended",
    "This is the description of the link"
);

let link2 = getLink(
    2,
    "http://loclhost:80/api2",
    ["reference", "blog", "book", "pdf", "video", "podcast", "tutorial", "career guidance", "conference", "other-useful"],
    ["java", "c", "cpp", "rust", "python", "js", "html", "css", "not-a-language"],
    "strongly_recommended",
    "This is the description of the link"
);

let link3 = getLink(
    3,
    "http://loclhost:80/api3",
    ["reference", "blog", "book", "pdf", "video", "podcast", "tutorial", "career guidance", "conference", "other-useful"],
    ["java", "c", "cpp", "rust", "python", "js", "html", "css", "not-a-language"],
    "strongly_recommended",
    "This is the description of the link"
);

// createLinkItemOnUI(link);
// createLinkItemOnUI(link2);
// createLinkItemOnUI(link3);

loadDataFromServer();
async function loadDataFromServer() {
    console.log("loading data from server");
    const url = "http://links.backend/"
    let response = await fetch(url);
    if (response.ok) {
        let body = await response.json();
        body.forEach(link => {
            let ll = getLink(link.id, link.url, link.topic_tags, link.tech_tags, link.importance, link.description);
            createLinkItemOnUI(ll);
        });
    }

}

// --------------------------------------------------------------------------------------

function getLink(id, url, topic_tags, tech_tags, importance, description) {
    return {
        id,
        url,
        topic_tags,
        tech_tags,
        importance,
        description,
    };
}

function createLinkItemOnUI(link) {
    const addBadgeToWord = word => { return `<span class="badge" style="background-color:${randomColor()}">${word}</span>` };
    let topic_tags = new Array();
    let tech_tags = new Array();
    let importance = addBadgeToWord(link.importance);

    link.topic_tags.forEach(tag => topic_tags.push(addBadgeToWord(tag)));
    link.tech_tags.forEach(tag => tech_tags.push(addBadgeToWord(tag)));

    const template = `
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#link-item-${link.id}" aria-expanded="false" aria-controls="link-item-${link.id}">
                <a href="${link.url}" style="text-decoration: none;">${link.url}</a>
            </button>
            </h2>
            <div id="link-item-${link.id}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <h6> <strong>Topics: </strong> ${topic_tags.join(" ")} </h6> <hr />
                    <h6> <strong>Tech: </strong> ${tech_tags.join(" ")} </h6> <hr />
                    <h6> <strong>Importance: </strong> ${importance} </h6> <hr />
                    <p> ${link.description} </p>
                </div>
            </div>
        </div>
        `;
    const links = document.getElementById("links");
    links.innerHTML = links.innerHTML + template;
}

// --------------------------------------------------------------------------------------

function randomColor() {
    const colors = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        black: "#000000",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        white: "#ffffff",
        yellow: "#ffff00"
    };
    function randomProperty(obj) {
        let keysArr = Object.keys(obj);
        return obj[keysArr[keysArr.length * Math.random() << 0]]
    }
    const colors2 = {
        black: "#000000",
        red: "#ff0000",
        lightgreen: "#66cc00",
        blue: "#0000ff",
        aqua: "#00ffff",
        magenta: "#ff00ff",
        silver: "#c0c0c0",
        gray: "#808080",
        maroon: "#800000",
        olive: "#808000",
        green: "#008000",
        purple: "#800080",
        teal: "#008080",
        navy: "#000080",
    }

    return randomProperty(colors2);
}