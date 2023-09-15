const { I } = inject();
const assert = require('assert');
const { chromium } = require('playwright');

module.exports = {

  scanActivityTab: {
    mandatoryKTAField: "//input[@name='textbox1']",
    requiredFieldIconVisible: "//div[contains(@class,'form-error-wrap') and (@style='')]//div[contains(@class,'form-invalid-icon') and contains(@data-errorqtip,'This field is required')]",
    requiredFieldIconInvisible: "//div[contains(@class,'form-error-wrap') and (@style='display: none;')]//div[contains(@class,'form-invalid-icon') and contains(@data-errorqtip,'This field is required')]",
  },
  validationActivityTab: {
    setAddressAndCityValidButton: "//span[contains(text(),'Set Address and City valid')]",
    setFirstNameAsInvalidButton: "//span[contains(text(),'Set FirstName as Invalid')]",
  },

  verificationActivityTab: {
    KTAMandatoryField: "//input[@name = 'KTAMandatoryField']",
  },

  folderTabFields: {
    field1: "//input[@name='FIELD1']",
    field2: "//input[@name='FIELD2']",
  },

  BHPassport: {
    passportNumberLabel: "//span[contains(text(), 'Passport Number')]",
    firstNameLabel: "//span[contains(text(), 'FirstName')]",
    firstNameField: "//input[@name='FirstName']",
    firstNameElementHidden: "//div[contains(@style, 'display: none')]//span[contains(text(), 'FirstName')]",
    column1Header: "//span[contains(text(), 'Column1')]",
    setExtractionConfidentButton: "//a[contains(@class, 'button')]//span[contains(text(), 'ExtractionConfident set to TRUE')]",
    getExtractionConfidentButton: "//a[contains(@class, 'button')]//span[contains(text(), 'Get ExtractionConfident')]",
    extractionConfidentTextbox: "//input[@name='textbox1']",
  },

  BHDriverLicense: {
    firstNameField:"//input[@name='FirstName']",
    addressField:"//input[@name='Address']",
    postcodeField: "//input[@name='PostCode']",
    stateFieldPicker: "(//div[contains(@id,'fieldspanel')]//div[contains(@id,'picker') and not(contains(@style,'display:none'))])[2]",
    stateField: "//input[@name='State']",
    DOBField: "//input[@name='DOB']",
    cityFieldPicker: "(//div[contains(@id,'fieldspanel')]//div[contains(@id,'picker') and not(contains(@style,'display:none'))])[1]",
    cityField: "//input[@name='City']",
  },

  AAMInvoice: {
    invoiceLinesLabel: "//div[contains(text(), 'Invoice Lines')]",
  },

  table: {
    deleteRowButton:"//a[contains(@data-qtip, 'Delete Row')]",
    addRowButton: "//a[contains(@data-qtip, 'Add Row')]",
    insertRowButton: "//a[contains(@data-qtip, 'Insert Row')]",
    interpolateRowsButton: "//a[contains(@data-qtip, 'Interpolate Rows')]",
    selectAllRowsButton: "//a[contains(@data-qtip, 'Select All Rows')]",
  },
  
  documentTab: "//span[contains(text(),'Document') and contains(@id, 'tab')]",
  folderTab: "//span[contains(text(),'Folder')]",
  activityTab: "//span[contains(text(),'Activity')]",
  
  invalidFieldIcon: "//div[contains(@class, 'cebpm-capture-field')]//div[contains(@class, 'fieldInvalid')]",
  forceValidIcon: "//div[contains(@id,'extraIcon') and contains(@class, 'flash_on')]",

  commonMiniviewer: "(//div[contains(@id, 'miniviewer') and contains(@class, 'mini-viewer')]//img)",
  commonTableRow: "//table[contains(@id, 'gridview')]",

  async mandatoryFieldCheck (field) {
    I.waitForElement(field);
    const isRequired = await I.grabAttributeFrom(field, 'aria-required');
    const isInvalid = await I.grabAttributeFrom(field, 'aria-invalid');
    console.log(isRequired);
    I.waitForElement(this.scanActivityTab.requiredFieldIconVisible);
    if ((isRequired != 'true') && (isInvalid != 'true')) {
      return "not ok";
    }
    return "ok";
  },
  
  async invalidFieldsCountCheck(item, expectedInvalidFieldsCount) {
    I.click(item);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    const invalidFieldsCount0 = await I.grabNumberOfVisibleElements(this.invalidFieldIcon);
    console.log(invalidFieldsCount0);
    I.click(this.documentTab);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    const invalidFieldsCount = await I.grabNumberOfVisibleElements(this.invalidFieldIcon);
    console.log(invalidFieldsCount);
    console.log(expectedInvalidFieldsCount);
    assert.strictEqual(invalidFieldsCount, expectedInvalidFieldsCount, "Invalid fields number in current document doesn't match");
  },

  async checkPDFMiniviewers(item) {
    I.click(item);
    I.wait(3);
    const miniviewerCount = await I.grabNumberOfVisibleElements(this.commonMiniviewer);
    console.log(miniviewerCount);
    for (let  i = 1; i <= miniviewerCount; i++) {
      let miniviewerValue = await I.grabAttributeFrom(this.commonMiniviewer +'['+ i +']', 'src');
      console.log(miniviewerValue);
      if (miniviewerValue != "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==") {
        return "not ok";
      }
    }
    return "ok"; 
  },

  async checkPostcode(value) {
    I.doubleClick(this.BHDriverLicense.postcodeField);
    I.pressKey(value);
    I.pressKey("Enter");
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    const errorMessage = await I.grabValueFrom("//textarea[contains(@class, 'error-text')]");
    switch(value) {
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
    }
    
  },

  async checkTableFieldValue(row, column, value) {
   const tableCellValue = await I.grabTextFrom(`(//table[contains(@id, 'gridview')])[${row}]//td[${column+1}]//div`);
   console.log(tableCellValue);
   assert.strictEqual(tableCellValue, value, "Field value doesn't match");



  },

};
