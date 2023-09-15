const assert = require('assert');
Feature('13InPlaceEditor');
let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
   I.amOnPage(`${settingsPage.url}/designer`);
   I.resizeWindow(1920, 1080);
   await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   const currentVersion = await designerSystemSettingsPage.getVersion();
   console.log(currentVersion);
   globalCurrentVersion = currentVersion;
   
});

Scenario('Switch on InPlace Editor',  async ({ I,  designerUserInterfacePage}) => {
    
   
    I.click(designerUserInterfacePage.userInterfaceMenuItem);
    I.waitForElement(designerUserInterfacePage.formsMenuItem);
    I.click(designerUserInterfacePage.formsMenuItem);
    I.wait(2);
    I.click(designerUserInterfacePage.searchFieldInput);
    
    
        
        I.fillField(designerUserInterfacePage.searchFieldInput, 'DEV');
       
        I.click(designerUserInterfacePage.searchButton);
   
    I.wait(2);
    I.waitForElement(designerUserInterfacePage.devValidationFormLink);
    I.click(designerUserInterfacePage.devValidationFormLink);
    I.switchToNextTab();
    I.resizeWindow(1920, 1080);

    I.waitForElement(designerUserInterfacePage.devValidationForm.captureControlArea);
    I.click(designerUserInterfacePage.devValidationForm.captureControlArea, null, {position: {x: 40, y: 40}});
    I.wait(2);
    const showInPlaceEditorStatus = await I.grabNumberOfVisibleElements(designerUserInterfacePage.devValidationForm.showInPlaceEditorCheckboxChecked);
    console.log(showInPlaceEditorStatus);
    
    
    if (showInPlaceEditorStatus == 0) {
        I.click(designerUserInterfacePage.devValidationForm.showInPlaceEditorCheckbox);
        I.click(designerUserInterfacePage.releaseFormButton);
        I.wait(1);
        I.click(designerUserInterfacePage.closeAndUnlockButton);   
    } else {
        I.click(designerUserInterfacePage.closeAndUnlockButton);
        if (globalCurrentVersion < 710000) {
            I.waitForElement("//label[contains(text(), 'Are you sure you want to discard your changes?')]");
        } else {
        I.waitForElement(designerUserInterfacePage.discardChangesDialog);
        }
        I.click(designerUserInterfacePage.discardChangesYesButton);
    
    }
    

});

