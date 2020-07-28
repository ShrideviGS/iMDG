jQuery.sap.declare("newproductintroductionui.newproductintroductionui.util.newProjectCreation");
newproductintroductionui.newproductintroductionui.util.newProjectCreation = {
	createProjectHeader: function (oController) {
		var that = this;
		oController.busy.open();
		var oUserModel = oController.oUserModel;
		var oProjectDetailModel = oController.oProjectDetailModel;
		oProjectDetailModel.setSizeLimit(999);
		var oUiElementVisibilityModel = oController.oUiElementVisibilityModel;
		var oPayload = {
			"description": oProjectDetailModel.getProperty("/projectDto/description"),
			"leadCategoryCode": oProjectDetailModel.getProperty("/projectDto/leadCategoryCode"),
			// "leadClusterCode": oProjectDetailModel.getProperty("/projectDto/leadClusterCode"),
			"leadClusterCode": "AMS",
			"leadCountryCode": oProjectDetailModel.getProperty("/projectDto/leadCountryCode"),
			"lockedByUser": oUserModel.getProperty("/name"),
			"projectStatusCode": 0,
			"projectTypeCode": parseInt(oProjectDetailModel.getProperty("/projectDto/projectTypeCode")),
			"regionCode": oProjectDetailModel.getProperty("/projectDto/regionCode"),
			"userCreated": oUserModel.getProperty("/name"),
			"launchDate": oProjectDetailModel.getProperty("/projectDto/launchDate"),
			"firstProductionDate": oProjectDetailModel.getProperty("/projectDto/firstProductionDate"),
			"dateCreated": new Date().getTime(),
			"updatedBy": new Date().getTime()
		};

		var updatedBy = oUserModel.getProperty("/name");
		oProjectDetailModel.setProperty("/projectDto/userUpdated", updatedBy);

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		var sUrl = "/npiservices/npi/primaryscoping/createprojectheader";
		oModel.loadData(sUrl, JSON.stringify(oPayload), true, "POST", false, false, oController.oHeader);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var resultData = oEvent.getSource().getData();
				oProjectDetailModel.setProperty("/projectDto/projectId", resultData.entity);
				oProjectDetailModel.refresh();
				oController.onFetchProjectDetails(resultData.entity, "HEADER_CFRM");

				var oSuccessMsg = "Project successfully created with Project Id: " + resultData.entity;
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(oSuccessMsg);
			} else {
				var errorMessage = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
			}
			oController.busy.close();
		});

		oModel.attachRequestFailed(function (oEvent) {
			oController.busy.close();
			var errorMessage = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
		});
		oController.busy.close();
	},

	//Function to save project data
	onSaveProject: function (oController) {

		var that = this;
		oController.busy.open();
		var oUserModel = oController.oUserModel;
		var oProjectDetailModel = oController.oProjectDetailModel;
		var oUiElementVisibilityModel = oController.oUiElementVisibilityModel;

		var updatedBy = oUserModel.getProperty("/name");
		oProjectDetailModel.setProperty("/projectDto/userUpdated", updatedBy);

		var updatedOn = new Date().getTime();
		oProjectDetailModel.setProperty("/projectDto/dateUpdated", updatedOn);
		var projectId = oProjectDetailModel.getProperty("/projectDto/projectId");
		oProjectDetailModel.setProperty("/projectDto/projectStatusCode", 0);

		var oPayload = {
			"projectDto": oProjectDetailModel.getProperty("/projectDto"),
			"materialLines": oProjectDetailModel.getProperty("/materialLines"),
			"rolesData": oProjectDetailModel.getProperty("/rolesData")
		};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		var sUrl = "/npiservices/npi/primaryscoping/updateproject";
		oModel.loadData(sUrl, JSON.stringify(oPayload), true, "POST", false, false, oController.oHeader);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var resultData = oEvent.getSource().getData();
				var oSuccessMsg = "Project successfully saved for Project Id: " + projectId;
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(oSuccessMsg);

				//oProjectDetailModel.setProperty("/projectTypeCode", resultData);
				//oProjectDetailModel.refresh();
				oController.onFetchProjectDetails(projectId, "SAVE");
				oUiElementVisibilityModel.setProperty("/primaryScopingVisible", false);
				oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", true);
				oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", true);
				oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", false);
				oUiElementVisibilityModel.refresh();
				newproductintroductionui.newproductintroductionui.util.util.toastMessage("Saved successfully");
			} else {
				var errorMessage = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
			}
			oController.busy.close();
		});

		oModel.attachRequestFailed(function (oEvent) {
			oController.busy.close();
			var errorMessage = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
		});
		oController.busy.close();
	},

	//Function to start project/BPM process
	onStartProject: function (oController) {

		oController.busy.open();
		var oProjectDetailModel = oController.oProjectDetailModel;
		oProjectDetailModel.setProperty("/projectDto/projectStatusCode", 0);
		var materialLines = oProjectDetailModel.getProperty("/materialLines");
		if (!materialLines) {
			materialLines = [];
		}
		var rolesData = oProjectDetailModel.getProperty("/rolesData");
		if (!rolesData) {
			rolesData = [];
		}

		var oPayload = {
			"projectDto": oProjectDetailModel.getProperty("/projectDto"),
			"materialLines": materialLines,
			"rolesData": rolesData
		};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		var sUrl = "/npiservices/npi/primaryscoping/startproject";
		oModel.loadData(sUrl, JSON.stringify(oPayload), true, "POST", false, false, oController.oHeader);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var resultData = oEvent.getSource().getData();
				oController.onFetchProjectDetails(resultData.projectId, "START_PROJECT");
				var oSuccessMsg = resultData.message + " for Project ID - " + resultData.projectId;
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(oSuccessMsg);
			} else {
				var errorMessage = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
			}
			oController.busy.close();
		});

		oModel.attachRequestFailed(function (oEvent) {
			oController.busy.close();
			var errorMessage = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(errorMessage);
		});
	}
};