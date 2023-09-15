const { I } = inject();

module.exports = {

  userInterfaceMenuItem:"//span[contains(text(),'User interface')]",
  formsMenuItem:"//div[contains(@class,'expanded')]//a[@href='#/forms/forms']",
  searchFieldInput:"//span[@id='searchFilter']//input",
  searchButton:"//span[@id='searchFilter']//button",
  devDocReviewFormLink:"//label[contains(text(),'DEV_ThinClient_Sanity_Process_Doc_Rev_DocumentReview')]",
  devSCNJFormLink:"//label[text()='DEV_ThinClient_Sanity_Process_Scan']",
  devValidationFormLink: "//label[text()='DEV_ThinClient_Sanity_Process_Validate_Validation']",
  devValidationForm: {
    captureControlArea:"//div[contains(@class, 'capture-control-area')]",
    showInPlaceEditorCheckbox:"//agility-checkbox[@id='enableInPlaceEditor']//ejs-checkbox//span",
    showInPlaceEditorCheckboxChecked:"//agility-checkbox[@id='enableInPlaceEditor']//ejs-checkbox//span[contains(@class, 'check')]",
  },
  docReviewForm: {
    captureControlArea:"//div[contains(@class, 'capture-control-area')]",
    showCompleteAndTakeNextCheckbox:"//agility-checkbox[@id='showCompleteTakeNext']//ejs-checkbox//span",
    showCompleteAndTakeNextCheckboxChecked:"//agility-checkbox[@id='showCompleteTakeNext']//ejs-checkbox//span[contains(@class, 'check')]",
    navigateNextErrorCheckbox:"//agility-checkbox[@id='navigateNextError']//ejs-checkbox//span",
    navigateNextErrorCheckboxChecked:"//agility-checkbox[@id='navigateNextError']//ejs-checkbox//span[contains(@class, 'check')]",
  },
  SCNJForm: {
    captureControlArea:"//div[contains(@class, 'capture-control-area')]",
    documentVariantSelectionField: "//agility-select[@name='documentVariant']//div[@id='selectionTextContainer']",
    documentVariantPencilIcon:"//agility-select[@name='documentVariant']//i[contains(@class, 'icon-mode_edit')]",
    documentVariantTextField: "//agility-select[@name='documentVariant']//input[@name='documentVariantInlineText']",
  },
  releaseFormButton:"//button[contains(text(),'Release')]",
  closeAndUnlockButton:"//button[contains(text(),'Close and unlock')]",
  discardChangesDialog:"//div[contains(text(), 'Are you sure you want to discard your changes?')]",
  discardChangesYesButton:"//ejs-dialog//button[@id='btnYes']",



}
