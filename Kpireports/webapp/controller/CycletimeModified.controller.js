sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.CycletimeModified", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.CycletimeModified
		 */
		onInit: function () {
			var oThisController = this;
			// oThisController.closeBusyDialog();
			oThisController._oRouter = this.getRouter();
			var oMdlCommon = this.getParentModel("mCommon");
			oThisController._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "CycletimeModified") {
					oThisController.closeBusyDialog();
					// oMdlCommon.setProperty("/oParam/isCountry", false);
					// oMdlCommon.setProperty("/oParam/isView", false);
					// oMdlCommon.setProperty("/oParam/isRole", false);
					// oMdlCommon.setProperty("/oParam/isScenario", false);
					// oThisController.fnManageSrvCall("CycleTime");
				}
			}, oThisController);
			oThisController.getView().setModel(oMdlCommon);

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrameHours");
			oVizFrame.setVizProperties({
				valueAxis: {
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false
				}
			});
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());

		},

		onCountryPress: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var sPath = oEvent.getSource().getBindingContext("mCommon").getPath();
			var aProjects;
			var oSelectedCountry = $.extend(true, {}, oMdlCommon.getProperty(sPath));
			oMdlCommon.setProperty("/oCountrySelectedData", oSelectedCountry);
			if (oSelectedCountry.Newlabel === "NL01(Mylan SPC RDC)") {
				aProjects = {
					"sProjComplted": "30",
					"sMatCompleted": "21",
					"sProjPending": "20",
					"sMatPending": "01",
					"sCycleTComplete": "594 Hours 49 Minutes",
					"sCycleTPending": "058 Hours 33 Minutes"
				};

			} else if (oSelectedCountry.Newlabel === "1776(Mylan SPC Ireland)") {
				aProjects = {
					"sProjComplted": "340",
					"sMatCompleted": "46",
					"sProjPending": "245",
					"sMatPending": "37",
					"sCycleTComplete": "403 Hours 40 Minutes",
					"sCycleTPending": "064 Hours 49 Minutes"
				};

			} else if (oSelectedCountry.Newlabel === "6189(FDF Unit-1 NSK)") {
				aProjects = {
					"sProjComplted": "39",
					"sMatCompleted": "94",
					"sProjPending": "503",
					"sMatPending": "392",
					"sCycleTComplete": "064 Hours 48 Minutes",
					"sCycleTPending": "943 Hours 22 Minutes"
				};

			} else if (oSelectedCountry.Newlabel === "PLAA(Mylan EPD Sp z o.o.)") {
				aProjects = {
					"sProjComplted": "203",
					"sMatCompleted": "94",
					"sProjPending": "93",
					"sMatPending": "300",
					"sCycleTComplete": "367 Hours 00 Minutes",
					"sCycleTPending": "33 Hours 39 Minutes"
				};

			}
			oMdlCommon.setProperty("/sProjects", aProjects);
			oMdlCommon.setProperty("/oNewParam/isCountry", true);
			oMdlCommon.setProperty("/oVisible/bCountry", true);
			oMdlCommon.setProperty("/oVisible/bProjects", true);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.setProperty("/oVisible/bViews", false);

			// oThisController.fnManageSrvCall("CycleTime");
			// oMdlCommon.setProperty("/oVisible/bProjects", true);
			// oMdlCommon.setProperty("/oVisible/bProjTable", false);
			// oMdlCommon.setProperty("/oVisible/bViews", false);
			oMdlCommon.refresh();

		},

		onReload: function () {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			// oThisController.fnManageSrvCall("CycleTime");
			oMdlCommon.setProperty("/oNewParam/isScenario", false);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.setProperty("/oVisible/bViews", false);
			oMdlCommon.setProperty("/oNewParam/isCountry", false);
			oMdlCommon.setProperty("/aCountrySegments", []);
			oMdlCommon.setProperty("/aProjectProj", []);
			oMdlCommon.setProperty("/aProjectViews", []);
			oMdlCommon.setProperty("/sProjects", []);
			//hardcoded values
			oMdlCommon.setProperty("/oVisible/bCountry", false);
			oMdlCommon.setProperty("/oVisible/bProjects", false);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.setProperty("/oVisible/bViews", false);
			oMdlCommon.refresh();
		},

		onScenarioPress: function (oEvent) {
			var oThisController = this;
			oThisController.openBusyDialog();
			var aCountryData;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			oMdlCommon.setProperty("/aCountrySegments", []);
			var sPath = oEvent.getSource().getBindingContext("mCommon").getPath();
			var oScenarioSelectedData = $.extend(true, {}, oMdlCommon.getProperty(sPath));
			oMdlCommon.setProperty("/oScenarioSelectedData", oScenarioSelectedData);
			if (oScenarioSelectedData.label === "Hub") {
				aCountryData = [{
					"Newlabel": "NL01(Mylan SPC RDC)",
					"value": "1516 Hours 15 Minutes"
				}, {
					"Newlabel": "1776(Mylan SPC Ireland)",
					"value": "467 Hours 08 Minutes"
				}];

			} else if (oScenarioSelectedData.label === "Manufacturing") {
				aCountryData = [{
					"Newlabel": "6189(FDF Unit-1 NSK)",
					"value": "1007 Hours 14 Minutes"
				}];

			} else if (oScenarioSelectedData.label === "Affiliate (Sales Country)") {
				aCountryData = [{
					"Newlabel": "PLAA(Mylan EPD Sp z o.o.)",
					"value": "403 Hours 21 Minutes"
				}];

			}
			oMdlCommon.setProperty("/aCountrySegments", aCountryData);
			oMdlCommon.setProperty("/oNewParam/isScenario", true);
			oMdlCommon.setProperty("/oNewParam/isCountry", false);
			oMdlCommon.setProperty("/oVisible/bCountry", true);
			oMdlCommon.setProperty("/oVisible/bProjects", false);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.setProperty("/oVisible/bViews", false);
			// oThisController.fnManageSrvCall("CycleTime");
			// oMdlCommon.setProperty("/oVisible/bProjects", true);
			// oMdlCommon.setProperty("/oVisible/bProjTable", false);
			// oMdlCommon.setProperty("/oVisible/bViews", false);
			oThisController.closeBusyDialog();
			oMdlCommon.refresh();
		},

		onCompleted: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var aCompletedProj = $.extend(true, [], oMdlCommon.getProperty("/aReportsCompleted"));
			oMdlCommon.setProperty("/aProjectProj", aCompletedProj)
			oMdlCommon.setProperty("/oVisible/bProjTable", true);
			oMdlCommon.setProperty("/oVisible/bViews", false);
			oMdlCommon.refresh();
		},

		onPending: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var aProjectPendingProjBckUp = $.extend(true, [], oMdlCommon.getProperty("/aReportsPending"));
			oMdlCommon.setProperty("/aProjectProj", aProjectPendingProjBckUp)
			oMdlCommon.setProperty("/oVisible/bProjTable", true);
			oMdlCommon.setProperty("/oVisible/bViews", false);
			oMdlCommon.refresh();
		},

		onSearchGroup: function (oEvent) {
			var oThisController = this;
			// oThisController.openBusyDialog();
			var sQuery = oEvent.getParameter("newValue");
			var oTable = oEvent.getSource().getParent().getParent();
			var oBinding = oTable.getBinding("rows");
			var aPropertyFilterSettings = [{
				propertyName: "sProjectID",
				filterOperator: "Contains",
				propertyValue: sQuery
			}];
			this.fnApplyCustomerFilter(aPropertyFilterSettings, oBinding, false);
			// oThisController.closeBusyDialog();
		},

		onCycleCompleted: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var aProjectCompletedViewBckUp = $.extend(true, [], oMdlCommon.getProperty("/aProjectCompletedViewBckUp"));
			oMdlCommon.setProperty("/aProjectViews", aProjectCompletedViewBckUp);
			oMdlCommon.setProperty("/oVisible/bViews", true);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.refresh();

		},

		onCyclePending: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var aProjectPendingViewBckUp = $.extend(true, [], oMdlCommon.getProperty("/aProjectPendingViewBckUp"));
			oMdlCommon.setProperty("/aProjectViews", aProjectPendingViewBckUp);
			oMdlCommon.setProperty("/oVisible/bViews", true);
			oMdlCommon.setProperty("/oVisible/bProjTable", false);
			oMdlCommon.refresh();

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.CycletimeModified
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.CycletimeModified
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.CycletimeModified
		 */
		//	onExit: function() {
		//
		//	}

	});

});