Scenario('Test creating a job with Driver License and processing to Validate', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage, fieldsPanelPage, hotkeysPage, thumbnailsPanelPage }) => {
    
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

 Scenario("Test InPlace Editor reflects field value changes, calls validation, has appropriate error text", async ({ I, loginPage, inPlaceEditorPanelPage, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage, imageViewerPage }) => {
    

    I.waitForElement(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await workqueuePage.openLastJob('Validate');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.wait(3);

    //check error text in InPlace Editor
    let errorText = await I.grabValueFrom("//div[contains(@id, 'inplaceeditorpanel')]//textarea[contains(@class,'error-text')]");
    console.log(errorText);
    assert.strictEqual(errorText, 'Fields 421 N RODEO DR and BEVERLY HILLS are not equal', 'Error text is not correct');
    
    //check that InPlace Editor Panel is shown
    const inPlaceEditorPanelIsShown = await I.grabNumberOfVisibleElements(inPlaceEditorPanelPage.inPlaceEditorPanelLabel);
    console.log(inPlaceEditorPanelIsShown);
    assert.strictEqual(inPlaceEditorPanelIsShown, 1, "InPlace Editor panel is not shown");

    //check that there are 2 Address fields
    const addressFieldCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.BHDriverLicense.addressField);
    console.log(addressFieldCount);
    assert.strictEqual(addressFieldCount, 2, "Address fields amount doesn't match");
    
    //check value of main Address field
    let address1Value = await I.grabValueFrom("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[1]");
    console.log(address1Value);
    assert.strictEqual(address1Value, '421 N RODEO DR', "main Address field value doesn't match");

    //check value of Address field in InPlace Editor Panel
    let address2Value = await I.grabValueFrom("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[2]");
    console.log(address2Value);
    assert.strictEqual(address2Value, '421 N RODEO DR', "Address field value in InPlace Editor panel doesn't match");
    //set a new value to main Address field
    I.fillField("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[1]", "test value");

    //check value of Address field in InPlace Editor Panel
    address2Value = await I.grabValueFrom("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[2]");
    console.log(address2Value);
    assert.strictEqual(address2Value, 'test value', "Address field value in InPlace Editor panel doesn't reflect a new value");

    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item2, 5);
    //set a new value to Address field in InPlace Editor
    I.click("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[2]");
    I.pressKeyDown('CTRL');
    I.pressKey('A');
    I.pressKeyUp('CTRL');
    I.fillField("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[2]", "BEVERLY HILLS");
    
    //check value of main Address field
    address1Value = await I.grabValueFrom("("+ fieldsPanelPage.BHDriverLicense.addressField + ")[1]");
    console.log(address1Value);
    assert.strictEqual(address1Value, 'BEVERLY HILLS', "main Address field value doesn't reflect new value");

    I.pressKey('Enter');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    await fieldsPanelPage.invalidFieldsCountCheck(navigatorPanelPage.item2, 3);

    let result = await imageViewerPage.checkImageMiniviewers(navigatorPanelPage.item2);
    assert.strictEqual(result, "ok", "Image mini-viewer check fails"); 

    //check new error text in InPlace Editor
    errorText = await I.grabValueFrom("//div[contains(@id, 'inplaceeditorpanel')]//textarea[contains(@class,'error-text')]");
    console.log(errorText);
    assert.strictEqual(errorText, 'The field text is shorter than 3 character(s).', 'Error text is not correct');

    await activityToolbarPage.cancelActivity();
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(workqueuePage.items.commonItem);

    
 
}); 

Scenario('Switch off InPlace Editor',  async ({ I,  designerUserInterfacePage,loginDesignerPage, settingsPage}) => {
    I.amOnPage(`${settingsPage.url}/designer`);
  
   await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   
    I.click(designerUserInterfacePage.userInterfaceMenuItem);
    I.waitForElement(designerUserInterfacePage.formsMenuItem);
    I.click(designerUserInterfacePage.formsMenuItem);
    I.wait(2);
    I.click(designerUserInterfacePage.searchFieldInput);
    
    
        
        I.fillField(designerUserInterfacePage.searchFieldInput, 'DEV');
       
        I.click(designerUserInterfacePage.searchButton);
   
    I.wait(2);

    I.waitForElement(designerUserInterfacePage.devValidationFormLink);
    I.click(designerUserInterfacePage.devValidationFormLink);
    I.switchToNextTab();
    I.resizeWindow(1920, 1080);

    I.waitForElement(designerUserInterfacePage.devValidationForm.captureControlArea);
    I.click(designerUserInterfacePage.devValidationForm.captureControlArea, null, {position: {x: 40, y: 40}});
    I.wait(2);
    const showInPlaceEditorStatus = await I.grabNumberOfVisibleElements(designerUserInterfacePage.devValidationForm.showInPlaceEditorCheckboxChecked);
    console.log(showInPlaceEditorStatus);
    
    
    if (showInPlaceEditorStatus == 1) {
        I.click(designerUserInterfacePage.devValidationForm.showInPlaceEditorCheckbox);
        I.click(designerUserInterfacePage.releaseFormButton);
        I.wait(3);
        I.click(designerUserInterfacePage.closeAndUnlockButton);   
    } else {
        I.click(designerUserInterfacePage.closeAndUnlockButton);
        if (globalCurrentVersion < 710000) {
            I.waitForElement("//label[contains(text(), 'Are you sure you want to discard your changes?')]");
        } else {
        I.waitForElement(designerUserInterfacePage.discardChangesDialog);
        }
        I.click(designerUserInterfacePage.discardChangesYesButton);
    
    }
    

});