jQuery.sap.declare("newproductintroductionui.newproductintroductionui.formatter.formatter");
newproductintroductionui.newproductintroductionui.formatter.formatter = {

	//Function to convert milli second to date string
	formatMStoDateStr: function (date) {
		if (date) {
			date = new Date(date);
			var iosFormat = date.toISOString().substring(0, 19);
			return iosFormat;
		} else {
			return "";
		}
	},

	formatDateObject: function (date) {

		if (date) {
			var currDate = new Date(date);
			var dd = currDate.getDate();
			if (dd < 10) {
				dd = dd.toString();
				dd = "0" + dd;
			} else {
				dd = dd.toString();
			}

			var mm = currDate.getMonth();
			mm = mm + 1;
			if (mm < 10) {
				mm = mm.toString();
				mm = "0" + mm;
			} else {
				mm = mm.toString();
			}

			var yy = currDate.getFullYear();
			yy = yy.toString();

			var formattedDateTime = mm + "/" + dd + "/" + yy;
			return formattedDateTime;
		} else if (date === null || date === "") {
			return null;
		}
	},

	isSaveButtonVisible: function (projectId) {
		var oBtnId = this.getCustomData()[0].getValue();
		switch (oBtnId) {
		case "MM_SAVE_PROJECT":
			if (projectId) {
				return true;
			} else {
				return false;
			}
			break;

		case "MM_VALIDATE_PROJECT":
			if (projectId) {
				return true;
			} else {
				return false;
			}
			break;

		case "MM_CONFIRM_HEADER":
			if (projectId) {
				return false;
			} else {
				return true;
			}
			break;

		case "MM_START_PROJECT":
			if (projectId) {
				return true;
			} else {
				return false;
			}
			break;
		}
		return true;
	},

	formatDate: function (oValue) {
		if (oValue) {
			var oNewDate = new Date(oValue);
			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				style: "medium",
				UTC: true,
				pattern: "MM/dd/yyyy"
			});
			var oDateFormatted = oDateFormat.format(oNewDate);

			return oDateFormatted;
		}
	},

	//Function to set create project fields enabled based on Project Id
	isProjectFieldsEnabled: function (projectId) {
		if (projectId) {
			return false;
		} else {
			return true;
		}
	},

	//Function to calculate volume
	calculateVolume: function (length, width, height) {
		var oBasicDataCollectionModel = this.getModel("oBasicDataCollectionModel");
		if (length && width && height) {
			var volume = length * width * height;
			var sPath = this.getBindingContext("oBasicDataCollectionModel").getPath();
			oBasicDataCollectionModel.setProperty(sPath + "/volume", volume);
			oBasicDataCollectionModel.refresh();
			return volume;
		} else {
			return "";
		}
	}
};