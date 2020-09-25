jQuery.sap.declare("newproductintroductionui.newproductintroductionui.util.dropdownLookupServices");
newproductintroductionui.newproductintroductionui.util.dropdownLookupServices = {

	/* *******************************LookUp rest services of Primary scoping****************************************************** */
	/*	getCountryData: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/countries", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/countryList", data);
					that.getMaterialGroup(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getMaterialGroup(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getMaterialGroup(oController);
			});
		},*/

	/*	getMaterialGroup: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/materialgroup", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/materialGroup", data);
					that.getGeneralItemCategory(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getGeneralItemCategory(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getGeneralItemCategory(oController);
			});
		},*/

	/*getGeneralItemCategory: function(oController){
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("/npiservices/lookup/generalItemCategory", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/generalItemCategory", data);
				that.getRegionalStatus(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
				that.getRegionalStatus(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
			that.getRegionalStatus(oController);
		});
	},*/

	/*	getRegionalStatus: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/regionalStatus", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/regionalStatus", data);
					that.getBusinessScenario(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getBusinessScenario(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getBusinessScenario(oController);
			});
		},*/

	/*	getBusinessScenario: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/businessScenario", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/businessScenario", data);
					that.getLeadCategory(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getLeadCategory(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getLeadCategory(oController);
			});
		},*/
	getProjectTypes: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/projecttypes", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/projectTypes", data);
				that.getProjectStatus(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getProjectStatus(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getProjectStatus(oController);
		});
	},

	getProjectStatus: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/projectstatus", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/projectStatus", data);
				that.getLeadCategory(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getLeadCategory(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getLeadCategory(oController);
		});
	},

	getLeadCategory: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/leadCategory", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/leadCategory", data);
				that.getRegion(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getRegion(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getRegion(oController);
		});
	},

	getRegion: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/region", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/region", data);
				that.getCluster(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getCluster(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getCluster(oController);
		});
	},

	getCluster: function (oController, bVal) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/cluster", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/cluster", data);
				if (!bVal) {
					that.getActionControl(oController);
				}
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				if (!bVal) {
					that.getActionControl(oController);
				}
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			if (!bVal) {
				that.getActionControl(oController);
			}
		});
	},

	getActionControl: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/materialAction", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/materialAction", data);
				that.getRoles(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getRoles(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getRoles(oController);
		});
	},

	getRoles: function (oController, bVal) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/roles", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/roles", data);
				if (!bVal) {
					that.getRegionalMaterialTypes(oController);
				}
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				if (!bVal) {
					that.getRegionalMaterialTypes(oController);
				}
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			if (!bVal) {
				that.getRegionalMaterialTypes(oController);
			}
		});
	},

	getRegionalMaterialTypes: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/regionalmaterialtypes", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/regionalmaterialtypes", data);
				that.getCountryData(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				that.getCountryData(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			that.getCountryData(oController);
		});
	},

	getCountryData: function (oController, bVal) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/countries", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/countryList", data);
				//	that.getMaterialGroup(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				//	that.getMaterialGroup(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			//	that.getMaterialGroup(oController);
		});
	},

	//Function to get distributiin channel 
	getDistributionChannel: function (oController, soCode, startIndex, batchSize) {
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var sUrl = "/npiservices/lookup/distritbutionchannels/" + soCode + "/" + startIndex + "/" + batchSize;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/distritbutionchannels", data);
				oDropdownLookupsModel.refresh();
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
		});
	},

	/*getRegionalMaterialTypes: function(oController){
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("/npiservices/lookup/regionalmaterialtypes", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/regionalmaterialtypes", data);
				that.getScenarios(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
				that.getScenarios(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
			that.getScenarios(oController);
		});
	}*/

	/*	getScenarios: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/scenarios", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/scenarios", data);
					that.getPlants(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getPlants(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getPlants(oController);
			});
		},*/

	/*	getPlants: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/plants", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/plants", data);
					that.getDivisions(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getDivisions(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getDivisions(oController);
			});
		},*/

	/*getProductAllocations: function(oController){
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("/npiservices/lookup/productAllocations", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/productAllocations", data);
				that.getPlantStatus(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
				that.getPlantStatus(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
			that.getPlantStatus(oController);
		});
	},
	*/
	/*	getPlantStatus: function(oController){
			var that = this;
			var oDropdownLookupsModel = oController.oDropdownLookupsModel;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/lookup/plantStatus", "", true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oDropdownLookupsModel.setProperty("/plantStatus", data);
					that.getDChaninStatus(oController);
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);   
					that.getDChaninStatus(oController);
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);  
				that.getDChaninStatus(oController);
			});
		},*/
	/* *******************************LookUp rest services of Detail scoping****************************************************** */
	/* *******************************LookUp rest services of Basic data scoping****************************************************** */
	//Function to get Material Group
	getBasicMaterialGroup: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/materialgroups";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/materialgroups", data);
				// that.getExternalMaterialGroup(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getExternalMaterialGroup(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getExternalMaterialGroup(oController);
		});
	},

	//Function to get External Material Group
	getExternalMaterialGroup: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/extMaterialGroup";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/extMaterialGroup", data);
				// that.getDivisionUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getDivisionUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getDivisionUnits(oController);
		});
	},

	//Function to get division Unit
	getDivisionUnits: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/divisions";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/divisionUnits", data);
				// that.getLabOffice(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getLabOffice(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getLabOffice(oController);
		});
	},

	//Function to get Lab/Office
	getLabOffice: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/labOffices";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/labOffices", data);
				// that.getGeneralItemCategory(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getGeneralItemCategory(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getGeneralItemCategory(oController);
		});
	},

	getGeneralItemCategory: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/generalItemCategory", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/generalItemCategory", data);
				// that.getProductAllocations(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getProductAllocations(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getProductAllocations(oController);
		});
	},

	getProductAllocations: function (oController) {
		var that = this;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData("/npiservices/lookup/productAllocations", "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/productAllocations", data);
				// that.getXPlantMaterialStatus(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getXPlantMaterialStatus(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getXPlantMaterialStatus(oController);
		});
	},

	//Function to get XPlantMaterialStatus
	getXPlantMaterialStatus: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/XplantStatus";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/XplantStatus", data);
				// that.getDChainStatus(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getDChainStatus(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getDChainStatus(oController);
		});
	},

	//Function to get XPlantMaterialStatus
	getDChainStatus: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/dChainStatus";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/dChainStatus", data);
				// that.getMaterialGroupPackaging(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getMaterialGroupPackaging(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getMaterialGroupPackaging(oController);
		});
	},

	//Function to get Material group Packaging
	getMaterialGroupPackaging: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/packmaterialgroups";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/packmaterialgroups", data);
				// that.getBaseUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getBaseUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getBaseUnits(oController);
		});
	},

	//Function to get base Unit
	getBaseUnits: function (oController) {
		var that = this;
		var dimensionKey = "ALL",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/baseUnits", data);
				// that.getCatalogProfile(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getCatalogProfile(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getCatalogProfile(oController);
		});
	},
	//Function to get Catalog Profile
	getCatalogProfile: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/catalogprofiles";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/catalogprofiles", data);
				// that.getContainerRequirements(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getContainerRequirements(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getContainerRequirements(oController);
		});
	},

	//Function to get Container Requirements
	getContainerRequirements: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/containerrequirements";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/containerrequirements", data);
				// that.getLabelType(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getLabelType(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getLabelType(oController);
		});
	},

	//Function to get Label Type
	getLabelType: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/labeltypes";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/labeltypes", data);
				// that.getLabelFrom(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getLabelFrom(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getLabelFrom(oController);
		});
	},

	//Function to get Label form        
	getLabelFrom: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/labelforms";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/labelforms", data);
				// that.getStorageConditions(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getStorageConditions(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getStorageConditions(oController);
		});
	},

	//Function to get Storage Conditions        
	getStorageConditions: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/storageconditions";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/storageconditions", data);
				// that.getTempConditions(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getTempConditions(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getTempConditions(oController);
		});
	},

	//Function to get Temp Conditions            
	getTempConditions: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/tempconditions";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/tempconditions", data);
				// that.getPurchasingValue(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getPurchasingValue(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getPurchasingValue(oController);
		});
	},

	//Function to get Purchasing Value Key   
	getPurchasingValue: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/purchvaluekeys";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/purchvaluekeys", data);
				// that.getManufacturer(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getManufacturer(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getManufacturer(oController);
		});
	},

	//Function to get Manufacturer 
	getManufacturer: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/manufacturers";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/manufacturers", data);
				// that.getAllowedPkgWeightUOM(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getAllowedPkgWeightUOM(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getAllowedPkgWeightUOM(oController);
		});
	},

	//Function to get Allowed Pkg Weight UOM          
	getAllowedPkgWeightUOM: function (oController) {
		var that = this;
		var dimensionKey = "MASS",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/pkgWeigthUOM", data);
				// that.getAllowedPkgVolumeUOM(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getAllowedPkgVolumeUOM(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getAllowedPkgVolumeUOM(oController);
		});
	},

	//Function to get Allowed Pkg Volume UOM         
	getAllowedPkgVolumeUOM: function (oController) {
		var that = this;
		var dimensionKey = "VOLUME",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/pkgVolumeUOM", data);
				// that.getPackagingMatType(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getPackagingMatType(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getPackagingMatType(oController);
		});
	},

	//Function to get Packaging Mat Type      
	getPackagingMatType: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/packmaterialtypes";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/packmaterialtypes", data);
				// that.getTransportationGroup(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getTransportationGroup(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getTransportationGroup(oController);
		});
	},

	//Function to Transportation Group          
	getTransportationGroup: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/transportgroups";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/transportgroups", data);
				// that.getOrderUnit(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getOrderUnit(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getOrderUnit(oController);
		});
	},

	//Function to Order Unit                
	getOrderUnit: function (oController) {
		var that = this;
		var dimensionKey = "ALL",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/orderUnits", data);
				// that.getEANCategory(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getEANCategory(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getEANCategory(oController);
		});
	},

	//Function to get EAN category
	getEANCategory: function (oController) {
		var that = this;
		var sUrl = "/npiservices/lookup/eancategories";
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/eanCategories", data);
				// that.getLWHUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getLWHUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getLWHUnits(oController);
		});
	},

	//Function to get L/W/H Unit
	getLWHUnits: function (oController) {
		var that = this;
		var dimensionKey = "LENGTH",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/lengthUnits", data);
				// that.getVolunumeUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getVolunumeUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getVolunumeUnits(oController);
		});
	},

	//Function to get Volumne Unit
	getVolunumeUnits: function (oController) {
		var that = this;
		var dimensionKey = "VOLUME",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/volumnUnits", data);
				// that.getWeightUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				// that.getWeightUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			// that.getWeightUnits(oController);
		});
	},

	//Function to get Weight Unit
	getWeightUnits: function (oController) {
		//	var that = this;
		var dimensionKey = "MASS",
			startIndex = "0",
			batchSize = "20";
		var sUrl = "/npiservices/lookup/units/" + dimensionKey +
			"/" + startIndex + "/" + batchSize;
		var oDropdownLookupsModel = oController.oDropdownLookupsModel;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(999);
		oModel.loadData(sUrl, "", true, "GET", false, false);
		oModel.attachRequestCompleted(function (oEvent) {
			if (oEvent.getParameter("success")) {
				var data = oEvent.getSource().getData();
				oDropdownLookupsModel.setProperty("/weightUnits", data);
				//that.getBaseUnits(oController);
			} else {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				//	that.getBaseUnits(oController);
			}
		});
		oModel.attachRequestFailed(function (oEvent) {
			var Message = "Internal Server Error";
			newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
			//that.getBaseUnits(oController);
		});
	},

	/* *******************************LookUp rest services of Basic data scoping****************************************************** */
};