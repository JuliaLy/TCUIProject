const assert = require('assert');
const { I } = inject();

module.exports = {
  commonElement: "//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr",
  commonRejectedDocument: "//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr//span[@class='rejectedOverlay' and @style='']",
  commonInvalidItem: "//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr//span[@class='invalidOverlay' and @style='']",
  commonForceValidItem: "//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr//span[@class='forcedValidOverlay' and @style='']",
  rootFolder: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[1]", //RootFolder is item1 in Navigator
  item2: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[2]",
  item3: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[3]",
  item4: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[4]",
  item5: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[5]",
  item6: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[6]",
  item7: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[7]",
  item8: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[8]",
  item9: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[9]",
  item10: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[10]",
  item11: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[11]",
  item12: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[12]",
  item13: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[13]",
  item14: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[14]",
  item15: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[15]",
  item16: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[16]",
  item17: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[17]",
  item18: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[18]",
  item19: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[19]",
  item20: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[20]",
  item21: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[21]",


  documentType: {
    item2: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[2]//td[2]",
    item3: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[3]//td[2]",
    item4: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[4]//td[2]",
    item5: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[5]//td[2]",
    item6: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[6]//td[2]",
    item7: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[7]//td[2]",
    item8: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[8]//td[2]",
    item9: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[9]//td[2]",
    item10: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[10]//td[2]",
    item11: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[11]//td[2]",

    },

  folderExpander1: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr//div[contains(@class, 'x-tree-expander')])[1]",
  folderExpander2: "(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr//div[contains(@class, 'x-tree-expander')])[2]",

  commonActiveContexMenuItem: "//div[contains(@id,'context-menu')]//a[@role='menuitem' and @aria-hidden='false' and @aria-disabled='false']",
  commonVisibleContextMenuItem: "//div[contains(@id,'context-menu')]//a[@role='menuitem' and @aria-hidden='false']",

  createFolderContextMenu: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Create Folder')]",
  deleteContextMenu:"//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Delete')]",
  rejectDocumentContextMenu: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Reject')]",
  unrejectDocumentContextMenu: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Un-reject')]",
  changeTypeContextMenu:"//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Change Type')]",
  mergeSelectedContextMenu: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Merge Selected')]",
  mergeToPreviousContextMenu: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Merge to Previous')]",

  rejectionNoteField: "//div[contains(@id, 'rejectreasondialog')]//textarea",
  rejectionNoteOkButton: "//div[contains(@id, 'rejectreasondialog')]//span[contains(text(), 'OK')]",

  deletionFolderYesButton:"//span[contains(@id,'button') and contains(text(),'Yes')]",

  hotkeyList: "//div[@id='command-cue-help']",

  
  async createSubfolder(folder) {
    I.click(folder);
    I.rightClick(folder);
    I.click(this.createFolderContextMenu);
  },
  
  async rejectDocumentUsingContextMenu(itemNumber) {
    const doc = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]`;
    I.click(doc);
    I.rightClick(doc);
    I.waitForElement(this.rejectDocumentContextMenu);
    I.click(this.rejectDocumentContextMenu);
    I.waitForElement(this.rejectionNoteField);
    I.fillField(this.rejectionNoteField, 'Test rejection note');
    I.click(this.rejectionNoteOkButton);
    I.waitForElement(`(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]//span[@class="rejectedOverlay" and @style=""]`);
    },

  async unrejectDocumentUsingContextMenu(itemNumber) {
      const doc = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]`;
      I.click(doc,null, {position: {x: 10, y: 10}});
      I.rightClick(doc);
      I.waitForElement(this.unrejectDocumentContextMenu);
      I.click(this.unrejectDocumentContextMenu);
      
      I.waitForElement(`(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]//span[@class="rejectedOverlay" and @style="color:transparent;"]`);
      },

  async unrejectDocumentUsingHotkey(itemNumber) {
    const doc = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber}]`;
    I.click(doc);
    I.pressKey('Control');
    I.waitForElement(this.hotkeyList);
    I.pressKey('r');
  },

  async mergeDocumentsUsingContextMenu(itemNumber1, itemNumber2) {
    const doc1 = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber1}]`;
    const doc2 = `(//div[contains(@id, 'batchtree')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[${itemNumber2}]`;
    I.click(doc1);
    I.pressKeyDown('Control');
    I.click(doc2);
    I.pressKeyUp('Control');
    I.rightClick(doc1);
    I.waitForElement(this.mergeSelectedContextMenu);
    I.click(this.mergeSelectedContextMenu);
    },
  
    async changeDocumentType(item, docType) {
      const doctypeCell = '(' + item +'//td)[2]';
      const doctypeMenuItem = `//li[contains(text(),'${docType}')]`;
      I.click(doctypeCell);
      I.wait(2);        
      const menuItemVisible = await I.grabNumberOfVisibleElements(doctypeMenuItem);
      if (menuItemVisible == 0) {
        I.pressKey('Arrow Down');
        I.wait(1);
      }
      I.click(doctypeMenuItem);
      I.dontSeeElement(doctypeMenuItem);
      const currentDocType = await I.grabTextFrom(doctypeCell);
      assert.strictEqual(currentDocType, docType, "Document type is not applied");
      
    },
    
    async checkDocumentContextMenuVerification() {

      const allContexMenuItemNumber = await I.grabNumberOfVisibleElements(this.commonVisibleContextMenuItem);
      console.log(allContexMenuItemNumber);
      assert.strictEqual(allContexMenuItemNumber, 4, "All context menu item number is not equal 4");

      const activeContexMenuItemNumber = await I.grabNumberOfVisibleElements(this.commonActiveContexMenuItem);
      console.log(activeContexMenuItemNumber);
      assert.strictEqual(activeContexMenuItemNumber, 1, "Active context menu item number is not equal 1");

      I.seeAttributesOnElements("//div[contains(@class, 'x-menu-item')]//a[contains(@id, 'delete')]", {'aria-disabled': "true", 'aria-hidden': "false"});
      I.seeAttributesOnElements("//div[contains(@class, 'x-menu-item')]//a[contains(@id, '-reject')]", {'aria-disabled': "false", 'aria-hidden': "false"});
      I.seeAttributesOnElements("//div[contains(@class, 'x-menu-item')]//a[contains(@id, 'unreject')]", {'aria-disabled': "true", 'aria-hidden': "false"});
      I.seeAttributesOnElements("//div[contains(@class, 'x-menu-item')]//a[contains(@id, 'mergeDocument')]", {'aria-disabled': "true", 'aria-hidden': "false"});

    }

};
