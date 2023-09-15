const { I, designerSystemSettingsPage } = inject();

module.exports = {

 undockButton: `//div[contains(@class, 'x-header') and (@aria-hidden="false")]//div[contains(@data-qtip, 'Undock From') and (@aria-hidden="false")]`,
 addStickyNoteButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Add Sticky Note')]",
 displayAnnotationsButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Display Annotations')]",
 zoomInButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Zoom In')]",
 zoomOutButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Zoom Out')]",
 lassoZoomButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Lasso Zoom')]",
 bestFitButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Best Fit')]",
 fitPageToWidthButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Fit Page to Width')]",
 fitPageToHeightButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Fit Page to Height')]",
 rotateViewLeftButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate View Left')]",
 rotateViewRightButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate View Right')]",
 rotateView180Button: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate View 180')]",
 revertViewButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Revert View')]",
 rotateImageLeftButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate Displayed Image Left')]",
 rotateImageRightButton: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate Displayed Image Right')]",
 rotateImage180Button: "//a[contains(@class, 'kta-button') and contains(@data-qtip,'Rotate Displayed Image 180')]",
 rotateImageWarningMessage: "//div[contains(@id, 'messagebox') and contains(text(), 'Are you sure you want to rotate the page?')]",
 rotateImageConfirmButton: "//span[contains(@id, 'button') and (text()='Yes')]",
 
 
 imageBody: "//div[contains(@id, 'imagepanel')]//img[@alt='imagePage']",
 imageBodyRotated0: "//div[contains(@id, 'imagepanel')]//img[@alt='imagePage' and contains(@style, 'rotate(0deg)')]",
 imageBodyRotatedLeft: "//div[contains(@id, 'imagepanel')]//img[@alt='imagePage' and contains(@style, 'rotate(270deg)')]",
 imageBodyRotatedRight: "//div[contains(@id, 'imagepanel')]//img[@alt='imagePage' and contains(@style, 'rotate(90deg)')]",
 imageBodyReverted: "//div[contains(@id, 'imagepanel')]//img[@alt='imagePage' and contains(@style, 'rotate(180deg)')]",

 annotationContainer: "//div[contains(@class,'annotatable')]",
 annotationInputField: "//div[@id='annotationDialog']//textarea",
 annotationOkButton: "//a[contains(@class, 'kta-button')]//span[contains(text(),'OK')]",
 stickyNoteImage: "//div[contains(@id, 'stickynote')]",

 hotkeyList: "//div[@id='command-cue-help']",

 commonMiniviewer: "(//div[contains(@id, 'miniviewer') and contains(@class, 'mini-viewer')]//img)",

 async checkImageToolbarButtons(currentVersion) {
  I.wait(3);
  
  I.seeAttributesOnElements(this.addStickyNoteButton, {'aria-disabled': "true"});
  if (currentVersion < 709000) {
    I.seeAttributesOnElements("//a[contains(@class, 'kta-button') and contains(@data-qtip,'Display Sticky Notes')]", {'aria-disabled': "false"});
  } else {
  I.seeAttributesOnElements(this.displayAnnotationsButton, {'aria-disabled': "false"});
  }
  I.seeAttributesOnElements(this.zoomInButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.zoomOutButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.lassoZoomButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.bestFitButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.fitPageToWidthButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.fitPageToHeightButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.rotateViewLeftButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.rotateViewRightButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.rotateView180Button, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.revertViewButton, {'aria-disabled': "true"});
  I.seeAttributesOnElements(this.rotateImageLeftButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.rotateImageRightButton, {'aria-disabled': "false"});
  I.seeAttributesOnElements(this.rotateImage180Button, {'aria-disabled': "false"});
 },
 async checkPdfToolbarButtons(currentVersion) {
 
 
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.addStickyNoteButton);

  if (currentVersion < 709000) {
    I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+"//a[contains(@class, 'kta-button') and contains(@data-qtip,'Display Sticky Notes')]");
  } else {
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.displayAnnotationsButton);
  }
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.zoomInButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.zoomOutButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.lassoZoomButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.bestFitButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.fitPageToWidthButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.fitPageToHeightButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateViewLeftButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateViewRightButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateView180Button);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.revertViewButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateImageLeftButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateImageRightButton);
  I.waitForElement("//div[contains(@class,'x-hidden-offsets')]"+this.rotateImage180Button);
  },
 async rotatingViewTest(currentVersion) {
   await this.checkImageToolbarButtons(currentVersion);
   I.click(this.rotateViewLeftButton);
   I.waitForElement(this.imageBodyRotatedLeft);
   I.click(this.rotateViewLeftButton);
   I.waitForElement(this.imageBodyReverted);
   I.click(this.rotateViewLeftButton);
   I.waitForElement(this.imageBodyRotatedRight);
   I.click(this.rotateViewLeftButton);
   I.waitForElement(this.imageBodyRotated0);
   I.click(this.rotateViewRightButton);
   I.waitForElement(this.imageBodyRotatedRight);
   I.click(this.rotateViewRightButton);
   I.waitForElement(this.imageBodyReverted);
   I.click(this.rotateViewRightButton);
   I.waitForElement(this.imageBodyRotatedLeft);
   I.click(this.rotateViewRightButton);
   I.waitForElement(this.imageBodyRotated0);
   I.click(this.rotateView180Button);
   I.waitForElement(this.imageBodyReverted);
   I.click(this.revertViewButton);
   I.waitForElement(this.imageBodyRotated0);
 },
 async rotatingImageTest() {
    I.click(this.rotateImageLeftButton);
    I.waitForElement(this.imageBodyRotatedLeft);
    I.click(this.rotateImageLeftButton);
    I.waitForElement(this.imageBodyReverted);
    I.click(this.rotateImageLeftButton);
    I.waitForElement(this.imageBodyRotatedRight);
    I.click(this.rotateImageLeftButton);
    I.waitForElement(this.imageBodyRotated0);
    I.click(this.rotateImageRightButton);
    I.waitForElement(this.imageBodyRotatedRight);
    I.click(this.rotateImageRightButton);
    I.waitForElement(this.imageBodyReverted);
    I.click(this.rotateImageRightButton);
    I.waitForElement(this.imageBodyRotatedLeft);
    I.click(this.rotateImageRightButton);
    I.waitForElement(this.imageBodyRotated0);
    I.click(this.rotateImage180Button);
    I.waitForElement(this.imageBodyReverted);
    I.click(this.rotateImage180Button);
    I.waitForElement(this.imageBodyRotated0);
 },
 async rotatingImageDockedTest(doc, pageNumber) {
    const page = `//div[contains(@id, 'multithumbnailspanel')]//table[2]//div[@class='outer-thumbnail-wrap'][${pageNumber}]`;
    const image = `//div[contains(@id, 'multithumbnailspanel')]//table[2]//div[@class='outer-thumbnail-wrap'][${pageNumber}]//img`;
    I.click(doc);
    I.click(page);
    let result = "Everything OK";
    let i = 0;
    do {
        const src0 = await I.grabAttributeFrom(image, 'src');
        I.click(this.rotateImageLeftButton);
        I.wait(1);
        const src1 = await I.grabAttributeFrom(image, 'src');
        i++;
        if (src0 == src1) {
        result = "Image rotation left failed";}
        } while (i<4);
    if (result != "Everything OK") {
        return result;
    }
    do {
        const src0 = await I.grabAttributeFrom(image, 'src');
        I.click(this.rotateImageRightButton);
        I.wait(1);
        const src1 = await I.grabAttributeFrom(image, 'src');
        i++;
        if (src0 == src1) {
          result = "Image rotation right failed";}
        } while (i<8);
    if (result != "Everything OK") {
        return result;
    }
    do {
        const src0 = await I.grabAttributeFrom(image, 'src');
        I.click(this.rotateImage180Button);
        I.wait(1);
        const src1 = await I.grabAttributeFrom(image, 'src');
        i++;
        if (src0 == src1) {
          result = "Image rotation 180 failed";}
        } while (i<10);
    return result;

 },
 async addStickyNote(currentVersion) {
  if(currentVersion < 709000){
    I.click("//a[contains(@class, 'kta-button') and contains(@data-qtip,'Display Sticky Notes')]");
  }else {
  I.click(this.displayAnnotationsButton);
  }
  I.wait(5);
  const addStickynoteStatus = await I.grabAttributeFrom(this.addStickyNoteButton, 'aria-disabled');
  console.log(addStickynoteStatus);
  if (addStickynoteStatus == 'true') {

    if(currentVersion < 709000){
    I.click("//a[contains(@class, 'kta-button') and contains(@data-qtip,'Display Sticky Notes')]");
    }else {
    I.click(this.displayAnnotationsButton);
    }
  }
  I.seeAttributesOnElements(this.addStickyNoteButton, {'aria-disabled': "false"});
  I.click(this.addStickyNoteButton);
  I.wait(2);
  const annContainerStatus = await I.grabNumberOfVisibleElements(this.annotationContainer);
  const annContainerStatusOldVersion = await I.grabNumberOfVisibleElements("//img[contains(@class,'annotatable')]");
  if ((annContainerStatus == 0) && (annContainerStatusOldVersion == 0)) {
    I.click(this.addStickyNoteButton);
  }
  // I.waitForElement(this.annotationContainer);
  if (currentVersion < 709000) {
    I.click("//img[contains(@class,'annotatable')]", null, {position: {x: 40, y: 40}});
  } else {
  I.click(this.annotationContainer, null, {position: {x: 40, y: 40}});
  }
  I.waitForElement(this.annotationInputField);
  I.fillField(this.annotationInputField, 'test annotation');
  I.wait(1);
  I.click(this.annotationOkButton);
  I.waitForElement(this.stickyNoteImage);
  return "ok";
 },

 async rotateViewLeftUsingHotkeys() {
  I.waitForClickable(this.rotateViewLeftButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKeyDown('Shift');
  I.pressKey('Left Arrow');
  I.pressKeyUp('Shift');
 },
 
 async rotateViewRightUsingHotkeys() {
  I.waitForClickable(this.rotateViewRightButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKeyDown('Shift');
  I.pressKey('Right Arrow');
  I.pressKeyUp('Shift');
 },

 async rotateView180UsingHotkeys() {
  I.waitForClickable(this.rotateView180Button);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKeyDown('Shift');
  I.pressKey('Up Arrow');
  I.pressKeyUp('Shift');
 },
 
 async revertViewUsingHotkeys() {
  I.waitForClickable(this.revertViewButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKeyDown('Shift');
  I.pressKey('Down Arrow');
  I.pressKeyUp('Shift');
 },

 async rotateImageLeftUsingHotkeys() {
  I.waitForClickable(this.rotateImageLeftButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKey('g');
 },

 async rotateImageRightUsingHotkeys() {
  I.waitForClickable(this.rotateImageLeftButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKeyDown('Shift');
  I.pressKey('g');
  I.pressKeyUp('Shift');
 },

 async rotateImage180UsingHotkeys() {
  I.waitForClickable(this.rotateImageLeftButton);
  I.pressKey('Control');
  I.waitForElement(this.hotkeyList);
  I.pressKey('m');
 },

 async rotatingViewUsingHotkeysTest(currentVersion) {
  await this.checkImageToolbarButtons(currentVersion);
  await this.rotateViewLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedLeft, 10);
  await this.rotateViewLeftUsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 10);
  await this.rotateViewLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedRight, 10);
  await this.rotateViewLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 10);
  await this.rotateViewRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedRight, 10);
  await this.rotateViewRightUsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 10);
  await this.rotateViewRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedLeft, 10);
  await this.rotateViewRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 10);
  await this.rotateView180UsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 10);
  await this.revertViewUsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 10);
},

