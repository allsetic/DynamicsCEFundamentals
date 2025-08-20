
// Get ExecutionContext as Parameter
function myFuncion(executionContext){

    var formContext = executionContext.getFormContext();
}

// DATA

// data.attributes

// getValue(), setValue(), setRequiredLevel(), addOnChange(), getIsDirty()

const attr = formContext.getAttribute("new_total");
attr.setValue(123.45);
attr.setRequiredLevel("required");

// data.entity

// getId(), getEntityName(), .save()

var recordId = formContext.data.entity.getId();
console.log("Record id:", recordId);

var entityName = formContext.data.entity.getEntityName();
console.log("Nombre de la entidad:", entityName);

formContext.data.entity.save();

formContext.data.entity.save("saveandclose");


// data.process

// Métodos típicos: .getActiveProcess(), .setActiveProcess(id, cb), .getActiveStage(), .setActiveStage(stageId, cb)

var activeProcess = formContext.data.process.getActiveProcess();

if (activeProcess) {
    console.log("Active process:", activeProcess.getName());
}

formContext.data.process.setActiveProcess(
    "b0f6a0f0-1234-4a89-bd4b-9876543210ab", 
    function(status) {
        if (status === "success") {
            console.log("Active process changed successfully.");
        } else {
            console.error("Error when trying to change active process.");
        }
    }
);


var activeStage = formContext.data.process.getActiveStage();
if (activeStage) {
    console.log("Active stage:", activeStage.getName());
}

formContext.data.process.setActiveStage(
    "7e35d21f-5678-4b8c-91d9-9876543210ab",
    function(status) {
        if (status === "success") {
            console.log("Stage changed succesfully.");
        } else {
            console.error("It wasn't possible to change the stage.");
        }
    }
);


// UI

// ui.controls

// .setVisible(bool), .setDisable(bool), .getAttribute(), .setNotification(msg, id), .clearNotification(id)

formContext.getControl("new_total").setDisabled(true);

formContext.getControl("address1_city").setVisible(false); 
formContext.getControl("address1_city").setVisible(true);  

formContext.getControl("emailaddress1")
            .setNotification("Invalid email", "inv_email");

formContext.getControl("emailaddress1")
            .clearNotification("inv_email");


// ui.tabs

const tab = formContext.ui.tabs.get("tab_general");

tab.setVisible(true);

const section = tab.sections.get("sec_datos");

section.controls.get("new_total").setVisible(false);

// ui.formSelector -> contains items collection

formContext.ui.formSelector.items.forEach(item => {
  if(item.getLabel() === "Sales Form") item.navigate();
});


// Form's general notificacions

formContext.ui.setFormNotification("Fill the values", "WARNING", "notif1");
formContext.ui.clearFormNotification("notif1");
