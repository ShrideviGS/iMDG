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

if(requiredTasksCsV.indexOf("P2.1") !== -1){
	$.context.isMRPRequired = true;
}else{
	$.context.isMRPRequired = false;
}

if(requiredTasksCsV.indexOf("P6.1")!== -1){
	$.context.isFICORequired = true;
}else{
	$.context.isFICORequired = false;
}

if(requiredTasksCsV.indexOf("P9.1")!== -1){
	$.context.isPurchasingRequired = true;
}else{
	$.context.isPurchasingRequired = false;
}

if(requiredTasksCsV.indexOf("P8.1")!== -1){
	$.context.isQMRequired = true;
}else{
	$.context.isQMRequired = false;
}

$.context.nodeId = "P2.1";