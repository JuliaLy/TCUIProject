const { I } = inject();

module.exports = {

WCCActivityLabel: "//label[contains(text(), 'DEV_ThinClient_Sanity_Process WCC.')]",
saveButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Save')]",
deletePageButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Delete Page')]",
movePageUpButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Move Page Up')]",
movePageDownButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Move Page Down')]",
zoomInButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Zoom In')]",
zoomOutButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Zoom Out')]",
fullSizeButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Full Size')]",
bestFitButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Best Fit')]",
fitToWidthButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Fit To Width')]",
drawHighlightButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Draw Highlight')]",
drawLineButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Draw Line')]",
drawFreehandButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Draw Freehand')]",
drawRectangleButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Draw Rectangle')]",
drawTextButton:"//a[contains(@class, 'toolbar-item') and (@data-qtip='Draw Text')]",
drawMaskButton:"//a[contains(@class, 'toolbar-item') and contains(@data-qtip,'Draw Mask')]",
drawPermanentRedactionButton:"//a[contains(@class, 'toolbar-item') and contains(@data-qtip,'Draw Permanent Redaction')]",

noScannerMessageBox: "//div[contains(@id, 'messagebox')]//div[contains(text(), 'No Scanner is available')]",
noScannerMessageBoxOkButton: "//div[contains(@id, 'messagebox')]//span[contains(text(),'OK')]",

firstPage:"//div[@atala_page_index='0']",

cancelButton: "//a[@name='buttonCancel']",
completeButton: "//a[@name='buttonComplete']",
savedSuccessfullyMessage: "//div[contains(text(),'Saved Successfully')]",
savedSuccessfullyOKButton: "//span[contains(@id, 'button') and contains(text(), 'OK')]",

async checkPDFToolbarButtons() {
  I.seeAttributesOnElements(this.bestFitButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawHighlightButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawLineButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawFreehandButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawRectangleButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawTextButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawMaskButton, {'aria-hidden': "false", 'aria-disabled': "true"});
  I.seeAttributesOnElements(this.drawPermanentRedactionButton, {'aria-hidden': "false", 'aria-disabled': "true"});

},
async checkTiffToolbarButtons() {
  I.seeAttributesOnElements(this.deletePageButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.movePageUpButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.movePageDownButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.zoomInButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.zoomOutButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.fullSizeButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.bestFitButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.fitToWidthButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawHighlightButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawLineButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawFreehandButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawRectangleButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawTextButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawMaskButton, {'aria-hidden': "false", 'aria-disabled': "false"});
  I.seeAttributesOnElements(this.drawPermanentRedactionButton, {'aria-hidden': "false", 'aria-disabled': "false"});

},
}
