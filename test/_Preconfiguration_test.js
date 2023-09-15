const assert = require('assert');
const { pause } = require('codeceptjs');
Feature('001Preconfiguration');

// Before(({I, settingsPage}) => {
//     I.amOnPage(`${settingsPage.url}/designer`);

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

Scenario('Test Doc_Review form: enabling Complete and Take Next and Navigate to Next Error options', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage, designerUserInterfacePage}) => {

    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//img[@id='logo']");
    } else {
    I.waitForElement(designerSystemSettingsPage.label);
    }
    I.click(designerUserInterfacePage.userInterfaceMenuItem);
    I.waitForElement(designerUserInterfacePage.formsMenuItem);
    I.click(designerUserInterfacePage.formsMenuItem);
    
    I.wait(2);
    I.click(designerUserInterfacePage.searchFieldInput);
    
    
        
        I.fillField(designerUserInterfacePage.searchFieldInput, 'DEV');
       
        I.click(designerUserInterfacePage.searchButton);
   
    I.wait(2);
  
    I.waitForElement(designerUserInterfacePage.devDocReviewFormLink);
    I.click(designerUserInterfacePage.devDocReviewFormLink);
    I.switchToNextTab();
    I.resizeWindow(1920, 1080);
    

    I.waitForElement(designerUserInterfacePage.docReviewForm.captureControlArea);
    I.click(designerUserInterfacePage.docReviewForm.captureControlArea, null, {position: {x: 40, y: 40}});
    I.waitForElement(designerUserInterfacePage.docReviewForm.showCompleteAndTakeNextCheckbox);
    
    const showCompleteTakeNextStatus = await I.grabNumberOfVisibleElements(designerUserInterfacePage.docReviewForm.showCompleteAndTakeNextCheckboxChecked);
    console.log(showCompleteTakeNextStatus);
    const navigateNextErrorStatus = await I.grabNumberOfVisibleElements(designerUserInterfacePage.docReviewForm.navigateNextErrorCheckboxChecked);
    console.log(navigateNextErrorStatus);
    
    if (showCompleteTakeNextStatus == 0) {
        I.click(designerUserInterfacePage.docReviewForm.showCompleteAndTakeNextCheckbox);
    } 
    if (navigateNextErrorStatus == 0) {
        I.click(designerUserInterfacePage.docReviewForm.navigateNextErrorCheckbox);
    } 

    if ((showCompleteTakeNextStatus == 1) && (navigateNextErrorStatus == 1)) {
        I.click(designerUserInterfacePage.closeAndUnlockButton);
        if (globalCurrentVersion < 710000) {
            I.waitForElement("//label[contains(text(), 'Are you sure you want to discard your changes?')]");
        } else {
        I.waitForElement(designerUserInterfacePage.discardChangesDialog);
        }
        I.click(designerUserInterfacePage.discardChangesYesButton);
    } else{
    I.click(designerUserInterfacePage.releaseFormButton);
    I.wait(1);
    I.click(designerUserInterfacePage.closeAndUnlockButton);   
    }
});

