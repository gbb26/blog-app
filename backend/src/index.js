/* eslint-disable no-undef */
const { app, port } = require("./express");

app.listen(port ? port : 3000, () => {
    console.log(`Server Created: ${port}`);
})