const assert = require('assert');
const { chromium } = require('playwright');
const fieldsPanel = require('../pages/fieldsPanel');

Feature('05DocReview');
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

// Scenario('Extend Navigator panel in custom layout', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage, designerCapturePage }) => {
   
//     I.amOnPage(`${settingsPage.url}/designer/#/capture/control-layouts`);
    
//     I.click(designerCapturePage.controlLayouts.rocRevLayout);
//     I.waitForElement(designerCapturePage.controlLayouts.editCaptureControlLayoutLabel);

//     I.click(designerCapturePage.controlLayouts.imageViewerPanel);
//     I.waitForElement(designerCapturePage.controlLayouts.widthValue);
//     I.fillField(designerCapturePage.controlLayouts.widthValue, '60');

//     I.click(designerCapturePage.controlLayouts.fieldsPanel);
//     I.waitForElement(designerCapturePage.controlLayouts.widthValue);
//     I.fillField(designerCapturePage.controlLayouts.widthValue, '10');

//     I.click(designerCapturePage.controlLayouts.navigatorPanel);
//     I.waitForElement(designerCapturePage.controlLayouts.widthValue);
//     I.fillField(designerCapturePage.controlLayouts.widthValue, '30');

//     I.click(designerCapturePage.controlLayouts.saveButton);
//     I.waitForElement(designerCapturePage.controlLayouts.captureControlLayoutUpdatedSuccessfullyMessage);

// });


Scenario('Test creating a job and processing till Doc_Rev', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {

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
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item3);
    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
       
    await navigatorPanelPage.createSubfolder(navigatorPanelPage.rootFolder);
    I.waitForElement(navigatorPanelPage.item4);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 4, "Creating Subfolder fails");
    
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.item4);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item6);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 6, "Adding documents to Subfolder fails");

    I.click(navigatorPanelPage.item3);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(2, 4); 
    I.waitForElement(navigatorPanelPage.item7);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 7, "Document split using Toolbar fails");

    I.click(navigatorPanelPage.item4);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(3, 6);
    I.waitForElement(navigatorPanelPage.item8);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 8, "Document split using Toolbar fails");

    I.click(navigatorPanelPage.item5);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(4, 6);
    I.waitForElement(navigatorPanelPage.item9);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 9, "Document split using Toolbar fails");


    
      
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    console.log(jobCount);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);

    await navigatorPanelPage.rejectDocumentUsingContextMenu(4);
    const rejectedDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonRejectedDocument);
    assert.strictEqual(rejectedDocCount, 1, "Rejection document fails");


    I.click(navigatorPanelPage.rootFolder);

    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
    I.waitForElement(navigatorPanelPage.item8);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);

    I.click(navigatorPanelPage.item8);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(7, 4);
     
    I.click(navigatorPanelPage.item9);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(8, 6);
    I.click(navigatorPanelPage.item10);
    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(9, 6);

   
      

    
    I.click(navigatorPanelPage.item6);
    I.pressKeyDown('SHIFT');
    I.click(navigatorPanelPage.item8);
    I.pressKeyUp('SHIFT');
    I.click(activityToolbarPage.deleteDocumentButton);
    I.waitForElement(navigatorPanelPage.deletionFolderYesButton);
    I.click(navigatorPanelPage.deletionFolderYesButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item9);
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.item9);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.click(fieldsPanelPage.activityTab);
    I.fillField(fieldsPanelPage.scanActivityTab.mandatoryKTAField, "test data");
    // await hotkeysPage.completeActivity();
    
    I.click(activityToolbarPage.completeActivityButton);
   
   
    
    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    
 });

Scenario('Test delete document', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.folderExpander2);

    const docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    await activityToolbarPage.deleteDocumentUsingToolbar (navigatorPanelPage.item10, docCount);
    I.wait(2);
    const docCount1 = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount1, docCount-1, "Number of documents is incorrect");
  
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});


Scenario('Set document type for unclassified document in KTA 7.9', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    if ((709000<= globalCurrentVersion)&&(globalCurrentVersion< 710000)) {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    const unclassDocs = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    console.log(unclassDocs);
    if (unclassDocs > 2) {
        I.click(navigatorPanelPage.item6);

        await navigatorPanelPage.changeDocumentType(navigatorPanelPage.item6, 'BHPassport');
        I.waitForVisible(fieldsPanelPage.BHPassport.passportNumberLabel);
      
        await activityToolbarPage.cancelActivity();
        I.waitForElement(workqueuePage.items.commonItem, 180);
    } else {
              
        await activityToolbarPage.cancelActivity();
        I.waitForElement(workqueuePage.items.commonItem, 180);
    }

    
    } else {
        console.log("Test is skipped because this issue doesn't exist in current version");
    }
 
});


