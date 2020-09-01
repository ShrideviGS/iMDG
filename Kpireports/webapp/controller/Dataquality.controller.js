sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Dataquality", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataquality
		 */
		onInit: function () {
			var oThisController = this;
			oThisController.closeBusyDialog();
			oThisController._oRouter = this.getRouter();
			oThisController._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Dataquality") {
					oThisController.closeBusyDialog();
				}
			}, oThisController);
			var oMdlCommon = oThisController.getParentModel("mCommon");
			oThisController.getView().setModel(oMdlCommon);

			var oVizChart = this.oVizChart = this.getView().byId("idVizFrameFif");
			oVizChart.setVizProperties({
				valueAxis: {
					title: {
						visible: true,
						text: "View Name"
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				plotArea: {
					dataPointStyle: {
						dataLabel: {
							visible: true
						},
						"rules": [{
							"dataContext": {
								"measureNames": "Completed"
							},
							"properties": {
								"color": "#0a820f"
							},
							"displayName": "Completed"
						}, {
							"dataContext": {
								"measureNames": "In-Progress"
							},
							"properties": {
								"color": "#ff2212"
							},
							"displayName": "In-Progress"
						}]
					}
				},
				title: {
					visible: false
				}
			});
			var oPopOver = this.getView().byId("idPopOverQuality");
			oPopOver.connect(oVizChart.getVizUid());
			// oThisController.closeBusyDialog();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataquality
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataquality
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataquality
		 */
		//	onExit: function() {
		//
		//	}

	});

});