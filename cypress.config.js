const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "64mkuc",
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});