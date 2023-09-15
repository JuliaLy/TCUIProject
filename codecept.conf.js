const settingsPage = require('./appConfig.js')
exports.config = {
  output: './output',
  helpers: {
    Playwright: {

      url: 'http://localhost',
      show: true,
      browser: settingsPage.browser,
      channel: settingsPage.channel,
      windowSize: '1920x1080',
      video: false,
      waitForTimeout: 80000,
      chromium: {
        browserContext: false,
        ignoreHTTPSErrors: true,

        userDataDir: "./tmp/playwright-tmp",
        //   args: [
        //     '--disable-features=ImprovedCookieControls',            
        // ],
      },
      firefox: {
        browserContext: false,
        ignoreHTTPSErrors: true,

        userDataDir: "./tmp_FF/playwright-tmp",
      },


    }
  },
  include: {
    "I": "./steps_file.js",
    "loginPage": "./pages/login.js",
    "workqueuePage": "./pages/workqueue.js",
    "designerSystemSettingsPage": "./pages/designerSystemSettings.js",
    "loginDesignerPage": "./pages/loginDesigner.js",
    "activityToolbarPage": "./pages/activityToolbar.js",
    "navigatorPanelPage": "./pages/navigatorPanel.js",
    "imageViewerPage": "./pages/imageViewer.js",
    "thumbnailsPanelPage": "./pages/thumbnailsPanel.js",
    "fieldsPanelPage": "./pages/fieldsPanel.js",
    "hotkeysPage": "./pages/hotkeys.js",
    "settingsPage": "./appConfig.js",
    "wCCPage": "./pages/WCC.js",
    "designerUserInterfacePage": "./pages/designerUserInterface.js",
    "designerCapturePage": "./pages/designerCapture.js"
    
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  // gherkin: {
  //   features: './features/*.feature',
  //   steps: ['./step_definitions/steps.js']
  // },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {},
    allure: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0,
    }
  ],
  tests: './test/*_test.js',
  name: 'FPTCRCUIProject'
};