sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/BusyDialog",
	"newproductintroductionui/newproductintroductionui/util/util"
], function (Controller, BusyDialog, util) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.App", {

		onInit: function () {
			// this.oHeader = {
			// 	"Accept": "application/json",
			// 	"Content-Type": "application/json"
			// };
			var that=this;
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
			var oUserModel = this.getOwnerComponent().getModel("oUserModel");
			util.getUserDetails(this, oUserModel);
			oUserModel.setSizeLimit(999);
		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.App
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf newproductintroductionui.newproductintroductionui.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});