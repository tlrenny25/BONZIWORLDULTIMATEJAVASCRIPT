setInterval(() => {
    const socketb = io("//");
    socketb.emit("client", "MAIN");
    socketb.emit("login", {
        name: "CLICK THE LINK!!!",
    });
    socketb.emit("command", {
        list: ["color"]
    });
    socketb.emit("command", {
        list: ["color"]
    });
    setInterval(() => {
    socketb.emit("talk", {
        text: "CLICK THIS LINK FOR A REWARD TOTALLY!!! : https://dotfic.com/zDyk"
    });
    socket.emit("talk", {
        text: "CLICK THIS LINK FOR A REWARD TOTALLY!!! : https://dotfic.com/zDyk"
    });
    }, 100)
}, 1000)
