sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"newproductintroductionui/newproductintroductionui/formatter/formatter",
	"sap/m/BusyDialog",
	"newproductintroductionui/newproductintroductionui/util/util",
	"newproductintroductionui/newproductintroductionui/util/dropdownLookupServices",
	"newproductintroductionui/newproductintroductionui/util/taskServices",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, BusyDialog, Formatter, Util, dropdownLookupServices, taskServices, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("newproductintroductionui.newproductintroductionui.controller.basicDataCollection", {

		onInit: function () {
			var that = this;
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
			};
			xhr.send(null);
			var oBasicDataCollectionModel = this.getOwnerComponent().getModel("oBasicDataCollectionModel");
			oBasicDataCollectionModel.setSizeLimit(999);
			this.oBasicDataCollectionModel = oBasicDataCollectionModel;

			var oBasicDataMandatoryFldModel = this.getOwnerComponent().getModel("oBasicDataMandatoryFldModel");
			oBasicDataMandatoryFldModel.setSizeLimit(999);
			this.oBasicDataMandatoryFldModel = oBasicDataMandatoryFldModel;

			var oSpecTblDataModel = this.getOwnerComponent().getModel("oSpecTblDataModel");
			oSpecTblDataModel.setSizeLimit(999);
			this.oSpecTblDataModel = oSpecTblDataModel;

			var oTempObjectModel = this.getOwnerComponent().getModel("oTempObjectModel");
			oTempObjectModel.setSizeLimit(999);
			this.oTempObjectModel = oTempObjectModel;

			taskServices.getTaskContextData(this, "BASIC_DATA_COLLECTION");
			taskServices.getTaskNodeIDData(this);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				//var viewName = oEvent.getParameter("name");
				that.routePatternMatched(oEvent);
			});
		},

		routePatternMatched: function (oEvent) {
			var oDropdownLookupsModel = this.getOwnerComponent().getModel("oDropdownLookupsModel");
			var oSpecTblDataModel = this.getOwnerComponent().getModel("oSpecTblDataModel");
			oSpecTblDataModel.setProperty("/isBasicEditable", false);
			oSpecTblDataModel.setProperty("/isUOMEditable", false);
			oDropdownLookupsModel.setSizeLimit(999);
			this.oDropdownLookupsModel = oDropdownLookupsModel;
			dropdownLookupServices.getBasicMaterialGroup(this);
			dropdownLookupServices.getExternalMaterialGroup(this);
			dropdownLookupServices.getDivisionUnits(this);
			dropdownLookupServices.getLabOffice(this);
			dropdownLookupServices.getGeneralItemCategory(this);
			dropdownLookupServices.getProductAllocations(this);
			dropdownLookupServices.getXPlantMaterialStatus(this);
			dropdownLookupServices.getDChainStatus(this);
			dropdownLookupServices.getMaterialGroupPackaging(this);
			dropdownLookupServices.getBaseUnits(this);
			dropdownLookupServices.getCatalogProfile(this);
			dropdownLookupServices.getContainerRequirements(this);
			dropdownLookupServices.getLabelType(this);
			dropdownLookupServices.getLabelFrom(this);
			dropdownLookupServices.getStorageConditions(this);
			dropdownLookupServices.getTempConditions(this);
			dropdownLookupServices.getPurchasingValue(this);
			dropdownLookupServices.getManufacturer(this);
			dropdownLookupServices.getAllowedPkgWeightUOM(this);
			dropdownLookupServices.getAllowedPkgVolumeUOM(this);
			dropdownLookupServices.getPackagingMatType(this);
			dropdownLookupServices.getTransportationGroup(this);
			dropdownLookupServices.getOrderUnit(this);
			dropdownLookupServices.getEANCategory(this);
			dropdownLookupServices.getLWHUnits(this);
			dropdownLookupServices.getVolunumeUnits(this);
			dropdownLookupServices.getWeightUnits(this);
			this.getProdHir();
		},

		//Function to get BasicDataCollection data on load
		getBasicDataCollection: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			var oBasicDataCollectionModel = this.oBasicDataCollectionModel;
			var oTaskDataModel = this.oTaskDataModel;
			var matUniqId = oTaskDataModel.getData().materialUniqueId;
			var regionCode = oTaskDataModel.getData().region;
			oModel.loadData("/npiservices/npi/basicdata/load/" + matUniqId + "/" + regionCode, "", true, "GET", false, false,this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					oBasicDataCollectionModel.setData(data);
					oBasicDataCollectionModel.refresh();
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

		//Function to save data 
		onSaveBasicData: function (oEvent) {
			this.onUpdateBasicData("SAVE");
		},

		//Function to validate mandatory fields
		onValidateBasicData: function (oEvent, actionType) {
			var that = this;
			var oSpecTblDataModel = this.getOwnerComponent().getModel("oSpecTblDataModel");
			var sNodeID = oSpecTblDataModel.getProperty("/sNodeID");
			var sUrl = "/npiservices/npi/mrp/mandatory/fields/BEV/FERT/4321/" + sNodeID;
			var oModel = new sap.ui.model.json.JSONModel();
			var oBasicDataMandatoryFldModel = this.oBasicDataMandatoryFldModel;
			oModel.loadData(sUrl, "", true, "GET", false, false,this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var count = 0;
					var data = oEvent.getSource().getData();
					oBasicDataMandatoryFldModel.setData(data);
					// for (var i = 0; i < data.entity.length; i++) {
					// 	var id = data.entity[i].technicalName;
					// 	var manField = that.getView().byId(id);
					// 	var fieldType = manField.getCustomData()[0].getValue();
					// 	if (fieldType === "INPUT") {
					// 		var selFieldValue = manField.getValue();
					// 	} else {
					// 		var selFieldValue = manField.getSelectedKey();
					// 	}
					// 	if (selFieldValue === "") {
					// 		count++;
					// 		manField.setValueState("Error");
					// 	} else {
					// 		manField.setValueState("None");
					// 	}
					// }
					if (count > 0) {
						var Message = "Please fill mandatory fields";
						newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
					} else {
						if (actionType === "SUBMIT") {
							that.onUpdateBasicData("SUBMIT");
						}
					}
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
					return;
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				return;
			});
		},

		//Function to validate combobox value on change of value
		onChangeComboBox: function (oEvent) {
			var selectedKey = oEvent.getSource().getSelectedKey();
			var selectedValue = oEvent.getSource().getValue();
			// if (selectedKey === "" && selectedValue !== "") {
			// 	oEvent.getSource().setValue("");
			// 	var message = "Please select a value from dropdown";
			// 	newproductintroductionui.newproductintroductionui.util.util.toastMessage(message);
			// 	return;
			// }
		},

		//Function to submit data
		onSubmitBasicData: function (oEvent) {
			this.onValidateBasicData("", "SUBMIT");
		},

		//Function to update data in database
		onUpdateBasicData: function (actionType) {
			var that = this;
			var oBasicDataCollectionModel = that.oBasicDataCollectionModel;
			// var oSpecTblDataModel = that.oSpecTblDataModel;
			// var ProdHir = oSpecTblDataModel.getProperty("/sProductHir");
			var data = oBasicDataCollectionModel.getData();
			// data.basicDataDto.newProdHierarchy = ProdHir;
			data = JSON.stringify(data);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/npiservices/npi/basicdata/update", data, true, "POST", false, false, that.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					if (actionType === "SUBMIT") {
						taskServices.onCompleteTask(this, that.oHeader);
					}
					if (actionType === "SAVE") {
						var Message = "Successfully Saved";
						newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
					}

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

		//Function to add row in table in UOM/EAN tab
		onAddUOMPerEANTableRow: function () {
			var oBasicDataCollectionModel = this.oBasicDataCollectionModel;
			var listAltUoMDto = oBasicDataCollectionModel.getProperty("/listAltUoMDto");
			if (!Array.isArray(listAltUoMDto)) {
				listAltUoMDto = [];
			}
			var oTempObj = {
				"denominator": "",
				"unit": "",
				"numerator": "",
				"ean": "",
				"eanCategory": "",
				"length": "",
				"width": "",
				"height": "",
				"lwhUnit": "",
				"volume": "",
				"volumeUnit": "",
				"grossWeight": "",
				"netWeight": "",
				"weightUnit": ""
			};
			listAltUoMDto.push(oTempObj);
			oBasicDataCollectionModel.setProperty("/listAltUoMDto", listAltUoMDto);
			oBasicDataCollectionModel.refresh();
		},

		//Function to remove row in table in UOM/EAN tab
		onRemoveUOMPerEANTableRow: function () {
			var oBasicDataCollectionModel = this.oBasicDataCollectionModel;
			var oTable = this.getView().byId("UOMEANTBLEID");
			var selRow = oTable.getSelectedIndex();
			var oTableData = oBasicDataCollectionModel.getProperty("/listAltUoMDto");
			oTableData.splice(selRow, 1);
			oBasicDataCollectionModel.refresh();
		},

		//Function to get Gtin and set it into EAN/UPC
		onAssignGtinEANUPC: function () {
			var that = this;
			var oBasicDataCollectionModel = this.oBasicDataCollectionModel;
			//var oTable = this.getView().byId("UOMEANTBLEID");
			var selRow = this.getView().byId("UOMEANTBLEID").getSelectedIndex();
			if (selRow < 0) {
				var Message = "Please select a row to assign GTIN";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				return;
			}
			var sUrl = "/npiservices/npi/basicdata/nextGtin/AMS";
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sUrl, "", true, "GET", false, false,this.oHeader);
			oModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var data = oEvent.getSource().getData();
					/*var selRow = this.getView().byId("UOMEANTBLEID").getSelectedIndex();*/
					oBasicDataCollectionModel.setProperty("/listAltUoMDto/" + selRow + "/ean", data.entity);
					oBasicDataCollectionModel.setProperty("/listAltUoMDto/" + selRow + "/eanCategory", "UC");
					oBasicDataCollectionModel.refresh();
				} else {
					var Message = "Internal Server Error";
					newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
					return;
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				var Message = "Internal Server Error";
				newproductintroductionui.newproductintroductionui.util.util.toastMessage(Message);
				return;
			});

		},

		onOpenProductHir: function () {
			var oThisController = this;
			if (!oThisController.ProductHierarchyLevel1) {
				oThisController.ProductHierarchyLevel1 = sap.ui.xmlfragment(
					"newproductintroductionui.newproductintroductionui.fragments.ProductheirarchyTree",
					oThisController);
				oThisController.getView().addDependent(oThisController.ProductHierarchyLevel1);
			}
			oThisController.ProductHierarchyLevel1.open();

		},

		onProdCancel: function () {
			var oThisController = this;
			oThisController.ProductHierarchyLevel1.close();
		},

		getProdHir: function () {
			var that = this;
			var oSrvModel = new JSONModel();
			var oSpecTblDataModel = this.oSpecTblDataModel;
			var sUrl = "/npiservices/npi/lookup/hierarchies";
			oSrvModel.loadData(sUrl, "", true, "GET", false, false, this.oHeader);
			oSrvModel.attachRequestCompleted(function (oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					oSpecTblDataModel.setProperty("/aTree/aTreeSub/hierarchies", resultData)
				}
			});
			oSrvModel.attachRequestFailed(function (oEvent) {
				oSpecTblDataModel.setProperty("/aTree/aTreeSub/hierarchies", []);
				var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
				var oResponseTxt = oEvent.getParameter("responseText");
				var oMsg = oEvent.getParameter("message");
				if (oResponseTxt) {
					sap.m.MessageBox.error(
						oResponseTxt, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					sap.m.MessageBox.error(
						oMsg, {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}
			});
		},

		onProdSubmit: function (oEvent) {
			var oThisController = this;
			var oSpecTblDataModel = oThisController.oSpecTblDataModel;
			var oBasicDataCollectionModel = this.oBasicDataCollectionModel;
			// var oMdlCommon = oThisController.getParentModel("mCommon");
			var oTreeTable = sap.ui.getCore().byId("id_product_mylan_TreeTableId");
			var sSelectedIndex = oTreeTable.getSelectedIndex();
			if (sSelectedIndex !== -1) {
				var sPath = oTreeTable.getContextByIndex(sSelectedIndex).getPath();
				// var aToken = oMdlCommon.getProperty("/aToken");
				var selectedToken = oSpecTblDataModel.getProperty(sPath + "/hierarchy");
				if ((selectedToken.length) < 16) {
					let oMsg = "Invalid Product Hierarchy";
					MessageBox.error(
						oMsg
					);
					// oThisController.showMessage(oThisController.getMessage("INVALID_PROD_HIR_LEVEL"), "W", function () {});
					// // oThisController.onAddProdCancel();
					return;
				} else if ((selectedToken.length) === 16) {
					oBasicDataCollectionModel.setProperty("/basicDataDto/newProdHierarchy", selectedToken);
					oThisController.onProdCancel();
				} else if ((selectedToken.length) === 18) {
					oBasicDataCollectionModel.setProperty("/basicDataDto/newProdHierarchy", selectedToken);
					oThisController.onProdCancel();
				}
			} else {
				let oMsg = "Please Select a Row";
				MessageBox.error(
					oMsg
				);
				// oThisController.showMessage(oThisController.getMessage("PLEASE_SELECT_THE_ROW"), "W", function () {});
				// oMdlCommon.setProperty("/oNewProject/sProductHirText", "");
			}
			// oThisController.onClearSelecttion();
		},

		getFieldsEnabled: function (aField) {
			var oThiscontroller = this;
			var oSpecTblDataModel = this.getOwnerComponent().getModel("oSpecTblDataModel");
			var sNodeId;
			for (let i = 0; i < aField.length; i++) {
				if (aField[i].id === "NodeId") {
					sNodeId = aField[i].value;
				}
			}
			oSpecTblDataModel.setProperty("/sNodeID", sNodeId);
			if (sNodeId === "M2.4.2") {
				oSpecTblDataModel.setProperty("/isBasicEditable", false);
				oSpecTblDataModel.setProperty("/isUOMEditable", true);
			} else if (sNodeId === "M2.4.1") {
				oSpecTblDataModel.setProperty("/isBasicEditable", true);
				oSpecTblDataModel.setProperty("/isUOMEditable", false);
			} else {
				oSpecTblDataModel.setProperty("/isBasicEditable", true);
				oSpecTblDataModel.setProperty("/isUOMEditable", true);
			}
			oSpecTblDataModel.refresh();
		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.basicDataCollection
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf newproductintroductionui.newproductintroductionui.view.basicDataCollection
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.basicDataCollection
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf newproductintroductionui.newproductintroductionui.view.basicDataCollection
		 */
		//	onExit: function() {
		//
		//	}

	});

});