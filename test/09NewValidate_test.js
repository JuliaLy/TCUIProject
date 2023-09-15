const assert = require('assert');
const { chromium } = require('playwright');
Feature('09NewValidate');

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

Scenario('Test creating a job and processing till New_Validate', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

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

    
 });
 

Scenario('Test New_Validate', async  ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage,fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('New_Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    I.waitForElement(navigatorPanelPage.rootFolder);
    const docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 1, "There should be only one document in job");

    I.wait(1);
    

    let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }
    

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }    
    

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'Fields 5810 SEPULVEDA BLVD and VAN NUYS are not equal', "Error message is wrong or field validation rule doesn't work");
    
    I.fillField(fieldsPanelPage.BHDriverLicense.addressField, "VAN NUYS");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }    
    

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'The field text is shorter than 3 character(s).', "Error message is wrong or field validation rule doesn't work");

    I.fillField(fieldsPanelPage.BHDriverLicense.stateField, "d333");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }    
   

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }    
    

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'The Date field does not contain a valid date.', "Error message is wrong or field validation rule doesn't work");

    I.fillField(fieldsPanelPage.BHDriverLicense.DOBField, "21/01/1999");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    
    I.waitForElement(`//table[${jobCount}]//a[contains(text(),'New_Doc_Rev')]`);
    
});
