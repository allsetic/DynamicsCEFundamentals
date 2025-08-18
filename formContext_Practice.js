
function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.ui.setFormNotification("Make sure to include a salesman for email sending", "INFO", "custNotif");

    setTimeout(function(){
        formContext.ui.clearFormNotification("custNotif");
    }, 4000);
}

function onSalesmanChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var salesman = formContext.getAttribute("myc_salesman").getValue();
    var salesmanControl = formContext.getControl("myc_salesman");

    if (!salesman) {
        salesmanControl.setNotification("Please select a salesman.", "custNotif");
    } else {
        salesmanControl.clearNotification("custNotif");
        sendMailToSalesman(formContext, salesman[0].id);
    }
}


function onSave(executionContext) {
    var formContext = executionContext.getFormContext();
    var salesman = formContext.getAttribute("myc_salesman").getValue();

    sendMailToSalesman(formContext, salesman[0].id);

}


function sendMailToSalesman(formContext, contactId) {
    contactId = contactId.replace(/[{}]/g, "");
    formContext.ui.setFormNotification("Loading salesman primary email...", "INFO", "loadingEmail");

    Xrm.WebApi.retrieveRecord("contact", '20fb3390-f8cd-ef11-b8e9-7c1e52001b6c', "?$select=emailaddress1")
        .then(function(result) {
            var email = result.emailaddress1 || "";
            formContext.ui.setFormNotification("Sending email to: "+email, "INFO", "loadingEmail");

        })
        .catch(function(error) {
            console.error(error.message);
            formContext.ui.setFormNotification("Error retrieving salesman email.", "ERROR", "loadingEmail");
        });

     setTimeout(function(){
        formContext.ui.clearFormNotification("loadingEmail");
    }, 4000);
}