function doGet() {
   return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
     .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
