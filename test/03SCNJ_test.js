const assert = require('assert');
const { chromium } = require('playwright');
const { designerSystemSettingsPage } = inject();
// const { test, expect } = require('@playwright/test');
Feature('03SCNJ');

let initialLicenseRemaining = 0;
let initialLicenseUsed = 0;
let finalLicenseRemaining = 0;
let finalLicenseUsed = 0;
let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
   I.amOnPage(`${settingsPage.url}/designer`);
   I.resizeWindow(1920, 1080);
   await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   const currentVersion = await designerSystemSettingsPage.getVersion();
   console.log(currentVersion);
   globalCurrentVersion = currentVersion;
   
});
   
//This test gets License volumes and checks that Remaining+Used=Full count
Scenario('Test License Volume', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
    
    await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
    
    if (globalCurrentVersion < 710000) {
      I.waitForElement("//img[@id='logo']");
      } else {
    I.waitForElement(designerSystemSettingsPage.label);
      }
    const licenseInfo = await designerSystemSettingsPage.getImagingPageCountLicenseValue();
    initialLicenseUsed = licenseInfo[2];
    initialLicenseRemaining = licenseInfo[0];
    const fullcount = licenseInfo[1];
    assert.strictEqual(initialLicenseRemaining + initialLicenseUsed, fullcount,  "License volumes don't match");
    
});



//This test sets File import as scanner and checks that it is displayed on Toolbar
Scenario('File import setup', async ({ I, loginPage, workqueuePage, activityToolbarPage, settingsPage }) => {

   I.amOnPage(`${settingsPage.url}/Forms`);
   await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);
   I.click(workqueuePage.menus.itemDev);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   await activityToolbarPage.setFileImport();
   const scanner = await I.grabTextFrom(activityToolbarPage.scannerLabel);
   assert.strictEqual(scanner, 'File Import', "File Import does not set");
   I.waitForEnabled(activityToolbarPage.importFilesButton);
   I.click(workqueuePage.labels.kofax);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);
   
   
  
});

//This test imports files and checks toolbar buttons
 Scenario('Test File import', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

   //  I.amOnPage(`${settingsPage.url}/Forms`);
   //  await loginPage.login(globalCurrentVersion,settingsPage.credentials.username1, settingsPage.credentials.password1);
   //  I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   //  I.waitForElement(workqueuePage.menus.itemDev);
    I.click(workqueuePage.menus.itemDev);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
   //  I.waitForElement(activityToolbarPage.statusBar.readyMessage);
    I.waitForElement(navigatorPanelPage.item3);
    await activityToolbarPage.checkToolbarRootfolderLastdoc(); 
    I.click(navigatorPanelPage.item2);
    await activityToolbarPage.checkToolbarRootfolderFirstdoc();
    I.seeNumberOfVisibleElements(navigatorPanelPage.commonElement, 3);
    I.click(workqueuePage.labels.kofax);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);

 });

 //This test checks undocked Image Viewer
 Scenario('Test undocked Image Viewer', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, imageViewerPage,settingsPage,designerSystemSettingsPage }) => {
 if ((709000 <= globalCurrentVersion)&&(globalCurrentVersion < 710000)) {
   console.log('Test is skipped due to disability to get proper button locators');
 } else{
   // I.amOnPage(`${settingsPage.url}/Forms`);
   // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
  
   
   // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   // I.waitForElement(workqueuePage.menus.itemDev);
   I.click(workqueuePage.menus.itemDev);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   await activityToolbarPage.setFileImport();
   I.waitForEnabled(activityToolbarPage.importFilesButton);
   await activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
   I.wait(3);
   I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
   I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
   // I.waitForElement(activityToolbarPage.statusBar.readyMessage);
   I.waitForElement(navigatorPanelPage.item3);
   await imageViewerPage.checkImageToolbarButtons(globalCurrentVersion);
   I.click(imageViewerPage.undockButton);
   I.switchToNextTab();
   await imageViewerPage.rotatingViewTest(globalCurrentVersion);
   await imageViewerPage.rotatingImageTest();
   I.closeCurrentTab();
   await imageViewerPage.checkImageToolbarButtons(globalCurrentVersion);
   await activityToolbarPage.checkToolbarRootfolderLastdoc();
   I.click(workqueuePage.labels.kofax);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);
 }
});

//This test checks docked Image Viewer
Scenario('Test docked Image Viewer', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, imageViewerPage, settingsPage, designerSystemSettingsPage }) => {

   // I.amOnPage(`${settingsPage.url}/Forms`);
   // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
   
   // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   // I.waitForElement(workqueuePage.menus.itemDev);
   I.click(workqueuePage.menus.itemDev);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   await activityToolbarPage.setFileImport();
   I.waitForEnabled(activityToolbarPage.importFilesButton);
   activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
   I.wait(3);
   I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
   // I.waitForElement(activityToolbarPage.statusBar.readyMessage);
   I.waitForElement(navigatorPanelPage.item3);
   I.click(navigatorPanelPage.item2);
   await imageViewerPage.checkPdfToolbarButtons(globalCurrentVersion);
   I.click(navigatorPanelPage.item3);
   await imageViewerPage.checkImageToolbarButtons(globalCurrentVersion);
   await imageViewerPage.rotatingViewTest(globalCurrentVersion);
   const result = await imageViewerPage.rotatingImageDockedTest(navigatorPanelPage.item3, 3); //this function will rotate 3rd page for 2nd doc
   assert.strictEqual(result, "Everything OK", "Image Rotation failed");
   I.click(workqueuePage.labels.kofax);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);

});

