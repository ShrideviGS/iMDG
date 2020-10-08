sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"sap/m/BusyDialog",
	"newproductintroductionui/newproductintroductionui/util/util",
	"newproductintroductionui/newproductintroductionui/util/dropdownLookupServices"
], function (Controller, Formatter, BusyDialog, util, dropdownLookupServices) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.detailScopingView", {

		onInit: function () {
			var that = this;
			this.busy = new BusyDialog();

			var oResourceModel = this.getOwnerComponent().getModel("i18n");
			this.oResourceModel = oResourceModel.getResourceBundle();

			// this.oHeader = {
			// 	"Accept": "application/json",
			// 	"Content-Type": "application/json"
			// };
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
				that.token=xhr.getResponseHeader("X-CSRF-Token");
			};
			xhr.send(null);
			var oDropdownLookupsModel = this.getOwnerComponent().getModel("oDropdownLookupsModel");
			oDropdownLookupsModel.setSizeLimit(999);
			this.oDropdownLookupsModel = oDropdownLookupsModel;
			dropdownLookupServices.getCluster(that, true);
			dropdownLookupServices.getCountryData(that, true);
			dropdownLookupServices.getRoles(that, true);

			//Model for look up
			var oScenarioModel = this.getOwnerComponent().getModel("oScenarioModel");
			oScenarioModel.setSizeLimit(999);
			oScenarioModel.setProperty("/oScenarios", []);
			oScenarioModel.setProperty("/aSaleAreaDelItems", []);
			oScenarioModel.setProperty("/aPlantsDelItems", []);
			oScenarioModel.setProperty("/aWareHouseDelItems", []);
			oScenarioModel.setProperty("/aScenarioDelete", []);
			this.oScenarioModel = oScenarioModel;
			oScenarioModel.setProperty("/successMsgVisible", false);

			var oUserModel = this.getOwnerComponent().getModel("oUserModel");
			oUserModel.setSizeLimit(999);
			this.oUserModel = oUserModel;

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				that.getDetailScopingContextData();
				//var viewName = oEvent.getParameter("name");
				//that.routePatternMatched(oEvent);
			});
		},

		showScenarioExt: function () {
			var oScenarioModel = this.oScenarioModel;
			var oScenarioValueHelpTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			var oScenarioExtTbl = this.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
			var oSelectedRow = oScenarioValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			oScenarioExtTbl.bindRows("oScenarioModel>" + "/scenarios/" + oSelectedRow + "/listScenarioExtension");
			oScenarioModel.refresh();
		},

		//Function to get context data
		getDetailScopingContextData: function () {
			var that = this;
			//commented by shridevi
			var taskId = this.getTaskIdFromUrl();
			var oScenarioModel = this.oScenarioModel;
			//	var sUrl = "/bpmworkflowruntime/v1/task-instances/" + taskId + "/context";
			var sUrl = "/bpmworkflowruntime/v1/task-instances/" + taskId + "/context";
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sUrl, true, "GET", false, false,this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						var projectId = resultData.projectId;
						var rowNumber = resultData.rowNumber;
						that.getDetailScopingData(projectId, rowNumber);
						oScenarioModel.setProperty("/contextData", resultData);
					}
				} else {
					that.toastMessage("Internal Server Error");
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				that.toastMessage("Internal Server Error");
			});
		},

		//Function to get init data
		getDetailScopingData: function (projectId, rowNumber) {
			var that = this;
			var oScenarioModel = this.oScenarioModel;
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/detailedscoping/loadscenarios/" + projectId + "/" + rowNumber;
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/scenarios", resultData.scenarios);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to get taskId from url
		getTaskIdFromUrl: function () {
			var url_string = window.location.href;
			var oUrlSplit = url_string.split("/");
			var taskId = oUrlSplit[oUrlSplit.length - 1];
			// var taskId = "a903fcda-30a1-11ea-923c-00163e9dd8c3";
			return taskId;
		},

		////////////////////////Scenario PopUp/////////////////////////////
		//Function to open Scenario Dialog Box
		onScenarioPress: function (oEvent) {
			if (!this.scenarioDialog) {
				this.scenarioDialog = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioDialogView", this);
				this.getView().addDependent(this.scenarioDialog);
			}
			this.scenarioDialog.open();
		},

		/*//Function to apply scenario
		onApplyScenario: function (oEvent) {
			var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			/*var oSelectedRow = oScenarioValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			this.onAddPlantsForScenarioExt();
		},*/

		//Function to add scenario extensions
		onAddNewScenarioExt: function (selectedObj) {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var detailScoping = oScenarioModel.getProperty("/scenarios");
			var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			if (!detailScoping) {
				detailScoping = [];
			} else {
				if (detailScoping.length !== 0) {
					setNo = detailScoping[detailScoping.length - 1].setNo;
					setNo = setNo + 1;
				}
			}
			setNo = parseInt(setNo);

			var oTempObj = this.getScenarioTempObj();
			oTempObj.scenario.projectId = oScenarioModel.getProperty("/contextData/projectId");
			oTempObj.scenario.rowNumber = oScenarioModel.getProperty("/contextData/rowNumber");
			oTempObj.scenario.setNo = selectedObj.setNo;
			oTempObj.scenario.comments = selectedObj.shortNote;
			oTempObj.scenario.scenarioCode = selectedObj.senario;
			oTempObj.scenario.scenarioDescription = selectedObj.description;
			oTempObj.scenario.variant = selectedObj.variant;
			oTempObj.scenario.readyByDate = selectedObj.dueDate;
			// for (let i = 0; i < oTempObj.length; i++) {
			// 	oTempObj.setNo = selectedObj.setNo;
			// 	oTempObj.senario = selectedObj.senario
			// }

			oTempObj.aSalesArea = [];
			oTempObj.aPlants = [];
			oTempObj.aWareHourse = [];
			detailScoping.push(oTempObj);
			oScenarioModel.setProperty("/scenarios", detailScoping);
			oScenarioModel.refresh();
			oScenarioValueHelpTbl.removeSelectionInterval(oScenarioValueHelpTbl.getSelectedIndex(), oScenarioValueHelpTbl.getSelectedIndex());
			this.scenarioDialog.close();
		},

		//Function to cancel scenario
		onCancelScenario: function (oEvent) {
			var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			oScenarioValueHelpTbl.removeSelectionInterval(oScenarioValueHelpTbl.getSelectedIndex(), oScenarioValueHelpTbl.getSelectedIndex());
			this.scenarioDialog.close();
		},

		//Function to add new scenario
		onAddNewValueHelpScenario: function () {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var scenarios = oScenarioModel.getProperty("/scenarios");
			var oScenarios = oScenarioModel.getProperty("/oScenarios");

			if (oScenarios.length === 0) {
				if (!scenarios || scenarios.length === 0) {
					setNo = 1;
				} else if (scenarios.length > 0) {
					var oMainSetNo2 = scenarios[scenarios.length - 1].scenario.setNumber;
					oMainSetNo2 = parseInt(oMainSetNo2);
					setNo = oMainSetNo2 + 1;
				}
			} else if (oScenarios.length > 0) {
				if (!scenarios || scenarios.length === 0) {
					setNo = oScenarios[oScenarios.length - 1].setNumber;
					setNo = setNo + 1;
				} else if (scenarios.length > 0) {
					var oSubSetNo1 = oScenarios[oScenarios.length - 1].setNumber;
					oSubSetNo1 = parseInt(oSubSetNo1);
					var oMainSetNo2 = scenarios[scenarios.length - 1].scenario.setNumber;
					oMainSetNo2 = parseInt(oMainSetNo2);
					if (oSubSetNo1 > oMainSetNo2) {
						setNo = oSubSetNo1 + 1;
					} else if (oSubSetNo1 > oMainSetNo2) {
						setNo = oMainSetNo2 + 1;
					} else if (oSubSetNo1 === oMainSetNo2) {
						setNo = oSubSetNo1 + 1;
					}
				}
			} else {
				setNo = 1;
				oScenarios = [];
			}

			setNo = parseInt(setNo);
			var oTempObj = {
				"setNumber": setNo,
				"senario": "",
				"description": "",
				"readyByDate": null,
				"variant": "",
				"shortNote": "",
				"new": false
			};
			oScenarios.push(oTempObj);
			oScenarioModel.setProperty("/oScenarios", oScenarios);
			oScenarioModel.refresh();
		},

		//Function to update the binding path for date picker in add scenario table
		scenarioDueDateChange: function (oEvent) {
			// var oFormattedDate = new Date().getTime();
			// var oScenarioModel = this.oScenarioModel;
			// var sPath = oEvent.getSource().mBindingInfos.value.binding.oContext.sPath;
			// sPath = sPath + "/readyByDate";
			// oScenarioModel.setProperty(sPath, oFormattedDate);
			// oScenarioModel.refresh();
		},

		//Function to open value help for scenarios
		openScenarioVariants: function (oEvent) {
			var oScenarioModel = this.oScenarioModel;
			var bindingContext = oEvent.getSource().getBindingContext("oScenarioModel");
			var sPath = bindingContext.getPath();
			oScenarioModel.setProperty("/scenarioPath", sPath);

			if (!this.scenarioVariantsDialog) {
				this.scenarioVariantsDialog = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioVariantsTbl",
					this);
				this.getView().addDependent(this.scenarioVariantsDialog);
			}
			this.getScenariosVariants();
			this.scenarioVariantsDialog.open();
		},

		//Function to get scenarios by value help
		getScenariosVariants: function () {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/lookup/scenario";
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/scenarioVariants", resultData);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setData([]);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to delete a scenario
		onDeleteFromValueHelpScenario: function () {
			var oScenarioModel = this.oScenarioModel;
			var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			var oSelectedRow = oScenarioValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a Scenario to delete");
				return;
			}
			var oScenarios = oScenarioModel.getProperty("/oScenarios");
			var oSelectedRow = $.extend(true, {}, oScenarioModel.getProperty("/oScenarios/" + oSelectedRow));
			var aScenarioDelete = oScenarioModel.getProperty("/aScenarioDelete");
			aScenarioDelete.push(oSelectedRow);
			oScenarioModel.setProperty("/aScenarioDelete", aScenarioDelete)
				// var scenarios = oScenarioModel.getProperty("/scenarios");
				// for (let i = 0; i < scenarios.length; i++) {
				// 	if (oSelectedRow.setNumber === scenarios[i].scenario.setNumber) {
				// 		scenarios.splice(i, 1);
				// 	}
				// }
				// oScenarioModel.setProperty("/scenarios", scenarios);
			oScenarios.splice(oSelectedRow, 1);
			oScenarioModel.refresh();
			oScenarioValueHelpTbl.removeSelectionInterval(oScenarioValueHelpTbl.getSelectedIndex(), oScenarioValueHelpTbl.getSelectedIndex());
		},

		//Function to set scenario variant to the scenario table
		onSelectScenarioVariant: function (oEvent) {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var oSelectedIndex = oEvent.getSource().getSelectedIndex();
			if (oSelectedIndex === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			var oSelectedRow = oEvent.getSource().getContextByIndex(oSelectedIndex);
			var oScenarioPath = oSelectedRow.getPath();
			var detailScoping = oScenarioModel.getProperty("/detailScoping");
			if (!detailScoping) {
				detailScoping = [];
			} else {
				if (detailScoping.length !== 0) {
					setNo = detailScoping[detailScoping.length - 1].setNo;
					setNo = setNo + 1;
				}
			}
			setNo = parseInt(setNo);
			var oScenarioVariant = oScenarioModel.getProperty(oScenarioPath);
			var oObject = oScenarioModel.getProperty("/scenarioPath");
			var obj = oScenarioModel.getProperty(oObject);
			obj.senario = oScenarioVariant.code;
			obj.description = oScenarioVariant.description;
			obj.variant = "Standard";
			//To be deleted once service integrated

			/*//To be deleted once service integrated
			var oTempObj = {
				setNo: setNo,
				senario: oScenarioVariant.code,
				description: oScenarioVariant.description,
				dueDate: "",
				variant: "Standard",
				shortNote: ""
			};
			var oPath = oScenarioModel.getProperty("/scenarioPath");
			oScenarioModel.setProperty(oPath, oTempObj);*/

			//detailScoping.push(oTempObj);
			//oScenarioModel.setProperty("/oScenarios", detailScoping);
			oScenarioModel.refresh();
			this.scenarioVariantsDialog.close();
		},

		//adding items to detail scopin from scenario help table(Shridevi (INC01057))
		onApplyScenarioCheckDuplicate: function (oEvent) {
			var that = this;
			that.busy.open();
			var oScenarioModel = that.oScenarioModel;
			var isPresent = false;
			var aScenariosCreate = $.extend(true, [], oScenarioModel.getProperty("/oScenarios"));
			var aScenarios = $.extend(true, [], oScenarioModel.getProperty("/scenarios"));
			var aScenarioDelete = $.extend(true, [], oScenarioModel.getProperty("/aScenarioDelete"));
			for (let x = 0; x < aScenarioDelete.length; x++) {
				for (let y = 0; y < aScenarios.length; y++) {
					if (aScenarioDelete[x].setNumber === aScenarios[y].scenario.setNumber) {
						aScenarios.splice(y, 1);
					}
				}
			}
			oScenarioModel.setProperty("/scenarios", aScenarios);
			if (aScenariosCreate.length) {
				for (let i = 0; i < aScenariosCreate.length; i++) {
					isPresent = false;
					if (aScenariosCreate[i].senario && aScenariosCreate[i].variant) {
						if (aScenarios.length) {
							var aScenarios = $.extend(true, [], oScenarioModel.getProperty("/scenarios"));
							for (let j = 0; j < aScenarios.length; j++) {
								if (aScenariosCreate[i].setNumber === aScenarios[j].scenario.setNumber) {
									if (aScenariosCreate[i].senario === aScenarios[j].scenario.scenarioCode && aScenariosCreate[i].description === aScenarios[j].scenario
										.scenarioDescription && aScenariosCreate[i].readyByDate === aScenarios[j].scenario.readyByDate && aScenariosCreate[i].variant ===
										aScenarios[j].scenario.variant && aScenariosCreate[i].shortNote ===
										aScenarios[j].scenario.comments) {
										isPresent = true;
										that.scenarioDialog.close();
									}
								}
							}
							if (!isPresent) {
								that.onApplyScenario(aScenariosCreate[i]);
								// that.busy.close();
							}
						} else {
							that.onApplyScenario(aScenariosCreate[i]);
							// that.busy.close();
						}
					} else {
						util.toastMessage("Please enter valid scenario and variant for the set no row " + aScenariosCreate[i].setNumber);
						// that.busy.close();
						return;
					}

				}
				oScenarioModel.setProperty("/aScenarioDelete", []);
				that.busy.close();

			} else {
				util.toastMessage("Please add atleast one scenario");
				return;
			}

		},

		//Function to apply scenario
		onApplyScenario: function (oSelectedPayload) {
			var that = this;
			that.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oContextData = oScenarioModel.getProperty("/contextData");
			//commented by shridevi(INC01057)
			// var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			// var oSelectedRow = oScenarioValueHelpTbl.getSelectedIndex();
			//commented by shridevi(INC01057)
			// if (oSelectedRow === -1) {
			// 	util.toastMessage("Please select a scenario");
			// 	return;
			// }
			// var oSelectedPayload = oScenarioModel.getProperty("/oScenarios/" + oSelectedRow);
			var oPayload = {
				"cluster": oContextData.leadCluster,
				"country": oContextData.leadCountry,
				"role": oContextData.role,
				"phase": "",
				"leadCategory": "",
				"reactionType": null,
				"scenario": oSelectedPayload.senario,
				"variant": oSelectedPayload.variant,
				"influencerType": null,
				"influencerKey": null,
				"influencerSubKey": null,
				"specGroup": null,
				"regionalMaterialType": "FERT"
			};

			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/detailedscoping/loadscenariosextensions";
			oModel.loadData(sUrl, JSON.stringify(oPayload), true, "POST", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					var detailScopingPath = that.onAddNewScenarioObj(resultData, oSelectedPayload);
					var oDetailScopePlantTbl = that.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
					oDetailScopePlantTbl.bindRows("oScenarioModel>" + detailScopingPath + "/listScenarioExtension");
					oScenarioModel.refresh();

					/*var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");*/
					//var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
					//oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", resultData);
					/*if (scenarioExtPlants) {
						if (scenarioExtPlants.length > 0) {
							var oArry = scenarioExtPlants.concat(resultData);
							oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", oArry);
						} else {
							oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", resultData);
						}
					} else {
						oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", resultData);
					}*/
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/scenarioExtPlants", []);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to add new scenario obj
		onAddNewScenarioObj: function (listScenarioExtension, selectedObj) {
			var setNo = 1;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oScenarioValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_VALUE_HELP_TBL");
			var oSelectedRow = oScenarioValueHelpTbl.getSelectedIndex();
			// var selectedObj = oScenarioModel.getProperty("/oScenarios/" + oSelectedRow);

			var detailScoping = oScenarioModel.getProperty("/scenarios");
			/*	if (!detailScoping) {
					detailScoping = [];
				} else {
					if (detailScoping.length !== 0) {
						setNo = detailScoping[detailScoping.length - 1].setNo;
						setNo = setNo + 1;
					}
				}*/
			setNo = parseInt(setNo);
			var oTempObj = this.getScenarioTempObj(listScenarioExtension);
			oTempObj.scenario.projectId = oScenarioModel.getProperty("/contextData/projectId");
			oTempObj.scenario.rowNumber = oScenarioModel.getProperty("/contextData/rowNumber");
			oTempObj.scenario.setNumber = selectedObj.setNumber;
			oTempObj.scenario.comments = selectedObj.shortNote;
			oTempObj.scenario.scenarioCode = selectedObj.senario;
			oTempObj.scenario.scenarioDescription = selectedObj.description;
			oTempObj.scenario.variant = selectedObj.variant;
			oTempObj.scenario.readyByDate = selectedObj.readyByDate;
			for (let i = 0; i < (oTempObj.listScenarioExtension).length; i++) {
				oTempObj.listScenarioExtension[i].setNo = selectedObj.setNumber;
				oTempObj.listScenarioExtension[i].senario = selectedObj.senario
			}
			oTempObj.aSalesArea = [];
			oTempObj.aPlants = [];
			oTempObj.aWareHourse = [];
			var isPresent = false;
			for (let j = 0; j < detailScoping.length; j++) {
				if (oTempObj.scenario.setNumber === detailScoping[j].scenario.setNumber) {
					detailScoping[j] = oTempObj;
					isPresent = true;
					break;
				}

			}
			if (!isPresent) {
				detailScoping.push(oTempObj);
			}

			// detailScoping[0].aSalesArea = [];
			// detailScoping[0].aPlants = [];
			// detailScoping[0].aWareHourse = [];
			oScenarioModel.setProperty("/scenarios", detailScoping);
			oScenarioModel.refresh();
			oScenarioValueHelpTbl.removeSelectionInterval(oScenarioValueHelpTbl.getSelectedIndex(), oScenarioValueHelpTbl.getSelectedIndex());
			this.scenarioDialog.close();
			this.busy.close();

			var mPath = detailScoping.length - 1;
			mPath = "/scenarios/" + mPath;
			return mPath;
		},

		//Function to close scenario variants dialog
		closeScenarioVariantPopUp: function () {
			this.scenarioVariantsDialog.close();
		},
		////////////////////////Scenario PopUp/////////////////////////////

		////////////////////////Sales Area PopUp/////////////////////////////
		//Function to open materials pop-up for selected set scenario
		openScenarioSalesArea: function () {
			var oDetailScopingTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			var oSelectedRow = oDetailScopingTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a scenario");
				return;
			}
			if (!this.scenarioSalesAreaPopUp) {
				this.scenarioSalesAreaPopUp = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioSalesArea",
					this);
				this.getView().addDependent(this.scenarioSalesAreaPopUp);
			}
			var oScenarioModel = this.oScenarioModel;
			var detailScopeTblPath = "/scenarios/" + oSelectedRow;
			var oSelectedRow = oScenarioModel.getProperty(detailScopeTblPath);
			oScenarioModel.setProperty("/oSelectedRowDetailsScoping", oSelectedRow);
			oScenarioModel.setProperty("/scenarioSalesOrg", oSelectedRow.aSalesArea);
			oScenarioModel.setProperty("/detailScopingPath", detailScopeTblPath);
			oScenarioModel.refresh();
			this.scenarioSalesAreaPopUp.open();
		},

		//Function to close scenario sales area dialog
		closeScenarioSalesAreaPopUp: function () {
			this.scenarioSalesAreaPopUp.close();
		},

		//Function to add a sales org to scenario
		onAddSalesOrg: function () {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var salesOrg = oScenarioModel.getProperty("/scenarioSalesOrg");
			if (!salesOrg) {
				salesOrg = [];
			} else {
				if (salesOrg.length !== 0) {
					setNo = salesOrg[salesOrg.length - 1].setNo;
					setNo = setNo + 1;
				}
			}
			setNo = parseInt(setNo);
			var oTempObj = {
				setNo: setNo,
				salesOrg: "",
				distributionChannel: "",
				description: "",
				sNew: ""
			};
			salesOrg.push(oTempObj);
			oScenarioModel.setProperty("/scenarioSalesOrg", salesOrg);
			oScenarioModel.refresh();
		},

		//Function to delete a plant to scenario
		onDeleteSalesOrg: function () {
			var oScenarioModel = this.oScenarioModel;
			var oSalesOrgValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_SALES_AREA_TBL");
			var oSelectedRow = oSalesOrgValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a Sales Org to delete");
				return;
			}
			var oScenarios = oScenarioModel.getProperty("/scenarioSalesOrg");
			var aSalesDelItems = $.extend(true, {}, oScenarioModel.getProperty("/scenarioSalesOrg/" + oSelectedRow));
			var DelItems = oScenarioModel.getProperty("/aSaleAreaDelItems");
			DelItems.push(aSalesDelItems);
			oScenarioModel.setProperty("/aSaleAreaDelItems", DelItems);
			oScenarios.splice(oSelectedRow, 1);
			oScenarioModel.refresh();
			oSalesOrgValueHelpTbl.removeSelectionInterval(oSalesOrgValueHelpTbl.getSelectedIndex(), oSalesOrgValueHelpTbl.getSelectedIndex());
		},

		//Function to open sales org lookup
		openSalesValueHelp: function (oEvent) {
			var oScenarioModel = this.oScenarioModel;
			var bindingContext = oEvent.getSource().getBindingContext("oScenarioModel");
			var sPath = bindingContext.getPath();
			oScenarioModel.setProperty("/salesOrgsPath", sPath);
			if (!this.salesAreaValuehelp) {
				this.salesAreaValuehelp = sap.ui.xmlfragment(
					"newproductintroductionui.newproductintroductionui.fragments.scenarioSalesAreaValuehelp", this);
				this.getView().addDependent(this.salesAreaValuehelp);
			}
			this.getScenariosSalesOrg();
			this.salesAreaValuehelp.open();
		},

		//Function to get sales data
		getScenariosSalesOrg: function () {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/lookup/sorgs";
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/salesOrg", resultData);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/salesOrg", []);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to select a plant from value pop-up
		onSelectScenarioSalesOrg: function (oEvent) {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var oSelectedIndex = oEvent.getSource().getSelectedIndex();
			if (oSelectedIndex === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			var oSelectedRow = oEvent.getSource().getContextByIndex(oSelectedIndex);
			var oScenarioPath = oSelectedRow.getPath();
			var salesOrg = oScenarioModel.getProperty("/scenarioSalesOrg");
			if (!salesOrg) {
				salesOrg = [];
			} else {
				if (salesOrg.length !== 0) {
					setNo = salesOrg[salesOrg.length - 1].setNo;
					setNo = setNo + 1;
				}
			} //scenarioExtPlants
			setNo = parseInt(setNo);
			var oSelectedObj = oScenarioModel.getProperty(oScenarioPath);

			dropdownLookupServices.getDistributionChannel(this, oSelectedObj.code, 0, 20);
			//To be deleted once service integrated
			var oSalesOrgObj = {
				salesOrg: oSelectedObj.code,
				//distributionChannel: oSelectedObj.countryCode,
				description: oSelectedObj.name
			};
			var oPath = oScenarioModel.getProperty("/salesOrgsPath");
			oScenarioModel.setProperty(oPath, oSalesOrgObj);

			//oScenarioModel.setProperty("/plants", plants);
			oScenarioModel.refresh();
			this.salesAreaValuehelp.close();
		},

		//Function to apply new plant 
		onApplySalesOrg: function () {
			var that = this;
			that.busy.open();
			var setNo = 1;
			var NewArr = [];
			var oScenarioModel = this.oScenarioModel;
			var oSalesOrgValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_SALES_AREA_TBL");
			var oDetailScopePlantTbl = this.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
			var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");
			var aSaleAreaDelItems = oScenarioModel.getProperty("/aSaleAreaDelItems");
			var scenarioSalesOrg = oScenarioModel.getProperty("/scenarioSalesOrg");
			// var oDetailScopingTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			// var oSelectedRow = oDetailScopingTbl.getSelectedIndex();
			var detailScopeTblPathsales = detailScopingPath + "/aSalesArea";

			// if (oSalesOrgValueHelpTbl.getSelectedIndex() === -1) {
			// 	util.toastMessage("Please select a Sales Org");
			// 	return;
			// }
			// var aSelectedRows = oSalesOrgValueHelpTbl.getSelectedIndices();

			var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
			if (!scenarioExtPlants) {
				scenarioExtPlants = [];
			} else {
				if (scenarioExtPlants.length !== 0) {
					setNo = scenarioExtPlants[scenarioExtPlants.length - 1].setNo;
					// setNo = setNo + 1;
				}
			}

			for (let m = 0; m < aSaleAreaDelItems.length; m++) {
				for (let n = 0; n < scenarioExtPlants.length; n++) {
					if (aSaleAreaDelItems[m].salesOrg === scenarioExtPlants[n].key && scenarioExtPlants[n].objectType === "SORG" && scenarioExtPlants[
							n].subKey ===
						"NA" && aSaleAreaDelItems[m].description === scenarioExtPlants[n].description) {
						scenarioExtPlants.splice(n, 1);
					}

				}
			}

			setNo = parseInt(setNo);
			var bPresent = false;
			for (let i = 0; i < scenarioSalesOrg.length; i++) {
				var selectedObj = $.extend(true, {}, scenarioSalesOrg[i]);
				bPresent = false;
				for (let j = 0; j < scenarioExtPlants.length; j++) {
					if (selectedObj.salesOrg === scenarioExtPlants[j].key && scenarioExtPlants[j].objectType === "SORG" && scenarioExtPlants[j].subKey ===
						"NA" && selectedObj.description === scenarioExtPlants[j].description) {
						bPresent = true;
					}

				}
				if (!bPresent) {
					var oTempObj = {
						objectType: "SORG",
						key: selectedObj.salesOrg,
						subKey: "NA",
						description: selectedObj.description,
						setNo: setNo
					};
					scenarioExtPlants.push(oTempObj);
				}
				NewArr.push(selectedObj);
			}
			oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", scenarioExtPlants);
			oDetailScopePlantTbl.bindRows("oScenarioModel>" + detailScopingPath + "/listScenarioExtension");
			oScenarioModel.setProperty(detailScopeTblPathsales, NewArr);
			oScenarioModel.setProperty("/aSaleAreaDelItems", []);
			oScenarioModel.refresh();
			oSalesOrgValueHelpTbl.removeSelectionInterval(oSalesOrgValueHelpTbl.getSelectedIndex(), oSalesOrgValueHelpTbl.getSelectedIndex());
			this.scenarioSalesAreaPopUp.close();
			that.busy.close();
		},

		//Function to close sales org value help dialog
		closeScenarioSalesOrgPopUp: function () {
			this.salesAreaValuehelp.close();
		},
		////////////////////////Sales Area PopUp/////////////////////////////

		////////////////////////Plants PopUp/////////////////////////////
		//Function to open Plant Dialog Box
		openScenarioPlantPopup: function (oEvent) {
			var oDetailScopingTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			var oSelectedRow = oDetailScopingTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a scenario");
				return;
			}
			if (!this.plantDialog) {
				this.plantDialog = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioPlants", this);
				this.getView().addDependent(this.plantDialog);
			}
			var oScenarioModel = this.oScenarioModel;
			var detailScopeTblPath = "/scenarios/" + oSelectedRow;
			var oSelectedRow = oScenarioModel.getProperty(detailScopeTblPath);
			oScenarioModel.setProperty("/detailScopingPath", detailScopeTblPath);
			oScenarioModel.setProperty("/plants", oSelectedRow.aPlants);
			var oSelectedRow = oScenarioModel.getProperty(detailScopeTblPath);
			oScenarioModel.setProperty("/oSelectedRowDetailsScoping", oSelectedRow);
			oScenarioModel.refresh();

			this.plantDialog.open();
		},

		//Function to close scenario plant
		closeScenarioPlantsPopUp: function () {
			this.plantDialog.close();
		},

		//Function to add a plant to scenario
		onAddScenarioPlants: function () {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var plants = oScenarioModel.getProperty("/plants");
			if (!plants) {
				plants = [];
			} else {
				if (plants.length !== 0) {
					setNo = plants[plants.length - 1].setNo;
					setNo = setNo + 1;
				}
			}
			setNo = parseInt(setNo);
			var oTempObj = {
				setNo: setNo,
				plant: "",
				type: "",
				description: ""
			};
			plants.push(oTempObj);
			oScenarioModel.setProperty("/plants", plants);
			oScenarioModel.refresh();
		},

		//Function to delete a plant to scenario
		onDeleteScenarioPlants: function () {
			var oScenarioModel = this.oScenarioModel;
			var oPlantsValueHelpTbl = sap.ui.getCore().byId("MM_PLANTS_VALUE_HELP_TBL");
			var oSelectedRow = oPlantsValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a Plant to delete");
				return;
			}
			var oScenarios = oScenarioModel.getProperty("/plants");
			var aPlants = $.extend(true, {}, oScenarioModel.getProperty("/plants/" + oSelectedRow));
			var DelItems = oScenarioModel.getProperty("/aPlantsDelItems");
			DelItems.push(aPlants);
			oScenarioModel.setProperty("/aPlantsDelItems", DelItems);
			oScenarios.splice(oSelectedRow, 1);
			oScenarioModel.refresh();
			oPlantsValueHelpTbl.removeSelectionInterval(oPlantsValueHelpTbl.getSelectedIndex(), oPlantsValueHelpTbl.getSelectedIndex());
		},

		//Function to open Plant Lookup
		openScenarioPlants: function (oEvent) {
			var oScenarioModel = this.oScenarioModel;
			var bindingContext = oEvent.getSource().getBindingContext("oScenarioModel");
			var sPath = bindingContext.getPath();
			oScenarioModel.setProperty("/plantsPath", sPath);
			if (!this.plantLookUpDialog) {
				this.plantLookUpDialog = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioPlantsValuehelp",
					this);
				this.getView().addDependent(this.plantLookUpDialog);
			}
			this.scenarioPlantsValueHelp();
			this.plantLookUpDialog.open();
		},

		//Function to open scenario plants value-help
		scenarioPlantsValueHelp: function () {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/lookup/plants";
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/scenarioPlants", resultData);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/scenarioPlants", []);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to select a plant from value pop-up
		onSelectScenarioPlant: function (oEvent) {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var oSelectedIndex = oEvent.getSource().getSelectedIndex();
			if (oSelectedIndex === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			var oSelectedRow = oEvent.getSource().getContextByIndex(oSelectedIndex);
			var oScenarioPath = oSelectedRow.getPath();
			var plants = oScenarioModel.getProperty("/plants");
			if (!plants) {
				plants = [];
			} else {
				if (plants.length !== 0) {
					setNo = plants[plants.length - 1].setNo;
					setNo = setNo + 1;
				}
			} //scenarioExtPlants
			setNo = parseInt(setNo);
			var oSelectedObj = oScenarioModel.getProperty(oScenarioPath);

			//To be deleted once service integrated
			var oPlantObj = {
				//setNo: setNo,
				plant: oSelectedObj.code,
				type: oSelectedObj.plantType,
				description: oSelectedObj.name
			};
			var oPath = oScenarioModel.getProperty("/plantsPath");
			oScenarioModel.setProperty(oPath, oPlantObj);

			//oScenarioModel.setProperty("/plants", plants);
			oScenarioModel.refresh();
			this.plantLookUpDialog.close();
		},

		//Function to close plants value help popup
		onClosePlantsValueHelp: function () {
			this.plantLookUpDialog.close();
		},

		//Function to apply new plant 
		onApplyPlants: function () {
			var that = this;
			that.busy.open();
			var setNo = 1;
			var NewArr = [];
			var oScenarioModel = this.oScenarioModel;
			var oPlantValueHelpTbl = sap.ui.getCore().byId("MM_PLANTS_VALUE_HELP_TBL");
			var oDetailScopePlantTbl = this.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
			var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");
			var aPlantsDelItems = oScenarioModel.getProperty("/aPlantsDelItems");
			var plants = oScenarioModel.getProperty("/plants");
			var detailScopeTblPathplants = detailScopingPath + "/aPlants";

			// if (oPlantValueHelpTbl.getSelectedIndex() === -1) {
			// 	util.toastMessage("Please select a Plant");
			// 	return;
			// }
			// var oSelectedRow = oPlantValueHelpTbl.getSelectedIndex();
			// var selectedObj = oScenarioModel.getProperty("/plants/" + oSelectedRow);

			var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
			if (!scenarioExtPlants) {
				scenarioExtPlants = [];
			} else {
				if (scenarioExtPlants.length !== 0) {
					setNo = scenarioExtPlants[scenarioExtPlants.length - 1].setNo;
					// setNo = setNo + 1;
				}
			}
			for (let m = 0; m < aPlantsDelItems.length; m++) {
				for (let n = 0; n < scenarioExtPlants.length; n++) {
					if (aPlantsDelItems[m].plant === scenarioExtPlants[n].key && scenarioExtPlants[n].objectType === "PLANT" &&
						scenarioExtPlants[
							n].subKey ===
						"NA" && aPlantsDelItems[m].description === scenarioExtPlants[n].description) {
						scenarioExtPlants.splice(n, 1);
					}

				}
			}

			setNo = parseInt(setNo);
			var bPresent = false;
			for (let i = 0; i < plants.length; i++) {
				var selectedObj = $.extend(true, {}, plants[i]);
				bPresent = false;
				for (let j = 0; j < scenarioExtPlants.length; j++) {
					if (selectedObj.plant === scenarioExtPlants[j].key && scenarioExtPlants[j].objectType === "PLANT" && scenarioExtPlants[j].subKey ===
						"NA" && selectedObj.description === scenarioExtPlants[j].description) {
						bPresent = true;
					}

				}
				if (!bPresent) {
					var oTempObj = {
						objectType: "PLANT",
						setNo: selectedObj.setNo,
						key: selectedObj.plant,
						subKey: "NA",
						description: selectedObj.description
					};
					scenarioExtPlants.push(oTempObj);
				}
				NewArr.push(selectedObj);
			}

			oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", scenarioExtPlants);
			oDetailScopePlantTbl.bindRows("oScenarioModel>" + detailScopingPath + "/listScenarioExtension");
			oScenarioModel.setProperty(detailScopeTblPathplants, NewArr);
			oScenarioModel.setProperty("/aPlantsDelItems", []);
			//oScenarioModel.setProperty("/scenarioExtPlants", scenarioExtPlants);
			oScenarioModel.refresh();
			oPlantValueHelpTbl.removeSelectionInterval(oPlantValueHelpTbl.getSelectedIndex(), oPlantValueHelpTbl.getSelectedIndex());
			this.plantDialog.close();
			that.busy.close();
		},
		////////////////////////Plants PopUp/////////////////////////////

		////////////////////////Warehouse PopUp/////////////////////////////
		//Function to open materials pop-up for selected set scenario
		openScenarioWarehouse: function () {
			var oDetailScopingTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			var oSelectedRow = oDetailScopingTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a scenario");
				return;
			}
			if (!this.scenarioWarehousePopUp) {
				this.scenarioWarehousePopUp = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioWarehouse",
					this);
				this.getView().addDependent(this.scenarioWarehousePopUp);
			}
			var oScenarioModel = this.oScenarioModel;
			var detailScopeTblPath = "/scenarios/" + oSelectedRow;
			oScenarioModel.setProperty("/detailScopingPath", detailScopeTblPath);
			var oSelectedRow = oScenarioModel.getProperty(detailScopeTblPath);
			oScenarioModel.setProperty("/oSelectedRowDetailsScoping", oSelectedRow);
			oScenarioModel.setProperty("/scenarioWarehouse", oSelectedRow.aWareHourse);
			oScenarioModel.refresh();
			this.scenarioWarehousePopUp.open();
		},

		//Function to close scenario warehouse dialog
		closeScenarioWarehousePopUp: function () {
			this.scenarioWarehousePopUp.close();
		},

		//Function to add a warehouse 
		onAddScenarioWarehouse: function () {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var scenarioWarehouse = oScenarioModel.getProperty("/scenarioWarehouse");
			if (!scenarioWarehouse) {
				scenarioWarehouse = [];
			} else {
				if (scenarioWarehouse.length !== 0) {
					setNo = scenarioWarehouse[scenarioWarehouse.length - 1].setNo;
					setNo = setNo + 1;
				}
			}
			setNo = parseInt(setNo);
			var oTempObj = {
				setNo: setNo,
				code: "",
				distributionChannel: "",
				isNew: true
			};
			scenarioWarehouse.push(oTempObj);
			oScenarioModel.setProperty("/scenarioWarehouse", scenarioWarehouse);
			oScenarioModel.refresh();
		},

		//Function to delete a warehouse
		onDeleteScenarioWarehouse: function () {
			var oScenarioModel = this.oScenarioModel;
			var oWarehouseValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_WAREHOUSE_TBL");
			var oSelectedRow = oWarehouseValueHelpTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a Warehouse to delete");
				return;
			}

			var oScenarios = oScenarioModel.getProperty("/scenarioWarehouse");

			var aaWareHouseDelItemsItems = $.extend(true, {}, oScenarioModel.getProperty("/scenarioWarehouse/" + oSelectedRow));
			var DelItems = oScenarioModel.getProperty("/aWareHouseDelItems");
			DelItems.push(aaWareHouseDelItemsItems);
			oScenarioModel.setProperty("/aWareHouseDelItems", DelItems);
			oScenarios.splice(oSelectedRow, 1);
			oScenarioModel.refresh();
			oWarehouseValueHelpTbl.removeSelectionInterval(oWarehouseValueHelpTbl.getSelectedIndex(), oWarehouseValueHelpTbl.getSelectedIndex());
		},

		//Function to open warehouse Lookup
		openWarehouseLookUp: function (oEvent) {
			var oScenarioModel = this.oScenarioModel;
			var bindingContext = oEvent.getSource().getBindingContext("oScenarioModel");
			var sPath = bindingContext.getPath();
			oScenarioModel.setProperty("/oWarehouseObj", sPath);
			if (!this.warehouseLookUpDialog) {
				this.warehouseLookUpDialog = sap.ui.xmlfragment(
					"newproductintroductionui.newproductintroductionui.fragments.scenarioWarehouseValuehelp", this);
				this.getView().addDependent(this.warehouseLookUpDialog);
			}
			this.getScenarioWareHouseValueHelp();
			this.warehouseLookUpDialog.open();
		},

		//Function to open scenario warehouse value-help
		getScenarioWareHouseValueHelp: function () {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/lookup/warehouse";
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/warehouseValueHelp", resultData);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/warehouseValueHelp", []);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to select a plant from value pop-up
		onSelectWarehouse: function (oEvent) {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var oSelectedIndex = oEvent.getSource().getSelectedIndex();
			if (oSelectedIndex === -1) {
				util.toastMessage("Please select a row");
				return;
			}
			var oSelectedRow = oEvent.getSource().getContextByIndex(oSelectedIndex);
			var oScenarioPath = oSelectedRow.getPath();
			var scenarioWarehouse = oScenarioModel.getProperty("/scenarioWarehouse");
			if (!scenarioWarehouse) {
				scenarioWarehouse = [];
			} else {
				if (scenarioWarehouse.length !== 0) {
					setNo = scenarioWarehouse[scenarioWarehouse.length - 1].setNo;
					setNo = setNo + 1;
				}
			} //scenarioExtPlants
			setNo = parseInt(setNo);
			var oSelectedObj = oScenarioModel.getProperty(oScenarioPath);
			dropdownLookupServices.getDistributionChannel(this, oSelectedObj.code, 0, 20);

			//To be deleted once service integrated
			var oWarehouseObj = {
				code: oSelectedObj.code,
				name: oSelectedObj.name
			};
			var oPath = oScenarioModel.getProperty("/oWarehouseObj");
			oScenarioModel.setProperty(oPath, oWarehouseObj);

			//oScenarioModel.setProperty("/plants", plants);
			oScenarioModel.refresh();
			this.warehouseLookUpDialog.close();
		},

		//Function to apply new plant 
		onApplyWarehouse: function () {
			var that = this;
			that.busy.open();
			var setNo = 1;
			var NewArr = [];
			var oScenarioModel = this.oScenarioModel;
			var oWarehouseValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_WAREHOUSE_TBL");
			var oDetailScopePlantTbl = this.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
			var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");

			var aWareHouseDelItems = oScenarioModel.getProperty("/aWareHouseDelItems");
			var scenarioWarehouse = oScenarioModel.getProperty("/scenarioWarehouse");
			var detailScopeTblPathwareHouse = detailScopingPath + "/aWareHourse";

			// if (oWarehouseValueHelpTbl.getSelectedIndex() === -1) {
			// 	util.toastMessage("Please select a Warehouse");
			// 	return;
			// }
			// var oSelectedRow = oWarehouseValueHelpTbl.getSelectedIndex();
			// var selectedObj = oScenarioModel.getProperty("/scenarioWarehouse/" + oSelectedRow);

			var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
			if (!scenarioExtPlants) {
				scenarioExtPlants = [];
			} else {
				if (scenarioExtPlants.length !== 0) {
					setNo = scenarioExtPlants[scenarioExtPlants.length - 1].setNo;
					// setNo = setNo + 1;
				}
			}

			for (let m = 0; m < aWareHouseDelItems.length; m++) {
				for (let n = 0; n < scenarioExtPlants.length; n++) {
					if (aWareHouseDelItems[m].code === scenarioExtPlants[n].key && scenarioExtPlants[n].objectType === "WHOUSE" && scenarioExtPlants[
							n].subKey ===
						"NA" && aWareHouseDelItems[m].description === scenarioExtPlants[n].description) {
						scenarioExtPlants.splice(n, 1);
					}

				}
			}

			setNo = parseInt(setNo);
			var bPresent = false;
			for (let i = 0; i < scenarioWarehouse.length; i++) {
				var selectedObj = $.extend(true, {}, scenarioWarehouse[i]);
				bPresent = false;
				for (let j = 0; j < scenarioExtPlants.length; j++) {
					if (selectedObj.code === scenarioExtPlants[j].key && scenarioExtPlants[j].objectType === "WHOUSE" && scenarioExtPlants[j].subKey ===
						"NA" && selectedObj.description === scenarioExtPlants[j].description) {
						bPresent = true;
					}

				}
				if (!bPresent) {
					var oTempObj = {
						objectType: "WHOUSE",
						key: selectedObj.code,
						subKey: "NA",
						description: selectedObj.distributionChannel,
						setNo: setNo
					};
					scenarioExtPlants.push(oTempObj);
				}
				NewArr.push(selectedObj);
			}

			// scenarioExtPlants.push(oTempObj);
			oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", scenarioExtPlants);
			oDetailScopePlantTbl.bindRows("oScenarioModel>" + detailScopingPath + "/listScenarioExtension");
			oScenarioModel.setProperty(detailScopeTblPathwareHouse, NewArr);
			oScenarioModel.setProperty("/aWareHouseDelItems", []);
			//oScenarioModel.setProperty("/scenarioExtPlants", scenarioExtPlants);
			oScenarioModel.refresh();
			oWarehouseValueHelpTbl.removeSelectionInterval(oWarehouseValueHelpTbl.getSelectedIndex(), oWarehouseValueHelpTbl.getSelectedIndex());
			this.scenarioWarehousePopUp.close();
			that.busy.close();
		},

		//Function to close ware house value help
		closeWarehouseValueHelpPopUp: function () {
			this.warehouseLookUpDialog.close();
		},
		////////////////////////Warehouse PopUp/////////////////////////////

		////////////////////////Materials PopUp/////////////////////////////
		//Function to open materials pop-up for selected set scenario
		openScenarioMaterials: function (oEvent) {
			var oScenarioModel = this.oScenarioModel;
			var oDetailScopingTbl = this.getView().byId("MM_DETAIL_SCOPING_TBL");
			var oSelectedRow = oDetailScopingTbl.getSelectedIndex();
			if (oSelectedRow === -1) {
				util.toastMessage("Please select a scenario");
				return;
			}
			if (!this.scenarioMaterialPopUp) {
				this.scenarioMaterialPopUp = sap.ui.xmlfragment("newproductintroductionui.newproductintroductionui.fragments.scenarioMaterial",
					this);
				this.getView().addDependent(this.scenarioMaterialPopUp);
			}

			var detailScopeTblPath = "/scenarios/" + oSelectedRow;
			oScenarioModel.setProperty("/detailScopingPath", detailScopeTblPath);
			var oSelectedRow = oScenarioModel.getProperty(detailScopeTblPath);
			oScenarioModel.setProperty("/oSelectedRowDetailsScoping", oSelectedRow);
			oScenarioModel.refresh();

			this.scenarioMaterialPopUp.open();
			this.getMaterialDataByProject();
		},

		//Function to close scenario materials dialog
		closeScenarioMaterialsPopUp: function () {
			this.scenarioMaterialPopUp.close();
		},

		//Function to get material data
		getMaterialDataByProject: function () {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var projectId = oScenarioModel.getProperty("/contextData/projectId");
			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/primaryscoping/materiallines/" + projectId + "/0/20";
			oModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oScenarioModel.setProperty("/materiallines", resultData);
					oScenarioModel.refresh();
				} else {
					var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/materiallines", []);
					util.toastMessage(errorMessage);
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});
		},

		//Function to assgin material
		onAssignMaterial: function () {
			var setNo = 1;
			var oScenarioModel = this.oScenarioModel;
			var oMaterialValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_MATERIALS_TBL");
			var oDetailScopePlantTbl = this.getView().byId("MM_DETAIL_SCOPING_PLANT_TBL");
			var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");

			if (!oMaterialValueHelpTbl.getSelectedIndices().length) {
				util.toastMessage("Please select a Material");
				return;
			}

			var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
			if (!scenarioExtPlants) {
				scenarioExtPlants = [];
			} else {
				if (scenarioExtPlants.length !== 0) {
					setNo = scenarioExtPlants[scenarioExtPlants.length - 1].setNo;
					// setNo = setNo + 1;
				}
			}
			var bPresent = true;
			setNo = parseInt(setNo);
			//loop to check duplicate
			var oSelectedRow = oMaterialValueHelpTbl.getSelectedIndices();
			for (let i = 0; i < oSelectedRow.length; i++) {
				bPresent = true;
				var selectedObj = oScenarioModel.getProperty("/materiallines/" + oSelectedRow[i]);
				for (let j = 0; j < scenarioExtPlants.length; j++) {
					if (scenarioExtPlants[j].objectType === "BASIC" && selectedObj.regionalMaterialUniqueId === scenarioExtPlants[j].key &&
						scenarioExtPlants[j].subKey === "NA" && selectedObj.globalLineDescription === scenarioExtPlants[j].description) {
						bPresent = false;
					}
				}
				if (bPresent) {
					var oTempObj = {
						objectType: "BASIC",
						key: selectedObj.regionalMaterialUniqueId,
						subKey: "NA",
						description: selectedObj.globalLineDescription,
						setNo: setNo
					};
					scenarioExtPlants.push(oTempObj);

				}
			}
			// var selectedObj = oScenarioModel.getProperty("/materiallines/" + oSelectedRow);

			// var oTempObj = {
			// 	objectType: "BASIC",
			// 	key: selectedObj.regionalMaterialUniqueId,
			// 	subKey: "NA",
			// 	description: selectedObj.globalLineDescription
			// };
			// scenarioExtPlants.push(oTempObj);
			oScenarioModel.setProperty(detailScopingPath + "/listScenarioExtension", scenarioExtPlants);
			oDetailScopePlantTbl.bindRows("oScenarioModel>" + detailScopingPath + "/listScenarioExtension");
			//oScenarioModel.setProperty("/scenarioExtPlants", scenarioExtPlants);
			oMaterialValueHelpTbl.clearSelection();
			oScenarioModel.refresh();
			oMaterialValueHelpTbl.clearSelection();
			oMaterialValueHelpTbl.removeSelectionInterval(oMaterialValueHelpTbl.getSelectedIndex(), oMaterialValueHelpTbl.getSelectedIndex());
			this.scenarioMaterialPopUp.close();
		},

		//Function to unassgin material
		onUnAssignMaterial: function () {
			var oScenarioModel = this.oScenarioModel;
			var oMaterialValueHelpTbl = sap.ui.getCore().byId("MM_SCENARIOS_MATERIALS_TBL");
			var detailScopingPath = oScenarioModel.getProperty("/detailScopingPath");

			if (!oMaterialValueHelpTbl.getSelectedIndices().length) {
				util.toastMessage("Please select a Material");
				return;
			}
			var scenarioExtPlants = oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension");
			//loop to delete
			var oSelectedRow = oMaterialValueHelpTbl.getSelectedIndices();
			for (let i = 0; i < oSelectedRow.length; i++) {
				var selectedObj = oScenarioModel.getProperty("/materiallines/" + oSelectedRow[i]);
				for (let j = 0; j < scenarioExtPlants.length; j++) {
					if (scenarioExtPlants[j].objectType === "BASIC" && selectedObj.regionalMaterialUniqueId === scenarioExtPlants[j].key &&
						scenarioExtPlants[j].subKey === "NA" && selectedObj.globalLineDescription === scenarioExtPlants[j].description) {
						var sPath = detailScopingPath + "/listScenarioExtension/" + j;
						oScenarioModel.getProperty(detailScopingPath + "/listScenarioExtension").splice(Number(sPath.replace(detailScopingPath +
							"/listScenarioExtension/", "")), 1);
					}
				}
			}
			oScenarioModel.refresh();
			oMaterialValueHelpTbl.clearSelection();
			this.scenarioMaterialPopUp.close();

		},
		////////////////////////Materials PopUp/////////////////////////////

		////////////////////////Save Scenario/////////////////////////////
		onSaveDetailScope: function (oEvent, bVal) {
			var that = this;
			this.busy.open();
			var oScenarioModel = this.oScenarioModel;
			var scenarios = oScenarioModel.getProperty("/scenarios");
			scenarios = {
				"scenarios": scenarios
			};

			var oModel = new sap.ui.model.json.JSONModel();
			var sUrl = "/npiservices/npi/detailedscoping/update";
			oModel.loadData(sUrl, JSON.stringify(scenarios), true, "POST", false, false, this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					if (bVal) {
						that.generateCSRFToken();
					} else {
						var projectId = oScenarioModel.getProperty("/contextData/projectId");
						var successErrorMsg = "Project #" + projectId + ", Saved Successfully";
						/*oScenarioModel.setProperty("/successErrorMsg", successErrorMsg);
						oScenarioModel.setProperty("/messageType", "Success");
						oScenarioModel.setProperty("/successMsgVisible", true);*/
						util.toastMessage(successErrorMsg);
					}
				} else {
					var projectId = oScenarioModel.getProperty("/contextData/projectId");
					var successErrorMsg = "Error in saving Project #" + projectId;
					/*oScenarioModel.setProperty("/successErrorMsg", successErrorMsg);
					oScenarioModel.setProperty("/messageType", "Error");
					oScenarioModel.setProperty("/successMsgVisible", true);*/
					util.toastMessage(successErrorMsg);
					/*var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
					oScenarioModel.setProperty("/materiallines", []);
					util.toastMessage(errorMessage);*/
				}
				that.busy.close();
			});

			oModel.attachRequestFailed(function (oEvent) {
				that.busy.close();
				var errorMessage = that.oResourceModel.getText("INTERNAL_SERVER_ERROR");
				util.toastMessage(errorMessage);
			});

		},
		////////////////////////Save Scenario/////////////////////////////,

		//Function to get dummy temporary object to add in scenario table
		getScenarioTempObj: function (listScenarioExtension) {

			var oCurrentDate = new Date();
			oCurrentDate = oCurrentDate.getTime();

			var oUserModel = this.oUserModel;
			var oDisplayName = oUserModel.getProperty("/UserId");
			var oName = oUserModel.getProperty("/UserId");
			var oTempObj = {
				"scenario": {
					"projectId": "", //Int
					"rowNumber": "", //Str
					"setNumber": "", //Int
					"comments": "", //Str
					"dateCreated": oCurrentDate,
					"dateUpdated": oCurrentDate,
					"inferredDueDate": null,
					"readyByDate": null,
					"scenarioCode": "",
					"scenarioDescription": "",
					"userCreated": oName, //Logged In user
					"userUpdated": oName, //Logged In user
					"variant": "Standard",
					"activeVersion": true, //boolean
					"version": "1", //Str
					"collectStatus": 93, //Int
					"status": 97, //Int
					"isDetailedScopingDone": null,
					"primaryPlant": null,
					"verzion": 1,
					"validForUsage": true
				},
				"listScenarioExtension": listScenarioExtension
			};
			return oTempObj;
		},

		//Function to coomplete task
		onCompletetask: function () {
			this.onSaveDetailScope("", true);
		},

		//Function to generate csrf token
		generateCSRFToken: function () {
			var token;
			var that = this;
			var oUrl = "/bpmworkflowruntime/v1/xsrf-token";
			if(this.token){
				that.completeBpmtask(this.token);
				return this.token;
			}else{
			$.ajax({
				url: oUrl,
				method: "GET",
				async: false,
				headers: this.oHeader,
				success: function (result, xhr, data) {
					token = data.getResponseHeader("X-CSRF-Token");
					that.completeBpmtask(token);
				},
				error: function (result, xhr, data) {
					token = result.getResponseHeader("x-csrf-token");
				}
			});
			return token;
			}
		},

		//Function to complete task
		completeBpmtask: function (token) {
			var oScenarioModel = this.oScenarioModel;
			var oPayload = {
				"context": {},
				"status": "COMPLETED"
			};
			var taskId = this.getTaskIdFromUrl();
			var oUrl = "/bpmworkflowruntime/v1/task-instances/" + taskId;
			$.ajax({
				url: oUrl,
				method: "PATCH",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(oPayload),
				headers: this.oHeader,
				success: function (result, xhr, data) {
					var projectId = oScenarioModel.getProperty("/contextData/projectId");
					var successErrorMsg = "Project #" + projectId + ", Submitted Successfully";
					/*oScenarioModel.setProperty("/successErrorMsg", successErrorMsg);
					oScenarioModel.setProperty("/messageType", "Success");
					oScenarioModel.setProperty("/successMsgVisible", true);*/
					util.toastMessage(successErrorMsg);
				},
				error: function (result, xhr, data) {
					var projectId = oScenarioModel.getProperty("/contextData/projectId");
					var successErrorMsg = "Error in submitting Project #" + projectId;
					/*oScenarioModel.setProperty("/successErrorMsg", successErrorMsg);
					oScenarioModel.setProperty("/messageType", "Error");
					oScenarioModel.setProperty("/successMsgVisible", true);*/
					util.toastMessage(successErrorMsg);
				}
			});
		},

		onCloseScenarioPopUp: function () {
				this.scenarioDialog.close();
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf newproductintroductionui.newproductintroductionui.view.detailScopingView
			 */
			//	onInit: function() {
			//
			//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf newproductintroductionui.newproductintroductionui.view.detailScopingView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.detailScopingView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.detailScopingView
		 */
		//	onExit: function() {
		//
		//	}
		// });

	});
});