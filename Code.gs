var scriptProperties = PropertiesService.getScriptProperties();
var idDocParameters = scriptProperties.getProperty("id-doc-parameters");
var version = scriptProperties.getProperty("version");

var CODE_VERSION = '1.1.5';




function doGet() {
  var template;
  if (idDocParameters == null) {
    template = HtmlService.createTemplateFromFile('install');

  } else if (version !== CODE_VERSION) {
    template = HtmlService.createTemplateFromFile('update');
    template.getParameters = getParameters();
    
  } else {

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
//function to init or new install
// installObject json 
function installForm(installObject) {
  installObject = JSON.parse(installObject);
  var pattern = /[-\w]{25,}/;
  var id;
  var key;
  var codeVersion;
  for(var i in installObject) {
    id = installObject[i].match(pattern);
    key = i;
  }
  scriptProperties.setProperty({
    key: id
   });
var parametersSheet = SpreadsheetApp.openById(id).getSheetByName("parameters");
var parametersValues = parametersSheet.getDataRange().getValues();

  
for(var k = 0; k < parametersValues.lenght; k++ ){
    var nameParameters = parametersValues[k][0];
    var valueParameters = parametersValues[k][1];
    scriptProperties.setProperty({
nameParameters : valueParameters
    });

  }
}
// get parameters from tab parameters 
function getParameters() {
  var parametersSheet = SpreadsheetApp.openById(id).getSheetByName("parameters");
  var parametersValues = parametersSheet.getDataRange().getValues();
  
var formParameters;  

  for(var k = 0; k < parametersValues.lenght; k++ ){
    var nameParameters = parametersValues[k][0];
    var valueParameters = parametersValues[k][1];
    var explicationParameters = parametersValues[k][2];
    var formatParameters = parametersValues[k][4];
    if(formatParameters == 'text'){
      formParameters += '<div class="form-group">'+
      '<label class="col-sm-4 col-sm-offset-1" for="'+nameParameters+'">'+nameParameters+'</label>'+
      '<div class="col-sm-6">'+
      '<textarea class="form-control" name="'+nameParameters+'" id="'+nameParameters+'" >'+valueParameters+'</textarea>'+
        
      '</div>'+
      '<div class="col-sm-12">'+explicationParameters+'</div>'+
  '</div>';
    }else{
    formParameters += '<div class="form-group">'+
    '<label class="col-sm-4 col-sm-offset-1" for="'+nameParameters+'">'+nameParameters+'</label>'+
    '<div class="col-sm-6">'+
       '<input class="form-control" type="text" name="'+nameParameters+'" id="'+nameParameters+'" placeholder="'+nameParameters+'" value="'+valueParameters+'">'+
    '</div>'+
    '<div class="col-sm-12">'+explicationParameters+'</div>'+
'</div>';
    }
  }

return formParameters;
}

