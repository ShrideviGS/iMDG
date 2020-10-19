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

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.mrpView", {
		onInit: function () {
			var that = this;
			var oComponent = this.getOwnerComponent();
			this.oBusyDialog = new BusyDialog();
			// this.oHeader = {
			// 	"Accept": "application/json",
			// 	"Content-Type": "application/json"
			// };
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
			this.oSubmit = false;
			var oMRPContextModel = new JSONModel();
			this.getView().setModel(oMRPContextModel, "oMRPContextModel");
			oMRPContextModel.setSizeLimit(999);
			var oMRPDataModel = new JSONModel();
			this.getView().setModel(oMRPDataModel, "oMRPDataModel");
			oMRPDataModel.setSizeLimit(999);
			this.oMRPDataModel = oComponent.getRouter();
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "mrpView") {
					that._handleRouteMatched();
				}
			});
			//this.oRouter.getRoute("mrpView").attachPatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			var oVisData = {
				"oMRP1Box": false,
				"oMRP2Box": false,
				"oMRP3Box": false,
				"oMRP4Box": false,
				"oWSBox": false,
				"oPDS1Box": false,
				"oPDS2Box": false,
				"oSLBox": false,
				"oPurchasingBox": false,
				"oFTEBox": false,
				"oSGPBox": false,
				"oQMBox": false
			};
			var oVisModel = new JSONModel();
			this.getView().setModel(oVisModel, "oVisModel");
			oVisModel.setSizeLimit(999);
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);
			this.getMRPWFContext();
			this.getPurchasingGroup();
			this.getABCInd();
			this.getMRPTypes();
			// this.getPlanCycle();
			this.getLotSize();
			// this.getStorageCostInd();
			// this.getRoundingProf();
			this.getBatchEntry();
			this.getQuotaUsage();
			this.getBackFlush();
			this.getStockDetGrp();
			this.getJITDelSch();
			// this.getShdMargin();
			this.getCoverageProf();
			this.getSafetyTimeInd();
			this.getSTimePeriodProf();
			this.getMPSCat();
			this.getStockStatusClassif();
			this.getRIMMixType();
			this.getPeriodInd();
			this.getSplittingInd();
			this.getFiscalYearVar();
			this.getCrossProject();
			this.getAvailCheck();
			this.getStrategyGrp();
			this.getMixedMRP();
			this.getConsMod();
			this.getSelMethods();
			this.getMRPDep();
			this.getReqGrp();
			this.getIndCols();
			this.getDisInd();
			this.getPushDist();
			this.getFairShareRule();
			this.getREMProf();
			this.getProdSchedProf();
			this.getCCPhyInvInd();
			this.getProfitCenter();

		},

		getTaskIdFromUrl: function () {
			//add Task ID here
			var oUrlString = window.location.href;
			var oUrlSplit = oUrlString.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			// var taskId = "51de2c3a-afce-11ea-a068-00163ea54f93";
			return taskId;
		},

		getMRPWFContext: function () {
			var that = this;
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var taskId = this.getTaskIdFromUrl();
			// var taskId = "42f85c41-1efe-11e9-b488-00163e82bb6e";
			var sUrl = "/bpmworkflowruntime/v1/task-instances/" + taskId + "/context";
			var oSrvModel = new JSONModel();
			oSrvModel.loadData(sUrl, true, "GET", false, false,this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						var nodeId = resultData.nodeId;
						oMRPContextModel.setData(resultData);
						oMRPContextModel.refresh(true);
						var materialUniqueId = resultData.materialUniqueId;
						var plantCode = resultData.plantCode;
						// that.getMRPViewData(21, "0001", 0, 0);
						that.getMRPViewData(materialUniqueId, plantCode, 0, 0);
						that.getPlanCycle();
						that.getStorageCostInd();
						that.getRoundingProf();
						that.getShdMargin();
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
			//get Node Id and enable views
			var url_string = window.location.href;
			var oUrlSplit = url_string.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setSizeLimit(999);
			oModel.loadData("/bpmworkflowruntime/v1/task-instances/" + taskId + "/attributes", "", true, "GET", false,
				false,this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				var nodeId;
				var resData = oEvent.getSource().getData();
				for (var i = 0; i < resData.length; i++) {
					if (resData[i].id === "NodeId") {
						nodeId = resData[i].value;
					}
				}
				if (nodeId === "P2.1") {
					that.getView().byId("MRP1").setVisible(true);
					that.getView().byId("MRP2").setVisible(true);
					that.getView().byId("MRP3").setVisible(true);
					that.getView().byId("MRP4").setVisible(true);
					that.getView().byId("WRK_SCHEDULE").setVisible(true);
					that.getView().byId("PLANT_DATA_STORAGE1").setVisible(true);
					that.getView().byId("PLANT_DATA_STORAGE2").setVisible(true);
					that.getView().byId("STORAGE_LOC").setVisible(false);
					that.getView().byId("PURCHASING").setVisible(false);
					that.getView().byId("FOREIGN_TRADE_EXPORT").setVisible(false);
					that.getView().byId("SALES_GENERAL_PLANT").setVisible(false);
					that.getView().byId("QUALITY_MGMT").setVisible(false);
				} else if (nodeId === "P8.1") {
					that.getView().byId("MRP1").setVisible(false);
					that.getView().byId("MRP2").setVisible(false);
					that.getView().byId("MRP3").setVisible(false);
					that.getView().byId("MRP4").setVisible(false);
					that.getView().byId("WRK_SCHEDULE").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE1").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE2").setVisible(false);
					that.getView().byId("STORAGE_LOC").setVisible(false);
					that.getView().byId("PURCHASING").setVisible(false);
					that.getView().byId("FOREIGN_TRADE_EXPORT").setVisible(false);
					that.getView().byId("SALES_GENERAL_PLANT").setVisible(false);
					that.getView().byId("QUALITY_MGMT").setVisible(true);
				} else if (nodeId === "P9.1") {
					that.getView().byId("MRP1").setVisible(false);
					that.getView().byId("MRP2").setVisible(false);
					that.getView().byId("MRP3").setVisible(false);
					that.getView().byId("MRP4").setVisible(false);
					that.getView().byId("WRK_SCHEDULE").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE1").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE2").setVisible(false);
					that.getView().byId("STORAGE_LOC").setVisible(false);
					that.getView().byId("PURCHASING").setVisible(true);
					that.getView().byId("FOREIGN_TRADE_EXPORT").setVisible(true);
					that.getView().byId("SALES_GENERAL_PLANT").setVisible(false);
					that.getView().byId("QUALITY_MGMT").setVisible(false);
				} else if (nodeId === "P10.1") {
					that.getView().byId("MRP1").setVisible(false);
					that.getView().byId("MRP2").setVisible(false);
					that.getView().byId("MRP3").setVisible(false);
					that.getView().byId("MRP4").setVisible(false);
					that.getView().byId("WRK_SCHEDULE").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE1").setVisible(false);
					that.getView().byId("PLANT_DATA_STORAGE2").setVisible(false);
					that.getView().byId("STORAGE_LOC").setVisible(false);
					that.getView().byId("PURCHASING").setVisible(false);
					that.getView().byId("FOREIGN_TRADE_EXPORT").setVisible(false);
					that.getView().byId("SALES_GENERAL_PLANT").setVisible(true);
					that.getView().byId("QUALITY_MGMT").setVisible(false);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			});
		},

		getMRPViewData: function (materialUniqueId, plantCode, startIndex, batchSize) {
			var that = this;
			var oSrvModel = new JSONModel();
			var oMRPDataModel = this.getView().getModel("oMRPDataModel");
			var sUrl = "/npiservices/npi/mrp/load/" + materialUniqueId + "/" + plantCode + "/" + startIndex + "/" + batchSize;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					var resultData = oEvent.getSource().getData();
					oMRPDataModel.setData(resultData);
					oMRPDataModel.refresh(true);
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

		getPurchasingGroup: function () {
			var that = this;
			this.oBusyDialog.open();
			var oSrvModel = new JSONModel();
			var oPGrpModel = new JSONModel();
			this.getView().setModel(oPGrpModel, "oPGrpModel");
			var sUrl = "/npiservices/npi/lookup/purchasinggroups";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oPGrpModel.setData({
						results: resultData
					});
					oPGrpModel.refresh(true);
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

		getABCInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oABCIndModel = new JSONModel();
			this.getView().setModel(oABCIndModel, "oABCIndModel");
			var sUrl = "/npiservices/npi/lookup/abcindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oABCIndModel.setData({
						results: resultData
					});
					oABCIndModel.refresh(true);
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

		getMRPTypes: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oMRPTypesModel = new JSONModel();
			this.getView().setModel(oMRPTypesModel, "oMRPTypesModel");
			var sUrl = "/npiservices/npi/lookup/mrptypes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oMRPTypesModel.setData({
						results: resultData
					});
					oMRPTypesModel.refresh(true);
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

		getPlanCycle: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oPlanCycleModel = new JSONModel();
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var sPlantCode = oMRPContextModel.getProperty("/plantCode");
			this.getView().setModel(oPlanCycleModel, "oPlanCycleModel");
			var sUrl = "/npiservices/npi/lookup/planningcycles";
			// var sUrl = "/npiservices/npi/lookup/planningcycles/" + sPlantCode;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oPlanCycleModel.setData({
						results: resultData
					});
					oPlanCycleModel.refresh(true);
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

		getLotSize: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oLotSizeModel = new JSONModel();
			this.getView().setModel(oLotSizeModel, "oLotSizeModel");
			var sUrl = "/npiservices/npi/lookup/lotsizes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oLotSizeModel.setData({
						results: resultData
					});
					oLotSizeModel.refresh(true);
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

		getStorageCostInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStrgCostIndModel = new JSONModel();
			this.getView().setModel(oStrgCostIndModel, "oStrgCostIndModel");
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var sPlantCode = oMRPContextModel.getProperty("/plantCode");
			var sUrl = "/npiservices/npi/lookup/storagecostindicators";
			// var sUrl = "/npiservices/npi/lookup/storagecostindicators/" + sPlantCode;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStrgCostIndModel.setData({
						results: resultData
					});
					oStrgCostIndModel.refresh(true);
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

		getRoundingProf: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oRoundProfModel = new JSONModel();
			this.getView().setModel(oRoundProfModel, "oRoundProfModel");
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var sPlantCode = oMRPContextModel.getProperty("/plantCode");
			var sUrl = "/npiservices/npi/lookup/roundingprofiles";
			// var sUrl = "/npiservices/npi/lookup/roundingprofiles/" + sPlantCode;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oRoundProfModel.setData({
						results: resultData
					});
					oRoundProfModel.refresh(true);
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

		getBatchEntry: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oBatchEntryModel = new JSONModel();
			this.getView().setModel(oBatchEntryModel, "oBatchEntryModel");
			var sUrl = "/npiservices/npi/lookup/bacthentries";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oBatchEntryModel.setData({
						results: resultData
					});
					oBatchEntryModel.refresh(true);
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

		getQuotaUsage: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oQuotaArrUsageModel = new JSONModel();
			this.getView().setModel(oQuotaArrUsageModel, "oQuotaArrUsageModel");
			var sUrl = "/npiservices/npi/lookup/quotaarrusages";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oQuotaArrUsageModel.setData({
						results: resultData
					});
					oQuotaArrUsageModel.refresh(true);
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

		getBackFlush: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oBackFlushModel = new JSONModel();
			this.getView().setModel(oBackFlushModel, "oBackFlushModel");
			var sUrl = "/npiservices/npi/lookup/backflushindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oBackFlushModel.setData({
						results: resultData
					});
					oBackFlushModel.refresh(true);
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

		getStockDetGrp: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStockDetGrpModel = new JSONModel();
			this.getView().setModel(oStockDetGrpModel, "oStockDetGrpModel");
			var sUrl = "/npiservices/npi/lookup/stockdetgroups";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStockDetGrpModel.setData({
						results: resultData
					});
					oStockDetGrpModel.refresh(true);
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

		getJITDelSch: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oJITDelSchModel = new JSONModel();
			this.getView().setModel(oJITDelSchModel, "oJITDelSchModel");
			var sUrl = "/npiservices/npi/lookup/jitdelschedules";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oJITDelSchModel.setData({
						results: resultData
					});
					oJITDelSchModel.refresh(true);
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

		getShdMargin: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oShdMarginModel = new JSONModel();
			this.getView().setModel(oShdMarginModel, "oShdMarginModel");
			var oMRPContextModel = this.getView().getModel("oMRPContextModel");
			var sPlantCode = oMRPContextModel.getProperty("/plantCode");
			var sUrl = "/npiservices/npi/lookup/scheduledmargins";
			// var sUrl = "/npiservices/npi/lookup/scheduledmargins/" + sPlantCode;
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oShdMarginModel.setData({
						results: resultData
					});
					oShdMarginModel.refresh(true);
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

		getCoverageProf: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oCoverageProfModel = new JSONModel();
			this.getView().setModel(oCoverageProfModel, "oCoverageProfModel");
			var sUrl = "/npiservices/npi/lookup/coverageprofiles";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oCoverageProfModel.setData({
						results: resultData
					});
					oCoverageProfModel.refresh(true);
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

		getSafetyTimeInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSafetyTimeIndModel = new JSONModel();
			this.getView().setModel(oSafetyTimeIndModel, "oSafetyTimeIndModel");
			var sUrl = "/npiservices/npi/lookup/safetytimeindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSafetyTimeIndModel.setData({
						results: resultData
					});
					oSafetyTimeIndModel.refresh(true);
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

		getSTimePeriodProf: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSTimePeriodProfModel = new JSONModel();
			this.getView().setModel(oSTimePeriodProfModel, "oSTimePeriodProfModel");
			var sUrl = "/npiservices/npi/lookup/safetytimeperiodprofiles";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSTimePeriodProfModel.setData({
						results: resultData
					});
					oSTimePeriodProfModel.refresh(true);
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

		getMPSCat: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oMPSCatModel = new JSONModel();
			this.getView().setModel(oMPSCatModel, "oMPSCatModel");
			var sUrl = "/npiservices/npi/lookup/mpscategories";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oMPSCatModel.setData({
						results: resultData
					});
					oMPSCatModel.refresh(true);
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

		getStockStatusClassif: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStockStatusClassifModel = new JSONModel();
			this.getView().setModel(oStockStatusClassifModel, "oStockStatusClassifModel");
			var sUrl = "/npiservices/npi/lookup/stockstatusclassifications";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStockStatusClassifModel.setData({
						results: resultData
					});
					oStockStatusClassifModel.refresh(true);
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

		getRIMMixType: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oRIMMixTypeModel = new JSONModel();
			this.getView().setModel(oRIMMixTypeModel, "oRIMMixTypeModel");
			var sUrl = "/npiservices/npi/lookup/rimmixtypes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oRIMMixTypeModel.setData({
						results: resultData
					});
					oRIMMixTypeModel.refresh(true);
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

		getPeriodInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oPeriodIndModel = new JSONModel();
			this.getView().setModel(oPeriodIndModel, "oPeriodIndModel");
			var sUrl = "/npiservices/npi/lookup/periodindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oPeriodIndModel.setData({
						results: resultData
					});
					oPeriodIndModel.refresh(true);
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

		getSplittingInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSplitIndModel = new JSONModel();
			this.getView().setModel(oSplitIndModel, "oSplitIndModel");
			var sUrl = "/npiservices/npi/lookup/splittingindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSplitIndModel.setData({
						results: resultData
					});
					oSplitIndModel.refresh(true);
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

		getFiscalYearVar: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oFiscalYearVarModel = new JSONModel();
			this.getView().setModel(oFiscalYearVarModel, "oFiscalYearVarModel");
			var sUrl = "/npiservices/npi/lookup/fiscalyearvariants";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oFiscalYearVarModel.setData({
						results: resultData
					});
					oFiscalYearVarModel.refresh(true);
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

		getCrossProject: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oCrossProjModel = new JSONModel();
			this.getView().setModel(oCrossProjModel, "oCrossProjModel");
			var sUrl = "/npiservices/npi/lookup/crossprojects";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oCrossProjModel.setData({
						results: resultData
					});
					oCrossProjModel.refresh(true);
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

		getAvailCheck: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oAvailCheckModel = new JSONModel();
			this.getView().setModel(oAvailCheckModel, "oAvailCheckModel");
			var sUrl = "/npiservices/npi/lookup/availablitychecks";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oAvailCheckModel.setData({
						results: resultData
					});
					oAvailCheckModel.refresh(true);
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

		getStrategyGrp: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oStrategyGrpModel = new JSONModel();
			this.getView().setModel(oStrategyGrpModel, "oStrategyGrpModel");
			var sUrl = "/npiservices/npi/lookup/strategygroups";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oStrategyGrpModel.setData({
						results: resultData
					});
					oStrategyGrpModel.refresh(true);
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

		getMixedMRP: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oMixedMRPModel = new JSONModel();
			this.getView().setModel(oMixedMRPModel, "oMixedMRPModel");
			var sUrl = "/npiservices/npi/lookup/mixedmrps";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oMixedMRPModel.setData({
						results: resultData
					});
					oMixedMRPModel.refresh(true);
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

		getConsMod: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oConModModel = new JSONModel();
			this.getView().setModel(oConModModel, "oConModModel");
			var sUrl = "/npiservices/npi/lookup/consumptionmodes";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oConModModel.setData({
						results: resultData
					});
					oConModModel.refresh(true);
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

		getSelMethods: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSelMethodModel = new JSONModel();
			this.getView().setModel(oSelMethodModel, "oSelMethodModel");
			var sUrl = "/npiservices/npi/lookup/selectionmethods";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSelMethodModel.setData({
						results: resultData
					});
					oSelMethodModel.refresh(true);
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

		getMRPDep: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oMRPDepModel = new JSONModel();
			this.getView().setModel(oMRPDepModel, "oMRPDepModel");
			var sUrl = "/npiservices/npi/lookup/mrpdepartmentrequirements";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oMRPDepModel.setData({
						results: resultData
					});
					oMRPDepModel.refresh(true);
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

		getReqGrp: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oReqGrpModel = new JSONModel();
			this.getView().setModel(oReqGrpModel, "oReqGrpModel");
			var sUrl = "/npiservices/npi/lookup/requirementgroups";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oReqGrpModel.setData({
						results: resultData
					});
					oReqGrpModel.refresh(true);
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

		getIndCols: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oIndColsModel = new JSONModel();
			this.getView().setModel(oIndColsModel, "oIndColsModel");
			var sUrl = "/npiservices/npi/lookup/individualcols";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oIndColsModel.setData({
						results: resultData
					});
					oIndColsModel.refresh(true);
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

		getDisInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oDisIndModel = new JSONModel();
			this.getView().setModel(oDisIndModel, "oDisIndModel");
			var sUrl = "/npiservices/npi/lookup/discontinuityindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oDisIndModel.setData({
						results: resultData
					});
					oDisIndModel.refresh(true);
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

		getPushDist: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oPushDistModel = new JSONModel();
			this.getView().setModel(oPushDistModel, "oPushDistModel");
			var sUrl = "/npiservices/npi/lookup/pushdistributions";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oPushDistModel.setData({
						results: resultData
					});
					oPushDistModel.refresh(true);
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

		getFairShareRule: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oFairShareRuleModel = new JSONModel();
			this.getView().setModel(oFairShareRuleModel, "oFairShareRuleModel");
			var sUrl = "/npiservices/npi/lookup/fairsharerules";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oFairShareRuleModel.setData({
						results: resultData
					});
					oFairShareRuleModel.refresh(true);
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

		getREMProf: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oRemProfModel = new JSONModel();
			this.getView().setModel(oRemProfModel, "oRemProfModel");
			var sUrl = "/npiservices/npi/lookup/remprofiles";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oRemProfModel.setData({
						results: resultData
					});
					oRemProfModel.refresh(true);
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

		getProdSchedProf: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oProdSchedProfModel = new JSONModel();
			this.getView().setModel(oProdSchedProfModel, "oProdSchedProfModel");
			var sUrl = "/npiservices/npi/lookup/proschedulingprofiles";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oProdSchedProfModel.setData({
						results: resultData
					});
					oProdSchedProfModel.refresh(true);
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

		getCCPhyInvInd: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oCCPhyInvIndModel = new JSONModel();
			this.getView().setModel(oCCPhyInvIndModel, "oCCPhyInvIndModel");
			var sUrl = "/npiservices/npi/lookup/phyinventoryindicators";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oCCPhyInvIndModel.setData({
						results: resultData
					});
					oCCPhyInvIndModel.refresh(true);
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

		getProfitCenter: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oProfitCenterModel = new JSONModel();
			this.getView().setModel(oProfitCenterModel, "oProfitCenterModel");
			var sUrl = "/npiservices/npi/lookup/profitcenters";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oProfitCenterModel.setData({
						results: resultData
					});
					oProfitCenterModel.refresh(true);
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
			case this.getView().getModel("i18n").getResourceBundle().getText("MRP1"):
				oVisData = {
					"oMRP1Box": true,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("MRP2"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": true,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("MRP3"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": true,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("MRP4"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": true,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("WRK_SCHEDULE"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": true,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("PLANT_DATA_STORAGE1"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": true,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("PLANT_DATA_STORAGE2"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": true,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("STORAGE_LOC"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": true,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("PURCHASING"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": true,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("FOREIGN_TRADE_EXPORT"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": true,
					"oSGPBox": false,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("SALES_GENERAL_PLANT"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": true,
					"oQMBox": false
				};
				break;
			case this.getView().getModel("i18n").getResourceBundle().getText("QUALITY_MGMT"):
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": true
				};
				break;
			default:
				oVisData = {
					"oMRP1Box": false,
					"oMRP2Box": false,
					"oMRP3Box": false,
					"oMRP4Box": false,
					"oWSBox": false,
					"oPDS1Box": false,
					"oPDS2Box": false,
					"oSLBox": false,
					"oPurchasingBox": false,
					"oFTEBox": false,
					"oSGPBox": false,
					"oQMBox": false
				};
			}
			oVisModel.setData(oVisData);
			oVisModel.refresh(true);
		},

		onSave: function () {
			var that = this;
			this.oBusyDialog.open();
			var oSrvUrl = "/npiservices/npi/mrp/update";
			var oSrvModel = new JSONModel();
			var oMRPDataModel = this.getView().getModel("oMRPDataModel");
			var oPayload = oMRPDataModel.getData();
			oPayload.validFrom = this.onDateChange(this.getView().byId("test2").getDateValue());
			oPayload.dateUpdated = this.onDateChange(oPayload.dateUpdated);
			oPayload.effectiveOutDate = this.onDateChange(oPayload.effectiveOutDate);
			oSrvModel.loadData(oSrvUrl, JSON.stringify(oPayload), true, "POST", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					that.oBusyDialog.close();
					if (that.oSubmit) {
						that.oSubmit = false;
						taskServices.onCompleteTask(that);
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
			var oSrvUrl = "/npiservices/npi/mrp/mandatory/fields/" + oLeadCat + "/" + oMatType + "/" + oPlantCode + "/" +
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