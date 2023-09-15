const { I, settingsPage } = inject();
const assert = require('assert');

module.exports = {

  copyright: "//div[@class='footer']",
  label: "//img[@alt='Kofax Logo']",
  settingsUpdatedSuccessfullyPopup: "//div[contains(text(), 'Settings updated successfully')]",
  
  links: {
    primaryServerStatistics: "//span[contains(text(), 'Primary server statistics')]",
    captureConfigurableKeys:"//span[contains(text(), 'Capture configurable keys')]",
    activityForms:"//span[contains(text(), 'Activity forms')]",
    captureOperations: "//span[contains(text(), 'Capture operations')]",
  },
  activityForms: {
    activityFormsLabel: "//label[contains(text(), 'Activity forms')]",
    preserveOCRDataIsChecked: "//agility-checkbox[@name='perserveOCRData']//span[contains(@class, 'e-check')]",
    preserveOCRData: "//agility-checkbox[@name='perserveOCRData']",
    saveButton: "//button[@id='saveButton']",
    cancelButton: "//button[@id='cancelButton']",

  },
  captureConfigurableKeys: {
    captureConfigurableKeysWindowLabel:"//label[text()='Capture configurable keys']",
    activitySettingsItem:"//td//div[text()='Activity Settings']",
    activitySettingsKeys:"//tr[@id='rowId0']//td[2]//div",
    firstDocumentItem:"//td//div[text()='First Document']",
    firstDocumentKeys:"//tr[@id='rowId14']//td[2]//div",
    firstFolderItem:"//td//div[text()='First Folder']",
    firstFolderKeys:"//tr[@id='rowId15']//td[2]//div",
    firstPageItem:"//td//div[text()='First Page']",
    firstPageKeys:"//tr[@id='rowId16']//td[2]//div",
    editRecordPencilButton:"//i[@name='edit-record']",
    singleShortcutOption:"(//div[contains(@class, 'agility-input-radiobutton')]//input[@name='formWidthMode'])[1]",
    doubleShortcutOption:"(//div[contains(@class, 'agility-input-radiobutton')]//input[@name='formWidthMode'])[2]",
    ctrlCheckbox:"//agility-checkbox[@name='confirmorvalidatewithtabkey']//ejs-checkbox[not(contains(@class, 'disabled'))]//input",
    shiftCheckbox:"//agility-checkbox[@name='highlightentirefield']//ejs-checkbox[not(contains(@class, 'disabled'))]//input",
    customKeyDropdown:"//select[@id='customekey']",
    rightArrowOption:"//option[contains(text(), 'RIGHT ARROW')]",
    leftArrowOption: "//option[contains(text(), 'LEFT ARROW')]",
    keyInputField:"//div[contains(@class, 'select-class')]//input[@type='text']",
    commandEditOkButton:"//button[@id='editFormConfirm']",
    restoreDefaultsButton: "//button[@id='restoreButton']",
    cancelButton:"//button[@id='cancelButton']",
    saveButton:"//button[@id='saveButton']",
  },
  primaryServerStatistics: {
    informationTabLabel: "//span[@role='presentation' and contains(text(),'Information')]",
    imagingPageCountAnnualRemaining: "//agility-edit-table[@id='volumeLicenses']//tr[@id='rowId0']//td[3]",
    imagingPageCountAnnualFullcount: "//agility-edit-table[@id='volumeLicenses']//tr[@id='rowId0']//td[4]",
    imagingPageCountAnnualUsed: "//agility-edit-table[@id='volumeLicenses']//tr[@id='rowId0']//td[5]"
  },
  captureOperations: {
    addRecordButton: "//i[@name='add-record']",
    editRecordButton: "//i[@name='edit-record']",
    deleteRecordButton: "//i[@name='delete-record']",
    deleteRecordConfirmationDialog: "//div[contains(text(), 'Are you sure you want to delete this item?')]",
    deleteRecordConfirmationDialogOld: "//label[contains(text(), 'Are you sure you want to delete this item?')]",
    deleteRecordConfirmationButton: "//button[@id='btnYes']",
    resourcePicker: "//span[contains(@class, 'selectorTarget')]",
    administratorIndividual: "//div[contains(@class, 'row')]//label[contains(text(), 'Administrator')]",
    administratorListItem: "//div[@title='Administrator']",
    chosenAdministratorIndividual: "//span[@title='Administrator (Individual)']",
    rejectDocumentsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rejectDocuments']//span",
    rejectDocumentsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rejectDocuments']//span[contains(@class, 'e-check')]",
    deleteDocumentsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteDocuments']//span",
    deleteDocumentsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteDocuments']//span[contains(@class, 'e-check')]",
    changeDocumentTypeCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='documentType']//span",
    changeDocumentTypeCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='documentType']//span[contains(@class, 'e-check')]",
    splitDocumentsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='splitDocuments']//span",
    splitDocumentsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='splitDocuments']//span[contains(@class, 'e-check')]",
    splitOnBackPageCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='splitBackPage']//span",
    splitOnBackPageCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='splitBackPage']//span[contains(@class, 'e-check')]",
    mergeDocumentsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='mergeDocuments']//span",
    mergeDocumentsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='mergeDocuments']//span[contains(@class, 'e-check')]",
    rejectPagesCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rejectPages']//span",
    rejectPagesCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rejectPages']//span[contains(@class, 'e-check')]",
    deletePagesCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deletePages']//span",
    deletePagesCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deletePages']//span[contains(@class, 'e-check')]",
    rotatePagesCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rotatePages']//span",
    rotatePagesCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='rotatePages']//span[contains(@class, 'e-check')]",
    addFolderCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='allowAddFolderCmd']//span",
    addFolderCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='allowAddFolderCmd']//span[contains(@class, 'e-check')]",
    deleteFoldersCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteFolders']//span",
    deleteFoldersCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='deleteFolders']//span[contains(@class, 'e-check')]",
    annotationsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='annotations']//span",
    annotationsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='annotations']//span[contains(@class, 'e-check')]",
    onlineLearningCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='onlineLearning']//span",
    onlineLearningCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='onlineLearning']//span[contains(@class, 'e-check')]",
    overrideProblemsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='overrideProblems']//span",
    overrideProblemsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='overrideProblems']//span[contains(@class, 'e-check')]",
    allOtherBatchEditingOperationsCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='batchEditingOperationsAccess']//span",
    allOtherBatchEditingOperationsCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='batchEditingOperationsAccess']//span[contains(@class, 'e-check')]",
    webCaptureMaskAndRedactCheckbox: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='webCaptureMaskAndRedactImages']//span",
    webCaptureMaskAndRedactCheckboxChecked: "//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='webCaptureMaskAndRedactImages']//span[contains(@class, 'e-check')]",
    createDocumentsAndPagesCheckbox:"//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='createDocumentsAndPages']//span",
    createDocumentsAndPagesCheckboxChecked:"//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='createDocumentsAndPages']//span[contains(@class, 'e-check')]",
    modifyReadDocumentsCheckbox:"//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='modifyDocument']//span",
    modifyReadDocumentsCheckboxChecked:"//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='modifyDocument']//span[contains(@class, 'e-check')]",

    saveEditUserPermissionsButton:"//button[@id='addButton']",
    cancelEditUserPermissionsButton: "//agility-capture-operations-settings-configuration//button[@id='cancelButton']",

    saveCaptureOperationsButton: "//button[@id='saveButton']",
    cancelCaptureOperationsButton: "//agility-capture-operations-settings//button[@id='cancelButton']",



  },
  warnings: {
    hotkeyWillNotWorkInBrowser: "//div[contains(text(), 'This hotkey will not work on any browser')]",
    provideUniqueShortcut:"//div[contains(text(), 'Please provide a unique shortcut')]",
    hotkeyUsedByThinClient:"//div[contains(text(), 'This hotkey key already in use by Thin client')]",
    okButton: "//button[@id='btnOk']",
  },
  
  //Function below gets copyright info (e.g. "Version 7.11.0.0.0.351 (C) 1997-2022 Kofax. All rights reserved.") 
  async getCopyright() {
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);
    I.waitForElement(this.copyright);
    const copyright = I.grabTextFrom(this.copyright, 10);
    return copyright;
  },
  //Function below provides KTA version (e.g. for KTA 7.11.0.0.0.351 fuction result="711000", for KTA 7.9.0.13.0.581 fuction result="709013")
  async getVersion() {
    const KTACopyright = await this.getCopyright();
    const finalVersion = +KTACopyright.split(' ')[1].split('.')[0]*100000+(+KTACopyright.split(' ')[1].split('.')[1]*1000)+(+KTACopyright.split(' ')[1].split('.')[3]);
    return finalVersion;
  },
  
  //Function below gets TotalAgility Imaging Page Count Annual license values
  async getImagingPageCountLicenseValue() {
    I.amOnPage(`${settingsPage.url}/designer/#/system-settings`);
    I.wait(2);
    I.waitForElement(this.links.primaryServerStatistics);
    I.click(this.links.primaryServerStatistics);
    I.waitForElement(this.primaryServerStatistics.informationTabLabel);
    const rem = await (await I.grabTextFrom(this.primaryServerStatistics.imagingPageCountAnnualRemaining)).trim().split(',');
    const remaining = +rem[0]*1000+(+rem[1]);
    const fc = await (await I.grabTextFrom(this.primaryServerStatistics.imagingPageCountAnnualFullcount)).trim().split(',');
    let fullcount = +fc[0];
    if (fc.length == 3) {
      fullcount = +fc[0]*1000000+(+fc[1]*1000)+(+fc[2]);
    } else if( fc.length == 2) {
    fullcount = +fc[0]*1000+(+fc[1]);
    }
    const us = await (await I.grabTextFrom(this.primaryServerStatistics.imagingPageCountAnnualUsed)).trim().split(',');
    let used = 0;
    if (us.length > 1) {
      used = +us[0]*1000+(+us[1]);
    } else {
    used = +us;}
    const licenses =[remaining, fullcount, used];
    console.log(`Remaining: ${remaining}; fullcount: ${fullcount}; used: ${used}`);
    return licenses;
  },

  //This function returns row number of particular command in Capture configurable keys list
  async getCommandKeysLocator(command) {
    
    let commandName = "";
    for (let i = 0; i < 74; i++) {
      commandName = await I.grabTextFrom(`(//tr[@id='rowId`+ i +`']//div)[1]`);
      if (commandName == command) {
        const commandKeyLocator =  "//tr[@id='rowId"+ i +"']//td[2]//div";
        console.log(commandKeyLocator);
        return commandKeyLocator;
      } else {
        console.log('Command is not found');
      }
     
    }
  },

  //This function checks appropriate capture operations
  async checkCaptureOperation(operation) {
    
    const isChecked = await I.grabNumberOfVisibleElements("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='" + operation +"']//span[contains(@class, 'e-check')]");
    console.log(isChecked);
    if (isChecked == 0) {
        I.click("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='" + operation +"']//span");
    }
  },

  //This function checks if appropriate capture operations are checked
  async checkCaptureOperationIsChecked(operation) {
    
    const isChecked = await I.grabNumberOfVisibleElements("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='" + operation +"']//span[contains(@class, 'e-check')]");
    console.log(isChecked);
    assert.strictEqual(isChecked, 1, operation + 'is not checked' );
  },  


  //This function checks if appropriate capture operations are unchecked
  async checkCaptureOperationIsUnchecked(operation) {
    
    const isChecked = await I.grabNumberOfVisibleElements("//ejs-dialog[@id='captureResourceAclConfigurationDialog']//agility-checkbox[@id='" + operation +"']//span[contains(@class, 'e-check')]");
    console.log(isChecked);
    assert.strictEqual(isChecked, 0, operation + 'is checked' );
  },  
};
