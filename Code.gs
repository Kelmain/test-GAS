function doGet() {
   return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
     .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}



function setParameters(){
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    'test': 'test',
    'test1': 'test1',
  });
}
