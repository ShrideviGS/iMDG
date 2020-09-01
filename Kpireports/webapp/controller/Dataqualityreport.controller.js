sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Dataqualityreport", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataqualityreport
		 */
		onInit: function () {
			var oThisController = this;
			this._oRouter = this.getRouter();
			this._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Dataqualityreport") {
					oThisController.closeBusyDialog();
				}
			}, this);
			// var oMdlCommon = oThisController.getParentModel("mCommon");
			// oThisController.getView().setModel(oMdlCommon);

			// var oVizFrameFirst = this.oVizFrame = this.getView().byId("idVizFrameFif");
			// oVizFrameFirst.setVizProperties({
			// 	valueAxis: {
			// 		title: {
			// 			visible: true,
			// 			text: "View Name"
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		title: {
			// 			visible: true
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataLabel: {
			// 			visible: true
			// 		}
			// 	},
			// 	title: {
			// 		visible: true
			// 	}
			// });
			// var oPopOver = this.getView().byId("idPopOverQuality");
			// oPopOver.connect(oVizFrameFirst.getVizUid());
		},
		
		myOnClickHandler:function(oEvent){
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataqualityreport
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataqualityreport
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Dataqualityreport
		 */
		//	onExit: function() {
		//
		//	}

	});

});