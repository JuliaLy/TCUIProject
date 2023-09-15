const assert = require('assert');

Feature('12Tables');

let globalCurrentVersion = 0;

Scenario('Get current Version', async ({ I, loginDesignerPage, designerSystemSettingsPage, settingsPage }) => {
   I.amOnPage(`${settingsPage.url}/designer`);
   I.resizeWindow(1920, 1080);
   await loginDesignerPage.login (settingsPage.credentials.username1, settingsPage.credentials.password1);
   const currentVersion = await designerSystemSettingsPage.getVersion();
   console.log(currentVersion);
   globalCurrentVersion = currentVersion;
   
});

Scenario('Create a job with Invoice and process it to Validate', async ({ I, settingsPage, workqueuePage, activityToolbarPage, navigatorPanelPage, loginPage }) => {
    I.amOnPage(`${settingsPage.url}/Forms`);
    await loginPage.login(globalCurrentVersion,settingsPage.credentials.username1, settingsPage.credentials.password1);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.waitForElement(workqueuePage.menus.itemInv);
    I.wait(4);
   
    let jobCount = await I.grabNumberOfVisibleElements(workqueuePage.items.commonItem);
    console.log(jobCount);
    I.click(workqueuePage.menus.itemInv);
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    await activityToolbarPage.setFileImport();
    I.waitForEnabled(activityToolbarPage.importFilesButton);
    activityToolbarPage.importDoc(activityToolbarPage.paths.invoice, navigatorPanelPage.rootFolder);
    I.wait(3);
    I.waitForInvisible(activityToolbarPage.statusBar.uploadingFilesMessage);
    I.waitForInvisible(activityToolbarPage.statusBar.filesToUploadMessage);
   //  I.waitForElement(activityToolbarPage.statusBar.readyMessage);
    I.waitForElement(navigatorPanelPage.item2);
       
   I.click(activityToolbarPage.createJobButton);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   I.click(workqueuePage.labels.kofax);
   I.waitForElement(workqueuePage.labels.workqueue);
   console.log(jobCount);
   I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
   let jobCreated = await workqueuePage.waitForJob(jobCount, 'Scan b4 classn');
   assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
   
//Complete Scan b4 classn from workqueue
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

    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Scan2 b4 classn');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    //Complete Scan2 b4 classn from workqueue
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

    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Review Docs');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");

    //Complete Review Docs from workqueue
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

    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Manual Scan B4 Extract');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");


    //Complete Manual Scan B4 Extract from workqueue
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

    jobCreated = await workqueuePage.waitForNextActivity(jobCount + 1, 'Validation');
    assert.strictEqual(jobCreated, "ok", "Job is not created or suspended");
});


