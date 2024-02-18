/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";
import { plugin as replayPlugin } from "@replayio/cypress";

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setupNodeEvents(on, config) {
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      return config;
     },
  },
});
