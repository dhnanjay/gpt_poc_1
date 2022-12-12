

function getAITone() {
    let aiStyle = document.getElementById('style-select').value;
    let aiTone = document.getElementById('tone-select').value;
    return [aiStyle, aiTone];
}

function getEmailData() {
    let emailName = document.getElementById('email_name').value;
    let emailTitle = document.getElementById('email_title').value;
    let coName = document.getElementById('email_cname').value;
    let eServices = document.getElementById('email_services').value;
    return [emailName, emailTitle, coName, eServices];
}



function getText() {

    let url = 'http://127.0.0.1:8000/RAD_AI/'
    let appType = document.getElementById('app-select').value;
    if (appType==='Marketing Email') {
        makeAPICall(url+writeEmail())
    } else if (appType==='Professional Bio') {
        makeAPICall(url+writeProfBio())
    }


}

function handleError(err) {
    console.log("OH NO!");
    console.log(err);
}

function makeAPICall(url) {
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            url: url,
            crossDomain: true,
            success: function (result, status, xhr) {
                $.each(result, function(k, v) {
                    if (k === "text") {
                        // console.log(k+":"+v)
                        $("#ai_text").append(v)
                    }
                });
            },
            error: function (xhr, status, error) {
                // console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                handleError(error)
            }
        }); // ajax closed
    });

}

function writeEmail() {
    let arrTone = getAITone();
    let aiStyle = arrTone[0];
    let aiTone = arrTone[1];
    let arrEmail = getEmailData();
    let emailName = arrEmail[0];
    let emailTitle = arrEmail[1];
    let coName =  arrEmail[2];
    let eServices = arrEmail[3];
    let emailText = "Write a marketing email to " + emailName + " who is a " + emailTitle + " at " + coName +
       " offering following services " + eServices + " by Connor Group" + "in a tone which is " + aiTone +
       " and style which is " + aiStyle

    return encodeURIComponent(emailText.trim());

}

function writeProfBio() {

    let arrTone = getAITone();
    let aiStyle = arrTone[0];
    let aiTone = arrTone[1];
    let aiPrompt = "Write a professional bio for " + document.getElementById('bio_name').value + " who has " +
        document.getElementById('bio_exp').value + " years of professional experience and has obtained " +
        document.getElementById('bio_degree').value + " education and has following hobbies "  +
        document.getElementById('bio_hobbies').value +  "in a tone which is " + aiTone +
        " and style which is " + aiStyle
    
    return encodeURIComponent(aiPrompt.trim());

}

