const { I, settingsPage } = inject();


module.exports = {

  fields: {
    username: "input[name='loginUsernameField']",
    password: "input[name='loginPasswordField']"
  },

  buttons: {
    loginButton: "//div[contains(text(), 'Log in')]",
    loginButtonOldVersion: "//div[contains(text(), 'Login')]",
  },
  
  async login (version, username, password) {
    I.wait(4);
    
    const loginFieldVisible = await I.grabNumberOfVisibleElements(this.fields.username);
    console.log(loginFieldVisible);
    const passwordFieldVisible = await I.grabNumberOfVisibleElements(this.fields.password);
    console.log(passwordFieldVisible);
    if ((loginFieldVisible == 1) && (passwordFieldVisible == 1)) {
    I.waitForElement(this.fields.username, 20);
    I.click(this.fields.username);
    I.fillField(this.fields.username, username);
    I.click(this.fields.password);
    I.fillField(this.fields.password, password);
    I.wait(3);
    if (version >= 711000) {
    I.waitForElement(this.buttons.loginButton);
    I.pressKey("Tab");
    I.pressKey("Enter");
    } else {
      I.waitForElement(this.buttons.loginButtonOldVersion);
      I.pressKey("Tab");
      I.pressKey("Tab");
      I.pressKey("Enter");
    }
    
    }
    }
  
  };
