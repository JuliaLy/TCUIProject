const assert = require('assert');
const { chromium } = require('playwright');
Feature('08WCC');
// Before(({I, settingsPage}) => {
//     I.amOnPage(`${settingsPage.url}/forms`);
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
Scenario('Test creating a job and processing till WCC', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

    I.amOnPage(`${settingsPage.url}/Forms`);
    await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.wait(4);
    
    let jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    I.click(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.pdfDoc, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item2);
    
      
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    console.log(jobCount);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
//Complete Scan_Activity from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount+1}]`);
    } else {
    I.click(`(${workqueuePage.actionsPicker})[${jobCount+1}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

//Complete Doc_Review from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount+1}]`);
    } else {
    I.click(`(${workqueuePage.actionsPicker})[${jobCount+1}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Validate');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

//Complete Validate from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount+1}]`);
    } else {
        I.click(`(${workqueuePage.actionsPicker})[${jobCount+1}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Verification');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

//Complete Verification from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount+1}]`);
    } else {
        I.click(`(${workqueuePage.actionsPicker})[${jobCount+1}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'WCC');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    
 });
 

Scenario('Test PDF toolbar buttons',  async ({ I, loginPage, settingsPage,workqueuePage, wCCPage }) => {
    if (globalCurrentVersion < 709000) {
        console.log('Test is skipped. Known bug')
    } else {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('WCC');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    I.wait(5);
    I.wait("//body[not(contains(@class, 'masked')) and contains(@id, 'ext-element')]");
    I.waitForInvisible("//div[contains(text(), 'Please wait')]");
   

    const noScannerMessageBox = await I.grabNumberOfVisibleElements(wCCPage.noScannerMessageBox);
    console.log(noScannerMessageBox);
    if (noScannerMessageBox == 1) {
        I.click(wCCPage.noScannerMessageBoxOkButton);
        I.wait(2);
    }

    await wCCPage.checkPDFToolbarButtons();
    I.click(wCCPage.completeButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(workqueuePage.items.commonItem, 180);
    
    
    const jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'New_Validate');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    }



});
