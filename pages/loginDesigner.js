const { I, designerSystemSettingsPage } = inject();


module.exports = {

  fields: {
    username: "input[name='txtUserName']",
    password: "input[name='txtPassword']"
  },
  windows: {
    overwriteSessionMessage: "//ejs-dialog[contains(@class, 'e-popup-open')]//div[contains(text(), 'overwrite your current session')]",
    overwriteSessionMessage78: "//ejs-dialog[contains(@class, 'e-popup-open')]//label[contains(text(), 'overwrite your current session')]",
  },
  buttons: {
    loginButton: "//button[@id='btnLogon']",
    overwriteSessionOK: "//ejs-dialog//button[@id='btnOk']"
  },
  
  async login (username, password) {
    I.wait(2);
    let loginFieldVisible = 0;
    let passwordFieldVisible = 0;
    do {
    loginFieldVisible = await I.grabNumberOfVisibleElements(this.fields.username);
    console.log(loginFieldVisible);
    passwordFieldVisible = await I.grabNumberOfVisibleElements(this.fields.password);
    console.log(passwordFieldVisible);
    if ((loginFieldVisible == 1) && (passwordFieldVisible == 1)) {
    I.waitForElement(this.fields.username, 10);
    I.click(this.fields.username);
    I.fillField(this.fields.username, username);
    I.pressKey("Tab");
    I.click(this.fields.password);
    I.fillField(this.fields.password, password);
    // I.click(this.buttons.loginButton);
    I.pressKey("Tab");
    I.pressKey("Enter");
    I.wait(3);
   

    const popup78 = await I.grabNumberOfVisibleElements(this.windows.overwriteSessionMessage78);
    console.log(popup78);
    
    const popup = await I.grabNumberOfVisibleElements(this.windows.overwriteSessionMessage);
    console.log(popup);
    
    if ((popup == 1) || (popup78 == 1) ) {
      I.click(this.buttons.overwriteSessionOK);
      I.wait(2);
      }
    }
    loginFieldVisible = await I.grabNumberOfVisibleElements(this.fields.username);
    console.log(loginFieldVisible);
    
  } while (loginFieldVisible > 0);
  },
  };

