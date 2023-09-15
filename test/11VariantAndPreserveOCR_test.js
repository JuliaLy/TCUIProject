const assert = require('assert');
Feature('11VariantAndPreserveOCR');

let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
    I.amOnPage(`${settingsPage.url}/designer`);
    I.resizeWindow(1920, 1080);
    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    const currentVersion = await designerSystemSettingsPage.getVersion();
    console.log(currentVersion);
    globalCurrentVersion = currentVersion;
    
});

Scenario('Set Capture permissions to restrict delete documents and add folders',  async ({ I, designerSystemSettingsPage, settingsPage }) => {
    
   
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);

    I.click(designerSystemSettingsPage.links.captureOperations);
    I.waitForElement(designerSystemSettingsPage.captureOperations.addRecordButton);
    const administratorInList = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.captureOperations.administratorListItem);
    console.log(administratorInList);

    if (administratorInList == 0) {
     I.click(designerSystemSettingsPage.captureOperations.addRecordButton);
     I.wait(2);
     I.click(designerSystemSettingsPage.captureOperations.resourcePicker);
     I.waitForElement(designerSystemSettingsPage.captureOperations.administratorIndividual);
     I.click(designerSystemSettingsPage.captureOperations.administratorIndividual);
     I.waitForElement(designerSystemSettingsPage.captureOperations.chosenAdministratorIndividual);
     I.wait(1);

     await designerSystemSettingsPage.checkCaptureOperation('rejectDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('documentType');
     await designerSystemSettingsPage.checkCaptureOperation('splitDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('splitBackPage');
     await designerSystemSettingsPage.checkCaptureOperation('mergeDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('rotatePages');
     await designerSystemSettingsPage.checkCaptureOperation('deleteFolders');
     await designerSystemSettingsPage.checkCaptureOperation('annotations');
     await designerSystemSettingsPage.checkCaptureOperation('onlineLearning');
     await designerSystemSettingsPage.checkCaptureOperation('overrideProblems');
     await designerSystemSettingsPage.checkCaptureOperation('batchEditingOperationsAccess');
     await designerSystemSettingsPage.checkCaptureOperation('webCaptureMaskAndRedactImages');
     await designerSystemSettingsPage.checkCaptureOperation('createDocumentsAndPages');
     await designerSystemSettingsPage.checkCaptureOperation('modifyDocument');

    } else {
     I.click(designerSystemSettingsPage.captureOperations.administratorListItem);
     I.click(designerSystemSettingsPage.captureOperations.editRecordButton);

     I.wait(2);
     await designerSystemSettingsPage.checkCaptureOperation('rejectDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('documentType');
     await designerSystemSettingsPage.checkCaptureOperation('splitDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('splitBackPage');
     await designerSystemSettingsPage.checkCaptureOperation('mergeDocuments');
     await designerSystemSettingsPage.checkCaptureOperation('rotatePages');
     await designerSystemSettingsPage.checkCaptureOperation('deleteFolders');
     await designerSystemSettingsPage.checkCaptureOperation('annotations');
     await designerSystemSettingsPage.checkCaptureOperation('onlineLearning');
     await designerSystemSettingsPage.checkCaptureOperation('overrideProblems');
     await designerSystemSettingsPage.checkCaptureOperation('batchEditingOperationsAccess');
     await designerSystemSettingsPage.checkCaptureOperation('webCaptureMaskAndRedactImages');
     await designerSystemSettingsPage.checkCaptureOperation('createDocumentsAndPages');
     await designerSystemSettingsPage.checkCaptureOperation('modifyDocument');

     let isChecked = await I.grabNumberOfVisibleElements("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteDocuments']//span[contains(@class, 'e-check')]");
     console.log(isChecked);
     if (isChecked == 1) {
         I.click("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteDocuments']//span");
     }
     isChecked = await I.grabNumberOfVisibleElements("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='allowAddFolderCmd']//span[contains(@class, 'e-check')]");
     console.log(isChecked);
     if (isChecked == 1) {
         I.click("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='allowAddFolderCmd']//span");
     }

    }
    I.click(designerSystemSettingsPage.captureOperations.saveEditUserPermissionsButton);
    I.click(designerSystemSettingsPage.captureOperations.saveCaptureOperationsButton);
    I.waitForElement(designerSystemSettingsPage.settingsUpdatedSuccessfullyPopup);

    //test that settings are applied
    I.click(designerSystemSettingsPage.links.captureOperations);
    I.waitForElement(designerSystemSettingsPage.captureOperations.addRecordButton);
    I.click(designerSystemSettingsPage.captureOperations.administratorListItem);
    I.click(designerSystemSettingsPage.captureOperations.editRecordButton);
    I.wait(1);

    await designerSystemSettingsPage.checkCaptureOperationIsChecked('rejectDocuments');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('documentType');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('splitDocuments');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('splitBackPage');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('mergeDocuments');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('rotatePages');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('deleteFolders');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('annotations');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('onlineLearning');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('overrideProblems');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('batchEditingOperationsAccess');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('webCaptureMaskAndRedactImages');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('createDocumentsAndPages');
    await designerSystemSettingsPage.checkCaptureOperationIsChecked('modifyDocument');

    await designerSystemSettingsPage.checkCaptureOperationIsUnchecked('deleteDocuments');
    await designerSystemSettingsPage.checkCaptureOperationIsUnchecked('allowAddFolderCmd');

    I.click(designerSystemSettingsPage.captureOperations.cancelEditUserPermissionsButton);
    I.click(designerSystemSettingsPage.captureOperations.cancelCaptureOperationsButton);


});


Scenario('Set Preserve OCR data on rotate to true',  async ({ I, designerSystemSettingsPage, settingsPage }) => {
    
   
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);

    I.click(designerSystemSettingsPage.links.activityForms);
    I.waitForElement(designerSystemSettingsPage.activityForms.activityFormsLabel);
    I.waitForElement(designerSystemSettingsPage.activityForms.preserveOCRData);
    I.wait(2);
    let preserveOCRIsChecked = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.activityForms.preserveOCRDataIsChecked);
    console.log(preserveOCRIsChecked);
    if (preserveOCRIsChecked == 0) {
        I.click(designerSystemSettingsPage.activityForms.preserveOCRData);
        I.waitForElement(designerSystemSettingsPage.activityForms.preserveOCRDataIsChecked);
        I.click(designerSystemSettingsPage.activityForms.saveButton);
        I.waitForElement(designerSystemSettingsPage.settingsUpdatedSuccessfullyPopup);
        I.click(designerSystemSettingsPage.links.activityForms);
        I.waitForElement(designerSystemSettingsPage.activityForms.activityFormsLabel);
        I.waitForElement(designerSystemSettingsPage.activityForms.preserveOCRData);
        I.wait(2);
        preserveOCRIsChecked = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.activityForms.preserveOCRDataIsChecked);
        assert.strictEqual(preserveOCRIsChecked, 1, "Preserve OCR data on rotate option is not checked");
        I.click(designerSystemSettingsPage.activityForms.cancelButton);
    } else {
        assert.strictEqual(preserveOCRIsChecked, 1, "Preserve OCR data on rotate option is not checked");
        I.click(designerSystemSettingsPage.activityForms.cancelButton);
    }
    


});
Scenario('Set Document Variant to PV in SCNJ form',  async ({ I,  designerUserInterfacePage}) => {
    
   
    I.click(designerUserInterfacePage.userInterfaceMenuItem);
    I.waitForElement(designerUserInterfacePage.formsMenuItem);
    I.click(designerUserInterfacePage.formsMenuItem);
    
    I.wait(2);
    I.click(designerUserInterfacePage.searchFieldInput);
    
    
        
        I.fillField(designerUserInterfacePage.searchFieldInput, 'DEV');
       
        I.click(designerUserInterfacePage.searchButton);
   
    I.wait(2);
    
    I.waitForElement(designerUserInterfacePage.devSCNJFormLink);
    I.click(designerUserInterfacePage.devSCNJFormLink);
    I.switchToNextTab();
    I.resizeWindow(1920, 1080);

    I.waitForElement(designerUserInterfacePage.SCNJForm.captureControlArea);
    I.click(designerUserInterfacePage.SCNJForm.captureControlArea, null, {position: {x: 40, y: 40}});
    
    const docVarSelectionMode = await I.grabNumberOfVisibleElements(designerUserInterfacePage.SCNJForm.documentVariantSelectionField);
    console.log(`Selection Mode - ${docVarSelectionMode} `);
    const docVarTextMode = await I.grabNumberOfVisibleElements(designerUserInterfacePage.SCNJForm.documentVariantTextField);
    console.log(`Text Mode - ${docVarTextMode} `);

    if (docVarSelectionMode == 1) {
        I.scrollTo(designerUserInterfacePage.SCNJForm.documentVariantPencilIcon);
        I.click(designerUserInterfacePage.SCNJForm.documentVariantPencilIcon);
        I.waitForElement(designerUserInterfacePage.SCNJForm.documentVariantTextField);
        I.fillField(designerUserInterfacePage.SCNJForm.documentVariantTextField, 'PV');
        I.click(designerUserInterfacePage.releaseFormButton);
        I.click(designerUserInterfacePage.closeAndUnlockButton);
    }
    if (docVarTextMode == 1) {
        I.fillField(designerUserInterfacePage.SCNJForm.documentVariantTextField, 'PV');
        I.click(designerUserInterfacePage.releaseFormButton);
        I.click(designerUserInterfacePage.closeAndUnlockButton);
    }
});


