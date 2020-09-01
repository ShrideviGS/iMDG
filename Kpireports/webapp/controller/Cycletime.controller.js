sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Cycletime", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Cycletime
		 */
		onInit: function () {
			var oThisController = this;
			oThisController.closeBusyDialog();
			oThisController._oRouter = this.getRouter();
			oThisController._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Cycletime") {
					var oMdlCommon = this.getParentModel("mCommon");
					oThisController.closeBusyDialog();
					oMdlCommon.setProperty("/oParam/isCountry", false);
					oMdlCommon.setProperty("/oParam/isView", false);
					oMdlCommon.setProperty("/oParam/isRole", false);
					oMdlCommon.setProperty("/oParam/isScenario", false);
					oThisController.fnManageSrvCall("CycleTime");
				}
			}, oThisController);

		},

		// onSelectionCountryChanged: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var aCountryData = oMdlCommon.getProperty("/aCountrySegments");
		// 	var sPath = oEvent.getParameter("segment").getBindingContext("mCommon").getPath();
		// 	let oSelectedData = oMdlCommon.getProperty(sPath);
		// 	if (oSelectedData.bSelected) {
		// 		oMdlCommon.setProperty("/oParam/isCountry", true);
		// 		oMdlCommon.setProperty("/oCountrySelectedData", oSelectedData);
		// 		oThisController.fnManageSrvCall("CycleTime");
		// 		for (let i = 0; i < aCountryData.length; i++) {
		// 			if (aCountryData[i].label !== oSelectedData.label) {
		// 				aCountryData[i].bSelected = false;
		// 			}
		// 		}

		// 	}
		// 	oMdlCommon.setProperty("/aCountrySegments", aCountryData);
		// 	oMdlCommon.refresh();
		// },

		// onSelectionRolesChanged: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var aRoleSegmentList = oMdlCommon.getProperty("/aRoleSegmentList");
		// 	var sPath = oEvent.getParameter("segment").getBindingContext("mCommon").getPath();
		// 	let oSelectedData = oMdlCommon.getProperty(sPath);
		// 	if (oSelectedData.bSelected) {
		// 		oMdlCommon.setProperty("/oParam/isRole", true);
		// 		oMdlCommon.setProperty("/oRolesSelectedData", oSelectedData);
		// 		oThisController.fnManageSrvCall("CycleTime");
		// 		for (let i = 0; i < aRoleSegmentList.length; i++) {
		// 			if (aRoleSegmentList[i].label !== oSelectedData.label) {
		// 				aRoleSegmentList[i].bSelected = false;
		// 			}
		// 		}
		// 	}
		// 	oMdlCommon.setProperty("/aRoleSegmentList", aRoleSegmentList);
		// 	oMdlCommon.refresh();
		// },

		// onSelectionScenarioChanged: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var sPath = oEvent.getParameter("segment").getBindingContext("mCommon").getPath();
		// 	var aScenarioSegmentList = oMdlCommon.getProperty("/aScenarioSegmentList");
		// 	let oSelectedData = oMdlCommon.getProperty(sPath);
		// 	if (oSelectedData.bSelected) {
		// 		oMdlCommon.setProperty("/oParam/isScenario", true);
		// 		oMdlCommon.setProperty("/oScenarioSelectedData", oSelectedData);
		// 		oThisController.fnManageSrvCall("CycleTime");
		// 		for (let i = 0; i < aScenarioSegmentList.length; i++) {
		// 			if (aScenarioSegmentList[i].label !== oSelectedData.label) {
		// 				aScenarioSegmentList[i].bSelected = false;
		// 			}
		// 		}
		// 	}
		// 	oMdlCommon.setProperty("/aScenarioSegmentList", aScenarioSegmentList);
		// 	oMdlCommon.refresh();
		// },

		// onSelectionViewChanged: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var sPath = oEvent.getParameter("segment").getBindingContext("mCommon").getPath();
		// 	let oSelectedData = oMdlCommon.getProperty(sPath);
		// 	if (oSelectedData.bSelected) {
		// 		oMdlCommon.setProperty("/oParam/isView", true);
		// 		oMdlCommon.setProperty("/oViewSelectedData", oSelectedData);
		// 		oThisController.fnManageSrvCall("CycleTime");
		// 	}
		// 	oMdlCommon.refresh();
		// },
		
		// onSearchGroup: function (oEvent) {
		// 	var oThisController = this;
		// 	// oThisController.openBusyDialog();
		// 	var sQuery = oEvent.getParameter("newValue");
		// 	var oTable = oEvent.getSource().getParent().getParent();
		// 	var oBinding = oTable.getBinding("rows");
		// 	var aPropertyFilterSettings = [{
		// 		propertyName: "projectNumber",
		// 		filterOperator: "Contains",
		// 		propertyValue: sQuery
		// 	}];
		// 	this.fnApplyCustomerFilter(aPropertyFilterSettings, oBinding, false);
		// 	// oThisController.closeBusyDialog();
		// }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Cycletime
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Cycletime
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Cycletime
		 */
		//	onExit: function() {
		//
		//	}

	});

});