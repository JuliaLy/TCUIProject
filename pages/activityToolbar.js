const { I, settingsPage, designerSystemSettingsPage } = inject();



module.exports = {

  scanSettingsButton: "//span[contains(@class, 'scanSettingsButton')]",
  importFilesButton: "//span[contains(@class,'scanAllButton')]",
  scannerLabel: "//label[contains(@class, 'capture-toolbar-text') and contains(text(), 'File Import')]",
  createJobButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Create Job')]",
  cancelActivityButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Cancel Activity')]",
  completeAndTakeNextActivityButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Complete and Take Next Activity')]",
  completeActivityButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Complete Activity')]",
  firstFolderButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'First Folder')]",
  previousFolderButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Previous Folder')]",
  nextFolderButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Next Folder')]",
  lastFolderButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Last Folder')]",
  firstDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'First Document')]",
  previousDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Previous Document')]",
  nextDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Next Document')]",
  lastDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Last Document')]",
  rejectDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Reject Document')]",
  deleteDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Delete Document')]",
  mergeButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Merge')]",
  splitDocumentButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Split Document')]",
  deletePageButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Delete Page')]",
  swapFrontAndBackSides: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Swap Front and Back')]",
  nextProblemButton:"//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Next Problem')]",
  overrideProblemButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Override Problem')]",
  restoreProblemButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Restore Problem')]",

  activitySettingsButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip, 'Activity Settings')]",

  activitySettings: {
    option1: "(//fieldset[@aria-label='End of Activity Behavior field set']//input)[1]",
    option2: "(//fieldset[@aria-label='End of Activity Behavior field set']//input)[2]",
    option3: "(//fieldset[@aria-label='End of Activity Behavior field set']//input)[3]",
    okButton: "//a[contains(@class,'x-btn')]//span[contains(text(), 'OK')]"
  },
  statusBar: {
    nothingToUploadMessage: "//div[contains(@id, 'statusbaritem') and contains(text(), 'Nothing to Upload')]",
    readyMessage: "//div[contains(@id, 'statusbaritem') and contains(text(), 'Ready')]",
    filesToUploadMessage: "//div[contains(@id, 'statusbaritem') and contains(text(), 'Files to Upload')]",
    uploadingFilesMessage: "//div[contains(@id, 'statusbaritem') and contains(text(), 'Uploading Files')]",
  },

  completeActivityDialogMessage: "//div[contains(text(), 'Except for rejected documents, all items in this activity are valid. Do you want to complete the activity?')]",
  completeActivityDialogMessage2: "//div[contains(text(), 'Do you want to complete this activity?')]",
  confirmMessageboxButton: "//div[contains(@class,'x-message-box')]//span[contains(@id, 'button') and contains(text(), 'Yes')]",
  cancelMessageboxButton: "//div[contains(@class,'x-message-box')]//span[contains(@id, 'button') and contains(text(), 'No')]",

  invalidActivityTabMessagebox:"//div[contains(@id, 'messagebox') and contains(text(),'Invalid Activity Tab')]",
  invalidActivityTabMessageboxOkButton:"//div[contains(@id, 'messagebox')]//span[contains(text(),'OK')]",
  
  rejectionNoteField: "//div[contains(@id, 'rejectreasondialog')]//textarea",
  rejectionNoteOkButton: "//div[contains(@id, 'rejectreasondialog')]//span[contains(text(), 'OK')]",
 
  collapseLeftPannel: "//div[contains(@class, 'x-splitter')]//div[contains(@class, 'x-layout-split-left')]", 
  collapseRightPannel: "//div[contains(@class, 'x-splitter')]//div[contains(@class, 'x-layout-split-right')]",  
  collapseBottomPannel1: "(//div[contains(@class, 'x-splitter')]//div[contains(@class, 'x-layout-split-bottom')])[1]", //Current error panel in default layout
  collapseBottomPannel2: "(//div[contains(@class, 'x-splitter')]//div[contains(@class, 'x-layout-split-bottom')])[2]", //Thumbnails panel in default layout


  paths: {
    allDocs: "./uploadScript/allDocs.exe",
    pdfDoc: "./uploadScript/particularDocs/pdf.exe",
    appDoc: "./uploadScript/particularDocs/app.exe",
    driverLicense: "./uploadScript/particularDocs/driverLicense.exe",
    passport: "./uploadScript/particularDocs/passport.exe",
    utility: "./uploadScript/particularDocs/utility.exe",
    invoice: "./uploadScript/particularDocs/invoice.exe"
  },

  scanSettingsWindow: {
    selectScannerComboboxPicker: "//div[@id='scan-settings-scanner-scanner-selection-combobox-trigger-picker']",
    fileImportValue: "//*[(@role='option') and contains(text(), 'File Import')]",
    okButton: "//a[@id='save-settings-button']",
    colorMode: "(//input[@name = 'color'])[4]"
  },
  async setFileImport() {
    I.waitForElement(this.scanSettingsButton);
    I.click(this.scanSettingsButton);
    I.waitForElement(this.scanSettingsWindow.selectScannerComboboxPicker);
    I.click(this.scanSettingsWindow.selectScannerComboboxPicker);
    I.click(this.scanSettingsWindow.fileImportValue);
    I.click(this.scanSettingsWindow.colorMode);
    I.click(this.scanSettingsWindow.okButton);
    I.waitForElement(this.scannerLabel);
  },
  async importDoc(doc, folder) {
    const exec = require('child_process').execFile;
    I.waitForElement(folder);
    I.click(folder); 
    I.click(this.importFilesButton);
    
    exec(doc, function(err, data) {  
         console.log(err);                  
     });
    I.waitForElement(folder);
  },  
  importDocWithoutClickingFolder(doc, folder) {
    const exec = require('child_process').execFile;
    I.waitForElement(folder);
    I.click(this.importFilesButton);
    exec(doc, function(err, data) {  
         console.log(err);                  
     });
    I.waitForElement(folder);
  },  
  async checkToolbarRootfolderLastdoc() {
    I.seeAttributesOnElements(this.firstFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.previousFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.nextFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.lastFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.firstDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.previousDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.nextDocumentButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.lastDocumentButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.rejectDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.deleteDocumentButton, {'aria-disabled': "false"});
  },
  async checkToolbarRootfolderFirstdoc() {
    I.seeAttributesOnElements(this.firstFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.previousFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.nextFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.lastFolderButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.firstDocumentButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.previousDocumentButton, {'aria-disabled': "true"});
    I.seeAttributesOnElements(this.nextDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.lastDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.rejectDocumentButton, {'aria-disabled': "false"});
    I.seeAttributesOnElements(this.deleteDocumentButton, {'aria-disabled': "false"});
  },

  async checkToolbarVerification(globalCurrentVersion) {
    I.seeAttributesOnElements(this.deleteDocumentButton, {'aria-hidden': "true"});
    
    if (globalCurrentVersion >= 711000) {
      I.seeAttributesOnElements(this.mergeButton, {'aria-hidden': "true"});
      I.seeAttributesOnElements(this.splitDocumentButton, {'aria-hidden': "true"});
      I.seeAttributesOnElements(this.swapFrontAndBackSides, {'aria-hidden': "true"});
    }
    I.seeAttributesOnElements(this.rejectDocumentButton, {'aria-hidden': "false", 'aria-disabled': "false"});

  },
  async splitDocumentFromPageUsingToolbar (docNumber, pageNumber) {
    const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
    I.click(page);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.wait(1);
    I.click(this.splitDocumentButton);
  },
  
  async deletePageUsingToolbar (docNumber, pageNumber) {
    const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
    I.click(page);
    I.click(this.deletePageButton);
    I.click(this.confirmMessageboxButton);
    I.waitForInvisible(page);
  }, 

  async deleteDocumentUsingToolbar (doc, docCount) {
    I.click(doc);
    I.click(this.deleteDocumentButton);
    I.click(this.confirmMessageboxButton);
    I.waitForInvisible(`(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${docCount}]`);
    
  }, 

  async cancelActivity() {
    I.click(this.cancelActivityButton);
    I.click(this.confirmMessageboxButton);
  },

  async rejectDocumentUsingToolbar(itemNumber) {
    const doc = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]`;
    I.click(doc);
    I.click(this.rejectDocumentButton);
    I.waitForElement(this.rejectionNoteField);
    I.fillField(this.rejectionNoteField, 'Test rejection note');
    I.click(this.rejectionNoteOkButton);
    I.waitForElement(`(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]//span[@class="rejectedOverlay" and @style=""]`);
    },

  async mergeToPreviousUsingToolbar(itemNumber) {
    const doc = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]`;
    I.click(doc);
    I.click(this.mergeButton);
    },

    async collapseAllPanels() {
      I.waitForClickable(this.collapseLeftPannel);
      I.click(this.collapseLeftPannel);
      I.click(this.collapseRightPannel);
      I.click(this.collapseBottomPannel1);
      I.click(this.collapseBottomPannel2);
      },
    
    async setAutocompleteOption(option) {
      I.click(this.activitySettingsButton);
      I.click(option);
      I.click(this.activitySettings.okButton);
    },

    async overrideProblemDocument(item) {
    I.click(item);
    I.seeElement(item + "//span[@class='invalidOverlay' and @style='']");
    I.click(this.overrideProblemButton);
    I.seeElement(item + "//span[@class='forcedValidOverlay' and @style='']");

    }
};
