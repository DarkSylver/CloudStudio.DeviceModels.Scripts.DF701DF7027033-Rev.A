function parseUplink(device, payload)
{
	var rawPayload = payload.asBytes();
    env.log("Received payload", rawPayload);

    //Decode
    let decoded = DingTek701702703Decoder(rawPayload);

    env.log(decoded);

    if (decoded != null){

        //Endpoints
        var epLevel = device.endpoints.byAddress("1");
        var epAngle = device.endpoints.byAddress("2");
        var epTemp  = device.endpoints.byAddress("3");
        var epBatt  = device.endpoints.byAddress("4");

        // Update sensors
        if (epLevel != null && decoded.Height != null){
            epLevel.updateGenericSensorStatus(Math.round(((1505-decoded.Height)/1505)*100));
        }

        if(epAngle !=null && decoded.Angle != null)
        {
            epAngle.updateGenericSensorStatus(decoded.Angle);
        }

        if(epTemp !=null && decoded.Temperature != null)
        {
            epTemp.updateTemperatureSensorStatus(decoded.Temperature);
        }

        if(epBatt !=null && decoded.BatteryVoltage != null)
        {
            epBatt.updateGenericSensorStatus(Math.round((decoded.BatteryVoltage/3.7)*100));
        }
        

    } else{
        env.log("Dingtek 702/3 decoder returned null :(");
    }
}

function DingTek701702703Decoder(bytes)
{
    
    const GPSDATA = 0;
    const NOGPSDATA = 1;
    const UNKNOWNDATA = 2;
    const FRAME_GPS = 24;
    const FRAME_NO_GPS = 16;

    var decoded = {
        Latitude:  null,
        Longitude: null,
        Height: null, 
        Temperature: null, 
        Angle: null, 
        Full: null,       
        Fall: null,
        Power: null,
        BatteryVoltage: null,
    };
    
    function checkMessasgeType(bytes)
    {
        let len = bytes.length;
        if (len == FRAME_NO_GPS){
            return NOGPSDATA;
        } else if (len == FRAME_GPS) {
            return GPSDATA
        } else{
            return UNKNOWNDATA;
        }
    }
    function parseData(bytes)
    {
        //parseo
        let dataHeight          = bytes.slice(0, 2);
        let dataTemp            = bytes.slice(3, 4);
        let dataAngle           = bytes.slice(5, 6);
        let dataStatus          = bytes.slice(6, 8);
        let batteryvoltstatus   = bytes.slice(8, 10);
        //calc
        let height              = dataHeight[0] * 256 + dataHeight[1];
        let temp                = dataTemp[0];
        let angle               = dataAngle[0]
        let full                = dataStatus[0] >> 4;
        let fall                = dataStatus[1] >> 4;
        let power               = dataStatus[1] & 0x0F;
        let batteryvoltage      = (batteryvoltstatus[0] * 256 + batteryvoltstatus[1]) / 100
        //result
        decoded.Angle       = angle;
        decoded.Fall        = fall;
        decoded.Full        = full;
        decoded.Power       = power;
        decoded.Height      = height;
        decoded.Temperature = temp;
        decoded.BatteryVoltage = batteryvoltage;
        return decoded;
    }

    /* Main */

    let msgType = checkMessasgeType(bytes);
    switch(msgType){
        case NOGPSDATA:
             return parseData(bytes);
            break;
        case GPSDATA:
            //Not implemented
            return decoded;
            break;
        case UNKNOWNDATA:
            return null;
        default:
            break;
    }  
}