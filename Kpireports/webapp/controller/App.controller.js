sap.ui.define([
	"./BaseController",
	"sap/ui/Device"
], function (BaseController, Device) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.App", {
		onInit: function () {
			// var oThisController = this;
			this.fnInitializeApp();
			// var oMdlCommon = oThisController.getParentModel("mCommon");
			// oThisController.getView().setModel(oMdlCommon);
		},

		onItemChange: function (oEvent, key) {
			var oThisController = this;
			// oThisController.openBusyDialog();
			var oMdlCommon = this.getParentModel("mCommon");
			oMdlCommon.setProperty("/aSearchMaterial", []);
			oThisController.openBusyDialog();
			this._oRouter = this.getRouter();
			if (!key) {
				key = oEvent.getParameter("item").getKey();
				// oThisController.closeBusyDialog();
			}
			if (key === "kDataQuality") {
				if (this._oRouter.oHashChanger.hash === "Dataqualityreport") {
					oThisController.closeBusyDialog();
				} else {
					this._oRouter.navTo("Dataqualityreport");
				}

				// oThisController.closeBusyDialog();
			}
			if (key === "kHistory") {
				if (this._oRouter.oHashChanger.hash === "Changehistory") {
					oThisController.closeBusyDialog();
				} else {
					this._oRouter.navTo("Changehistory");
				}

				// this._oRouter.navTo("Changehistory");
				// oThisController.closeBusyDialog();
			}
			if (key === "kCycleTIme") {
				if (this._oRouter.oHashChanger.hash === "") {
					oThisController.closeBusyDialog();
				} else {
					this._oRouter.navTo("CycletimeModified");
				}
				// this._oRouter.navTo("CycletimeModified");
				// oThisController.closeBusyDialog();
			}
			if (key === "kDQuality") {
				if (this._oRouter.oHashChanger.hash === "Dataquality") {
					oThisController.closeBusyDialog();
				} else {
					this._oRouter.navTo("Dataquality");
				}
				// this._oRouter.navTo("Dataquality");
				// oThisController.closeBusyDialog();
			}

			// oThisController.closeBusyDialog();
		}
	});
});