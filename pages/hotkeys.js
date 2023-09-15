const { I } = inject();

module.exports = {

  hotkeyList: "//div[@id='command-cue-help']",

  async completeActivity() {
    I.pressKey('Control');
    I.waitForElement(this.hotkeyList);
    I.wait(2);
    I.pressKey('c');

  }
}
