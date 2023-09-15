const { I } = inject();

module.exports = {

  controlLayouts: {
    rocRevLayout: "//label[text()='RocRev']",
    editCaptureControlLayoutLabel: "//label[text()='Edit capture control layout']",
    imageViewerPanel: "//td[contains(text(),'Image viewer')]",
    fieldsPanel: "//td[contains(text(),'Fields')]",
    navigatorPanel: "//td[contains(text(),'Navigator')]",
    widthValue: "//input[@id='percentagepanelWidth']",

    cancelButton: "//button[@id='cancelButton']",
    saveButton: "//button[@id='saveButton']",

    captureControlLayoutUpdatedSuccessfullyMessage: "//div[contains(text(), 'Capture control layout updated successfully')]",
  }

}
