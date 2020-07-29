/*
// read from existing workflow context 
var productInfo = $.context.productInfo; 
var productName = productInfo.productName; 
var productDescription = productInfo.productDescription;

// read contextual information
var taskDefinitionId = $.info.taskDefinitionId;

// read user task information
var lastUserTask1 = $.usertasks.usertask1.last;
var userTaskSubject = lastUserTask1.subject;
var userTaskProcessor = lastUserTask1.processor;
var userTaskCompletedAt = lastUserTask1.completedAt;

var userTaskStatusMessage = " User task '" + userTaskSubject + "' has been completed by " + userTaskProcessor + " at " + userTaskCompletedAt;

// create new node 'product'
var product = {
		productDetails: productName  + " " + productDescription,
		workflowStep: taskDefinitionId
};

// write 'product' node to workflow context
$.context.product = product;
*/

var requiredTasksCsV = $.context.requiredTasksCsV;

if(requiredTasksCsV.indexOf("M2.4.1") !== -1){
	$.context.isBasicInitialRequired = true;
}else{
	$.context.isBasicInitialRequired = false;
}

if(requiredTasksCsV.indexOf("M2.4.2")!== -1){
	$.context.isBasicUOMRequired = true;
}else{
	$.context.isBasicUOMRequired = false;
}

if(requiredTasksCsV.indexOf("M2.8.1")!== -1){
	$.context.isBasicMDMRequired = true;
}else{
	$.context.isBasicMDMRequired = false;
}