Scenario('Test Navigate to next error', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    let nextProblemButtonState = await I.grabAttributeFrom(activityToolbarPage.nextProblemButton, 'aria-disabled');
    console.log(nextProblemButtonState);
    assert.strictEqual(nextProblemButtonState, 'false', "Next Problem toolbar button is disabled");
    let firstDocumentButtonState = await I.grabAttributeFrom(activityToolbarPage.firstDocumentButton, 'aria-disabled');
    console.log(firstDocumentButtonState);
    assert.strictEqual(firstDocumentButtonState, 'true', "First Document button is enabled or focus is not on the first document");
    
    I.click(activityToolbarPage.overrideProblemButton);
    I.wait(1);
    const autoCompleteState = await I.grabNumberOfVisibleElements(activityToolbarPage.completeActivityDialogMessage);
    console.log(autoCompleteState);
    if (autoCompleteState == 1) {
    I.waitForElement(activityToolbarPage.completeActivityDialogMessage);
    I.click(activityToolbarPage.cancelMessageboxButton);
    } else {
        I.wait(1);
    }

    nextProblemButtonState = await I.grabAttributeFrom(activityToolbarPage.nextProblemButton, 'aria-disabled');
    console.log(nextProblemButtonState);
    
    assert.strictEqual(nextProblemButtonState, 'true', "Focus doesn't move to next problem or there are more than 2 problem documents in batch");
    firstDocumentButtonState = await I.grabAttributeFrom(activityToolbarPage.firstDocumentButton, 'aria-disabled');
    console.log(firstDocumentButtonState);
    assert.strictEqual(firstDocumentButtonState, 'false', "First Document button is disabled or focus is not on next problem document");

    I.click(navigatorPanelPage.item2);
    I.click(activityToolbarPage.restoreProblemButton);

      
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario('Un-reject document', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    await navigatorPanelPage.unrejectDocumentUsingContextMenu(4);

    const rejectedDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonRejectedDocument);
    assert.strictEqual(rejectedDocCount, 0, "Un-rejecting document fails");
  
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario('Test navigation within document', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, thumbnailsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    await thumbnailsPanelPage.checkNavigationWithinDocument(navigatorPanelPage.item3);
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});


Scenario('Rotating page on undocked Image Viewer with hotkeys', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, imageViewerPage }) => {
    if ((709000<= globalCurrentVersion)&&(globalCurrentVersion< 710000)) {
        console.log('Test is skipped due to disability to set proper locators for toolbar buttons in undocked Image Viewer');
    } else{
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item3);
    I.click(imageViewerPage.undockButton);
    I.switchToNextTab();
    await imageViewerPage.rotatingViewUsingHotkeysTest(globalCurrentVersion);
    await imageViewerPage.rotatingImageUsingHotkeysTest();

    I.closeCurrentTab();

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
    }
});

Scenario('Change Document type', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item4);

    await navigatorPanelPage.changeDocumentType(navigatorPanelPage.item4, 'BHPassport');
    


    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario('Set autocomplete option and Override problem with document', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, wCCPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const currentJobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    await activityToolbarPage.setAutocompleteOption(activityToolbarPage.activitySettings.option1);
    await activityToolbarPage.overrideProblemDocument(navigatorPanelPage.item2);
    I.click(activityToolbarPage.completeAndTakeNextActivityButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    if (currentJobCount > 1) {
        I.wait(3);
        const isWCCnext = await I.grabNumberOfVisibleElements(wCCPage.WCCActivityLabel);
        console.log(isWCCnext);
        if (isWCCnext == 1) {
            const noScannerMessageBox = await I.grabNumberOfVisibleElements(wCCPage.noScannerMessageBox);
            console.log(noScannerMessageBox);
            if (noScannerMessageBox == 1) {
                I.click(wCCPage.noScannerMessageBoxOkButton);
                I.wait(2);
            }
            I.click(wCCPage.cancelButton);
        } else {
            const autocomplete = await I.grabNumberOfVisibleElements(activityToolbarPage.completeActivityDialogMessage2);
            console.log(autocomplete);
            if (autocomplete == 1) {
                I.click(activityToolbarPage.cancelMessageboxButton);
                I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
            }
        I.waitForElement(activityToolbarPage.cancelActivityButton);
        I.click(activityToolbarPage.cancelActivityButton);

        I.click(activityToolbarPage.confirmMessageboxButton);
        I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
        I.waitForElement(workqueuePage.items.commonItem);
        const jobCreated = await workqueuePage.waitForNextActivity(currentJobCount, 'Validate');
        assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
        }
    } else {
        I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
        const jobCreated = await workqueuePage.waitForNextActivity(currentJobCount, 'Validate');
        assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    }

 
}); 