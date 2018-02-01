var scriptProperties = PropertiesService.getScriptProperties();
var idDocParameters = scriptProperties.getProperty("id-doc-parameters");


function doGet(e) {
  var template ;
  if (idDocParameters == null) {
    template = HtmlService.createTemplateFromFile('install');

  }else{

    template = HtmlService.createTemplateFromFile('index');
  }


  return (template
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  );
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function installForm(installObject) {
  Logger.log(installObject);
  var scriptProperties = PropertiesService.getScriptProperties();
  var pattern = /[-\w]{25,}/;
  scriptProperties.setProperties({
    'test': 'test',
    'test1': 'test1',
  });
}