//This test checks Delete page/ Split document/ Move Document
Scenario('Test Split Document/Delete page/Move Page', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, thumbnailsPanelPage, settingsPage }) => {

   // I.amOnPage(`${settingsPage.url}/Forms`);
   // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
   // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   // I.waitForElement(workqueuePage.menus.itemDev);   
   I.click(workqueuePage.menus.itemDev);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   await activityToolbarPage.setFileImport();
   I.waitForEnabled(activityToolbarPage.importFilesButton);
   activityToolbarPage.importDoc(activityToolbarPage.paths.allDocs, navigatorPanelPage.rootFolder);
   I.wait(3);
   I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
   // I.waitForElement(activityToolbarPage.statusBar.nothingToUploadMessage);
   I.waitForElement(navigatorPanelPage.item3, 30);

   await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(2, 4); //this function splits 2nd doc from 4th page
   I.waitForElement(navigatorPanelPage.item4);
   let docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
   assert.strictEqual(docCount, 4, "Document split using Context menu fails");
   
   I.click(navigatorPanelPage.item4);
   await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(3, 6); //this function splits 3nd doc from 6th page
   I.waitForElement(navigatorPanelPage.item5);
   docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
   assert.strictEqual(docCount, 5, "Document split using Toolbar fails");
   
   I.click(navigatorPanelPage.item5);
   await thumbnailsPanelPage.splitDocumentFromPageUsingContextMenu(4, 6); //this function splits 4th doc from 6th page
   I.waitForElement(navigatorPanelPage.item6);
   await thumbnailsPanelPage.deletePageUsingContextMenu(5, 5);
   await activityToolbarPage.deletePageUsingToolbar(5, 4);
   const docPagesCount = await thumbnailsPanelPage.countPagesInDocument (5);
   assert.strictEqual (docPagesCount, 3, "Page deletion fails");
   
   
   const movePage = await thumbnailsPanelPage.movePageWithinDocument(4, 2, 5);
   assert.strictEqual(movePage,'ok','Moving page within document fails');
   
   const movePageToAnotherDoc = await thumbnailsPanelPage.movePageToAnotherDocument(4, 5, 2, 3);
   assert.strictEqual(movePageToAnotherDoc, "ok", "Moving page to another document fails");

   I.click(workqueuePage.labels.kofax);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);
});

Scenario('Test creating a job', async ({ I, loginPage, workqueuePage, activityToolbarPage, navigatorPanelPage, settingsPage }) => {

   // I.amOnPage(`${settingsPage.url}/Forms`);
   // await loginPage.login(globalCurrentVersion, settingsPage.credentials.username1, settingsPage.credentials.password1);
   // I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.waitForElement(workqueuePage.menus.itemDev);
   I.wait(2);
   
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
   // I.waitForElement(activityToolbarPage.statusBar.nothingToUploadMessage);
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
   // I.waitForElement(activityToolbarPage.statusBar.nothingToUploadMessage);
   I.waitForElement(navigatorPanelPage.item6);
   docCount = await I.grabNumberOfVisibleElements(navigatorPanelPage.commonElement);
   assert.strictEqual(docCount, 6, "Adding documents to Subfolder fails");
     
   I.click(activityToolbarPage.createJobButton);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.click(workqueuePage.labels.kofax);
   I.waitForElement(workqueuePage.labels.workqueue);
   console.log(jobCount);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   const jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan_Activity');
   assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
   if (settingsPage.isOPMT == true) {
      I.wait(120);
   }

});



Scenario('Test license volume after job is created', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
   I.amOnPage(`${settingsPage.url}/designer`);
   // await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   // const currentVersion = await designerSystemSettingsPage.getVersion();
   //  console.log(currentVersion);
   if (globalCurrentVersion < 710000) {
      I.waitForElement("//img[@id='logo']");
   } else {
   I.waitForElement(designerSystemSettingsPage.label);
   }
   I.wait(2);
   
   let finalLicenseInfo = await designerSystemSettingsPage.getImagingPageCountLicenseValue();
   finalUsed = finalLicenseInfo[2];
   finalRemaining = finalLicenseInfo[0];
   fullcount = finalLicenseInfo[1];
   assert.strictEqual(finalRemaining + finalUsed, fullcount, "License volumes don't match");
   assert.strictEqual(finalRemaining, initialLicenseRemaining-36,  "Remaining license volume is not correct");
   assert.strictEqual(finalUsed, initialLicenseUsed+36, "Used license volume is not correct");

});



