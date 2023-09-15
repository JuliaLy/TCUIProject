const assert = require('assert');
const { I, activityToolbarPage } = inject();

module.exports = {
  
  contextMenuReplacePage: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Replace Page')]",
  contextMenuInsertPagesBefore: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Insert Pages Before')]",
  contextMenuSplitDocument: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Split Document')]",
  contextMenuDelete: "//div[contains(@class, 'x-menu-item')]//span[contains(text(), 'Delete')]",
  confirmDeleteMessageboxButton: "//div[contains(@class,'x-message-box')]//span[contains(@id, 'button') and contains(text(), 'Yes')]",

  commonActiveContexMenuItem: "//div[contains(@id,'context-menu')]//a[@role='menuitem' and @aria-hidden='false' and @aria-disabled='false']",
  commonVisibleContextMenuItem: "//div[contains(@id,'context-menu')]//a[@role='menuitem' and @aria-hidden='false']",

  currentPage1: "//div[contains(@data-qtip, 'Page 1') and contains(@class, 'x-item-selected')]",
  currentPage2: "//div[contains(@data-qtip, 'Page 2') and contains(@class, 'x-item-selected')]",
  currentPage3: "//div[contains(@data-qtip, 'Page 3') and contains(@class, 'x-item-selected')]",
  currentPage4: "//div[contains(@data-qtip, 'Page 4') and contains(@class, 'x-item-selected')]",

  paths: {
    allDocs: "./uploadScript/allDocs.exe",
    pdfDoc: "./uploadScript/particularDocs/pdf.exe",
    appDoc: "./uploadScript/particularDocs/app.exe",
    driverLicense: "./uploadScript/particularDocs/driverLicense.exe",
    passport: "./uploadScript/particularDocs/passport.exe",
    utility: "./uploadScript/particularDocs/utility.exe"
  },

async clickToDocumentPage(docNumber, pageNumber) {
  const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
  I.click(page);
},

async rightClickToDocumentPage(docNumber, pageNumber) {
  const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
  I.click(page);
  I.wait(1);
  I.rightClick(page);
},

async splitDocumentFromPageUsingContextMenu (docNumber, pageNumber) {
  const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
  
  I.click(page);
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  I.wait(2);
  I.rightClick(page);
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  I.wait(2);
  I.click(this.contextMenuSplitDocument);
  },

async deletePageUsingContextMenu (docNumber, pageNumber) {
    const page = `//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
    I.click(page);
    I.rightClick(page);
    I.wait(1);
    I.click(this.contextMenuDelete);
    I.click(this.confirmDeleteMessageboxButton);
    I.waitForInvisible(page);
  },
async countPagesInDocument (docNumber) {
  const pages = await I.grabNumberOfVisibleElements(`//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']`);
  return pages;
},

async movePageWithinDocument (docNumber, sourcePageNumber, targetPageNumber) {
  const sourcePage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${sourcePageNumber}]`;
  const sourceNextPage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${sourcePageNumber+1}]`;
  const targetPreviousPage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${targetPageNumber-1}]`;
  const targetPage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${targetPageNumber}]`;

  const sourceScr = await I.grabAttributeFrom(sourcePage, 'src');
  const sourceNextSrc = await I.grabAttributeFrom(sourceNextPage, 'src');
   
  I.dragAndDrop(sourcePage, targetPage);
  I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
  I.wait(3);
  const sourceScr1 = await I.grabAttributeFrom(sourcePage, 'src');
  const targetPreviousScr1 = await I.grabAttributeFrom(targetPreviousPage, 'src');

  if ((sourceScr1 == sourceNextSrc) && (targetPreviousScr1 == sourceScr)) {
    return 'ok';
  };
  return "not ok";
},