Scenario('Test configurable keys', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage}) => {

    
    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//img[@id='logo']");
    } else {
    I.waitForElement(designerSystemSettingsPage.label);
    }
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);
    

    I.click(designerSystemSettingsPage.links.captureConfigurableKeys);
    I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.captureConfigurableKeysWindowLabel);
    
    //Change Activity Settings keys to CTRL+C
    I.click(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsItem);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);

    I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);

    I.click(designerSystemSettingsPage.captureConfigurableKeys.ctrlCheckbox);
    I.fillField(designerSystemSettingsPage.captureConfigurableKeys.keyInputField, 'C');

    I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//label[contains(text(), 'This hotkey will not work on any browser')]");
    }else {
    I.waitForElement(designerSystemSettingsPage.warnings.hotkeyWillNotWorkInBrowser);
    }
    I.click(designerSystemSettingsPage.warnings.okButton);
    if (globalCurrentVersion >= 711000) {
    I.click(designerSystemSettingsPage.captureConfigurableKeys.restoreDefaultsButton);
    } else {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.cancelButton);
        I.click(designerSystemSettingsPage.links.captureConfigurableKeys);
    }
    let defaultKey = await I.grabTextFrom(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsKeys);
    if (globalCurrentVersion < 709000) {
    assert.strictEqual(defaultKey, "CTRL then SHIFT + S", "Default keys for Activity Settings weren't restored");
    } else {
        assert.strictEqual(defaultKey, "CTRL , SHIFT + S", "Default keys for Activity Settings weren't restored");
    }
    
    //Change Activity Setting keys to already in use CTRL,S 
    I.click(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsItem);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);

    I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
    
    I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);    
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//label[contains(text(), 'Please provide a unique shortcut')]");
    }else {
    I.waitForElement(designerSystemSettingsPage.warnings.provideUniqueShortcut);
    }
    I.click(designerSystemSettingsPage.warnings.okButton);

    if (globalCurrentVersion >= 711000) {
    I.click(designerSystemSettingsPage.captureConfigurableKeys.restoreDefaultsButton);
    } else {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.cancelButton);
        I.click(designerSystemSettingsPage.links.captureConfigurableKeys);
    }

    defaultKey = await I.grabTextFrom(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsKeys);
    if (globalCurrentVersion < 709000) {
    assert.strictEqual(defaultKey, "CTRL then SHIFT + S", "Default keys for Activity Settings weren't restored");
    } else {
        assert.strictEqual(defaultKey, "CTRL , SHIFT + S", "Default keys for Activity Settings weren't restored");
    }

    //Change Activity Settings keys to CTRL+Right Arrow
    I.click(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsItem);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);

    I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);

    I.click(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
    I.selectOption(designerSystemSettingsPage.captureConfigurableKeys.customKeyDropdown, "RIGHT ARROW");
        
    I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//label[contains(text(), 'This hotkey key already in use by Thin client')]");
    }else if (globalCurrentVersion >= 712000) {
        I.waitForElement("//div[contains(text(), 'This hotkey is already in use by Capture Client')]");
    }else  {
    I.waitForElement(designerSystemSettingsPage.warnings.hotkeyUsedByThinClient);
    }
    I.click(designerSystemSettingsPage.warnings.okButton);

    if (globalCurrentVersion >= 711000) {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.restoreDefaultsButton);
        } else {
            I.click(designerSystemSettingsPage.captureConfigurableKeys.cancelButton);
            I.click(designerSystemSettingsPage.links.captureConfigurableKeys);
        }

    defaultKey = await I.grabTextFrom(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsKeys);
    if (globalCurrentVersion < 709000) {
        assert.strictEqual(defaultKey, "CTRL then SHIFT + S", "Default keys for Activity Settings weren't restored");
        } else {
            assert.strictEqual(defaultKey, "CTRL , SHIFT + S", "Default keys for Activity Settings weren't restored");
        }

    //Change Activity Settings keys to CTRL+Left Arrow
    I.click(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsItem);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);
 
    I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
    I.click(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
 
    I.click(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
    I.selectOption(designerSystemSettingsPage.captureConfigurableKeys.customKeyDropdown, "LEFT ARROW");
    I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);
    if (globalCurrentVersion < 710000) {
        I.waitForElement("//label[contains(text(), 'This hotkey key already in use by Thin client')]");
    }else if (globalCurrentVersion >= 712000) {
        I.waitForElement("//div[contains(text(), 'This hotkey is already in use by Capture Client')]");
    }else  {
    I.waitForElement(designerSystemSettingsPage.warnings.hotkeyUsedByThinClient);
    }
    I.click(designerSystemSettingsPage.warnings.okButton);
    
    if (globalCurrentVersion >= 711000) {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.restoreDefaultsButton);
    } else {
            I.click(designerSystemSettingsPage.captureConfigurableKeys.cancelButton);
            I.click(designerSystemSettingsPage.links.captureConfigurableKeys);
        }


    defaultKey = await I.grabTextFrom(designerSystemSettingsPage.captureConfigurableKeys.activitySettingsKeys);
    if (globalCurrentVersion < 709000) {
        assert.strictEqual(defaultKey, "CTRL then SHIFT + S", "Default keys for Activity Settings weren't restored");
        } else {
            assert.strictEqual(defaultKey, "CTRL , SHIFT + S", "Default keys for Activity Settings weren't restored");
        }
 
    //Change First Document keys to SHIFT+F1
        let firstDocumentKeyLocator = await designerSystemSettingsPage.getCommandKeysLocator('First Document');
        let ItemKey = await I.grabTextFrom(firstDocumentKeyLocator);
        if (ItemKey != 'SHIFT + F1') {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.firstDocumentItem);
        I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);
 
        I.waitForElement(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
        I.click(designerSystemSettingsPage.captureConfigurableKeys.singleShortcutOption);
        
        
        I.click(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
        I.selectOption(designerSystemSettingsPage.captureConfigurableKeys.customKeyDropdown, "F1");
     
        I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);
       
        
        
        ItemKey = await I.grabTextFrom(firstDocumentKeyLocator);
        console.log(ItemKey);
        assert.strictEqual(ItemKey, "SHIFT + F1", "Custom hotkey wasn't applied for First Document command");
        } else {
            console.log('test is skipped, custom hotkey is already set');
        }
    

    //Change First Folder keys to CTRL, SHIFT+F1
        let firstFolderKeyLocator = await designerSystemSettingsPage.getCommandKeysLocator('First Folder');
        ItemKey = await I.grabTextFrom(firstFolderKeyLocator);
        console.log(ItemKey);
        if ((ItemKey != 'CTRL , SHIFT + F1') && (ItemKey != 'CTRL then SHIFT + F1')) {
        I.click(designerSystemSettingsPage.captureConfigurableKeys.firstFolderItem);
        I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);
 
        I.click(designerSystemSettingsPage.captureConfigurableKeys.shiftCheckbox);
        I.selectOption(`(${designerSystemSettingsPage.captureConfigurableKeys.customKeyDropdown})[2]`, "F1");
     
        I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);

        
        ItemKey = await I.grabTextFrom(firstFolderKeyLocator);
        console.log(ItemKey);
        if (globalCurrentVersion < 709000) {
            assert.strictEqual(ItemKey, "CTRL then SHIFT + F1", "Custom hotkey wasn't applied for First Folder command");
        } else {
            assert.strictEqual(ItemKey, "CTRL , SHIFT + F1", "Custom hotkey wasn't applied for First Folder command");
            }
        } else {
            console.log('test is skipped, custom hotkey is already set');
        }
        
   
    if (globalCurrentVersion >= 711000) {
        //Change First Page keys to CTRL, Enter
            let firstPageKeyLocator = await designerSystemSettingsPage.getCommandKeysLocator('First Page');
            ItemKey = await I.grabTextFrom(firstPageKeyLocator);
            console.log(ItemKey);
            if (ItemKey != 'CTRL , ENTER') {
            I.click(designerSystemSettingsPage.captureConfigurableKeys.firstPageItem);
            I.click(designerSystemSettingsPage.captureConfigurableKeys.editRecordPencilButton);
 
            I.selectOption(`(${designerSystemSettingsPage.captureConfigurableKeys.customKeyDropdown})[2]`, 'ENTER');
                 
            I.click(designerSystemSettingsPage.captureConfigurableKeys.commandEditOkButton);
 
            newItemKey = await I.grabTextFrom(firstPageKeyLocator);
            console.log(newItemKey);
            assert.strictEqual(newItemKey, "CTRL , ENTER", "Custom hotkey wasn't applied for First Page command");
            }
        } else {
            console.log('test is skipped, this functionaly is available in KTA 7.11 and above');
        }
    I.click(designerSystemSettingsPage.captureConfigurableKeys.saveButton);
    I.waitForElement(designerSystemSettingsPage.settingsUpdatedSuccessfullyPopup);
    
});