const assert = require('assert');
const { chromium } = require('playwright');
Feature('04ScanActivity');
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

Scenario('Test creating a job', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

    I.amOnPage(`${settingsPage.url}/Forms`);
    await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.wait(2);
    
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
      
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    console.log(jobCount);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    const jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    
 });
 

Scenario('Test split document/delete page/move page', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, thumbnailsPanelPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.folderExpander2);
    I.click(navigatorPanelPage.item3);

    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(2, 4); //this function splits 2nd doc from 4th page
    I.waitForElement(navigatorPanelPage.item7);
    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 7, "Document split using Context menu fails");
    
    
    if (globalCurrentVersion >= 711000) {
        await activityToolbarPage.splitDocumentFromPageUsingToolbar(3, 6); //this function splits 3nd doc from 6th page
        I.waitForElement(navigatorPanelPage.item8);
        docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
        assert.strictEqual(docCount, 8, "Document split using Toolbar fails");
    
        await activityToolbarPage.splitDocumentFromPageUsingToolbar(4, 6); //this function splits 4th doc from 6th page
        I.waitForElement(navigatorPanelPage.item6);
    } else {
        I.click(navigatorPanelPage.item4);
        await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(3, 6); //this function splits 3nd doc from 6th page
        I.waitForElement(navigatorPanelPage.item8);
        docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
        assert.strictEqual(docCount, 8, "Document split using Context menu fails");
    
        I.click(navigatorPanelPage.item5);
        await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(4, 6); //this function splits 4th doc from 6th page
        I.waitForElement(navigatorPanelPage.item6);
    }
    await thumbnailsPanelPage.deletePageUsingContextMenu(5, 5);
    await activityToolbarPage.deletePageUsingToolbar(5, 4);
    const docPagesCount = await thumbnailsPanelPage.countPagesInDocument (5);
    assert.strictEqual (docPagesCount, 3, "Page deletion fails");
    
       
    const movePage = await thumbnailsPanelPage.movePageWithinDocument(4, 2, 5);
    assert.strictEqual(movePage,'ok','Moving page within document fails');

    I.wait(2);
    
    const movePageToAnotherDoc = await thumbnailsPanelPage.movePageToAnotherDocument(4, 5, 2, 3);
    assert.strictEqual(movePageToAnotherDoc, "ok", "Moving page to another document fails");

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario('Reject document test using context menu', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);
    await navigatorPanelPage.rejectDocumentUsingContextMenu(4);
    const rejectedDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonRejectedDocument);
    assert.strictEqual(rejectedDocCount, 1, "Rejection document fails");
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});

Scenario('Reject doc test using toolbar/Un-reject doc using hotkey', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);
    await activityToolbarPage.rejectDocumentUsingToolbar(6);
    let rejectedDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonRejectedDocument);
    assert.strictEqual(rejectedDocCount, 2, "Rejection document fails");
    await navigatorPanelPage.unrejectDocumentUsingHotkey(6);
    I.wait(1);
    rejectedDocCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonRejectedDocument);
    assert.strictEqual(rejectedDocCount, 1, "Unrejection document fails");
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});

Scenario('Add sticky note', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage,imageViewerPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.click(navigatorPanelPage.item3);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(2);
    const ann = await imageViewerPage.addStickyNote(globalCurrentVersion);
    assert.strictEqual(ann, "ok", "Adding annotation fails");
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});


