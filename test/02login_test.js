
const assert = require('assert');

const { chromium } = require('playwright');


Feature('02auth');

 let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
   I.amOnPage(`${settingsPage.url}/designer`);
   I.resizeWindow(1920, 1080);
   await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   const currentVersion = await designerSystemSettingsPage.getVersion();
   console.log(currentVersion);
   globalCurrentVersion = currentVersion;
   
});
   

Scenario('Test we can login to KTA', async ({ I, loginPage, workqueuePage, settingsPage}) => {
    I.amOnPage(`${settingsPage.url}/forms`);
    
    await loginPage.login (globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitInUrl(workqueuePage.URLs.wq);
    I.waitForElement(workqueuePage.menus.itemDev);

    let label = await I.grabTextFrom(workqueuePage.labels.workqueue);
    assert.strictEqual(label, "Work Queue", 'WorkQueue page load failed ');
});