async rotatingImageUsingHotkeysTest() {
  await this.rotateImageLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedLeft, 15);
  await this.rotateImageLeftUsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 15);
  await this.rotateImageLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedRight, 15);
  await this.rotateImageLeftUsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 15);
  await this.rotateImageRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedRight, 15);
  await this.rotateImageRightUsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 15);
  await this.rotateImageRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotatedLeft, 15);
  await this.rotateImageRightUsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 15);
  await this.rotateImage180UsingHotkeys();
  I.waitForElement(this.imageBodyReverted, 15);
  await this.rotateImage180UsingHotkeys();
  I.waitForElement(this.imageBodyRotated0, 15);
},

async checkImageMiniviewers(item) {
  I.click(item);
  I.wait(3);
  const miniviewerCount = await I.grabNumberOfVisibleElements(this.commonMiniviewer);
  console.log(miniviewerCount);
  const imageBody = await I.grabAttributeFrom(this.imageBody, 'src');
  console.log(imageBody);
  
  for (let  i = 1; i <= miniviewerCount; i++) {
    let miniviewerValue = await I.grabAttributeFrom(this.commonMiniviewer +'['+ i +']', 'src');
    console.log(miniviewerValue);
    if (miniviewerValue != imageBody) {
      return "not ok";
    }
  }
  return "ok"; 
},
async checkImageViewerInVerification() {
  I.seeAttributesOnElements(this.rotateImage180Button, {'aria-hidden': "true"});
  I.seeAttributesOnElements(this.rotateImageLeftButton, {'aria-hidden': "true"});
  I.seeAttributesOnElements(this.rotateImageRightButton, {'aria-hidden': "true"});

}

};