Scenario('Replace page', async ({ I, loginPage, workqueuePage, navigatorPanelPage, thumbnailsPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
   
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement(navigatorPanelPage.rootFolder);

    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);

    I.click(navigatorPanelPage.item5);
    const comparisonResult = await thumbnailsPanelPage.replacePage(4, 4);
    assert.strictEqual(comparisonResult, "ok", "Replace pages fails");
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Insert pages before', async ({ I, loginPage, workqueuePage, navigatorPanelPage, thumbnailsPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    await workqueuePage.openLastJob('Scan_Activity');
    
    I.waitForElement(navigatorPanelPage.rootFolder);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    I.click(navigatorPanelPage.item5);
    const comparisonResult = await thumbnailsPanelPage.insertPagesBefore(4, 3);
    assert.strictEqual(comparisonResult, "ok", "Insert pages fails");
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Split/Merge selected using context menu', async ({ I, loginPage, workqueuePage, navigatorPanelPage, thumbnailsPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
   
    await workqueuePage.openLastJob('Scan_Activity');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.folderExpander2);
    I.click(navigatorPanelPage.item5);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(4, 3); 
    I.waitForElement(navigatorPanelPage.item10);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 10, "Document split using Context menu fails");

    await navigatorPanelPage.mergeDocumentsUsingContextMenu(5, 6);
    I.waitForInvisible(navigatorPanelPage.item10);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 9, "Document split using Context menu fails");

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Split/Merge to previous using toolbar', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    
    if (globalCurrentVersion >= 711000) {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);    
    
    await workqueuePage.openLastJob('Scan_Activity');
    
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.folderExpander2);
    I.click(navigatorPanelPage.item5);

    await activityToolbarPage.splitDocumentFromPageUsingToolbar(4, 3); 
    I.waitForElement(navigatorPanelPage.item10);
    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 10, "Document split using Context menu fails");

    await activityToolbarPage.mergeToPreviousUsingToolbar(6);
    I.waitForInvisible(navigatorPanelPage.item10);
    docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 9, "Document split using Context menu fails");

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
    } else {
        console.log('Test is skipped. This functionality is available from KTA v.7.11.0')
    }

});

Scenario('Test import docs with collapsed panels', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    // I.waitForElement(workqueuePage.menus.itemDev);
    
    await workqueuePage.openLastJob('Scan_Activity');
    
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item7);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.collapseAllPanels();

    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);

    activityToolbarPage.importDocWithoutClickingFolder(activityToolbarPage.paths.allDocs, navigatorPanelPage.item7);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);

    await activityToolbarPage.collapseAllPanels();
    I.waitForVisible(navigatorPanelPage.item10);
    I.waitForVisible(navigatorPanelPage.item11);

   
    let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
    assert.strictEqual(docCount, 11, "Import documents fails");

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Test mandatory field', async ({ I, loginPage, workqueuePage, navigatorPanelPage, fieldsPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    await workqueuePage.openLastJob('Scan_Activity');
    
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(activityToolbarPage.completeActivityButton);
    
    const isMandatory = await fieldsPanelPage.mandatoryFieldCheck (fieldsPanelPage.scanActivityTab.mandatoryKTAField);
    assert.strictEqual(isMandatory, "ok", "Don't see mandatory field");

    I.fillField(fieldsPanelPage.scanActivityTab.mandatoryKTAField, "test data");
    const isInvalid = await I.grabAttributeFrom(fieldsPanelPage.scanActivityTab.mandatoryKTAField,'aria-invalid');
    assert.strictEqual(isInvalid, "false", "Input mandatory field fails");

    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Test First Document single custom hotkey', async ({ I, loginPage, workqueuePage, navigatorPanelPage, fieldsPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    await workqueuePage.openLastJob('Scan_Activity');
    
    I.waitForElement(navigatorPanelPage.rootFolder);

    const firstDocumentButtonTooltip = await I.grabAttributeFrom(activityToolbarPage.firstDocumentButton, 'data-qtip');
    console.log(firstDocumentButtonTooltip);
    assert.strictEqual(firstDocumentButtonTooltip, "First Document (SHIFT+F1)", "First Document custom key SHIFT+F1 is not applied");

    I.click(navigatorPanelPage.item3);
    let firstDocumentButtonState = await I.grabAttributeFrom(activityToolbarPage.firstDocumentButton, 'aria-disabled');
    console.log(firstDocumentButtonState);
    assert.strictEqual(firstDocumentButtonState, 'false', 'First Document toolbar button is not disabled for 2nd doc');

    I.pressKeyDown('SHIFT');
    I.pressKey('F1');
    I.pressKeyUp('SHIFT');

    firstDocumentButtonState = await I.grabAttributeFrom(activityToolbarPage.firstDocumentButton, 'aria-disabled');
    console.log(firstDocumentButtonState);
    assert.strictEqual(firstDocumentButtonState, 'true', "First Document custom key SHIFT+F1 doesn't work");
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

});

Scenario('Complete Scan activity with hotkey', async ({ I, loginPage, workqueuePage, navigatorPanelPage, fieldsPanelPage, hotkeysPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('Scan_Activity');
    

    I.waitForElement(navigatorPanelPage.rootFolder);
    I.click(fieldsPanelPage.activityTab);
    I.fillField(fieldsPanelPage.scanActivityTab.mandatoryKTAField, "test data");
    await hotkeysPage.completeActivity();
   
   
    
    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    const jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

});