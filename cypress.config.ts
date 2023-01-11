import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "wdx8mv",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 5,
      openMode: 5,
    }
  },
});
