(function () {

    function insertButton(label, click) {
        // Prevent duplicates
        if (document.querySelector("#rbxJumpBtn")) return;

        const btn = document.createElement("button");
        btn.id = "rbxJumpBtn";
        btn.textContent = label;

        Object.assign(btn.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "10px 18px",
            zIndex: "9999999",
            fontSize: "16px",
            background: "#00A2FF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
        });

        btn.onclick = click;
        document.body.appendChild(btn);
    }

    function run() {
        const url = location.href;
        const match = url.match(/(experiences\/\d+\/passes\/\d+)/);
        if (!match) return;

        const base = "https://create.roblox.com/dashboard/" + match[1];

        if (url.includes("/configure")) {
            insertButton("Go to SALES", () => location.href = base + "/sales");
        } 
        else if (url.includes("/sales")) {
            insertButton("Back to CONFIGURE", () => location.href = base + "/configure");
        }
    }

    // React keeps wiping the DOM → keep re-injecting if missing
    setInterval(run, 800);

})();
