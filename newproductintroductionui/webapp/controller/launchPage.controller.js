sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.launchPage", {
		onInit: function() {
			var oResourceModel = this.getOwnerComponent().getModel("i18n");
			this.oResourceModel = oResourceModel.getResourceBundle();
			
			this.oHeader = {
				"Accept": "application/json",
				"Content-Type": "application/json"
			};
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function(oEvent) {
			//	var viewName = oEvent.getParameter("name");
				//that.routePatternMatched(oEvent);
			});
		},
		
		onPressScoping: function(oEvent){
			this.oRouter.navTo("scoping");
		},
		
		onPressBasicData: function(oEvent){
			this.oRouter.navTo("basicDataCollection",{
				taskId : "aa9aa68f-1403-11e9-ac9f-00163e7f43b4"
			});
		},
		onPressDetailScoping: function(oEvent){
			this.oRouter.navTo("detailScopingView");
		}
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.launchPage
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf newproductintroductionui.newproductintroductionui.view.launchPage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.launchPage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.launchPage
		 */
		//	onExit: function() {
		//
		//	}

	});

});