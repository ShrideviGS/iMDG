sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("viewRule.viewRule.controller.ruleeditor", {
		onInit: function () {
			var that = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/bpmworkflowruntime/v1/xsrf-token", false);
			xhr.setRequestHeader("X-CSRF-Token", "Fetch");
			xhr.onreadystatechange = function () {
				that.oHeader = {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"x-csrf-token": xhr.getResponseHeader("X-CSRF-Token")
				};
			};
			xhr.send(null);
			var oModel = new JSONModel("./model/data.json");
			var sRootPath = jQuery.sap.getModulePath("viewRule.viewRule");
			oModel.attachRequestCompleted(function (oEvent) {
				oModel.refresh();
			});
			oModel.loadData(sRootPath + "/model/data.json", null, false);
			this.getView().setModel(oModel);
			this.getData();
		},
		getData: function () {
			var that = this;
			var sUrl = "/npiservices/npi/visibilityRules/treeData?applicationName= ";
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();

				} else {
					var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");

				}
			});

			oModel.attachRequestFailed(function (oEvent) {
				var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorText);
				that.busy.close();
			});
		},
		onCollapseAll: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},
		selectAll: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var oCurrObj = this.getView().getModel().getProperty(path);
			if (oCurrObj.Type === "View" || oCurrObj.Type === "Sub View") {
				this.Checkall(oCurrObj.categories, oCurrObj.amount);
				this.getView().getModel().refresh();
			}
		},
		Checkall: function (value, state) {
			for (var i = 0; i < value.length; i++) {
				value[i].amount = state;
				if (value[i].Type === "View" || value[i].Type === "Sub View") {
					for (var k = 0; k < value[i].categories.length; k++) {
						value[i].categories[k].amount = value[i].amount;
					}
				}
			}
		},
		onUpdate: function () {

			var payload = this.getView().getModel().getData();
			sap.ui.core.BusyIndicator.show(0);
			var that = this;
			// $.ajax({
			// 	url: "/npiservices/visibilityRules/update",
			// 	type: "POST",
			// 	data: JSON.stringify(payload),
			// 	async: true,
			// 	contentType: 'application/json',
			// 	success: function (data) {

			// 		sap.ui.core.BusyIndicator.hide();
			// 	},
			// 	error: function (e) {
			// 		// console.log("error: " + e);
			// 		sap.ui.core.BusyIndicator.hide();

			// 	}
			// });
			var data = JSON.stringify(payload);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/npi/visibilityRules/update", data, true, "POST", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					sap.ui.core.BusyIndicator.close(0);
					// alert("success");

				} else {
					sap.ui.core.BusyIndicator.close(0);
					var Message = "Internal Server Error";
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				sap.ui.core.BusyIndicator.close(0);
				var Message = "Internal Server Error";
			});

		}
	});
});