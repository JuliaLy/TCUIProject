const { I } = inject();
const settingsPage = require('../appConfig.js');

module.exports = {
  labels: {
    workqueue: "//label[contains(@class, 'kofax-label')]//h1[contains(text(), 'Work Queue')]",
    kofax: "//img[contains(@src, 'kofax_icon')]",
  },
  URLs: {
    wq: "Forms/GeneralWorkQueue.form",
  },
  menus: {
    itemDev: "//span[contains(@id, 'WorkspaceMenu') and contains(text(), '"+ settingsPage.devMenuItem +"')]",
    itemInv: "//span[contains(@id, 'WorkspaceMenu') and contains(text(), '"+ settingsPage.invoiceMenuItem +"')]",
  },
  buttons: {
    refreshButton: "//span[contains(@id,'refreshButton')]",
  },
  items: {
    commonItem: "//div[contains(@class, 'x-grid-item-container')]//table",

  },

  actionsPicker: "//img[@alt='Available activity actions']",
  actionPickerOldVersion: "//img[contains(@src, 'DownwardArrow')]",
  completeActivityMenuItem:"//div[@name='btnCompleteActivity']//span[contains(text(), 'Complete Activity')]",

  activityCompletedSuccessfullyMessagebox: "//div[contains(@id, 'messagebox') and contains(text(), 'Activity is completed successfully')]",
  activityCompletedSuccessfullyOkButton:"//div[contains(@id, 'messagebox')]//span[contains(@id, 'button') and (text()='OK')]",


  //this function is used for a new job
  async waitForJob(jobCount, activityName) {
    
    let i=0;
    do {
    const actualJobCount = await I.grabNumberOfVisibleElements(this.items.commonItem);
    console.log(actualJobCount);
    if (actualJobCount == jobCount+1) {
      I.waitForElement(`//table[${actualJobCount}]//a[contains(text(),'${activityName}')]`, 2); //div[contains(@class, 'x-grid-item-container')]
      return "ok";
    } else {
      I.wait(4); 
      I.click(this.buttons.refreshButton);
      I.waitForElement("//div[contains(@style,'cursor: default')]", 20);
    }
    i++;
  } while (i <= 10);
  return "not ok";
  },

  async waitForNextActivity(jobCount, activityName) {
    I.wait(2);
    let i=0;
    do {
    const actualJobCount = await I.grabNumberOfVisibleElements(this.items.commonItem);
    console.log(actualJobCount);
    if (actualJobCount == jobCount) {
      I.waitForElement(`//table[${actualJobCount}]//a[contains(text(),'${activityName}')]`);

      return "ok";
    } else {
      I.wait(4); 
      I.click(this.buttons.refreshButton);
      I.waitForElement("//div[contains(@style,'cursor: default')]", 20);
      console.log(`Waiting for ` + `//table[${jobCount}]//a[contains(text(),'${activityName}')]`);
    }
    i++;
  } while (i <= 60);
  return "not ok";
  },


  async openLastJob(jobName) {
    I.wait(6);
    const jobCount = await I.grabNumberOfVisibleElements(this.items.commonItem);
    console.log(jobCount);
    I.click(`//table[${jobCount}]//a[contains(text(),'${jobName}')]`);
  }

};