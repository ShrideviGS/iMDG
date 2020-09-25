sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/m/BusyDialog",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"newproductintroductionui/newproductintroductionui/util/taskServices"
], function (Controller, JSONModel, DateFormat, BusyDialog, MessageBox, MessageToast, Formatter, taskServices) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.warehouseView", {
		onInit: function () {
			var that = this;
			var oComponent = this.getOwnerComponent();
			this.oBusyDialog = new BusyDialog();
			this.oHeader = {
				"Accept": "application/json",
				"Content-Type": "application/json"
			};
			this.oSubmit = false;
			var oMRPContextModel = new JSONModel();
			this.getView().setModel(oMRPContextModel, "oWarehouseContextModel");
			oMRPContextModel.setSizeLimit(999);
			var oMRPDataModel = new JSONModel();
			this.getView().setModel(oMRPDataModel, "oWarehouseDataModel");
			oMRPDataModel.setSizeLimit(999);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "warehouseView") {
					that._handleRouteMatched();
				}
			});
			// this._router = oComponent.getRouter();
			// this._router.getRoute("warehouseView").attachPatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function () {
			var oVisData = {
				"oWM1Box": false,
				"oWM2Box": false
			};
			var oVisModel = new JSONModel();
			this.getView().setModel(oVisModel, "oVisModel");
			oVisModel.setSizeLimit(999);
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);

			var oData = {
				"EntryCollection": [{
					"Author": "Alexandrina Victoria",
					"Type": "Comment",
					"Date": "March 03 2013",
					"Text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,"
				}, {
					"Author": "George Washington",
					"Type": "Comment",
					"Date": "March 04 2013",
					"Text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore"
				}]
			};
			var oCommModel = new JSONModel();
			oCommModel.setData(oData);
			oCommModel.setSizeLimit(999);
			oCommModel.refresh(true);
			this.getView().setModel(oCommModel, "oCommModel");

			this.getPickStorageType();
			this.getStorageSelInd();
			this.getBulkStorage();
			this.getSpclMovement();
			this.getTwoStepPick();
			this.getStorageUnitType();
			this.getWHWFContext();
		},

		getWHWFContext: function () {
			var that = this;
			var oWarehouseContextModel = this.getView().getModel("oWarehouseContextModel");
			var taskId = this.getTaskIdFromUrl();
			// var taskId = "44408e52-1d63-11e9-a01b-00163e7f9cbb";
			var sUrl = "/bpmworkflowruntime/workflow-service/rest/v1/task-instances/" + taskId + "/context";
			var oSrvModel = new JSONModel();
			oSrvModel.loadData(sUrl, true, "GET", false, false);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						oWarehouseContextModel.setData(resultData);
						oWarehouseContextModel.refresh(true);
						var materialUniqueId = resultData.materialUniqueId;
						var warehouseCode = resultData.warehouseCode;
						// that.getWHViewData(21, "0001", 0, 0);
						that.getWHViewData(materialUniqueId, warehouseCode, 0, 0);
					}
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				that.oBusyDialog.close();
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getTaskIdFromUrl: function () {
			var oUrlString = window.location.href;
			var oUrlSplit = oUrlString.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			return taskId;
		},

		getWHViewData: function (materialUniqueId, warehouseCode, startIndex, batchSize) {
			var that = this;
			var oSrvModel = new JSONModel();
			var oWarehouseDataModel = this.getView().getModel("oWarehouseDataModel");
			var sUrl = "/npiservices/warehouse/load/" + materialUniqueId + "/" + warehouseCode + "/" + startIndex + "/" +
				batchSize;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					var resultData = oEvent.getSource().getData();
					oWarehouseDataModel.setData(resultData);
					oWarehouseDataModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				that.oBusyDialog.close();
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		handleListColor: function (oEvent) {
			var oList = this.getView().byId("idMasterList");
			var oItems = oList.getItems();
			for (var i = 0; i < oItems.length; i++) {
				oItems[i].removeStyleClass("greyTitleColorClass");
			}
			var oSource = oEvent.getParameter("srcControl");
			oSource.addStyleClass("greyTitleColorClass");
		},

		onItemPress: function (oEvent) {
			this.handleListColor(oEvent);
			var oSelectedKey = oEvent.getParameter("listItem").getTitle();
			var oVisModel = this.getView().getModel("oVisModel");
			var oVisData = {};
			switch (oSelectedKey) {
			case this.getView().getModel("i18n").getResourceBundle().getText("WAREHOUSE_MGMT1"):
				oVisData = {
					"oWM1Box": true,
					"oWM2Box": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("WAREHOUSE_MGMT2"):
				oVisData = {
					"oWM1Box": false,
					"oWM2Box": true
				};
				break;
			default:
				oVisData = {
					"oWM1Box": false,
					"oWM2Box": false
				};
			}
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);
		},

		onMemoPost: function (oEvent) {
			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			// create new entry
			var sValue = oEvent.getParameter("value");
			var oEntry = {
				Author: "James Vaughan",
				Type: "Reply",
				Date: "" + sDate,
				Text: sValue
			};

			// update model
			var oModel = this.getView().getModel("oCommModel");
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
		},

		onSave: function () {
			var that = this;
			this.oBusyDialog.open();
			var oSrvUrl = "/npiservices/warehouse/update";
			var oSrvModel = new JSONModel();
			var oWarehouseDataModel = this.getView().getModel("oWarehouseDataModel");
			var oPayload = oWarehouseDataModel.getData();
			// oPayload.validFrom = this.onDateChange(this.getView().byId("test2").getDateValue());
			// oPayload.dateUpdated = this.onDateChange(oPayload.dateUpdated);
			// oPayload.effectiveOutDate = this.onDateChange(oPayload.effectiveOutDate);
			oSrvModel.loadData(oSrvUrl, JSON.stringify(oPayload), true, "POST", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					var oMsg = oEvent.getSource().getData().message;
					var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
					var oDetails = oEvent.getSource().getData();
					MessageBox.success(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : "",
							details: oDetails
						}
					);
					that.oSubmit = false;
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				that.oBusyDialog.close();
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		nullCheckVal: function (oData) {
			var oView = this.getView();
			var oFields = [];
			var oFldLbl = "";
			if (oData[0] === null) {
				return;
			}
			for (var i = 0; i < oData.length; i++) {
				if (oView.byId(oData[i].technicalName)) {
					if (oView.byId(oData[i].technicalName).getValue()) {
						oView.byId(oData[i].technicalName).setValueState("None");
					} else {
						if (oData[i].failureLevel === "E") {
							oView.byId(oData[i].technicalName).setValueState("Error");
							oFldLbl = (oView.byId(oData[i].technicalName)).getParent().getItems()[0].getText();
							oFields.push(oFldLbl);
						} else if (oData[i].failureLevel === "W") {
							oView.byId(oData[i].technicalName).setValueState("Warning");
						}
					}
				}
			}
			if (oFields.length > 0) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				var oValMsg = this.getView().getModel("i18n").getResourceBundle().getText("MRP_VAL_ERR_MSG");
				MessageBox.error(
					oValMsg, {
						styleClass: bCompact ? "sapUiSizeCompact" : "",
						details: oFields
					}
				);
				this.oSubmit = false;
			} else {
				var oSuccMsg = this.getView().getModel("i18n").getResourceBundle().getText("MRP_VAL_SUCC_MSG");
				MessageToast.show(oSuccMsg);
				if (this.oSubmit) {
					this.onSave();
				}
			}
		},

		onValidate: function () {
			var that = this;
			this.oBusyDialog.open();
			var oWarehouseContextModel = this.getView().getModel("oWarehouseContextModel");
			var oLeadCat = oWarehouseContextModel.getData().leadCategory;
			var oMatType = oWarehouseContextModel.getData().materialType;
			var oPlantCode = oWarehouseContextModel.getData().plantCode;
			var oNodeId = oWarehouseContextModel.getData().nodeId;
			var oSrvUrl = "/npiservices/mrp/mandatory/fields/" + oLeadCat + "/" + oMatType + "/" + oPlantCode + "/" +
				oNodeId;
			var oSrvModel = new JSONModel();
			oSrvModel.loadData(oSrvUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var oData = oEvent.getSource().getData().entity;
					that.nullCheckVal(oData);
					if (!that.oSubmit) {
						that.oBusyDialog.close();
					} else {
						taskServices.onCompleteTask();
						that.oBusyDialog.close();
					}
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				that.oBusyDialog.close();
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		onSubmit: function () {
			this.oSubmit = true;
			this.onValidate();
		},

		getStorageSelInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStorageSelIndModel = new JSONModel();
			this.getView().setModel(oStorageSelIndModel, "oStorageSelIndModel");
			var sUrl = "/npiservices/lookup/storageselectionindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStorageSelIndModel.setData({
						results: resultData
					});
					oStorageSelIndModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getBulkStorage: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oBulkStorageModel = new JSONModel();
			this.getView().setModel(oBulkStorageModel, "oBulkStorageModel");
			var sUrl = "/npiservices/lookup/bulkstorages";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oBulkStorageModel.setData({
						results: resultData
					});
					oBulkStorageModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getSpclMovement: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSpclMovementModel = new JSONModel();
			this.getView().setModel(oSpclMovementModel, "oSpclMovementModel");
			var sUrl = "/npiservices/lookup/specialmovementindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSpclMovementModel.setData({
						results: resultData
					});
					oSpclMovementModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getTwoStepPick: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oTwoStepPickModel = new JSONModel();
			this.getView().setModel(oTwoStepPickModel, "oTwoStepPickModel");
			var sUrl = "/npiservices/lookup/steppicks";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oTwoStepPickModel.setData({
						results: resultData
					});
					oTwoStepPickModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getStorageUnitType: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStorageUnitTypeModel = new JSONModel();
			this.getView().setModel(oStorageUnitTypeModel, "oStorageUnitTypeModel");
			var sUrl = "/npiservices/lookup/storageunittypes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStorageUnitTypeModel.setData({
						results: resultData
					});
					oStorageUnitTypeModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		getPickStorageType: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oPickStorageTypeModel = new JSONModel();
			this.getView().setModel(oPickStorageTypeModel, "oPickStorageTypeModel");
			var sUrl = "/npiservices/lookup/storagetypes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oPickStorageTypeModel.setData({
						results: resultData
					});
					oPickStorageTypeModel.refresh(true);
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		}
	});
});