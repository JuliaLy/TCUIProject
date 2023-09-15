const assert = require('assert');
const { chromium } = require('playwright');
const { exit } = require('process');
Feature('06Validation');
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

Scenario('Set Preserve OCR data on rotate to false or make sure it is already set',  async ({ I, designerSystemSettingsPage, settingsPage }) => {
    
   
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);

    I.click(designerSystemSettingsPage.links.activityForms);
    I.waitForElement(designerSystemSettingsPage.activityForms.activityFormsLabel);
    I.waitForElement(designerSystemSettingsPage.activityForms.preserveOCRData);
    I.wait(2);
    let preserveOCRIsChecked = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.activityForms.preserveOCRDataIsChecked);
    console.log(preserveOCRIsChecked);
    if (preserveOCRIsChecked == 1) {
        I.click(designerSystemSettingsPage.activityForms.preserveOCRData);
        
        I.click(designerSystemSettingsPage.activityForms.saveButton);
        I.waitForElement(designerSystemSettingsPage.settingsUpdatedSuccessfullyPopup);
        I.click(designerSystemSettingsPage.links.activityForms);
        I.waitForElement(designerSystemSettingsPage.activityForms.activityFormsLabel);
        I.waitForElement(designerSystemSettingsPage.activityForms.preserveOCRData);
        I.wait(2);
        preserveOCRIsChecked = await I.grabNumberOfVisibleElements(designerSystemSettingsPage.activityForms.preserveOCRDataIsChecked);
        assert.strictEqual(preserveOCRIsChecked, 0, "Preserve OCR data on rotate option is still checked");
        I.click(designerSystemSettingsPage.activityForms.cancelButton);
    } else {
        assert.strictEqual(preserveOCRIsChecked, 0, "Preserve OCR data on rotate option is checked");
        I.click(designerSystemSettingsPage.activityForms.cancelButton);
    }
    


});

Scenario('Test creating a job and processing to Validate', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    
    I.amOnPage(`${settingsPage.url}/Forms`);
    await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.menus.itemDev);
    I.wait(6);
    
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

    I.click(navigatorPanelPage.rootFolder);

    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
    I.waitForElement(navigatorPanelPage.item8);

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
    I.waitForElement(navigatorPanelPage.item13);

    I.click(navigatorPanelPage.item10);
    I.click(activityToolbarPage.deleteDocumentButton);
    I.waitForElement(navigatorPanelPage.deletionFolderYesButton);
    I.click(navigatorPanelPage.deletionFolderYesButton);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
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
    
    // const unclassDocs = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonInvalidItem);
    // console.log(unclassDocs);
    // if ((unclassDocs > 1) && (709000 <= globalCurrentVersion  <710000 )) {
    //     I.click(navigatorPanelPage.item6);

    //     await navigatorPanelPage.changeDocumentType(navigatorPanelPage.item6, 'BHPassport');
    //     I.click(navigatorPanelPage.item4);

    //     await navigatorPanelPage.changeDocumentType(navigatorPanelPage.item4, 'BHPassport');
       
    // } 

    I.click(navigatorPanelPage.item2);
    I.click(activityToolbarPage.overrideProblemButton);
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

Scenario('Test that appropriate fields are invalid', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    

    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item2, 8);
    
    console.log(globalCurrentVersion);
    if (globalCurrentVersion >= 711000) {
            await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 3);
        } else if (globalCurrentVersion < 709000) {
            await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 9);
        } else if ((709000<= globalCurrentVersion) & (globalCurrentVersion< 710000)) {
            await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 16);
        } else {
            await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 2);   
        }
        
    
    // if (globalCurrentVersion >= 711000) {
    // await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 3);
    // } else {
    //     await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item3, 2);
    // }
    
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item4, 0);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item5, 4);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item6, 0);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item7, 4);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item8, 0);
    
    I.click(navigatorPanelPage.folderExpander2);
    if (globalCurrentVersion >= 711000) {
        await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item10, 3);
    } else if (globalCurrentVersion < 709000) {
        await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item10, 9);
    } else if ((709000<= globalCurrentVersion) & (globalCurrentVersion< 710000)) {
        await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item10, 16);
    }else {
        await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item10, 2);   
    }
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item11, 0);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item12, 4);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item13, 0);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item14, 8);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item17, 4);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item18, 0);
   
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
   
 
});


