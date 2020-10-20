sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inbox.inbox.controller.inbox", {
		onInit: function () {
			var that = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/bpmworkflowruntime/v1/xsrf-token", false);
			xhr.setRequestHeader("X-CSRF-Token", "Fetch");
			xhr.onreadystatechange = function () {
				// alert();
				that.oHeader = {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"x-csrf-token": xhr.getResponseHeader("X-CSRF-Token")
				};
			};
			xhr.send(null);
			var oInboxModel = this.getOwnerComponent().getModel("inboxModel");
			this.getView().setModel(oInboxModel, "oInboxModel");
			this.loadWFInstances("detailed_scoping_wf");
		},
		onSearch: function (oEvent) {
			debugger;
			var taskType = this.getView().byId("taskType").getSelectedKey();
			this.loadWFInstances(taskType);
		},
		loadWFInstances: function (wfType) {
			var inboxModel = this.getView().getModel("oInboxModel");
			var WFDefId = wfType;
			$.ajax({
				url: "/bpmworkflowruntime/v1/workflow-instances?%24orderby=startedAt%20desc&definitionId=" + WFDefId + "",
				method: "GET",
				contentType: "application/json",
				async: true,
				success: function (data) {
					var a = [];
					for (var i = 0; i < data.length; i++) {
						if (data[i].status !== "COMPLETED") {
							a.push(data[i]);
						}
					}
					inboxModel.setProperty("/inboxData", a);
					inboxModel.refresh();
				},
				error: function (errMsg) {
					console.log(errMsg);
				}
			});
		},
		taskSelect: function (oEvent) {
			var oIndex = oEvent.getSource().getParent().getIndex();
			var inboxModel = this.getView().getModel("oInboxModel");
			var data = inboxModel.getProperty("/inboxData/" + oIndex + "");
			var taskId = data.id;
			var taskType = data.subject.split("- ")[1];
				var viewName="";
			if (taskType === "Detailed Scoping Process") {
				viewName = "detailScopingView";
			}else if (taskType === "Material Definition Process") {
				viewName = "basicDataCollection";
			}else if (taskType === "Plant Definition Process") {
				viewName = "mrpView";
			}else if (taskType === "Warehouse Definition Process") {
				viewName = "warehouseView";
			}else if (taskType === "Sales-Org Definition Process") {
				viewName = "salesOrgView";
			}else if (taskType === "FICO Definition Process") {
				viewName = "ficoView";
			}
			$.ajax({
				url: "/bpmworkflowruntime/v1/workflow-instances/" + taskId + "/execution-logs",
				method: "GET",
				contentType: "application/json",
				async: true,
				success: function (odata) {
					var instanceId = "";
					for (var i = 0; i < odata.length; i++) {
						if (odata[i].type === "USERTASK_CREATED") {
							instanceId = odata[i].taskId;
						}
					}
					if (instanceId !== "" && viewName !== "") {
						var oURL =
							"https://incture-technologies-hrapps-npi-imdg-approuter.cfapps.eu10.hana.ondemand.com/cp.portal/site#newproductintroductionui-display?sap-ui-app-id-hint=newproductintroductionui.newproductintroductionui&/" +
							viewName + "/" + instanceId + "";
							window.open(oURL);
					}

				},
				error: function (errMsg) {
					console.log(errMsg);
				}
			});
		}
	});
});