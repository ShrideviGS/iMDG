jQuery.sap.declare("newproductintroductionui.newproductintroductionui.util.util");
newproductintroductionui.newproductintroductionui.util.util = {
	toastMessage: function (message) {
		var position = "center center";
		sap.m.MessageToast.show(message, {
			duration: 7000,
			at: position
		});
	},

	//Function to get logged in user
	getUserDetails: function (oController, oUserModel) {
		var that = this;
		var sUrl = "../user";
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var resultData = oEvent.getSource().getData();
				if (resultData) {
					oUserModel.setProperty("/UserId", resultData.id);
					oUserModel.setProperty("/sEmial", resultData.emails[0].value);
					oUserModel.setProperty("/sFirstName", resultData.name.givenName);
					oUserModel.setProperty("/sLastName", resultData.name.familyName);
					// oUserModel.setData(resultData);
				}
			} else {
				that.toastMessage("Internal Server Error");
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			that.toastMessage("Internal Server Error");
		});
	}
};