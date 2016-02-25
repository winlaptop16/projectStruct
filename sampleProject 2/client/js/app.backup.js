// Defining our token parts
var header = {
    "alg": "HS256",
    "typ": "JWT"
};

var data = {
    iss: 'vee-pay-api',
    aud: 'myntra',
    cid: 'cidtoday', // corelation id
    b: null 	// updated basket checksum id
};
/*
 iss: 'vee-pay-api',
 aud: 'myntra',
 cid: 'cidtoday' // corelation id
 b: null 	// updated basket checksum id


 */

var secret = "jwtproject";

function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}
function getformdata() {
    data.iss=$("#iss").val();
    data.aud=$("#aud").val();
    data.cid=$("#cid").val();
    data.secret=$("#secret").val()+'';
    console.dir(data);
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);
    document.getElementById("header").innerText = encodedHeader;
    $("#header").html(encodedHeader );



    console.log(encodedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);
    $("#payload").html(encodedData);
    console.log(encodedData);

    var signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, data.secret);
    signature = base64url(signature);
    $("#signature").html(signature);
    console.log(signature);
    var token=encodedHeader+"."+encodedData+"."+signature;


    return  formData = {
        'token':token,
        'secret':data.secret,
        'data':data
    };




};

$("#submitbut").click(function(){
    $.ajax(
        {
            url: "/apitest",
            type: 'POST',
            header:{"Content-Type": "application/json"},
            data: getformdata(),
            success: function(result){
                console.log(result);
                var tt= JSON.stringify(result);
                $("#div1").html(tt);
            }

        });
});