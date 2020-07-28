sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/BusyDialog",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"newproductintroductionui/newproductintroductionui/util/taskServices"
], function (Controller, JSONModel, BusyDialog, MessageBox, MessageToast, Formatter, taskServices) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.salesOrgView", {
		onInit: function () {
			var oComponent = this.getOwnerComponent();
			this.oBusyDialog = new BusyDialog();
			this.oHeader = {
				"Accept": "application/json",
				"Content-Type": "application/json"
			};
			this.oSubmit = false;
			var oMRPContextModel = new JSONModel();
			this.getView().setModel(oMRPContextModel, "oMRPContextModel");
			var oMRPDataModel = new JSONModel();
			this.getView().setModel(oMRPDataModel, "oMRPDataModel");
			this._router = oComponent.getRouter();
			this._router.getRoute("salesOrgView").attachPatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			var oVisData = {
				"oSALESORG1Box": false,
				"oSALESORG2Box": false,
				"oTAXDATABox": false
			};
			var oVisModel = new JSONModel();
			this.getView().setModel(oVisModel, "oVisModel");
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);
			this.getMRPWFContext();
		},

		getTaskIdFromUrl: function () {
			//add Task ID here
			var oUrlString = window.location.href;
			var oUrlSplit = oUrlString.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			// var taskId = "b696a518-2e09-11e9-b872-00163e83618b";
			return taskId;
		},

		getMRPWFContext: function () {
			var that = this;
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var taskId = this.getTaskIdFromUrl();
			// var taskId = "42f85c41-1efe-11e9-b488-00163e82bb6e";
			var sUrl = "/bpmworkflowruntime/workflow-service/rest/v1/task-instances/" + taskId + "/context";
			var oSrvModel = new JSONModel();
			oSrvModel.loadData(sUrl, true, "GET", false, false);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						oMRPContextModel.setData(resultData);
						oMRPContextModel.refresh(true);
						var materialUniqueId = resultData.materialUniqueId;
						// var plantCode = resultData.plantCode;
						var salesOrg = resultData.salesOrgCode;
						var distributionChannelCode = resultData.distributionChannel;
						that.getsalesOrgViewData(materialUniqueId, 0, 100, distributionChannelCode, salesOrg);
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

		getsalesOrgViewData: function (materialUniqueId, startIndex, batchSize, distributionChannelCode, salesOrg) {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSOModel = new JSONModel();
			this.getView().setModel(oSOModel, "oSalesOrgDataModel");
			var sUrl = "/mylanservices/salesorg/load/" + materialUniqueId + "/" + salesOrg + "/" + distributionChannelCode + "/" + startIndex +
				"/" + batchSize;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					var resultData = oEvent.getSource().getData();
					that.getView().getModel("oSalesOrgDataModel").setData(resultData);
					that.getView().getModel("oSalesOrgDataModel").refresh(true);
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
			case this.getView().getModel("i18n").getResourceBundle().getText("SALESORG1"):
				oVisData = {
					"oSALESORG1Box": true,
					"oSALESORG2Box": false,
					"oTAXDATABox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("SALESORG2"):
				oVisData = {
					"oSALESORG1Box": false,
					"oSALESORG2Box": true,
					"oTAXDATABox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("TAXDATA"):
				oVisData = {
					"oSALESORG1Box": false,
					"oSALESORG2Box": false,
					"oTAXDATABox": true
				};
				break;
			default:
				oVisData = {
					"oSALESORG1Box": false,
					"oSALESORG2Box": false,
					"oTAXDATABox": false
				};
			}
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);
		},

		onSave: function () {
			var that = this;
			this.oBusyDialog.open();
			var oSrvUrl = "/mylanservices/salesorg/update";
			var oSrvModel = new JSONModel();
			var oSalesOrgData = this.getView().getModel("oSalesOrgDataModel").getData();
			oSrvModel.loadData(oSrvUrl, JSON.stringify(oSalesOrgData), true, "POST", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					if (that.oSubmit) {
						that.oSubmit = false;
						taskServices.onCompleteTask();
						return;
					}
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

		onDateChange: function (oValue) {
			var oDateValue = new Date(oValue);
			var oYear = oDateValue.getFullYear();
			var oMonth = oDateValue.getMonth() + 1;
			if (oMonth < 10) {
				oMonth = oMonth.toString();
				oMonth = "0" + oMonth;
			} else {
				oMonth = oMonth.toString();
			}
			var oDate = oDateValue.getDate();
			if (oDate < 10) {
				oDate = oDate.toString();
				oDate = "0" + oDate;
			} else {
				oDate = oDate.toString();
			}
			var oFinalDate = oYear + "-" + oMonth + "-" + oDate + "T00:00:00";
			return oFinalDate;
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
				if (this.oSubmit) {
					this.onSave();
				} else {
					MessageToast.show(oSuccMsg);
				}
			}
		},

		onValidate: function () {
			var that = this;
			this.oBusyDialog.open();
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var oLeadCat = oMRPContextModel.getData().leadCategory;
			var oMatType = oMRPContextModel.getData().materialType;
			var oPlantCode = oMRPContextModel.getData().plantCode;
			var oNodeId = oMRPContextModel.getData().nodeId;
			var oSrvUrl = "/mylanservices/salesorg/mandatory/fields/" + oLeadCat + "/" + oMatType + "/" + oPlantCode + "/" +
				oNodeId;
			var oSrvModel = new JSONModel();
			oSrvModel.loadData(oSrvUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var oData = oEvent.getSource().getData().entity;
					that.nullCheckVal(oData);
					if (!that.oSubmit) {
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
		}
	});

});