async movePageToAnotherDocument (sourceDocNumber, targetDocNumber, sourcePageNumber, targetPageNumber) {
  const sourcePage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${sourceDocNumber}]//div[@class='outer-thumbnail-wrap']//img)[${sourcePageNumber}]`;
  const targetPage = `(//div[contains(@id, 'multithumbnailspanel')]//table[${targetDocNumber}]//div[@class='outer-thumbnail-wrap']//img)[${targetPageNumber}]`;

  const sourceDocPageCount = await I.grabNumberOfVisibleElements(`//div[contains(@id, 'multithumbnailspanel')]//table[${sourceDocNumber}]//div[@class='outer-thumbnail-wrap']//img`);
  console.log(sourceDocPageCount);
  const targetDocPageCount = await I.grabNumberOfVisibleElements(`//div[contains(@id, 'multithumbnailspanel')]//table[${targetDocNumber}]//div[@class='outer-thumbnail-wrap']//img`);
  console.log(targetDocPageCount);
  const sourceScr = await I.grabAttributeFrom(sourcePage, 'src');
 
    
  I.dragAndDrop(sourcePage, targetPage);
  I.wait(3);
  
  const newPageSrc = await I.grabAttributeFrom(targetPage, 'src');
  const sourceDocPageCount1 = await I.grabNumberOfVisibleElements(`//div[contains(@id, 'multithumbnailspanel')]//table[${sourceDocNumber}]//div[@class='outer-thumbnail-wrap']//img`);
  console.log(sourceDocPageCount1);
  const targetDocPageCount1 = await I.grabNumberOfVisibleElements(`//div[contains(@id, 'multithumbnailspanel')]//table[${targetDocNumber}]//div[@class='outer-thumbnail-wrap']//img`);
  console.log(targetDocPageCount1);

  if ( (newPageSrc == sourceScr) && (sourceDocPageCount1 == sourceDocPageCount-1) && (targetDocPageCount1 == targetDocPageCount+1)) {
    return 'ok';
  };
  return "not ok";
}, 

async replacePage (docNumber, pageNumber) {
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  const pageSrc1 = await I.grabAttributeFrom(`(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${pageNumber}]`, 'src');
  await this.rightClickToDocumentPage(docNumber, pageNumber);
  I.wait(1);
  I.click(this.contextMenuReplacePage);
  const exec = require('child_process').execFile;
  exec(this.paths.driverLicense, function(err, data) {  
         console.log(err);                  
     });
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  I.wait(3);
  I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
  I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
  //I.wait(4);
  const pageSrc2 = await I.grabAttributeFrom(`(//div[contains(@id, 'multithumbnailspanel')]//table[${docNumber}]//div[@class='outer-thumbnail-wrap']//img)[${pageNumber}]`, 'src');
  console.log(pageSrc1);
  console.log(pageSrc2);
  if (pageSrc1 != pageSrc2) {
    return "ok";
  } else {
  return "not ok";}
},

async insertPagesBefore (docNumber, pageNumber) {
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  const pageCountBefore = await this.countPagesInDocument (docNumber);
  console.log(pageCountBefore);
  await this.rightClickToDocumentPage(docNumber, pageNumber);
  I.wait(1);
  I.click(this.contextMenuInsertPagesBefore);
  const exec = require('child_process').execFile;
  exec(this.paths.passport, function(err, data) {  
         console.log(err);                  
     });
  
  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
  I.wait(3);
  I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
  I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
  await this.clickToDocumentPage(docNumber, pageNumber);
  
  I.wait(7);

  
  const pageCountAfter = await this.countPagesInDocument (docNumber);
  console.log(pageCountAfter);
  if (pageCountAfter == pageCountBefore+5) {
    return "ok";
  } else {
  return "not ok";}
},

//this function works with document that contains at least 3 pages
async checkNavigationWithinDocument(doc) {
  I.click(doc,null, {position: {x: 10, y: 10}});
  I.waitForElement(this.currentPage1, 10);
  I.pressKey('Right Arrow');
  I.waitForElement(this.currentPage2, 10);
  I.pressKey('Right Arrow');
  I.waitForElement(this.currentPage3, 10);
  I.pressKey('Left Arrow');
  I.waitForElement(this.currentPage2, 10);
  I.pressKey('Left Arrow');
  I.waitForElement(this.currentPage1, 10);
},

async checkPageContextMenuVerification(){
  I.wait(2);
  const allContexMenuItemNumber = await I.grabNumberOfVisibleElements(this.commonVisibleContextMenuItem);
  console.log(allContexMenuItemNumber);
  assert.strictEqual(allContexMenuItemNumber, 8, "All context menu item number is not equal 8");

  const activeContexMenuItemNumber = await I.grabNumberOfVisibleElements(this.commonActiveContexMenuItem);
  console.log(activeContexMenuItemNumber);
  assert.strictEqual(activeContexMenuItemNumber, 1, "Active context menu item number is not equal 1");

  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[1]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[2]", {'aria-disabled': "false", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[3]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[4]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[5]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[6]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[7]", {'aria-disabled': "true", 'aria-hidden': "false"});
  I.seeAttributesOnElements("(//div[contains(@class, 'x-menu-item')]//a)[8]", {'aria-disabled': "true", 'aria-hidden': "false"});
},
}
