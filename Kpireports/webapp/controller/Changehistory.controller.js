sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Changehistory", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		onInit: function () {
			var oThisController = this;
			oThisController.closeBusyDialog();
			this._oRouter = this.getRouter();
			this._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Changehistory") {
					oThisController.closeBusyDialog();
				}
			}, this);

		},

		onSearch: function () {
			var oThisController = this;
			oThisController.openBusyDialog();
			var oMdlCommon = this.getParentModel("mCommon");
			var oSearchParams = $.extend(true, {}, oMdlCommon.getProperty("/oSearchParam"))
			var sUrl = "",
				oHeader = {
					"Content-Type": "application/json",
					"Accept": "application/json"
				};

			try {
				sUrl = "/mylanservices/report/audit?materialId=" + oSearchParams.sMaterial;

			} catch (e) {
				oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
				oThisController.closeBusyDialog();
			}

			oThisController.fnProcessDataRequest(sUrl, "GET", oHeader, false, function (oXHR, status) {
				try {
					if (status === "success") {
						if (oXHR.status === 200 && oXHR.statusText === "success") {
							var aChangeHistory = $.extend(true , [] ,oXHR.responseJSON);
							// oMdlCommon.setProperty("/aSearchMaterial", oXHR.responseJSON);
							for (let i = 0; i < aChangeHistory.length; i++) {
								aChangeHistory[i].updatedOn = new Date(aChangeHistory[i].updatedOn);                         

							}
							oMdlCommon.setProperty("/aSearchMaterial", aChangeHistory);
							oThisController.closeBusyDialog();
						}
					} else {
						oThisController.showMessage(oThisController.getMessage("REQUEST_OPERATION_FAILED"), "E");
						oThisController.closeBusyDialog();
					}
				} catch (e) {
					oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
					oThisController.closeBusyDialog();
				}
			});
			oMdlCommon.refresh();
			// var aMatchValue = oMdlCommon.getProperty("/aChangeHistory");
			// oMdlCommon.setProperty("/aSearchMaterial", aMatchValue);
			oMdlCommon.refresh();
			oThisController.closeBusyDialog();
		},

		onClearFilter: function () {
			var oThisController = this;
			oThisController.openBusyDialog();
			var oMdlCommon = this.getParentModel("mCommon");
			oMdlCommon.setProperty("/oSearchParam/sPlant", "");
			oMdlCommon.setProperty("/oSearchParam/sMaterial", "");
			oMdlCommon.setProperty("/oSearchParam/sSalesorg", "");
			oMdlCommon.setProperty("/oSearchParam/sWareHourse", "");
			oMdlCommon.setProperty("/aSearchMaterial", []);
			oMdlCommon.refresh();
			oThisController.closeBusyDialog();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onExit: function() {
		//
		//	}

	});

});