Scenario('Test undock Image Viewer', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(imageViewerPage.undockButton);
    I.wait(2);
    const openTabsCount = await I.grabNumberOfOpenTabs();
    assert.strictEqual(openTabsCount, 2, "Image Viewer undock fails");
       
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario('Test mini-viewers', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    let result = await imageViewerPage.checkImageMiniviewers(navigatorPanelPage.item5);
    assert.strictEqual(result, "ok", "Image mini-viewer check fails"); 
      
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});
Scenario("Test State 'd333' value", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item5);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.doubleClick('//input[@name="State"]');
    I.pressKey('d');
    I.waitForElement('//li[contains(text(),"d333")]');
    I.click('//li[contains(text(),"d333")]');
    I.pressKey("Enter");
    
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    const value = await I.grabValueFrom('//input[@name="State"]');
    console.log(value);
    I.doubleClick('//input[@name="State"]');
    I.pressKey('Delete');
    I.pressKey('d');
    I.wait(1);
    const autopopulatedValue = await I.grabValueFrom('//input[@name="State"]');
    console.log(autopopulatedValue);
    assert.strictEqual(autopopulatedValue, 'd1', "Autopopulated value is not 'd1'");
    
    const bydefaultItem = await I.grabTextFrom('//li[contains(@class,"item-over")]');
    assert.strictEqual(bydefaultItem, 'd1', "First element in the list is not 'd1'");

          
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario("Test the execution subsequence of Global and Local field Validators", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item5);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    
    for (let i = 9; i > 0; i = i - 2) {
        I.doubleClick('//input[@name="PostCode"]');
        I.fillField('//input[@name="PostCode"]', i)
        // I.pressKey(i);
        I.pressKey("Enter");
        I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
        const errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
        switch(i) {
            case '9':
                assert.strictEqual(errorMessage, 'Global_Validator_1 expect digit [1-8]', "Error message not found or doesn't match");
                break;
            case '7':
                assert.strictEqual(errorMessage, 'Local_Validator_2 expect digit [1-6]', "Error message not found or doesn't match");
                break;
            case '5':
                assert.strictEqual(errorMessage, 'Global_Validator_3 expect digit [1-4]', "Error message not found or doesn't match");
                break;
            case '3':
                assert.strictEqual(errorMessage, 'Local_Validator_4 expect digit [1-2]', "Error message not found or doesn't match");
                break;  
            case '1':
                assert.strictEqual(errorMessage, 'Fields 421 N RODEO DR and BEVERLY HILLS are not equal',  "Error message not found or doesn't match");
                break;
        }
    }
        
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario("Field Validation in PDF BHDriver license doc", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
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


    
    
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario("Field Validation in BHApplication doc", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.wait(1);
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
    }else if ((709000<= globalCurrentVersion) & (globalCurrentVersion< 710000)) {
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

   
    

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario("Field Validation in tiff BHDriver license doc", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.wait(2);

    let errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    if (errorMessage == 'The field extraction was not certain.') {
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    }
   

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'Fields 421 N RODEO DR and BEVERLY HILLS are not equal', "Error message is wrong or field validation rule doesn't work");

    I.click(fieldsPanelPage.BHDriverLicense.cityField);
    I.pressKeyDown('SHIFT');
    I.pressKey('Arrow Down');
    I.pressKeyUp('SHIFT');
   
    I.click('//li[contains(text(),"421 N RODEO DR")]');
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    
    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'The field text is shorter than 3 character(s).', "Error message is wrong or field validation rule doesn't work");

    I.click(fieldsPanelPage.BHDriverLicense.stateField);
    I.pressKeyDown('SHIFT');
    I.pressKey('Arrow Down');
    I.pressKeyUp('SHIFT');
    
    I.click('//li[contains(text(),"d333")]');
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    assert.strictEqual(errorMessage, 'The Date field does not contain a valid date.', "Error message is wrong or field validation rule doesn't work");

    I.fillField(fieldsPanelPage.BHDriverLicense.DOBField, "21/01/1999");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
         
    
    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});

