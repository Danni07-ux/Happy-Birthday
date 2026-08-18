/* =========================
   AJ'S BIRTHDAY QUEST
   ========================= */
/* LOADING SCREEN */
let progress = 0;
const loadingProgress = document.getElementById("loading-progress");
const loadingText = document.getElementById("loading-text");
const loadingMessages = [
    "Loading birthday quest...",
    "Finding player...",
    "Loading memories...",
    "Loading love.exe...",
    "Preparing Level 19...",
    "Quest ready."
];
const loadingInterval = setInterval(() => {
    progress += 2;
    loadingProgress.style.width = progress + "%";
    const messageIndex = Math.min(
        Math.floor(progress / 17),
        loadingMessages.length - 1
    );
    loadingText.textContent = loadingMessages[messageIndex];
    if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
            document.getElementById("loading-screen").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("loading-screen").style.display = "none";
                document.getElementById("main-content").style.display = "block";
            }, 1000);
        }, 600);
    }
}, 60);
/* QUEST START */
function startQuest() {
    document.getElementById("quest-menu").classList.remove("hidden");
    document.getElementById("quest-menu").scrollIntoView({
        behavior: "smooth"
    });
}
/* OPEN LEVEL */
function openLevel(level) {
    document.getElementById("quest-menu").classList.add("hidden");
    document.querySelectorAll(".level").forEach(section => {
        section.classList.add("hidden");
    });
    const selectedLevel = document.getElementById(level);
    selectedLevel.classList.remove("hidden");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (level === "final") {
        startTyping();
    }
}
/* BACK TO MENU */
function backToMenu() {
    document.querySelectorAll(".level").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById("quest-menu").classList.remove("hidden");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* XP SYSTEM */
let xp = 0;
const completedLevels = {
    beginning: false,
    memories: false,
    achievements: false
};
function completeLevel(level) {
    if (completedLevels[level]) {
        return;
    }
    completedLevels[level] = true;
    xp += 25;
    if (xp > 100) {
        xp = 100;
    }
    document.getElementById("xp-progress").style.width = xp + "%";
    document.getElementById("xp-text").textContent =
        xp + " / 100 XP";
    alert(
        "🏆 ACHIEVEMENT UNLOCKED!\n\n" +
        "+25 XP\n\n" +
        "Keep going, player ❤️"
    );
    backToMenu();
}
/* FINAL MESSAGE */
let messageStarted = false;
function startTyping() {
    if (messageStarted) {
        return;
    }
    messageStarted = true;
    const message = `
Happy birthday, my AJ. ❤️
I hope you know how incredibly special you are to me.
I love your personality, the way you make me smile,
your smile, your eyes, and the way you make me feel safe
when you hold me.
I love that feeling when I finally get to hug you again
after we haven't seen each other for months.
I love that you're there for me.
I love that you try to become better for yourself,
for me, and for us every day.
More than anything, I'm grateful that I get to experience
another year of your life with you.
Today you officially unlock Level 19.
And I can't wait to see everything that comes next.
Happy 19th birthday, AJ.
I love you. ❤️
`;
    const element = document.getElementById("birthday-message");
    let index = 0;
    function typeCharacter() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            setTimeout(typeCharacter, 25);
        }
    }
    typeCharacter();
}
/* SURPRISE */
function revealSurprise() {
    const surprise = document.getElementById("surprise");
    surprise.classList.remove("hidden");
    createConfetti();
    document.querySelector(".surprise-button").textContent =
        "❤️ QUEST COMPLETE";
    document.querySelector(".surprise-button").disabled = true;
}
/* CONFETTI */
function createConfetti() {
    const symbols = ["❤️", "💜", "✨", "♡", "✦"];
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement("div");
        confetti.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];
        confetti.style.position = "fixed";
        confetti.style.left =
            Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.fontSize =
            (Math.random() * 15 + 10) + "px";
        confetti.style.zIndex = "10000";
        document.body.appendChild(confetti);
        const duration =
            Math.random() * 3 + 2;
        confetti.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
               
                        transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration * 1000,
                easing: "ease-out"
            }
        );
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
