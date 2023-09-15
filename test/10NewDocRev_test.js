const assert = require('assert');
//const { chromium } = require('playwright');
Feature('10NewDocRev');

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
Scenario('Test creating a job and processing till New_Doc_Rev', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

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

//Complete WCC from Workqueue
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
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'New_Validate');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

//Complete New_Validate from Workqueue
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
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'New_Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    
 });

Scenario('Test New_Doc_Rev', async  ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage, activityToolbarPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.items.commonItem);
    I.wait(4);
    
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('New_Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.wait(1);
    await activityToolbarPage.setAutocompleteOption(activityToolbarPage.activitySettings.option1);
    
    const docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 1, "There should be only one document in job");
    
    
    const invalidDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    assert.strictEqual(invalidDocCount, 1, "There should be one invalid document");

    I.click(activityToolbarPage.overrideProblemButton);

    I.waitForElement(activityToolbarPage.completeActivityButton);
    I.click(activityToolbarPage.completeActivityButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    
    I.wait(2);

    const actualJobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(actualJobCount);
    assert.strictEqual(actualJobCount, jobCount - 1, "Job count doesn't match");
    
});