Scenario('Count extracted table rows', async ({ I, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
    
    await workqueuePage.openLastJob('Validation');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.waitForElement(fieldsPanelPage.AAMInvoice.invoiceLinesLabel);
    I.wait(1);
    const tableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(tableCount);
    assert.strictEqual(tableCount, 10, "Different rows amount was extracted"); //9 table rows + Thumbnail panel is considered as a table

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});   

Scenario('Delete 2nd row in a table', async ({ I, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
   
    await workqueuePage.openLastJob('Validation');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.waitForElement(fieldsPanelPage.AAMInvoice.invoiceLinesLabel);
    I.wait(1);
    const tableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(tableCount);

    I.click("(//table[contains(@id, 'gridview')])[2]//td[1]"); // click to 1st cell(row selector) in 2nd row 
    I.click(fieldsPanelPage.table.deleteRowButton);
    if (globalCurrentVersion >= 710000) {
    I.seeAttributesOnElements(fieldsPanelPage.table.deleteRowButton, {'aria-disabled': "true"});
    }
    I.wait(1);

    const newTableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(newTableCount);
    assert.strictEqual(newTableCount, tableCount - 1, "Row wasn't deleted" );

     //check 2nd row values
     await fieldsPanelPage.checkTableFieldValue(2, 1, '12');
     await fieldsPanelPage.checkTableFieldValue(2, 2, 'M674');
     if (globalCurrentVersion <710000) {
        await fieldsPanelPage.checkTableFieldValue(2, 3, 'Spark Plug Gasket ( P / 0 : 6691 )');
     } else { 
     await fieldsPanelPage.checkTableFieldValue(2, 3, 'Spark Plug Gasket ( P / O : 6691 )');
     }
     await fieldsPanelPage.checkTableFieldValue(2, 4, '0.79');
     await fieldsPanelPage.checkTableFieldValue(2, 5, '9.48');
 

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});   

Scenario('Interpolate deleted row', async ({ I, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
   
    await workqueuePage.openLastJob('Validation');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.waitForElement(fieldsPanelPage.AAMInvoice.invoiceLinesLabel);
    I.wait(1);
    const tableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(tableCount);

    I.click("(//table[contains(@id, 'gridview')])[1]//td[1]"); // click to 1st cell(row selector) in 1st row 
    I.click(fieldsPanelPage.table.interpolateRowsButton);
    I.seeAttributesOnElements(fieldsPanelPage.table.interpolateRowsButton, {'aria-disabled': "true"});
    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);


    const newTableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(newTableCount);
    assert.strictEqual(newTableCount, tableCount + 2 , "Row interpolation fails" ); //interpolation adds 2nd row in a table and another one at the bottom

    //check 2nd row values
    await fieldsPanelPage.checkTableFieldValue(2, 1, '1');
    await fieldsPanelPage.checkTableFieldValue(2, 2, 'CH48108 - 1');
    if (globalCurrentVersion < 710000) {
        await fieldsPanelPage.checkTableFieldValue(2, 3, 'Oil Filter ( P / 0 : 6663 )');
    } else {
        await fieldsPanelPage.checkTableFieldValue(2, 3, 'Oil Filter ( P / O : 6663 )');
    }
    await fieldsPanelPage.checkTableFieldValue(2, 4, '31.54');
    await fieldsPanelPage.checkTableFieldValue(2, 5, '31.54');

    //check 10th row values
    await fieldsPanelPage.checkTableFieldValue(10, 1, '1');
    if (globalCurrentVersion < 710000) {
        await fieldsPanelPage.checkTableFieldValue(10, 2, 'BLACKSTONE');
    } else {
        await fieldsPanelPage.checkTableFieldValue(10, 2, 'BLACKSTON E');
    }
    if (globalCurrentVersion < 710000) {
        await fieldsPanelPage.checkTableFieldValue(10, 3, 'Analysis Kit, Blackstone $29.95 Shipping : $0.00 Item Subtotal Item : 3 • Airworthy Airframe');
    } else {
        await fieldsPanelPage.checkTableFieldValue(10, 3, 'Analysis Kit, Blackstone $29.95 Shipping : $0.00 Item Subtotal Item : 3 - Airworthy Airframe');
    }    
    await fieldsPanelPage.checkTableFieldValue(10, 4, '29.95');
    await fieldsPanelPage.checkTableFieldValue(10, 5, '29.95');


    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});   
Scenario('Add row', async ({ I, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
   
    await workqueuePage.openLastJob('Validation');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.waitForElement(fieldsPanelPage.AAMInvoice.invoiceLinesLabel);
    
    I.wait(1);
    const tableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(tableCount);

    
    I.click(fieldsPanelPage.table.addRowButton);
    

    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    I.wait(1);
    const newTableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(newTableCount);
    assert.strictEqual(newTableCount, tableCount + 1, "Row wasn't added" );


     //check newly created row values
     await fieldsPanelPage.checkTableFieldValue(tableCount, 1, '1');
     
     await fieldsPanelPage.checkTableFieldValue(tableCount, 4, '0');
     await fieldsPanelPage.checkTableFieldValue(tableCount, 5, '0.00');

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});   

Scenario('Insert row to current position', async ({ I, workqueuePage, navigatorPanelPage, activityToolbarPage, settingsPage, fieldsPanelPage }) => {
    
   
    await workqueuePage.openLastJob('Validation');
    I.waitForElement("//div[contains(@style,'cursor: default')]", 180);
    I.waitForElement(navigatorPanelPage.rootFolder);
    I.waitForElement(fieldsPanelPage.AAMInvoice.invoiceLinesLabel);
    I.wait(1);
    const tableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(tableCount);

    I.click("(//table[contains(@id, 'gridview')])[2]//td[1]"); // click to 1st cell(row selector) in 2nd row 
    I.click(fieldsPanelPage.table.insertRowButton);
    

    I.waitForElement("//div[contains(@style,'cursor: default')]", 120);
    const newTableCount = await I.grabNumberOfVisibleElements(fieldsPanelPage.commonTableRow);
    console.log(newTableCount);
    assert.strictEqual(newTableCount, tableCount + 1, "Row wasn't added" );


     //check newly created row values
     await fieldsPanelPage.checkTableFieldValue(2, 1, '1');
     
     await fieldsPanelPage.checkTableFieldValue(2, 4, '0');
     await fieldsPanelPage.checkTableFieldValue(2, 5, '0.00');

    await activityToolbarPage.cancelActivity();
    I.waitForElement(workqueuePage.items.commonItem, 180);
});   