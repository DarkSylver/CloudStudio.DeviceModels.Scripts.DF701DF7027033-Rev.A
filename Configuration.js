function getConfiguration(config) 
{ 
	config.addressLabel = {en: "IMEI", es: "IMEI"};
}

function getEndpoints(deviceAddress, endpoints)
{
  var level = endpoints.addEndpoint("1", "Level Sensor", endpointType.genericSensor);
  level.variableTypeId = 1258;

  //Alertas by Rocío
var alert = level.addAlert();
alert.variableTypeId = 1258;
alert.conditionType = conditionType.lower;
alert.threshold = 25;
alert.normalConditionType = conditionType.greaterOrEqual;
alert.normalThreshold = 25;
alert.severity = alarmSeverity.Information;

var alert1 = level.addAlert();
alert1.variableTypeId = 1258;
alert1.conditionType = conditionType.greaterOrEqual;
alert1.threshold = 25;
alert1.normalConditionType = conditionType.lower;
alert1.normalThreshold = 25;
alert1.severity = alarmSeverity.low;

var alert2 = level.addAlert();
alert2.variableTypeId = 1258;
alert2.conditionType = conditionType.greaterOrEqual;
alert2.threshold = 50;
alert2.normalConditionType = conditionType.lower;
alert2.normalThreshold = 50;
alert2.severity = alarmSeverity.medium;


var alert3 = level.addAlert();
alert3.variableTypeId = 1258;
alert3.conditionType = conditionType.greaterOrEqual;
alert3.threshold = 80;
alert3.normalConditionType = conditionType.lower;
alert3.normalThreshold = 80;
alert3.severity = alarmSeverity.high;



  var ang = endpoints.addEndpoint("2", "Angle", endpointType.genericSensor);
  ang.variableTypeId = 1259;

  var alert4 = ang.addAlert();
alert4.variableTypeId = 1259;
alert4.conditionType = conditionType.greaterOrEqual;
alert4.threshold = 15;
alert4.normalConditionType = conditionType.lower;
alert4.normalThreshold = 15;
alert4.severity = alarmSeverity.Information;

  endpoints.addEndpoint("3", "Temperature", endpointType.temperatureSensor);
  var bat = endpoints.addEndpoint("4", "Battery", endpointType.genericSensor);
  bat.variableTypeId = 1247;

  
  var alert5 = bat.addAlert();
alert5.variableTypeId = 1247;
alert5.conditionType = conditionType.lowerOrEqual;
alert5.threshold = 0.72;
alert5.normalConditionType = conditionType.greater;
alert5.normalThreshold = 0.72;
alert5.severity = alarmSeverity.Information;
}

function validateDeviceAddress(address, result)
{
  if (address.length != 15) {
    result.ok = false;
    result.errorMessage = {
      en: "The address must be 15 characters long.", 
      es: "La dirección debe tener exactamente 15 caracteres."
    };
  }
}

function updateDeviceUIRules(device, rules)
{
  rules.canCreateEndpoints = true;
}

function updateEndpointUIRules(endpoint, rules)
{
  rules.canDelete = true;
  rules.canEditSubtype = true;
}