Scenario("PostValidation check in BHApplication doc", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.wait(2);

    const forceValidFieldInitialValue = await I.grabNumberOfVisibleElements(fieldsPanelPage.forceValidIcon);
    console.log(forceValidFieldInitialValue);

    I.click(navigatorPanelPage.item7);
    I.doubleClick(fieldsPanelPage.BHDriverLicense.firstNameField);
    I.fillField(fieldsPanelPage.BHDriverLicense.firstNameField, 'set');
    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    const forceValidFieldActualValue = await I.grabNumberOfVisibleElements(fieldsPanelPage.forceValidIcon);
    console.log(forceValidFieldActualValue);
    assert.strictEqual(forceValidFieldActualValue, forceValidFieldInitialValue + 1, "Post Validation doesn't work and FirstName field wasn't force validated");

    const invalidFieldInitialValue = await I.grabNumberOfVisibleElements(fieldsPanelPage.invalidFieldIcon);
    console.log(invalidFieldInitialValue);

    I.click(fieldsPanelPage.activityTab);
    I.click(fieldsPanelPage.validationActivityTab.setAddressAndCityValidButton);
    I.click(fieldsPanelPage.validationActivityTab.setFirstNameAsInvalidButton);

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);

    I.click(navigatorPanelPage.item7);
    I.doubleClick(fieldsPanelPage.BHDriverLicense.firstNameField);

    let invalidFieldActualValue = await I.grabNumberOfVisibleElements(fieldsPanelPage.invalidFieldIcon);
    console.log(invalidFieldActualValue);
    assert.strictEqual(invalidFieldActualValue, invalidFieldInitialValue + 1, "Post Validation doesn't work. FirstName is still valid");

    const addressValue = await I.grabValueFrom(fieldsPanelPage.BHDriverLicense.addressField);
    console.log(addressValue);
    assert.strictEqual(addressValue, "SDK_updated", "Address field wasn't updated");

    const cityValue = await I.grabValueFrom(fieldsPanelPage.BHDriverLicense.cityField);
    console.log(cityValue);
    assert.strictEqual(cityValue, "SDK_updated", "City field wasn't updated");
    
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    invalidFieldActualValue = await I.grabNumberOfVisibleElements(fieldsPanelPage.invalidFieldIcon);
    console.log(invalidFieldActualValue);
    assert.strictEqual(invalidFieldActualValue, invalidFieldInitialValue - 2 , "Validation doesn't work");

    I.click(fieldsPanelPage.BHDriverLicense.stateField);
    I.pressKeyDown('SHIFT');
    I.pressKey('Arrow Down');
    I.pressKeyUp('SHIFT');
   
    I.click('//li[contains(text(),"d333")]');
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);

    I.fillField(fieldsPanelPage.BHDriverLicense.DOBField, "21/01/1999");
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(2);
    


    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});
Scenario("Rotate page and loose OCR data in fields and mini-viewers", async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage, imageViewerPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    


    I.click(navigatorPanelPage.item5);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.click(fieldsPanelPage.documentTab);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(3);
   
    const lastNameMiniViewerValue = await I.grabAttributeFrom(fieldsPanelPage.commonMiniviewer+'[1]', 'src');
    console.log(lastNameMiniViewerValue);

    I.click(imageViewerPage.rotateImageLeftButton);
    
    I.waitForElement(imageViewerPage.rotateImageWarningMessage);
    I.click(imageViewerPage.rotateImageConfirmButton);
   
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);

    const firstNameFieldValue = await I.grabValueFrom(fieldsPanelPage.BHDriverLicense.firstNameField);
    console.log(firstNameFieldValue);
    assert.strictEqual(firstNameFieldValue, '', 'First Name field is not empty after rotation');

    const lastNameMiniViewerValueAfterRotation = await I.grabAttributeFrom(fieldsPanelPage.commonMiniviewer+'[1]', 'src');
    console.log(lastNameMiniViewerValueAfterRotation);

    let miniViewerIsEmpty = false;
    if (lastNameMiniViewerValueAfterRotation == 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==') {
        miniViewerIsEmpty = true;
    }
    console.log(miniViewerIsEmpty);
    assert.strictEqual(miniViewerIsEmpty, true, 'Mini-Viewer body remains');

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
 
});  

Scenario('Test folder deletion and job auto-completion', async ({ I, loginPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
    // I.waitForElement(workqueuePage.menus.itemDev);
    // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(4);
    const jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
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

    I.click(activityToolbarPage.activitySettingsButton);
    I.waitForElement(activityToolbarPage.activitySettings.option3);
    I.click(activityToolbarPage.activitySettings.option3);
    I.click(activityToolbarPage.activitySettings.okButton);

    I.click(navigatorPanelPage.item5);
    I.pressKeyDown('SHIFT');
    I.click(navigatorPanelPage.item8);
    I.pressKeyUp('SHIFT');
    I.click(activityToolbarPage.deleteDocumentButton);
    I.waitForElement(navigatorPanelPage.deletionFolderYesButton);
    I.click(navigatorPanelPage.deletionFolderYesButton);
    
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);


    I.click(navigatorPanelPage.item5);
    I.rightClick(navigatorPanelPage.item5);
    I.waitForElement(navigatorPanelPage.deleteContextMenu);
    I.click(navigatorPanelPage.deleteContextMenu);
    

    I.waitForElement(navigatorPanelPage.deletionFolderYesButton);
    I.click(navigatorPanelPage.deletionFolderYesButton);
       
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(workqueuePage.menus.itemDev);

    
    I.waitForElement(`//table[${jobCount}]//a[contains(text(),'Verification')]`);
   
 
}); 