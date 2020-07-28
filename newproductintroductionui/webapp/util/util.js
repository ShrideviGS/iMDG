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
		var sUrl = "/userapi/currentUser";
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var resultData = oEvent.getSource().getData();
				if (resultData) {
					oUserModel.setData(resultData);
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