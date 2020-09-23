sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/Button",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, UIComponent, JSONModel, MessageBox, Button, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.BaseController", {

		// dateHelper: DateHelper,

		fnInitializeApp: function () {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var sRootPath = jQuery.sap.getModulePath("com.incture.NewProductIntroduction_UI.Kpireports");
			oMdlCommon.attachRequestCompleted(function (oEvent) {
				oMdlCommon.refresh();
			});
			oMdlCommon.loadData(sRootPath + "/model/Property.json", null, false);
		},

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getParentModel: function (sName) {
			var oMdl = this.getOwnerComponent().getModel(sName);
			oMdl.setSizeLimit(999);
			if (!oMdl) {
				oMdl = new JSONModel({});
				this.setParentModel(oMdl, sName);
			}
			return oMdl;
		},

		_BusyDialog: new sap.m.BusyDialog({
			busyIndicatorDelay: 0 //,
		}),

		openBusyDialog: function () {
			if (this._BusyDialog) {
				this._BusyDialog.open();
			} else {
				this._BusyDialog = new sap.m.BusyDialog({
					busyIndicatorDelay: 0
				});
				this._BusyDialog.open();
			}
		},

		closeBusyDialog: function () {
			if (this._BusyDialog) {
				this._BusyDialog.close();
			}
		},

		/**
		 * @purpose Message 
		 * @param1 pMessage -- String-Message to be displayed
		 * @param2 pMsgTyp -- String-Message type
		 * @param2 pHandler -- function-callback function
		 */
		showMessage: function (pMessage, pMsgTyp, pHandler) {

			if (pMessage.trim().length === 0) {
				return;
			}

			if (["A", "E", "I", "W"].indexOf(pMsgTyp) === -1) {
				sap.m.MessageToast.show(pMessage);
			} else {
				var sIcon = "";

				switch (pMsgTyp) {
				case 'W':
					sIcon = "WARNING";
					break;
				case 'E':
					sIcon = "ERROR";
					break;
				case 'I':
					sIcon = "INFORMATION";
					break;
				case 'A':
					sIcon = "NONE";
					break;
				default:
				}

				MessageBox.show(pMessage, {
					icon: sIcon,
					title: sIcon,
					onClose: pHandler,
					styleClass: "sapUiSizeCompact"
				});

			}

		},

		/**
		 * @purpose Message 
		 * @param1 pMessage -- String-Message to be displayed
		 * @param2 pMsgTyp -- String-Message type
		 * @param2 pHandler -- function-callback function
		 */
		confirmUserAction: function (pMessage, pMsgTyp, pHandler) {
			var sIcon = "";

			switch (pMsgTyp) {
			case 'W':
				sIcon = "WARNING";
				break;
			case 'E':
				sIcon = "ERROR";
				break;
			case 'I':
				sIcon = "INFORMATION";
				break;
			case 'A':
				sIcon = "NONE";
				break;
			default:

			}
			MessageBox.confirm(pMessage, {
				icon: sIcon,
				title: "Confirm",
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: pHandler
			});
		},

		/**
		 * @purpose Message from Resource Bundle 
		 * @param1 pMessage -- String-Property of Resource Bundle
		 * @param2 aParametrs -- Array-Parameters
		 */
		getMessage: function (pMessage, aParametrs) {
			// read msg from i18n model
			var sMsg = "";
			var oMdlI18n = this.getOwnerComponent().getModel("i18n");
			if (oMdlI18n) {
				this._oBundle = oMdlI18n.getResourceBundle();
			} else {
				this._oBundle = null;
				return sMsg;
			}

			if (aParametrs && aParametrs.length) {
				sMsg = this._oBundle.getText(pMessage, aParametrs);
			} else {
				sMsg = this._oBundle.getText(pMessage);
			}

			return sMsg;
		},

		/**
		 * @purpose Model filter for given control 
		 * @param1 aPropertyFilterSettings -- {propertyName:"",filterOperator:"",propertyValue:""}
		 * @param2 oBinding -- Binding Object
		 * @param3 bLogicalOperator -- boolean value true for AND operation
		 */
		fnApplyCustomerFilter: function (aPropertyFilterSettings, oBinding, bLogicalOperator) {
			var aFilters = [];
			if (aPropertyFilterSettings && aPropertyFilterSettings instanceof Array && aPropertyFilterSettings.length > 0) {
				$.each(aPropertyFilterSettings, function (index, oRow) {
					if (oRow.propertyName && oRow.filterOperator &&
						(oRow.propertyValue != undefined || oRow.propertyValue != null || oRow.propertyValue != "")) {
						aFilters.push(new Filter(oRow.propertyName, oRow.filterOperator, oRow.propertyValue));
					}
				});

				// update list binding
				var bOpAND = (bLogicalOperator) ? true : false;
				oBinding.filter(new Filter(aFilters, bOpAND), "Application");
			} else {
				oBinding.filter([], "Application");
			}
		},

		/*
		 * @purpose Handle Service Request 
		 * @param1 sUrl -- String
		 * @param2 sReqType -- String-(GET/POST/PUT/DELETE)
		 * @param3 oHeader -- Header JSON Object
		 * @param4 bShowBusy -- Boolean value to Show Busy Dialog or not
		 * @param5 pHandler -- function-callback function
		 * @param6 oData -- Data to be sent JSON Object
		 */
		fnProcessDataRequest: function (sUrl, sReqType, oHeader, bShowBusy, pHandler, oData) {
			var oThisController = this;
			var oAjaxSettings = {
				url: sUrl,
				type: sReqType,
				cache: false,
				beforeSend: function (jqXHR) {
					if (bShowBusy) {
						oThisController.openBusyDialog();
					}
				},
				complete: function (jqXHR, status) {

					if (jqXHR.getResponseHeader("com.sap.cloud.security.login")) {
						oThisController.showMessage(oThisController.getMessage("SESSION_EXPIRED", "I"), function () {
							window.location.reload();
						});
					} else {
						if (pHandler) {
							pHandler(jqXHR, status);
						}
					}

					if (status === "error") {
						oThisController.closeBusyDialog();
					}

					if (bShowBusy) {
						oThisController.closeBusyDialog();
					}
				}
			};

			if (oHeader && oHeader instanceof Object) {
				oAjaxSettings.headers = oHeader;
			}

			if (oData && oData instanceof Object) {
				oAjaxSettings.data = JSON.stringify(oData);
			}

			$.ajax(oAjaxSettings);
		},

		//function to show work in progress
		fnWorkinProgress: function () {
			var oThisController = this;
			oThisController.showMessage(oThisController.getMessage("DEVELOPMENT_IN_PROGRESS"), "I", function () {});
		},

		/*
		 * @purpose clear the fields of create new project
		 */
		/*	onClearAll: function () {
				var oThisController = this;
				var oMdlCommon = oThisController.getParentModel("mCommon");
				oMdlCommon.setProperty("/oNewProject/sSourcingType", "");
				oMdlCommon.setProperty("/oNewProject/sSubsidiary", "");
				oMdlCommon.setProperty("/oNewProject/sPlant", "");
				oMdlCommon.setProperty("/oNewProject/sSalesOrg", "");
				oMdlCommon.setProperty("/oNewProject/sProductHierarcy", "");
				oMdlCommon.setProperty("/oNewProject/sMaterailGroup1", "");
				oMdlCommon.setProperty("/oNewProject/sLanguage", "");
				oMdlCommon.setProperty("/oNewProject/sBaseUnitOfMeasure", "");
				oMdlCommon.setProperty("/oNewProject/sMaterialDescription", "");
				oMdlCommon.setProperty("/oNewProject/sMatarialType", "");
				// oMdlCommon.setProperty("/oNewProject/sRequestID", "");
				oMdlCommon.setProperty("/oNewProject/sDistributionChanel", "");
				oMdlCommon.setProperty("/oNewProject/sIndustrySector", "");
				oMdlCommon.setProperty("/oNewProject/sMaterialType", "");
				oMdlCommon.setProperty("/oNewProject/sDescription", "");
				oMdlCommon.setProperty("/oNewProject/sLoadingGroups", "");
				oMdlCommon.setProperty("/oNewProject/sImportExportGroups", "");
				oMdlCommon.setProperty("/oNewProject/sCommodityGroup", "");
				oMdlCommon.setProperty("/oNewProject/sProjectDesc", "");
			},*/

		//centralized call for Service GET integration
		fnManageSrvCall: function (sAPIName) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			switch (sAPIName) {
			case 'CycleTime':
				oThisController.fnSetCurrentUser(function () {
					// oThisController.fnGetMycycleService(true, true);
					oThisController.fnGetNewcycleService(true, true);
				});
				break;
			case 'CREATE':
				break;
			default:
			}

		},

		//UOM Look up
		// fnGetUomLookUp: function () {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var sUrl = "/Colgate/lookup/uom",
		// 		oHeader = {
		// 			"Content-Type": "application/json",
		// 			"Accept": "application/json"
		// 		};

		// 	try {
		// 		oMdlCommon.setProperty("/aUoms", []);
		// 		oMdlCommon.refresh();
		// 	} catch (e) {
		// 		//catch
		// 	}

		// 	oThisController.fnProcessDataRequest(sUrl, "GET", oHeader, false, function (oXHR, status) {
		// 		try {
		// 			if (oXHR && oXHR.responseJSON && oXHR.responseJSON instanceof Array) {
		// 				oMdlCommon.setProperty("/aUoms", oXHR.responseJSON);
		// 			}
		// 			oMdlCommon.refresh();
		// 		} catch (e) {
		// 			oMdlCommon.setProperty("/aUoms", []);
		// 			oMdlCommon.refresh();
		// 			// console.log(e);
		// 		}
		// 	});
		// },

		// fnGetGenItemCatGroup: function () {
		// 	var oThisController = this;
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var sUrl = "/Colgate/lookup/itemcategory",
		// 		oHeader = {
		// 			"Content-Type": "application/json",
		// 			"Accept": "application/json"
		// 		};

		// 	try {
		// 		oMdlCommon.setProperty("/aGenItemCat", []);
		// 		oMdlCommon.refresh();
		// 	} catch (e) {
		// 		//catch
		// 	}

		// 	oThisController.fnProcessDataRequest(sUrl, "GET", oHeader, false, function (oXHR, status) {
		// 		try {
		// 			if (oXHR && oXHR.responseJSON && oXHR.responseJSON instanceof Array) {
		// 				oMdlCommon.setProperty("/aGenItemCat", oXHR.responseJSON);
		// 				// oMdlCommon.setProperty("/oVisible/bIconTabBar", true);
		// 			}
		// 			oMdlCommon.refresh();
		// 		} catch (e) {
		// 			oMdlCommon.setProperty("/aGenItemCat", []);
		// 			oMdlCommon.refresh();
		// 			// console.log(e);
		// 		}
		// 	});
		// },

		fnSetCurrentUser: function (callback) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			oThisController.fnProcessDataRequest("/services/userapi/currentuser", "GET", null, false, function (oXHR, status) {
				if (oXHR && oXHR.responseJSON) {
					oThisController.userDetails = oXHR.responseJSON;
					oMdlCommon.setProperty("/userDetails", oXHR.responseJSON);
					oMdlCommon.refresh();

					if (callback) {
						// oThisController.fnGetLaunchPadRoles(callback);
						callback();
					}

				}
			}, null);
		},

		// fnGetMycycleService: function (bOpenBusyDialog, bCloseBusyDialog) {
		// 	var oThisController = this;
		// 	var oMdlCommon = oThisController.getParentModel("mCommon");
		// 	var oParam = $.extend(true, {}, oMdlCommon.getProperty("/oParam"));
		// 	var sUrl = "",
		// 		oHeader = {
		// 			"Content-Type": "application/json",
		// 			"Accept": "application/json"
		// 		};

		// 	try {
		// 		if (bOpenBusyDialog) {
		// 			oThisController.openBusyDialog();
		// 		}
		// 		sUrl = "/mylanservices/report/kpi";
		// 		if (oParam.isCountry) {
		// 			var oCountrySelectedData = oMdlCommon.getProperty("/oCountrySelectedData");
		// 			if (sUrl.indexOf("?") === -1) {
		// 				sUrl = sUrl + "?country=" + oCountrySelectedData.label;
		// 			} else {
		// 				sUrl = sUrl + "&country=" + oCountrySelectedData.label;
		// 			}
		// 		}
		// 		if (oParam.isRole) {
		// 			var oRolesSelectedData = oMdlCommon.getProperty("/oRolesSelectedData");
		// 			if (sUrl.indexOf("?") === -1) {
		// 				sUrl = sUrl + "?role=" + oRolesSelectedData.label;
		// 			} else {
		// 				sUrl = sUrl + "&role=" + oRolesSelectedData.label;
		// 			}

		// 		}
		// 		if (oParam.isScenario) {
		// 			var oScenarioSelectedData = oMdlCommon.getProperty("/oScenarioSelectedData");
		// 			if (sUrl.indexOf("?") === -1) {
		// 				sUrl = sUrl + "?scenario=" + oScenarioSelectedData.label;
		// 			} else {
		// 				sUrl = sUrl + "&scenario=" + oScenarioSelectedData.label;
		// 			}

		// 		}
		// 		if (oParam.isView) {
		// 			var oViewSelectedData = oMdlCommon.getProperty("/oViewSelectedData");
		// 			if (sUrl.indexOf("?") === -1) {
		// 				sUrl = sUrl + "?view=" + oViewSelectedData.label;
		// 			} else {
		// 				sUrl = sUrl + "&view=" + oCountrySelectedData.label;
		// 			}
		// 		}

		// 	} catch (e) {
		// 		oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 		oThisController.closeBusyDialog();
		// 	}

		// 	oThisController.fnProcessDataRequest(sUrl, "GET", oHeader, false, function (oXHR, status) {
		// 		try {
		// 			if (status === "success") {
		// 				if (oXHR.status === 200 && oXHR.statusText === "success") {
		// 					oThisController.fnFormatJsonCycleTime(oXHR.responseJSON);
		// 					// oMdlCommon.setProperty("/aAllProjs", oXHR.responseJSON);
		// 					if (bCloseBusyDialog) {
		// 						oThisController.closeBusyDialog();
		// 					}
		// 				}
		// 			} else {
		// 				oThisController.showMessage(oThisController.getMessage("REQUEST_OPERATION_FAILED"), "E");
		// 				if (bCloseBusyDialog) {
		// 					oThisController.closeBusyDialog();
		// 				}
		// 			}
		// 		} catch (e) {
		// 			oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 			if (bCloseBusyDialog) {
		// 				oThisController.closeBusyDialog();
		// 			}
		// 		}
		// 	});
		// 	oMdlCommon.refresh();
		// },

		fnGetNewcycleService: function (bOpenBusyDialog, bCloseBusyDialog) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var oParam = $.extend(true, {}, oMdlCommon.getProperty("/oNewParam"));
			var sUrl = "",
				oHeader = {
					"Content-Type": "application/json",
					"Accept": "application/json"
				};

			try {
				if (bOpenBusyDialog) {
					oThisController.openBusyDialog();
				}
				sUrl = "/mylanservices/report/kpinew";
				if (oParam.isScenario) {
					var oScenarioSelectedData = oMdlCommon.getProperty("/oScenarioSelectedData");
					if (sUrl.indexOf("?") === -1) {
						sUrl = sUrl + "?scenario=" + oScenarioSelectedData.label;
					} else {
						sUrl = sUrl + "&scenario=" + oScenarioSelectedData.label;
					}

				}
				if (oParam.isCountry) {
					var oCountrySelectedData = oMdlCommon.getProperty("/oCountrySelectedData");
					if (sUrl.indexOf("?") === -1) {
						sUrl = sUrl + "?country=" + oCountrySelectedData.label;
					} else {
						sUrl = sUrl + "&country=" + oCountrySelectedData.label;
					}
				}
				// if (oParam.isRole) {
				// 	var oRolesSelectedData = oMdlCommon.getProperty("/oRolesSelectedData");
				// 	if (sUrl.indexOf("?") === -1) {
				// 		sUrl = sUrl + "?role=" + oRolesSelectedData.label;
				// 	} else {
				// 		sUrl = sUrl + "&role=" + oRolesSelectedData.label;
				// 	}

				// }
				// if (oParam.isScenario) {
				// 	var oScenarioSelectedData = oMdlCommon.getProperty("/oScenarioSelectedData");
				// 	if (sUrl.indexOf("?") === -1) {
				// 		sUrl = sUrl + "?scenario=" + oScenarioSelectedData.label;
				// 	} else {
				// 		sUrl = sUrl + "&scenario=" + oScenarioSelectedData.label;
				// 	}

				// }
				// if (oParam.isView) {
				// 	var oViewSelectedData = oMdlCommon.getProperty("/oViewSelectedData");
				// 	if (sUrl.indexOf("?") === -1) {
				// 		sUrl = sUrl + "?view=" + oViewSelectedData.label;
				// 	} else {
				// 		sUrl = sUrl + "&view=" + oCountrySelectedData.label;
				// 	}
				// }

			} catch (e) {
				oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
				oThisController.closeBusyDialog();
			}

			oThisController.fnProcessDataRequest(sUrl, "GET", oHeader, false, function (oXHR, status) {
				try {
					if (status === "success") {
						if (oXHR.status === 200 && oXHR.statusText === "success") {
							oThisController.fnFormatJsonNewCycleTime(oXHR.responseJSON);
							// oMdlCommon.setProperty("/aAllProjs", oXHR.responseJSON);
							if (bCloseBusyDialog) {
								oThisController.closeBusyDialog();
							}
						}
					} else {
						oThisController.showMessage(oThisController.getMessage("REQUEST_OPERATION_FAILED"), "E");
						if (bCloseBusyDialog) {
							oThisController.closeBusyDialog();
						}
					}
				} catch (e) {
					oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
					if (bCloseBusyDialog) {
						oThisController.closeBusyDialog();
					}
				}
			});
			oMdlCommon.refresh();
		},

		fnFormatJsonNewCycleTime: function (aJson) {
			var oThisController = this;
			// var aCountrySegments = [];
			var aPlants = ["6189 (FDF Unit-1 NSK)", "NL01 (Mylan SPC RDC)", "PLAA (Mylan EPD Sp z o.o.)"];
			var oMdlcommon = oThisController.getParentModel("mCommon");
			var oParam = $.extend(true, {}, oMdlcommon.getProperty("/oNewParam"));
			// for (let m = 0; m < aJson.projects.length; m++) {
			// 	aJson.projects[m].projectNumber = String(aJson.projects[m].projectNumber);
			// }
			// oMdlcommon.setProperty("/aProjects", aJson.projects);
			var aNewScenario = [];
			var aCountries = [];
			if (!oParam.isScenario && !oParam.isCountry) {
				for (let x = 0; x < 3; x++) {
					var sString = "";
					var aSplicearr = aJson.scenarioSegmentList[x].value.split(".");
					if (aSplicearr.length) {
						if (aSplicearr[0]) {
							sString = aSplicearr[0] + " hours "
						}
						if (aSplicearr[1]) {
							sString += aSplicearr[1] + " minutes "
						}
					}
					aJson.scenarioSegmentList[x].value = sString;
					aNewScenario.push(aJson.scenarioSegmentList[x]);
				}
				oMdlcommon.setProperty("/aScenarioSegmentList", aNewScenario);
				oMdlcommon.setProperty("/oVisible/bCountry", false);
				oMdlcommon.setProperty("/oVisible/bProjects", false);
				oMdlcommon.setProperty("/oVisible/bProjTable", false);
				oMdlcommon.setProperty("/oVisible/bViews", false);

			}
			if (oParam.isScenario && !oParam.isCountry) {
				for (let i = 0; i < aJson.countrySegmentList.length; i++) {
					if (aJson.countrySegmentList[i].label === "IN") {
						aJson.countrySegmentList[i].Newlabel = aPlants[0];
						var aCountryInSegment = "";
						var aSpliceCountryInarr = aJson.countrySegmentList[i].value.split(".");
						if (aSpliceCountryInarr.length) {
							if (aSpliceCountryInarr[0]) {
								aCountryInSegment = aSpliceCountryInarr[0] + " hours "
							}
							if (aSpliceCountryInarr[1]) {
								aCountryInSegment += aSpliceCountryInarr[1] + " minutes "
							}
						}
						aJson.countrySegmentList[i].value = aCountryInSegment;
						aCountries.push(aJson.countrySegmentList[i]);
					}
					if (aJson.countrySegmentList[i].label === "NL") {
						aJson.countrySegmentList[i].Newlabel = aPlants[1];
						var aCountryNLSegment = "";
						var aSpliceCountryNLarr = aJson.countrySegmentList[i].value.split(".");
						if (aSpliceCountryNLarr.length) {
							if (aSpliceCountryInarr[0]) {
								aCountryNLSegment = aSpliceCountryNLarr[0] + " hours "
							}
							if (aSpliceCountryNLarr[1]) {
								aCountryNLSegment += aSpliceCountryNLarr[1] + " minutes "
							}
						}
						aJson.countrySegmentList[i].value = aCountryNLSegment;
						aCountries.push(aJson.countrySegmentList[i]);
					}
					if (aJson.countrySegmentList[i].label === "PL") {
						aJson.countrySegmentList[i].Newlabel = aPlants[2];
						var aCountryPLSegment = "";
						var aSpliceCountryPLarr = aJson.countrySegmentList[i].value.split(".");
						if (aSpliceCountryPLarr.length) {
							if (aSpliceCountryPLarr[0]) {
								aCountryPLSegment = aSpliceCountryPLarr[0] + " hours "
							}
							if (aCountryPLSegment[1]) {
								aCountryPLSegment += aSpliceCountryPLarr[1] + " minutes "
							}
						}
						aJson.countrySegmentList[i].value = aCountryPLSegment;
						aCountries.push(aJson.countrySegmentList[i]);
					}
					// aJson.countrySegmentList[i].displayValue = String(aJson.countrySegmentList[i].displayValue);
					// aJson.countrySegmentList[j].value = Number(aJson.countrySegmentList[j].value);
					// aJson.countrySegmentList[j].bSelected = false;
				}
				oMdlcommon.setProperty("/aCountrySegments", aCountries);
				oMdlcommon.setProperty("/oVisible/bCountry", true);
				oMdlcommon.setProperty("/oVisible/bProjects", false);
				oMdlcommon.setProperty("/oVisible/bProjTable", false);
				oMdlcommon.setProperty("/oVisible/bViews", false);
			} else if (oParam.isCountry) {
				// for (let j = 0; j < aJson.countrySegmentList.length; j++) {
				// 	aJson.countrySegmentList[j].displayValue = String(aJson.countrySegmentList[j].displayValue);
				// 	// aJson.countrySegmentList[j].value = Number(aJson.countrySegmentList[j].value);
				// 	// aJson.countrySegmentList[j].bSelected = false;
				// }
				// oMdlcommon.setProperty("/aCountrySegments", aJson.countrySegmentList);
				// } else {
				if (aJson.completedMaterial) {
					oMdlcommon.setProperty("/sProjects/sMatCompleted", String(aJson.completedMaterial));
				} else {
					oMdlcommon.setProperty("/sProjects/sMatCompleted", "0");
				}
				if (aJson.pendingMaterial) {
					if (aJson.pendingMaterial !== "0" || aJson.pendingMaterial !== 0) {
						oMdlcommon.setProperty("/sProjects/sMatPending", String(aJson.pendingMaterial));
					} else {
						if (aJson.completedMaterial !== "0" || aJson.completedMaterial !== 0 || aJson.completedMaterial !== null) {
							oMdlcommon.setProperty("/sProjects/sMatPending", String(aJson.completedMaterial + 2));
						} else {
							oMdlcommon.setProperty("/sProjects/sMatPending", "0");
						}
					}
				} else {
					if (aJson.completedMaterial !== "0" || aJson.completedMaterial !== 0 || aJson.completedMaterial !== null) {
						oMdlcommon.setProperty("/sProjects/sMatPending", String(aJson.completedMaterial + 2));
					} else {
						oMdlcommon.setProperty("/sProjects/sMatPending", "0");
					}
				}
				oMdlcommon.setProperty("/sProjects/sProjPending", String(aJson.pending));
				oMdlcommon.setProperty("/sProjects/sProjComplted", String(aJson.completed));
				oMdlcommon.setProperty("/sProjects/sCycleTPending", String(aJson.cycleTimepending));
				oMdlcommon.setProperty("/sProjects/sCycleTComplete", String(aJson.cycleTimeCompleted));
				for (let m = 0; m < aJson.projects.completedProjects.length; m++) {
					aJson.projects.completedProjects[m].projectNumber = String(aJson.projects.completedProjects[m].projectNumber);
				}
				for (let n = 0; n < aJson.projects.pendingProjects.length; n++) {
					aJson.projects.pendingProjects[n].projectNumber = String(aJson.projects.pendingProjects[n].projectNumber);
				}
				oMdlcommon.setProperty("/aProjectCompletedProjBckUp", aJson.projects.completedProjects);
				oMdlcommon.setProperty("/aProjectPendingProjBckUp", aJson.projects.pendingProjects);
				oMdlcommon.setProperty("/aProjectCompletedViewBckUp", aJson.viewSegment.completedViewSegment);
				oMdlcommon.setProperty("/aProjectPendingViewBckUp", aJson.viewSegment.pendingViewSegment);
				oMdlcommon.setProperty("/oVisible/bCountry", true);
				oMdlcommon.setProperty("/oVisible/bProjects", true);
				oMdlcommon.setProperty("/oVisible/bProjTable", false);
				oMdlcommon.setProperty("/oVisible/bViews", false);
			} else {
				oMdlcommon.setProperty("/oVisible/bCountry", false);
				oMdlcommon.setProperty("/oVisible/bProjects", false);
				oMdlcommon.setProperty("/oVisible/bProjTable", false);
				oMdlcommon.setProperty("/oVisible/bViews", false);
			}

			// oMdlcommon.setProperty("/oVisible/bProjects", false);
			// oMdlcommon.setProperty("/oVisible/bProjTable", false);
			// oMdlcommon.setProperty("/oVisible/bViews", false);
			// }

			// for (let k = 0; k < aJson.scenarioSegmentList.length; k++) {
			// 	aJson.scenarioSegmentList[k].displayValue = String(aJson.scenarioSegmentList[k].displayValue);
			// 	aJson.scenarioSegmentList[k].value = Number(aJson.scenarioSegmentList[k].value);
			// 	aJson.scenarioSegmentList[k].bSelected = false;
			// }
			// for (let l = 0; l < aJson.viewSegmentList.length; l++) {
			// 	aJson.viewSegmentList[l].displayValue = String(aJson.viewSegmentList[l].displayValue);
			// 	aJson.viewSegmentList[l].value = Number(aJson.viewSegmentList[l].value);
			// 	aJson.viewSegmentList[l].bSelected = false;
			// }
			// oMdlcommon.setProperty("/aViewSegmentList", aJson.viewSegmentList);
			// for (let m = 0; m < aJson.roleSegmentList.length; m++) {
			// 	aJson.roleSegmentList[m].displayValue = String(aJson.roleSegmentList[m].displayValue);
			// 	aJson.roleSegmentList[m].value = Number(aJson.roleSegmentList[m].value);
			// 	aJson.roleSegmentList[m].bSelected = false;
			// }
			// oMdlcommon.setProperty("/aRoleSegmentList", aJson.roleSegmentList);
			oMdlcommon.refresh();

		},

		// fnFormatJsonCycleTime: function (aJson) {
		// 	var oThisController = this;
		// 	// var aCountrySegments = [];
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	for (let m = 0; m < aJson.projects.length; m++) {
		// 		aJson.projects[m].projectNumber = String(aJson.projects[m].projectNumber);
		// 	}
		// 	oMdlcommon.setProperty("/aProjects", aJson.projects);
		// 	for (let j = 0; j < aJson.countrySegmentList.length; j++) {
		// 		aJson.countrySegmentList[j].displayValue = String(aJson.countrySegmentList[j].displayValue);
		// 		aJson.countrySegmentList[j].value = Number(aJson.countrySegmentList[j].value);
		// 		aJson.countrySegmentList[j].bSelected = false;
		// 	}
		// 	oMdlcommon.setProperty("/aCountrySegments", aJson.countrySegmentList);
		// 	for (let k = 0; k < aJson.scenarioSegmentList.length; k++) {
		// 		aJson.scenarioSegmentList[k].displayValue = String(aJson.scenarioSegmentList[k].displayValue);
		// 		aJson.scenarioSegmentList[k].value = Number(aJson.scenarioSegmentList[k].value);
		// 		aJson.scenarioSegmentList[k].bSelected = false;
		// 	}
		// 	oMdlcommon.setProperty("/aScenarioSegmentList", aJson.scenarioSegmentList);
		// 	for (let l = 0; l < aJson.viewSegmentList.length; l++) {
		// 		aJson.viewSegmentList[l].displayValue = String(aJson.viewSegmentList[l].displayValue);
		// 		aJson.viewSegmentList[l].value = Number(aJson.viewSegmentList[l].value);
		// 		aJson.viewSegmentList[l].bSelected = false;
		// 	}
		// 	oMdlcommon.setProperty("/aViewSegmentList", aJson.viewSegmentList);
		// 	for (let m = 0; m < aJson.roleSegmentList.length; m++) {
		// 		aJson.roleSegmentList[m].displayValue = String(aJson.roleSegmentList[m].displayValue);
		// 		aJson.roleSegmentList[m].value = Number(aJson.roleSegmentList[m].value);
		// 		aJson.roleSegmentList[m].bSelected = false;
		// 	}
		// 	oMdlcommon.setProperty("/aRoleSegmentList", aJson.roleSegmentList);
		// 	oMdlcommon.refresh();

		// },

		// onChangeSelectAllPlants: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var bSelected = oEvent.getParameter("selected");
		// 	var oTable = oEvent.getSource().getParent().getParent();
		// 	var oBinding = oTable.getBinding("rows");
		// 	if (oBinding.oList.length === oBinding.aIndices.length) {
		// 		var aPlants = $.extend(true, [], oMdlcommon.getProperty("/aPlants"));
		// 		$.each(aPlants, function (index, oRow) {
		// 			oRow.isSelected = bSelected;
		// 		});
		// 		oMdlcommon.setProperty("/aPlants", aPlants);
		// 		oMdlcommon.refresh();
		// 	} else {
		// 		for (var i = 0; i < oBinding.aIndices.length; i++) {
		// 			oBinding.oList[oBinding.aIndices[i]].isSelected = bSelected;
		// 		}
		// 		oBinding.update();
		// 	}
		// 	oThisController.fnUpdateSelectAllPlant(oTable);
		// },

		// onChangeIsSelectedPlants: function (oEvent) {
		// 	var oTable = oEvent.getSource().getParent().getParent();
		// 	this.fnUpdateSelectAllPlant(oTable);
		// },

		// fnUpdateSelectAllPlant: function (oTable) {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var aPlants = [];
		// 	if (oTable) {
		// 		var oBinding = oTable.getBinding("rows");
		// 		if (oBinding.aIndices.length) {
		// 			for (var i = 0; i < oBinding.aIndices.length; i++) {
		// 				aPlants.push(oBinding.oList[oBinding.aIndices[i]]);
		// 			}
		// 		} else {
		// 			aPlants = oBinding.oList;
		// 		}
		// 	} else {
		// 		aPlants = $.extend(true, [], oMdlcommon.getProperty("/aPlants"));
		// 	}

		// 	if (aPlants.length && $.grep(aPlants, function (gRow) {
		// 			return gRow.isSelected;
		// 		}).length === aPlants.length) {
		// 		oMdlcommon.setProperty("/isSelectedAllPlants", true);
		// 	} else {
		// 		oMdlcommon.setProperty("/isSelectedAllPlants", false);
		// 	}
		// 	oMdlcommon.refresh();
		// 	this.fnGetSelectedPlants();
		// },

		//function to get the selected item in parts packaging
		// fnGetSelectedPlants: function () {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var aPlants = $.extend(oMdlcommon.getProperty("/aPlants"));
		// 	var aSelectedFU = [];

		// 	$.each(aPlants, function (index, oRow) {
		// 		if (oRow.isSelected) {
		// 			oRow.sPath = ("/aPlants/" + index);
		// 			aSelectedFU.push(oRow);
		// 		}
		// 	});
		// 	oMdlcommon.setProperty("/aSelectedPlantData", aSelectedFU);
		// 	oMdlcommon.refresh();
		// },

		// onChangeSelectAllSalesOrg: function (oEvent) {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var bSelected = oEvent.getParameter("selected");
		// 	var oTable = oEvent.getSource().getParent().getParent();
		// 	var oBinding = oTable.getBinding("rows");
		// 	if (oBinding.oList.length === oBinding.aIndices.length) {
		// 		var aSalesOrg = $.extend(true, [], oMdlcommon.getProperty("/aSalesOrg"));
		// 		$.each(aSalesOrg, function (index, oRow) {
		// 			oRow.isSelected = bSelected;
		// 		});
		// 		oMdlcommon.setProperty("/aSalesOrg", aSalesOrg);
		// 		oMdlcommon.refresh();
		// 	} else {
		// 		for (var i = 0; i < oBinding.aIndices.length; i++) {
		// 			oBinding.oList[oBinding.aIndices[i]].isSelected = bSelected;
		// 		}
		// 		oBinding.update();
		// 	}
		// 	oThisController.fnUpdateSelectAllSalesOrg(oTable);
		// },

		// onChangeIsSelectedSalesorg: function (oEvent) {
		// 	var oTable = oEvent.getSource().getParent().getParent();
		// 	this.fnUpdateSelectAllSalesOrg(oTable);
		// },

		// fnUpdateSelectAllSalesOrg: function (oTable) {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var aSalesOrg = [];
		// 	if (oTable) {
		// 		var oBinding = oTable.getBinding("rows");
		// 		if (oBinding.aIndices.length) {
		// 			for (var i = 0; i < oBinding.aIndices.length; i++) {
		// 				aSalesOrg.push(oBinding.oList[oBinding.aIndices[i]]);
		// 			}
		// 		} else {
		// 			aSalesOrg = oBinding.oList;
		// 		}
		// 	} else {
		// 		aSalesOrg = $.extend(true, [], oMdlcommon.getProperty("/aSalesOrg"));
		// 	}

		// 	if (aSalesOrg.length && $.grep(aSalesOrg, function (gRow) {
		// 			return gRow.isSelected;
		// 		}).length === aSalesOrg.length) {
		// 		oMdlcommon.setProperty("/isSelectedAllSalesOrg", true);
		// 	} else {
		// 		oMdlcommon.setProperty("/isSelectedAllSalesOrg", false);
		// 	}
		// 	oMdlcommon.refresh();
		// 	this.fnGetSelectedSalesOrg();
		// },

		//function to get the selected item in parts packaging
		// fnGetSelectedSalesOrg: function () {
		// 	var oThisController = this;
		// 	var oMdlcommon = oThisController.getParentModel("mCommon");
		// 	var aSalesOrg = $.extend(oMdlcommon.getProperty("/aSalesOrg"));
		// 	var aSelectedFU = [];

		// 	$.each(aSalesOrg, function (index, oRow) {
		// 		if (oRow.isSelected) {
		// 			oRow.sPath = ("/aPlants/" + index);
		// 			aSelectedFU.push(oRow);
		// 		}
		// 	});
		// 	oMdlcommon.setProperty("/aSelectedSalesOrgData", aSelectedFU);
		// 	oMdlcommon.refresh();
		// },

		onApprove: function () {
			var oThisController = this;
			oThisController.onSubmit(true);
		},

		/*	onReject: function () {
				var oThisController = this;
				var oMdlCommon = oThisController.getParentModel("mCommon");
				oThisController.onRejectTask();
				// oThisController.onSubmit(false);
			},*/

		// Reject Task Fragment

		// onReject: function () {
		// 	var oThisController = this;
		// 	// var oMdlCommon = oThisController.getParentModel("mCommon");
		// 	if (!oThisController._RejectTaskDialog) {
		// 		oThisController._RejectTaskDialog = sap.ui.xmlfragment("com.colgate.Projectapproval.fragment.RejectTask", oThisController);
		// 		oThisController.getView().addDependent(oThisController._RejectTaskDialog);
		// 	}
		// 	oThisController._RejectTaskDialog.open();
		// },

		// fnPostComment: function (sReason) {

		// 	var oThisController = this;
		// 	var bMandate = false;
		// 	var oMdlCommon = oThisController.getParentModel("mCommon");
		// 	var aProjectDetail = $.extend(true, {}, oMdlCommon.getProperty("/oNewProject"));
		// 	var sUrl = "",

		// 		oHeader = {
		// 			"Content-Type": "application/json",
		// 			"Accept": "application/json"
		// 		};

		// 	try {
		// 		sUrl = "/Colgate/data/project/comment";
		// 		var oRejectionDetails = {
		// 			"comment": sReason,
		// 			"createdBy": oThisController.userDetails.name,
		// 			"createdOn": oThisController.dateHelper.getBackEndDate(new Date()),
		// 			"projectId": aProjectDetail.sBasicProjectId,
		// 			"validForUsage": true
		// 		};

		// 		// oThisController._oCommon.userDetails.name

		// 	} catch (e) {
		// 		oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 		oThisController.closeBusyDialog();
		// 	}

		// 	oThisController.fnProcessDataRequest(sUrl, "POST", oHeader, false, function (oXHR, status) {
		// 		try {
		// 			if (status === "success") {
		// 				if (oXHR.status === 200 && oXHR.statusText === "success") {
		// 					oThisController._RejectTaskDialog.close();
		// 					oThisController.onSubmit(false);

		// 				}
		// 			} else {
		// 				oThisController.closeBusyDialog();
		// 				oThisController.showMessage(oThisController.getMessage("REQUEST_OPERATION_FAILED"), "E");
		// 			}
		// 		} catch (e) {
		// 			oThisController.closeBusyDialog();
		// 			oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 		}
		// 	}, oRejectionDetails);
		// 	oMdlCommon.refresh();
		// },

		onChangeCBox: function (oEvent) {
			var oValidatedComboBox = oEvent.getSource(),
				sSelectedKey = oValidatedComboBox.getSelectedKey(),
				sValue = oValidatedComboBox.getValue();
			if (!sSelectedKey) {
				oValidatedComboBox.setValueState("Error");
				oValidatedComboBox.setValueStateText("Invalid entry");
			} else {
				oValidatedComboBox.setValueState("None");
			}
		},

		onChangeInputBox: function (oEvent) {
			var oValidatedComboBox = oEvent.getSource(),
				sSelectedKey = oValidatedComboBox.getValue();
			if (!sSelectedKey) {
				oValidatedComboBox.setValueState("Error");
			} else {
				oValidatedComboBox.setValueState("None");
			}
		},

		// onOvsMsg: function (oEvent) {
		// 	var oButton = oEvent.getSource();
		// 	var oThisController = this;
		// 	if (!oThisController.OvsMSg) {
		// 		oThisController.OvsMSg = sap.ui.xmlfragment("com.colgate.Projectapproval.fragment.Languagemandate",
		// 			oThisController);
		// 		oThisController.getView().addDependent(oThisController.OvsMSg);
		// 	}
		// 	oThisController.OvsMSg.openBy(oButton);
		// }

	});
});