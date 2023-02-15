export const plugin = on => {
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'firefox') {
            launchOptions.preferences.config = {
                layout: {
                    css: {
                        'has-selector': {
                            enabled: true
                        }
                    }
                }
            };
        }
    });
};
