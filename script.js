const profiles = {
    balanced: {
        camera: 100,
        firing: 95,
        ads: 90
    },
    aggressive: {
        camera: 120,
        firing: 110,
        ads: 100
    },
    precise: {
        camera: 80,
        firing: 75,
        ads: 70
    }
};

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function () {
    const style = document.getElementById("playStyle").value;
    const controls = document.getElementById("controlType").value;

    const settings = profiles[style];
    const result = document.getElementById("sensitivityResult");

    const controlName = {
        four: "Four-finger claw",
        two: "Two-finger controls",
        three: "Three-finger controls"
    };

    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Your Starting Profile";
    result.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = "Play style: " +
        style.charAt(0).toUpperCase() + style.slice(1) +
        " | Controls: " + controlName[controls];
    result.appendChild(description);

    const list = document.createElement("ul");

    const values = [
        ["Camera sensitivity", settings.camera],
        ["Firing sensitivity", settings.firing],
        ["ADS sensitivity", settings.ads]
    ];

    values.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item[0] + ": " + item[1];
        list.appendChild(li);
    });

    result.appendChild(list);

    const note = document.createElement("p");
    note.textContent =
        "Test these illustrative values in training mode. " +
        "They are not guaranteed optimal settings. " +
        "Gyroscope and individual scope sensitivities may need separate tuning.";

    result.appendChild(note);
});


const loadoutBtn = document.getElementById("loadoutBtn");

const loadouts = {
    ar: {
        name: "Assault Rifle",
        role: "Versatile combat",
        mp: [
            "Prioritize manageable recoil.",
            "Balance aiming speed and accuracy.",
            "Choose a magazine that suits your play style."
        ],
        br: [
            "Prioritize recoil control at longer ranges.",
            "Consider a larger magazine for extended fights.",
            "Balance range, stability and mobility."
        ]
    },

    smg: {
        name: "Submachine Gun",
        role: "Close-range combat",
        mp: [
            "Prioritize mobility and aiming speed.",
            "Practise recoil control at close range.",
            "Avoid attachments that make movement uncomfortable."
        ],
        br: [
            "Build for close-range engagements.",
            "Keep enough mobility for repositioning.",
            "Consider carrying a second weapon for longer ranges."
        ]
    },

    sniper: {
        name: "Sniper Rifle",
        role: "Precision engagements",
        mp: [
            "Prioritize a comfortable aiming speed.",
            "Practise target acquisition.",
            "Balance ADS speed and accuracy."
        ],
        br: [
            "Prioritize accuracy and useful engagement range.",
            "Use cover between shots.",
            "Pair with a weapon suitable for closer fights."
        ]
    },

    lmg: {
        name: "Light Machine Gun",
        role: "Sustained fire",
        mp: [
            "Prioritize recoil control.",
            "Practise firing in controlled bursts.",
            "Account for slower movement when positioning."
        ],
        br: [
            "Consider recoil control and ammunition capacity.",
            "Choose fights where your positioning helps.",
            "Avoid remaining exposed while reloading."
        ]
    },

    shotgun: {
        name: "Shotgun",
        role: "Very close-range combat",
        mp: [
            "Practise movement and close-range target tracking.",
            "Prioritize a comfortable handling setup.",
            "Use cover to close distance safely."
        ],
        br: [
            "Use only when the engagement suits its range.",
            "Keep a versatile secondary weapon.",
            "Practise positioning around buildings and cover."
        ]
    }
};

loadoutBtn.addEventListener("click", function () {
    const type = document.getElementById("weaponType").value;
    const mode = document.getElementById("gameMode").value;

    const weapon = loadouts[type];
    const result = document.getElementById("loadoutResult");

    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = weapon.name + " | " +
        (mode === "mp" ? "Multiplayer" : "Battle Royale");

    result.appendChild(heading);

    const role = document.createElement("p");
    role.textContent = "Role: " + weapon.role;
    result.appendChild(role);

    const list = document.createElement("ul");

    weapon[mode].forEach(function (tip) {
        const item = document.createElement("li");
        item.textContent = tip;
        list.appendChild(item);
    });

    result.appendChild(list);

    const disclaimer = document.createElement("p");
    disclaimer.className = "note";
    disclaimer.textContent =
        "These are general build recommendations, not specific " +
        "weapon attachments. Check the current in-game Gunsmith " +
        "for available attachments and balance changes.";

    result.appendChild(disclaimer);
});

console.log("Gilly Gaming Zone loaded successfully!");

const addUserBtn = document.getElementById("addUserBtn");
const userPanel = document.getElementById("userPanel");
const usernameInput = document.getElementById("usernameInput");
const saveUserBtn = document.getElementById("saveUserBtn");
const userMessage = document.getElementById("userMessage");

if (addUserBtn && userPanel) {
    addUserBtn.addEventListener("click", () => {
        userPanel.hidden = !userPanel.hidden;

        if (!userPanel.hidden) {
            usernameInput.focus();
        }
    });
}

if (saveUserBtn && usernameInput && userMessage) {
    saveUserBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();

        if (!username) {
            userMessage.textContent = "Please enter a username.";
            return;
        }

        if (username.length > 24) {
            userMessage.textContent = "Maximum 24 characters.";
            return;
        }

        userMessage.textContent = "Welcome, " + username + "! Profile added on this device.";
        addUserBtn.textContent = "Account";
        userPanel.hidden = true;
    });
}

