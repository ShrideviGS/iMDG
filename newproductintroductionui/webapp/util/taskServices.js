jQuery.sap.declare("newproductintroductionui.newproductintroductionui.util.taskServices");
newproductintroductionui.newproductintroductionui.util.taskServices = {

	//Function to get Task Context Data
	getTaskContextData: function (oController, taskType) {
		var that = this;
		var oTaskDataModel = oController.getOwnerComponent().getModel("oTaskDataModel");
		oController.oTaskDataModel = oTaskDataModel;
		var url_string = window.location.href;
		var oUrlSplit = url_string.split("/");
		var taskId = oUrlSplit[oUrlSplit.length - 1];
		// var taskId = "9338c5aa-afc9-11ea-a068-00163ea54f93";
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/bpmworkflowruntime/v1/task-instances/" + taskId + "/context", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oTaskDataModel.setData(data);
				oTaskDataModel.refresh();
				if (taskType === "BASIC_DATA_COLLECTION") {
					oController.getBasicDataCollection();
					// oController.getFieldsEnabled(data.requiredTasksCsV);
				}
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
		});
	},

	//Function to get node ID Context Data
	getTaskNodeIDData: function (oController) {
		var that = this;
		var oTaskDataModel = oController.getOwnerComponent().getModel("oTaskDataModel");
		oController.oTaskDataModel = oTaskDataModel;
		var url_string = window.location.href;
		var oUrlSplit = url_string.split("/");
		var taskId = oUrlSplit[oUrlSplit.length - 1];
		// var taskId = "9338c5aa-afc9-11ea-a068-00163ea54f93";
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/bpmworkflowruntime/v1/task-instances/" + taskId + "/attributes", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				oController.getFieldsEnabled(oEvent.getSource().getData());
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
		});
	},

	//Function to Complete Task Flow
	onCompleteTask: function (oController) {

		var url_string = window.location.href;
		var oUrlSplit = url_string.split("/");
		var token = this.fetchToken();
		var taskId = oUrlSplit[oUrlSplit.length - 1];
		var data = {
			"status": "COMPLETED"
		};
		data = JSON.stringify(data);

		$.ajax({
			url: "/bpmworkflowruntime/v1/task-instances/" + taskId,
			method: "PATCH",
			contentType: "application/json",
			async: true,
			data: data,
			headers: {
				"X-CSRF-Token": token
			},
			success: function () {
				var msg = "Task submitted successfully";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(msg);

			},
			error: function (errMsg) {
				var msg = "Error in submitting task";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(msg);
			}
		});

		/*	var that = this;
			var token = this.fetchToken();
			var url_string = window.location.href;
			var oUrlSplit = url_string.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			var data = {
				"context": {},
				"status": "COMPLETED"
			};
			data = JSON.stringify(data);
			var oHeader= {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"X-CSRF-Token": token
				};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/bpmworkflowruntime/v1/task-instances/" + taskId, data, true, "PATCH", false, false, oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();

				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			});*/
	},

	//Function to fetch XSRF-Token 
	fetchToken: function () {
		var token;
		$.ajax({
			url: "/bpmworkflowruntime/v1/task-instances/workflow-service/rest/v1/xsrf-token",
			method: "GET",
			async: false,
			headers: {
				"X-CSRF-Token": "Fetch"
			},
			success: function (result, xhr, data) {
				token = data.getResponseHeader("X-CSRF-Token");
			}
		});
		return token;
	}
};