Scenario('Test creating a job with BHPassport and processing to Validate', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    
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
    activityToolbarPage.importDoc(activityToolbarPage.paths.passport, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    
    I.waitForElement(navigatorPanelPage.item2);
         
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    //Complete Scan activity in Workqueue
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

    //Open Doc_Review
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    
    I.click(navigatorPanelPage.item2);
    I.click(activityToolbarPage.overrideProblemButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]");

    I.wait(1);
    const autoCompleteStatus = await I.grabNumberOfVisibleElements(activityToolbarPage.confirmMessageboxButton);
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

    
 });
 Scenario('Test PV variant and Bug 1354071: Object reference not set error on Set ExtractionConfident', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    // I.amOnPage(`${settingsPage.url}/Forms`);
    // I.resizeWindow(1920, 1080);
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);


    I.click(navigatorPanelPage.item2);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.click(fieldsPanelPage.documentTab);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(fieldsPanelPage.BHPassport.firstNameElementHidden);
    const column1Number = await I.grabNumberOfVisibleElements(fieldsPanelPage.BHPassport.column1Header);
    console.log(column1Number);
    assert.strictEqual(column1Number, 1, "The number of 'Column1' doesn't match. There should be only one 'Column1'");


    I.scrollTo(fieldsPanelPage.BHPassport.setExtractionConfidentButton);
    I.click(fieldsPanelPage.BHPassport.setExtractionConfidentButton);
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item2);
    I.click(fieldsPanelPage.documentTab);
    I.click(fieldsPanelPage.BHPassport.getExtractionConfidentButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    const confidentValue = await I.grabValueFrom(fieldsPanelPage.BHPassport.extractionConfidentTextbox);
    console.log(confidentValue);
    assert.strictEqual(confidentValue, 'true', 'Confident value is not set to TRUE');

    I.click(activityToolbarPage.activitySettingsButton);
    I.waitForElement(activityToolbarPage.activitySettings.option2);
    I.click(activityToolbarPage.activitySettings.option2);
    I.click(activityToolbarPage.activitySettings.okButton);

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);

 });
 Scenario('Process job to WCC', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.items.commonItem);
    I.wait(4);
    let jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);

    //Complete Validate from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount}]`);
    } else {
        I.click(`(${workqueuePage.actionsPicker})[${jobCount}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'Verification');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

//Complete Verification from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount}]`);
    } else {
        I.click(`(${workqueuePage.actionsPicker})[${jobCount}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'WCC');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");


 });
 Scenario('Test WCC toolbar buttons and annotations',  async ({ I, loginPage, settingsPage,workqueuePage, wCCPage }) => {
    // I.amOnPage(`${settingsPage.url}/Forms`);
    // I.resizeWindow(1920, 1080);
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('WCC');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    I.wait(5);
    I.wait("//body[not(contains(@class, 'masked')) and contains(@id, 'ext-element')]");
   

    const noScannerMessageBox = await I.grabNumberOfVisibleElements(wCCPage.noScannerMessageBox);
    console.log(noScannerMessageBox);
    if (noScannerMessageBox == 1) {
        I.click(wCCPage.noScannerMessageBoxOkButton);
        I.wait(2);
    }

    await wCCPage.checkTiffToolbarButtons();

    I.click(wCCPage.drawHighlightButton);
    I.wait(1);
    I.click(wCCPage.firstPage, null, {position: {x: 40, y: 40}});
    I.wait(1);
    I.seeInSource('width="100" height="100"');
    let rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 9, "Highlight annotation wasn't added");

    I.click(wCCPage.drawRectangleButton);
    I.click(wCCPage.firstPage, null, {position: {x: 140, y: 140}});
    rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 10, "Rectangle annotation wasn't added");

    I.click(wCCPage.drawMaskButton);
    I.click(wCCPage.firstPage, null, {position: {x: 240, y: 240}});
    rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 11, "Mask annotation wasn't added");

    I.click(wCCPage.drawPermanentRedactionButton);
    I.click(wCCPage.firstPage, null, {position: {x: 340, y: 340}});
    rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 12, "Permanent redaction annotation wasn't added");

    I.click(wCCPage.saveButton);
    I.waitForElement(wCCPage.savedSuccessfullyMessage);
    I.click(wCCPage.savedSuccessfullyOKButton);
    I.click(wCCPage.cancelButton);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    //Complete WCC from Workqueue
    if (globalCurrentVersion < 710000) {
        I.click(`(${workqueuePage.actionPickerOldVersion})[${jobCount}]`);
    } else {
        I.click(`(${workqueuePage.actionsPicker})[${jobCount}]`);
    }
    I.waitForElement(workqueuePage.completeActivityMenuItem);
    I.click(workqueuePage.completeActivityMenuItem);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);

    I.waitForElement(workqueuePage.activityCompletedSuccessfullyMessagebox);
    I.click(workqueuePage.activityCompletedSuccessfullyOkButton);

    I.waitForElement("//div[contains(@style,'cursor: default')]");
   
    
    jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'New_Validate');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");


    // I.click(wCCPage.completeButton);

    // I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    // I.waitForElement(workqueuePage.items.commonItem, 180);
    
    
    // const jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'New_Validate');
    // assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    
});
Scenario('Check annotations in New_Validate activity',  async ({ I, loginPage, settingsPage,workqueuePage, wCCPage, activityToolbarPage, imageViewerPage }) => {
    
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('New_Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    I.waitForElement(activityToolbarPage.completeActivityDialogMessage2);
    I.click(activityToolbarPage.cancelMessageboxButton);
    

    let displayAnnotationStatus = await I.grabAttributeFrom(imageViewerPage.displayAnnotationsButton, 'aria-pressed');
    console.log(displayAnnotationStatus);
    if (displayAnnotationStatus == "true") {
        I.click(imageViewerPage.displayAnnotationsButton);
    }
    rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 0, 'Annotations are visible');

    I.click(imageViewerPage.displayAnnotationsButton);
    rectNumber = await I.grabNumberOfVisibleElements('rect');
    console.log(rectNumber);
    assert.strictEqual(rectNumber, 2, "Annotations aren't visible");

    I.click(activityToolbarPage.completeActivityButton);
   

    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(workqueuePage.items.commonItem, 180);
    
    
    const jobCreated = await workqueuePage.waitForNextActivity(jobCount, 'New_Doc_Rev');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
    
});


 Scenario('Test creating a job with Driver License and processing to Validate', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    
    // I.amOnPage(`${settingsPage.url}/Forms`);
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.wait(4);
    
    let jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    I.click(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.driverLicense, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item2);
         
    I.click(activityToolbarPage.createJobButton);
    I.click(workqueuePage.labels.kofax);
    I.waitForElement(workqueuePage.labels.workqueue);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    //Complete Scan activity in Workqueue
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

    //Open Doc_Review
    await workqueuePage.openLastJob('Doc_Rev');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    
    I.click(navigatorPanelPage.item2);
    I.click(activityToolbarPage.overrideProblemButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]");

    I.wait(1);
    const autoCompleteStatus = await I.grabNumberOfVisibleElements(activityToolbarPage.confirmMessageboxButton);
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

    
 });


 Scenario("Test capture permissions", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage, imageViewerPage }) => {
    // I.amOnPage(`${settingsPage.url}/Forms`);
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);


    if (globalCurrentVersion >= 710000) {
    I.wait(60);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    
    
    I.click(navigatorPanelPage.rootFolder);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.rightClick(navigatorPanelPage.rootFolder);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    //Test that 'Create Folder' contex menu item is visible but disabled  
    I.waitForElement(navigatorPanelPage.createFolderContextMenu);
    I.wait(2);
    I.seeAttributesOnElements("//div[@id='batchContent-createFolder']//a", {'aria-disabled': "true", 'aria-hidden': "false"});
    I.seeTextEquals('Create Folder', "//div[@id='batchContent-createFolder']//a//span");
    
    //Test that 'Delete Document' contex menu item is visible but disabled  

    I.click(navigatorPanelPage.item2, null, {position: {x: 10, y: 10}});
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.rightClick(navigatorPanelPage.item2);
    I.waitForElement(navigatorPanelPage.deleteContextMenu);
    I.wait(2);
    I.seeAttributesOnElements("//div[@id='batchContent-delete']//a", {'aria-disabled': "true", 'aria-hidden': "false"});
    I.seeTextEquals('Delete', "//div[@id='batchContent-delete']//a//span");

    //Test that Delete toolbar button is disabled
    const deleteToolbarButtonVisibility = await I.grabAttributeFrom(activityToolbarPage.deleteDocumentButton, 'aria-hidden');
    console.log(deleteToolbarButtonVisibility);
    assert.strictEqual(deleteToolbarButtonVisibility, 'false', "'Delete' toolbar button is not visible");
    const deleteToolbarButtonAbility = await I.grabAttributeFrom(activityToolbarPage.deleteDocumentButton, 'aria-disabled');
    console.log(deleteToolbarButtonAbility);
    assert.strictEqual(deleteToolbarButtonAbility, 'true', "'Delete' toolbar button is enabled");

    await activityToolbarPage.cancelActivity();


    } else {
    console.log('Test is skipped for early versions because manual operations are required (restarting services and IIS)');
    }
 
}); 
 
 Scenario("Rotate page and keep OCR data in fields and mini-viewers", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage, imageViewerPage }) => {
    if (globalCurrentVersion >= 710000) {
    
    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    


    I.click(navigatorPanelPage.item2);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.click(fieldsPanelPage.documentTab);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(3);
   
    const lastNameMiniViewerValue = await I.grabAttributeFrom(fieldsPanelPage.commonMiniviewer+'[1]', 'src');
    console.log(lastNameMiniViewerValue);

    I.click(imageViewerPage.rotateImageLeftButton);
   
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    const firstNameFieldValue = await I.grabValueFrom(fieldsPanelPage.BHDriverLicense.firstNameField);
    console.log(firstNameFieldValue);
    assert.strictEqual(firstNameFieldValue, 'LAURA', 'First Name field is not empty after rotation');

    const lastNameMiniViewerValueAfterRotation = await I.grabAttributeFrom(fieldsPanelPage.commonMiniviewer+'[1]', 'src');
    console.log(lastNameMiniViewerValueAfterRotation);

    let miniViewerIsNotEmpty = false;
    if (lastNameMiniViewerValueAfterRotation != 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==') {
        miniViewerIsNotEmpty = true;
    }
    console.log(miniViewerIsNotEmpty);
    assert.strictEqual(miniViewerIsNotEmpty, true, 'Mini-Viewer body disappeared');

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
} else {
    console.log('Test is skipped for early versions because manual operations are required (restarting services and IIS)');
}
 
}); 


Scenario('Revert settings',  async ({ I, designerSystemSettingsPage, settingsPage, loginDesignerPage }) => {
    
    I.amOnPage(`${settingsPage.url}/designer`);
  
    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);

    I.click(designerSystemSettingsPage.links.captureOperations);
    I.waitForElement(designerSystemSettingsPage.captureOperations.addRecordButton);
    let administratorInList = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.captureOperations.administratorListItem);
    console.log(administratorInList);

    if (administratorInList == 1) {
    
     I.click(designerSystemSettingsPage.captureOperations.administratorListItem);
     I.click(designerSystemSettingsPage.captureOperations.deleteRecordButton);
     if (globalCurrentVersion < 710000) {
        I.waitForElement(designerSystemSettingsPage.captureOperations.deleteRecordConfirmationDialogOld);
     } else {
     I.waitForElement(designerSystemSettingsPage.captureOperations.deleteRecordConfirmationDialog);
     }
     I.click(designerSystemSettingsPage.captureOperations.deleteRecordConfirmationButton);
     
    }
 
    I.click(designerSystemSettingsPage.captureOperations.saveCaptureOperationsButton);
    I.waitForElement(designerSystemSettingsPage.settingsUpdatedSuccessfullyPopup);

    //test that settings are applied
    I.click(designerSystemSettingsPage.links.captureOperations);
    I.waitForElement(designerSystemSettingsPage.captureOperations.addRecordButton);
    
    
    administratorInList = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.captureOperations.administratorListItem);
    console.log(administratorInList);
    assert.strictEqual(administratorInList, 0, 'Administrator is still in Capture permissions list');

    I.click(designerSystemSettingsPage.captureOperations.cancelCaptureOperationsButton);

});