sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/BusyDialog",
	"newproductintroductionui/newproductintroductionui/util/util",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"newproductintroductionui/newproductintroductionui/util/newProjectCreation",
	"newproductintroductionui/newproductintroductionui/util/dropdownLookupServices"
], function (Controller, BusyDialog, util, Formatter, newProjectCreation, dropdownLookupServices) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.createNewProject", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.createNewProject
		 */
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

			var oProjectDetailTblModel = this.getOwnerComponent().getModel("oProjectDetailTblModel");
			oProjectDetailTblModel.setSizeLimit(999);
			this.oProjectDetailTblModel = oProjectDetailTblModel;

			var oProjectDetailModel = this.getOwnerComponent().getModel("oProjectDetailModel");
			oProjectDetailModel.setSizeLimit(999);
			this.oProjectDetailModel = oProjectDetailModel;

			var oUserModel = this.getOwnerComponent().getModel("oUserModel");
			oUserModel.setSizeLimit(999);
			this.oUserModel = oUserModel;

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				var viewName = oEvent.getParameter("name");
				if (viewName === "createNewProject") {
					that.routePatternMatched(oEvent);
				}
			});
		},

		routePatternMatched: function (oEvent) {
			var isCreateNewProject = oEvent.getParameters().arguments.bVal;
			if (isCreateNewProject === "true") {
				this.resetCreateProjectFields();
			} else {
				this.onFetchProjectDetails(isCreateNewProject);
			}
		},

		//Function to reset create project fields to null
		resetCreateProjectFields: function () {
			var oProjectDetailModel = this.oProjectDetailModel;
			var projectDto = {
				"projectId": "",
				"projectStatusCode": "",
				"description": "",
				"projectTypeCode": "",
				"leadClusterCode": "AMS",
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
			oProjectDetailModel.setProperty("/materialLines", []);
			oProjectDetailModel.setProperty("/rolesData", []);
			oProjectDetailModel.setProperty("/isProjectDetailsVisible", false);
		},

		//Function to fetech selected project details
		onFetchProjectDetails: function (oProjectId, serviceType) {
			this.busy.open();
			var that = this,
				startIndex = 0,
				batchIndex = 20;
			var oProjectDetailModel = this.oProjectDetailModel;
			var sUrl = "/npiservices/primaryscoping/projectdata/" + oProjectId + "/" + startIndex + "/" + batchIndex;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						oProjectDetailModel.setData(resultData);
						oProjectDetailModel.setProperty("/isProjectDetailsVisible", true);
						oProjectDetailModel.refresh();

						if (serviceType === "HEADER_CFRM") {
							oProjectDetailModel.setProperty("/projectDto/projectStatusCode", "NEW");
						} else if (serviceType === "SAVE") {
							oProjectDetailModel.setProperty("/projectDto/projectStatusCode", "WIP");
						} else if (serviceType === "START_PROJECT") {
							oProjectDetailModel.setProperty("/projectDto/projectStatusCode", "WIP");
						}
						that.busy.close();
					}
				} else {
					var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					util.toastMessage(errorText);
					that.busy.close();
				}
			});

			oModel.attachRequestFailed(function (oEvent) {
				var errorText = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorText);
				that.busy.close();
			});
		},

		//Function to navigate back to primary scoping 
		onNavBackToPrimaryScoping: function () {
			this.oRouter.navTo("");
		},

		//Function to save project
		onSaveProject: function () {
			newProjectCreation.onSaveProject(this);
		},

		//Function to start project/BPM process
		onStartProject: function () {
			newProjectCreation.onStartProject(this);
		},

		//Function to show confirm Header Data view
		onConfirmHeaderData: function (oEvent) {
			var oProjectDetailModel = this.oProjectDetailModel;
			var projectId = oProjectDetailModel.getProperty("/projectDto/projectId");
			if (projectId) {
				newProjectCreation.onSaveProject(this);
			} else {
				newProjectCreation.createProjectHeader(this);
			}
		},

		//Function to set date format for datePickers
		onChangeDateValue: function (oEvent) {
			var oDate = oEvent.getSource().getValue();
			var oFormattedDate = new Date(oDate).getTime();
			var oProjectDetailModel = this.oProjectDetailModel;
			var sPath = oEvent.getSource().getBindingPath("value");
			oProjectDetailModel.setProperty(sPath, oFormattedDate);
			oProjectDetailModel.refresh();
		},

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
				"leadClusterCode": "AMS",
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

		onRolesTblChangeDateValue: function (oEvent) {
			// var oFormattedDate = new Date().getTime();
			// var oProjectDetailModel = this.oProjectDetailModel;
			// var sPath = oEvent.getSource().mBindingInfos.value.binding.oContext.sPath;
			// sPath = sPath + "/readByDate";
			// oProjectDetailModel.setProperty(sPath, oFormattedDate);
			// oProjectDetailModel.refresh();
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
					serialId = 1;
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
				"leadClusterCode": "AMS",
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

		//Function to set the confirm header fragment visible
		viewProjectDetails: function () {
			var oProjectDetailModel = this.oProjectDetailModel;
			oProjectDetailModel.setProperty("/isProjectDetailsVisible", true);
			oProjectDetailModel.refresh();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf newproductintroductionui.newproductintroductionui.view.createNewProject
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.createNewProject
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.createNewProject
		 */
		//	onExit: function() {
		//
		//	}

	});

});