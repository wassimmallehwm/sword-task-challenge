const { server } = require("./app");
const { PORT } = require("./config");

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

