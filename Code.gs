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

function installForm(installObject) {

  var pattern = /[-\w]{25,}/;
  var id;
  var key;
  var codeVersion;
  for(var i in installObject) {
    id = installObject[i].match(pattern);
    key = i;
  }
  scriptProperties.setProperties({
    key: id
   });
var parametersSheet = SpreadsheetApp.openById(id).getSheetByName("parameters");
var parametersValues = parametersSheet.getDataRange().getValues();

var parametersSheetSociete = SpreadsheetApp.openById(id).getSheetByName("Societe");
var parametersValuesSociete = parametersSheetSociete.getDataRange().getValues();

var parametersSheetProfession = SpreadsheetApp.openById(id).getSheetByName("Profession");
var parametersValuesProfession = parametersSheetProfession.getDataRange().getValues();

var parametersSheetSociale = SpreadsheetApp.openById(id).getSheetByName("Sociale");
var parametersValuesSociale = parametersSheetSociale.getDataRange().getValues();
  
for(var k = 0; k < parametersValues.lenght; k++ ){
    var nameParameters = parametersValues[k][0];
    var valueParameters = parametersValues[k][1];
    scriptProperties.setProperties({
nameParameters : valueParameters
    });

  }

  for(var j = 0; j < parametersValuesSociete.lenght; j++ ){
    var nameSociete = parametersValuesSociete[j][0];
    var valueSociete = parametersValuesSociete[j][1];
    scriptProperties.setProperties({
nameSociete : valueSociete
    });

  }

  for(var l = 0; l < parametersValuesProfession.lenght; l++ ){
    var nameProfession = parametersValuesProfession[l][0];
    var valueProfession = parametersValuesProfession[l][1];
    scriptProperties.setProperties({
nameProfession : valueProfession
    });

  }

  for(var m = 0; m < parametersValuesSociale.lenght; m++ ){
    var nameSociale = parametersValuesSociale[m][0];
    var valueSociale = parametersValuesSociale[m][1];
    scriptProperties.setProperties({
nameSociale : valueSociale
    });

  }

}

function getParameters(updateObject) {
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
         '<input class="form-control" type="text" name="'+nameParameters+'" id="'+nameParameters+'" placeholder="'+nameParameters+'" value="'+valueParameters+'">'+
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
