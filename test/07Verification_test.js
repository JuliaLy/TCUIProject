
const assert = require('assert');
const { chromium } = require('playwright');
Feature('07Verification');
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
 
Scenario('Test creating a job and processing to Verification', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {

    I.amOnPage(`${settingsPage.url}/Forms`);
    await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement(workqueuePage.items.commonItem);
    I.wait(4);
    
    let jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    I.click(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item3);
    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    console.log(docCount);
       
    I.click(navigatorPanelPage.item3);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(2, 9); 
    I.waitForElement(navigatorPanelPage.item4);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 4, "Document split using Toolbar fails");

    I.click(navigatorPanelPage.item4);
    I.click(activityToolbarPage.deleteDocumentButton);
    I.click(activityToolbarPage.confirmMessageboxButton);
      
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    console.log(jobCount);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.rootFolder);

   
    I.click(fieldsPanelPage.activityTab);
    I.fillField(fieldsPanelPage.scanActivityTab.mandatoryKTAField, "test data");
    // await hotkeysPage.completeActivity();
    I.click(activityToolbarPage.completeActivityButton);
      
    
    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item2);
    I.click(activityToolbarPage.overrideProblemButton);
    I.wait(1);
    let autoCompleteStatus = await I.grabNumberOfVisibleElements(activityToolbarPage.confirmMessageboxButton);
    console.log(autoCompleteStatus);
    if (autoCompleteStatus == 0) {
    I.click(activityToolbarPage.completeActivityButton);
    } else {
    I.waitForElement(activityToolbarPage.confirmMessageboxButton);
    I.click(activityToolbarPage.confirmMessageboxButton);
    }

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Validate');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
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
    
    I.wait(1);

    I.click(fieldsPanelPage.folderTab);

    I.waitForElement(fieldsPanelPage.folderTabFields.field1);
    I.fillField(fieldsPanelPage.folderTabFields.field1, "field1 test value");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    I.fillField(fieldsPanelPage.folderTabFields.field2, "field2 test value");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    if (globalCurrentVersion >= 711000) {
        for (let i = 0; i < 3; i++) {
            let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
            if (errorMessage == 'The field extraction was not certain.') {
                I.pressKey('Enter');
                I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
                I.wait(1);
                }
        }
    } else if (globalCurrentVersion <709000) {
        for (let i = 0; i < 9; i++) {
            let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
            if (errorMessage == 'The field extraction was not certain.') {
                I.pressKey('Enter');
                I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
                I.wait(1);
                }
            }
    } else if ((709000<= globalCurrentVersion)&&(globalCurrentVersion <710000)) {
        for (let i = 0; i < 16; i++) {
            let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
            if (errorMessage == 'The field extraction was not certain.') {
                I.pressKey('Enter');
                I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
                I.wait(1);
                }
            }
    } else {
        for (let i = 0; i < 2; i++) {
            let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
            if (errorMessage == 'The field extraction was not certain.') {
                I.pressKey('Enter');
                I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
                I.wait(1);
                }
            }
    }

    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(1);

    autoCompleteStatus = await I.grabNumberOfVisibleElements(activityToolbarPage.confirmMessageboxButton);
    console.log(autoCompleteStatus);
    if (autoCompleteStatus == 1) {
        I.click(activityToolbarPage.confirmMessageboxButton);
    }
 
    I.waitForElement(workqueuePage.menus.itemDev);

    
    I.waitForElement(`//table[${jobCount + 1}]//a[contains(text(),'Verification')]`);
    
 });


Scenario('Check Document context menu items and toolbar buttons availability', async ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage, activityToolbarPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Verification');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item3);
    I.rightClick(navigatorPanelPage.item3);
    
    await navigatorPanelPage.checkDocumentContextMenuVerification();
    await activityToolbarPage.checkToolbarVerification(globalCurrentVersion);

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Check Page context menu items and toolbar buttons availability', async ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage, activityToolbarPage, thumbnailsPanelPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Verification');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item3);
    await thumbnailsPanelPage.rightClickToDocumentPage(2, 2);
    
    await thumbnailsPanelPage.checkPageContextMenuVerification();   
    await imageViewerPage.checkImageViewerInVerification();

    I.click(navigatorPanelPage.rootFolder);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});
Scenario('Test fields verification', async ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage, activityToolbarPage, thumbnailsPanelPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Verification');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    let invalidItemsCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    assert.strictEqual(invalidItemsCount, 4 , "There are not 4 items in batch or not all items are invalid");
    I.wait(2);
    
    for (let i = 0; i < 9; i++ ) {
        I.pressKey('Enter');
        I.waitForElement("//div[contains(@style,'cursor: default')]", 180);    
    }
    I.wait(2);

    invalidItemsCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    assert.strictEqual(invalidItemsCount, 3 , "First document wasn't fully verified");

    for (let i = 0; i < 28; i++ ) {
        I.pressKey('Enter');
        I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    }
    I.wait(2);

    invalidItemsCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    assert.strictEqual(invalidItemsCount, 2 , "Second document wasn't fully verified");

    for (let i = 0; i < 8; i++ ) {
        I.pressKey('Enter');
        I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    }
    I.wait(2);

    invalidItemsCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    assert.strictEqual(invalidItemsCount, 0 , "Third document wasn't fully verified");

    I.click(navigatorPanelPage.rootFolder);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    I.click(activityToolbarPage.completeActivityButton);
    I.waitForElement(activityToolbarPage.invalidActivityTabMessagebox);
    I.click(activityToolbarPage.invalidActivityTabMessageboxOkButton);

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

}); 

Scenario('Complete verification', async ({ I, loginPage, settingsPage, workqueuePage, navigatorPanelPage, activityToolbarPage, fieldsPanelPage,  thumbnailsPanelPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.items.commonItem);
    I.wait(4);
    
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('Verification');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    
    I.click(fieldsPanelPage.activityTab);
    I.fillField(fieldsPanelPage.verificationActivityTab.KTAMandatoryField, "test input");

    I.click(activityToolbarPage.completeActivityButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    
    
    
    const jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'WCC');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    

});
