sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"sap/m/BusyDialog",
	"newproductintroductionui/newproductintroductionui/util/util",
	"newproductintroductionui/newproductintroductionui/util/dropdownLookupServices",
	"newproductintroductionui/newproductintroductionui/util/newProjectCreation"
], function (Controller, Formatter, BusyDialog, util, dropdownLookupServices, newProjectCreation) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.scoping", {

		onInit: function () {
			var that = this;
			this.busy = new BusyDialog();

			var oResourceModel = this.getOwnerComponent().getModel("i18n");
			this.oResourceModel = oResourceModel.getResourceBundle();

			this.oHeader = {
				"Accept": "application/json",
				"Content-Type": "application/json"
			};

			var oDropdownLookupsModel = this.getOwnerComponent().getModel("oDropdownLookupsModel");
			oDropdownLookupsModel.setSizeLimit(999);
			this.oDropdownLookupsModel = oDropdownLookupsModel;
			dropdownLookupServices.getProjectTypes(this);

			var oProjectSearchModel = this.getOwnerComponent().getModel("oProjectSearchModel");
			oProjectSearchModel.setSizeLimit(999);
			this.oProjectSearchModel = oProjectSearchModel;

			var oProjectDetailModel = this.getOwnerComponent().getModel("oProjectDetailModel");
			oProjectDetailModel.setSizeLimit(999);
			this.oProjectDetailModel = oProjectDetailModel;

			var oProjectDetailTblModel = this.getOwnerComponent().getModel("oProjectDetailTblModel");
			oProjectDetailTblModel.setSizeLimit(999);
			this.oProjectDetailTblModel = oProjectDetailTblModel;

			var oUserModel = this.getOwnerComponent().getModel("oUserModel");
			oUserModel.setSizeLimit(999);
			this.oUserModel = oUserModel;

			//Need to remove when all serviced will be available
			var oLocalJsonDataModel = this.getOwnerComponent().getModel("oLocalJsonDataModel");
			oLocalJsonDataModel.setSizeLimit(999);
			this.oLocalJsonDataModel = oLocalJsonDataModel;

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				//var viewName = oEvent.getParameter("name");
				that.routePatternMatched(oEvent);
			});
		},

		routePatternMatched: function (oEvent) {
			var oUiElementVisibilityModel = this.getOwnerComponent().getModel("oUiElementVisibilityModel");
			this.oUiElementVisibilityModel = oUiElementVisibilityModel;
			oUiElementVisibilityModel.setProperty("/primaryScopingVisible", true);
			oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", false);
			//oUiElementVisibilityModel.setProperty("/detailScopingVisible", false);
			oUiElementVisibilityModel.refresh();
			this.onSearchProject();
		},

		// onAfterRendering: function () {
		// 	// var g = this;
		// 	$.ajax({
		// 		url: "../user"
		// 	}).done(function (data, status, jqxhr) {
		// 		debugger;
		// 		var user = "Welcome! " + data;
		// 		// var oText = new sap.m.Text({
		// 		// 	text: user
		// 		// });
		// 		// g.getView().byId("userVBox").addItem(oText);
		// 	});
		// },

		//Function to open a ui for New Project Creation
		onCreateNewProject: function (oEvent) {
			this.resetCreateProjectFields();
			this.oRouter.navTo("createNewProject", {
				bVal: true
			});
			/*this.resetCreateProjectFields();
			var oUiElementVisibilityModel = this.oUiElementVisibilityModel;
			oUiElementVisibilityModel.setProperty("/primaryScopingVisible", false);
			oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", true);
			oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", false);
			oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", true);
			oUiElementVisibilityModel.refresh();*/
		},

		//Function to show Primary Scoping Screen
		onBackPrimaryScoping: function (oEvent) {
			var oUiElementVisibilityModel = this.oUiElementVisibilityModel;
			var isHdrConfirmViewVisible = oUiElementVisibilityModel.getProperty("/headerConfirmViewVisible");
			if (isHdrConfirmViewVisible) {
				oUiElementVisibilityModel.setProperty("/primaryScopingVisible", false);
				oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", true);
				oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", false);
				oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", true);
			} else {
				oUiElementVisibilityModel.setProperty("/primaryScopingVisible", true);
				oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", false);
				oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", false);
				oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", false);
			}
			oUiElementVisibilityModel.refresh();
		},

		/*	//Function to show confirm Header Data view
			onConfirmHeaderData: function (oEvent) {
				var oProjectDetailModel = this.oProjectDetailModel;
				var projectId = oProjectDetailModel.getProperty("/projectDto/projectId");
				if (projectId) {
					newProjectCreation.onSaveProject(this);
				} else {
					newProjectCreation.createProjectHeader(this);
				}*/
		/*var oUiElementVisibilityModel = this.oUiElementVisibilityModel;
		oUiElementVisibilityModel.setProperty("/primaryScopingVisible", false);
		oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", true);
		oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", true);
		oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", false);
		oUiElementVisibilityModel.refresh();*/
		/*	},
		 */
		//Function to show Detail Scoping View
		onViewEditDetailScoping: function (oEvent) {
			this.oRouter.navTo("detailScopingView");
		},

		onChangeDateValue: function (oEvent) {
			var oFormattedDate = new Date().getTime();
			var oProjectDetailModel = this.oProjectDetailModel;
			var sPath = oEvent.getSource().getBindingPath("value");
			oProjectDetailModel.setProperty(sPath, oFormattedDate);
			oProjectDetailModel.refresh();
		},

		onSearchProject: function (oEvent) {

			var that = this;
			var oUserModel = this.oUserModel;
			var oPayload = "";
			this.busy.open();
			var oProjectDetailTblModel = this.oProjectDetailTblModel;
			var oProjectSearchModel = this.oProjectSearchModel;
			if (oEvent) {
				oPayload = {
					"filterDto": {
						"region": oProjectSearchModel.getProperty("/region"),
						"dateCreatedRange1": oProjectSearchModel.getProperty("/createdDateFrom"),
						"dateCreatedRange2": oProjectSearchModel.getProperty("/createdDateTo"),
						"leadCountry": oProjectSearchModel.getProperty("/leadCountry"),
						"leadingCategory": oProjectSearchModel.getProperty("/leadCategory"),
						"leadCluster": oProjectSearchModel.getProperty("/leadCluster"),
						"projectDescription": oProjectSearchModel.getProperty("/projectDescription"),
						"projectType": oProjectSearchModel.getProperty("/projectType"),
						"projectStatus": oProjectSearchModel.getProperty("/projectStatus"),
						"loggedInUser": oUserModel.getProperty("/UserId"),
						"projectId": oProjectSearchModel.getProperty("/projectId"),
						"userCreated": oProjectSearchModel.getProperty("/createdBy"),
						"launchFromDate": oProjectSearchModel.getProperty("/launchDateFrom"),
						"launchToDate": oProjectSearchModel.getProperty("/launchDateTo"),
						"firstProductionFromDate": oProjectSearchModel.getProperty("/firstProdDateFrom"),
						"firstProductionToDate": oProjectSearchModel.getProperty("/firstProdDateTo")
					},
					"startIndex": 0,
					"batchSize": 12
				};
			} else {
				oPayload = {
					"filterDto": {
						"region": "",
						"dateCreatedRange1": "",
						"dateCreatedRange2": "",
						"leadCountry": "",
						"leadingCategory": "",
						"leadCluster": "",
						"projectDescription": "",
						"projectType": "",
						"projectStatus": "",
						"loggedInUser": oUserModel.getProperty("/UserId"),
						"projectId": "",
						"userCreated": "",
						"launchFromDate": "",
						"launchToDate": "",
						"firstProductionFromDate": "",
						"firstProductionToDate": "",
						"dateCreated": ""
					},
					"startIndex": 0,
					"batchSize": 12
				};
			}
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/primaryscoping/projects";
			oModel.loadData(sUrl, JSON.stringify(oPayload), true, "POST", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					var projectTblData = {
						"projectTblData": resultData
					};
					oProjectDetailTblModel.setData(projectTblData);
					oProjectDetailTblModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oProjectDetailTblModel.setData([]);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
			this.busy.close();
		},

		//Function to fetech selected project details
		onFetchProjectDetails: function (oEvent, bVal) {
			var that = this,
				oProjectId = "";
			var startIndex = 0,
				batchIndex = 20;
			that.busy.open();
			var oProjectDetailTblModel = this.oProjectDetailTblModel;
			var oProjectDetailModel = this.oProjectDetailModel;
			var oProjectTbl = this.getView().byId("NPI_PROJECTS_TBL");
			var oSelectedIndex = oProjectTbl.getSelectedIndex();
			if (!bVal) {
				if (oSelectedIndex === -1) {
					util.toastMessage("Please select a project to view details");
					that.busy.close();
					return;
				}
				var oSelectedProject = oProjectDetailTblModel.getProperty("/projectTblData/" + oSelectedIndex);
				oProjectId = oSelectedProject.projectId;
			} else {
				oProjectId = oProjectDetailModel.getProperty("/projectDto/projectId");
			}
			that.oRouter.navTo("createNewProject", {
				bVal: oProjectId
			});
			/*var sUrl = "/npiservices/npi/primaryscoping/projectdata/" + oProjectId + "/" + startIndex + "/" + batchIndex;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						if(!bVal){
							that.onCreateNewProject();
						}
						oProjectDetailModel.setData(resultData);
						that.oRouter.navTo("createNewProject", {
							bVal: false
						});
						oProjectDetailModel.refresh();
						that.busy.close();
					}
				} else {
					that.busy.close();
					var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					util.toastMessage(errorText);
				}
			});

			oModel.attachRequestFailed(function (oEvent) {
				var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorText);
				that.busy.close();
			});*/
		},

		//Function to reset create project fields to null
		resetCreateProjectFields: function () {
			var oProjectDetailModel = this.oProjectDetailModel;
			var projectDto = {
				"projectId": "",
				"projectStatusCode": "",
				"description": "",
				"projectTypeCode": "",
				"leadClusterCode": "",
				"leadCategoryCode": "",
				"regionCode": "AMS",
				"leadCountryCode": "",
				"launchDate": "",
				"firstProductionDate": "",
				"userCreated": "",
				"dateCreated": "",
				"dateUpdated": "",
				"userUpdated": "",
				"preApprovalStatus": ""
			};
			oProjectDetailModel.setProperty("/projectDto", projectDto);
			oProjectDetailModel.refresh();
		},

		onSaveProject: function () {
			newProjectCreation.onSaveProject(this);
		},

		/*//To be deleted 
		viewProjectMatDetails: function () {
			var oUiElementVisibilityModel = this.oUiElementVisibilityModel;
			oUiElementVisibilityModel.setProperty("/primaryScopingVisible", false);
			oUiElementVisibilityModel.setProperty("/newProjectCreationVisible", true);
			oUiElementVisibilityModel.setProperty("/headerConfirmViewVisible", true);
			oUiElementVisibilityModel.setProperty("/newPrjCreateTblVisible", false);
			oUiElementVisibilityModel.refresh();
		},*/

		//Function to generate random numbers:
		generateUniqueNumber: function () {
			var min = 0;
			var max = 500;
			var random = Math.floor(Math.random() * (+max - +min)) + +min;
			return random;
		},

		//Function to add new Country/Role/Phase for a project
		addNewProjectRole: function () {
			var rowNumber = 1;
			var oProjectDetailModel = this.oProjectDetailModel;
			var rolesData = oProjectDetailModel.getProperty("/rolesData");
			var projectId = oProjectDetailModel.getProperty("/projectDto/projectId");
			if (!rolesData) {
				rolesData = [];
			} else {
				if (rolesData.length === 0) {
					rowNumber = 1;
				} else {
					var prevRowNumb = rolesData[rolesData.length - 1].rowNumber;
					rowNumber = parseInt(prevRowNumb) + 1;
				}
			}
			//rowNumber = parseInt(rowNumber);

			var oTempObj = {
				"rowNumber": rowNumber,
				"projectId": projectId,
				"leadClusterCode": "",
				"leadCountryCode": "",
				"role": "",
				"phase": "",
				"readByDate": "",
				"version": 0,
				"summaryStatus": "NEW"
			};

			rolesData.push(oTempObj);
			oProjectDetailModel.setProperty("/rolesData", rolesData);
			oProjectDetailModel.refresh();
		},

		//Function to delete Country/Role/Phase for a project
		deleteProjectRole: function () {
			var oProjectDetailModel = this.oProjectDetailModel;
			var oProjectRolesTbl = this.getView().byId("MM_PROJECT_ROLES_TBL");
			var oSelectedRow = oProjectRolesTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a row to delete");
				return;
			}
			var rolesData = oProjectDetailModel.getProperty("/rolesData");
			rolesData.splice(oSelectedRow, 1);
			oProjectDetailModel.refresh();
			oProjectRolesTbl.removeSelectionInterval(oProjectRolesTbl.getSelectedIndex(), oProjectRolesTbl.getSelectedIndex());
		},

		//Function to clear project search entries from search panel
		onClearPorjectSearch: function () {
			var oProjectSearchFields = {
				"projectId": "",
				"projectDescription": "",
				"projectType": "",
				"projectStatus": "",
				"createdBy": "",
				"myProjects": false,
				"region": "",
				"leadCluster": "",
				"leadCountry": "",
				"leadCategory": "",
				"launchDateFrom": "",
				"launchDateTo": "",
				"firstProdDateFrom": "",
				"firstProdDateTo": "",
				"createdDateFrom": "",
				"createdDateTo": ""
			};
			var oProjectSearchModel = this.oProjectSearchModel;
			oProjectSearchModel.setData(oProjectSearchFields);
			oProjectSearchModel.refresh();
			this.onSearchProject();

			var oProjectRolesTbl = this.getView().byId("NPI_PROJECTS_TBL");
			oProjectRolesTbl.removeSelectionInterval(oProjectRolesTbl.getSelectedIndex(), oProjectRolesTbl.getSelectedIndex());
		},

		//Function to add new material line for a project
		addNewMaterialLines: function () {
			var serialId = 1;
			var oProjectDetailModel = this.oProjectDetailModel;
			var materialLines = oProjectDetailModel.getProperty("/materialLines");
			var projectId = oProjectDetailModel.getProperty("/projectDto/projectId");

			if (!materialLines) {
				materialLines = [];
			} else {
				if (materialLines.length === 0) {
					materialLines = 1;
				} else {
					var prevRowNumb = materialLines[materialLines.length - 1].displaySequenceNumber;
					serialId = parseInt(prevRowNumb) + 1;
				}
			}
			//serialId = parseInt(serialId);

			var oTempObj = {
				"baseUnit": "",
				"caseGtin": "",
				"completionDate": "",
				"consumerUnitGtin": "",
				"cuNetContent": "",
				"cuNetContentUom": "",
				"displaySequenceNumber": serialId,
				"globalLineDescription": "",
				"globalMaterialCode": "",
				"globalXRegionMaterialStatus": "",
				"gtinRequired": false,
				"isOs2Completed": false,
				"isR2Completed": false,
				"isR2Started": false,
				"launchDate": "",
				"leadClusterCode": "",
				"leadCountryCode": "",
				"linkedCuLine": "",
				"linkedTuLine": "",
				"materialAction": "",
				"materialOwnerGroup": "",
				"materialType": "",
				"numberOfCUPerCases": "",
				"plmSpecificationDesc": "",
				"plmSpecificationId": "",
				"plmSpecificationStatus": "",
				"prodReadinessDate": "",
				"projectId": projectId,
				"referenceMaterialCode": "",
				"regionalMaterialUniqueId": "",
				"serialId": null,
				"specificationGroup": "",
				"sameAsGtinLineNumber": "",
				"tacCode": "",
				"tacCode2": "",
				"taintValue": "",
				"purchasingGroup": "",
				"originGroup": "",
				"commodityCode": "",
				"materialGroup": "",
				"isCaseGtinRequired": "",
				"isGdcRequired": "",
				"fromUomQuantity": "",
				"toUomQuantity": "",
				"materialLineStatus": "",
				"collectStatus": "",
				"summaryStatus": "NEW",
				"isExplosionRequired": false,
				"naRetailProdHierarchy": "",
				"naFSProdHierarchy": "",
				"salesPlanningBrand": "",
				"sector": "",
				"noOfCUPerDU": "",
				"noOfSCUPerDU": "",
				"noOfIPKPerDU": "",
				"productFormat": "",
				"manufacturingId": "",
				"isIPKIndicatorRequired": false,
				"pdmIndicator": "",
				"innerPackGtin": "",
				"caseUpc": "",
				"primaryPlant": "",
				"recordId": "",
				"globalCuc": "",
				"pnpSpecId": "",
				"pnpDescription": "",
				"repackId": "",
				"density": "",
				"noOfCuPerIpk": "",
				"blueLinkLineNumber": "",
				"leadCategory": "",
				"deliveryCondition": "",
				"ownedBy": "",
				"secondaryPackMaterialSpec": "",
				"primaryPackMaterialSpec": "",
				"cuNetWeightInGrams": "",
				"cuNetWeightInMillileters": "",
				"formulaCode": "",
				"kidsFlag": "",
				"colorOfLid": "",
				"colorOfTubOrCup": "",
				"mrdrCompletionDate": "",
				"productLineTechnology": "",
				"productLineGroup": "",
				"brand": "",
				"subSector": "",
				"productName": "",
				"totalShelfLife": "",
				"firstProductionDate": "",
				"validForUsage": true,
				"status": "",
				"isMaintainedIndividually": ""
			};

			materialLines.push(oTempObj);
			oProjectDetailModel.setProperty("/materialLines", materialLines);
			oProjectDetailModel.refresh();
		},

		//Function to delete material for a project
		deleteProjectMaterials: function () {
			var oProjectDetailModel = this.oProjectDetailModel;
			var oProjectMaterialTbl = this.getView().byId("MM_PROJECT_MATERIAL_TBL");
			var oSelectedRow = oProjectMaterialTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a row to delete");
				return;
			}
			var materialLines = oProjectDetailModel.getProperty("/materialLines");
			materialLines.splice(oSelectedRow, 1);
			oProjectDetailModel.refresh();
			oProjectMaterialTbl.removeSelectionInterval(oProjectMaterialTbl.getSelectedIndex(), oProjectMaterialTbl.getSelectedIndex());
		},

		//Function to start project/BPM process
		onStartProject: function () {
			newProjectCreation.onStartProject(this);
		},

		//
		onRolesTblChangeDateValue: function (oEvent) {
			var oFormattedDate = new Date().getTime();
			var oProjectDetailModel = this.oProjectDetailModel;
			var sPath = oEvent.getSource().mBindingInfos.value.binding.oContext.sPath;
			sPath = sPath + "/readByDate";
			oProjectDetailModel.setProperty(sPath, oFormattedDate);
			oProjectDetailModel.refresh();
		},

		onSearchTblChangeDateValue: function (oEvent) {
			// var oFormattedDate = new Date().getTime();
			// var oProjectSearchModel = this.oProjectSearchModel;
			// var sPath = oEvent.getSource().getBindingPath("value");
			// oProjectSearchModel.setProperty(sPath, oFormattedDate);
			// oProjectSearchModel.refresh();
		}
	});
});