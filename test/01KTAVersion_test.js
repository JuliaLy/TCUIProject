const assert = require('assert');
Feature('01KTAVersion');
// Before(({I, settingsPage}) => {
//     I.amOnPage(`${settingsPage.url}/designer`);

//     I.resizeWindow(1920, 1080);
// });
let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
    I.amOnPage(`${settingsPage.url}/designer`);
    I.resizeWindow(1920, 1080);
    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    const currentVersion = await designerSystemSettingsPage.getVersion();
    console.log(currentVersion);
    globalCurrentVersion = currentVersion;
    
});

Scenario('Test KTA version & Copyright', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {

    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//img[@id='logo']");
    } else {
    I.waitForElement(designerSystemSettingsPage.label);
    }

    const KTACopyright = await designerSystemSettingsPage.getCopyright();
    
    if (globalCurrentVersion >= 711000) {
    assert.strictEqual(KTACopyright, `Version ${settingsPage.KTAVersion} (C) 1997-2022 Kofax. All rights reserved.`, "KTA version or Copyright doesn't match");
    } else {
        assert.strictEqual(KTACopyright, `Version ${settingsPage.KTAVersion} (C) 1997-2021 Kofax. All rights reserved.`, "KTA version or Copyright doesn't match");
    }
});
