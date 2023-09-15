/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type loginPage = typeof import('./pages/login.js');
type workqueuePage = typeof import('./pages/workqueue.js');
type designerSystemSettingsPage = typeof import('./pages/designerSystemSettings.js');
type loginDesignerPage = typeof import('./pages/loginDesigner.js');
type activityToolbarPage = typeof import('./pages/activityToolbar.js');
type navigatorPanelPage = typeof import('./pages/navigatorPanel.js');
type imageViewerPage = typeof import('./pages/imageViewer.js');
type thumbnailsPanelPage = typeof import('./pages/thumbnailsPanel.js');
type fieldsPanelPage = typeof import('./pages/fieldsPanel.js');
type hotkeysPage = typeof import('./pages/hotkeys.js');
type settingsPage = typeof import('./pages/settings.js');
type wCCPage = typeof import('./pages/WCC.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, workqueuePage: workqueuePage, designerSystemSettingsPage: designerSystemSettingsPage, loginDesignerPage: loginDesignerPage, activityToolbarPage: activityToolbarPage, navigatorPanelPage: navigatorPanelPage, imageViewerPage: imageViewerPage, thumbnailsPanelPage: thumbnailsPanelPage, fieldsPanelPage: fieldsPanelPage, hotkeysPage: hotkeysPage, settingsPage: settingsPage, wCCPage: wCCPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
