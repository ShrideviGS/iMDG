sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inbox.inbox.controller.inbox", {
		onInit: function () {
			var oInboxModel = this.getOwnerComponent().getModel("inboxModel");
			this.getView().setModel(oInboxModel, "oInboxModel");
			this.loadWFInstances2();
		},
		loadWFInstances: function () {
			var inboxModel = this.getView().getModel("oInboxModel");
			var wfType = this.getView().byId("type").getSelectedKey();
			var WFDefId = "detailed_scoping_wf";
			if (wfType === "DetailScoping") {
				WFDefId = "detailed_scoping_wf";
			}
			$.ajax({
				url: "/bpmworkflowruntime/v1/workflow-instances?%24orderby=startedAt%20desc&%24skip=0&%24top=100&%24inlinecount=none&definitionId=" +
					WFDefId + "",
				method: "GET",
				contentType: "application/json",
				async: true,
				success: function (data) {
					inboxModel.setData(data);
				},
				error: function (errMsg) {

				}
			});
		},
		loadWFInstances2: function () {
			var inboxModel = this.getView().getModel("oInboxModel");
			var wfType = this.getView().byId("type").getSelectedKey();
			var WFDefId = "detailed_scoping_wf";
			if (wfType === "DetailScoping") {
				WFDefId = "detailed_scoping_wf";
			}
			var data = [{
				"id": "b96451b0-0fa2-11eb-b6e4-eeee0a8f3c1d",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#141 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "141",
				"applicationScope": "own",
				"startedAt": "2020-10-16T11:28:33.441Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T11:34:56.004Z"
			}, {
				"id": "f8df754c-0fa0-11eb-b6e4-eeee0a8f3c1d",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#139 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "139",
				"applicationScope": "own",
				"startedAt": "2020-10-16T11:16:00.951Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T11:16:37.825Z"
			}, {
				"id": "cb04fbae-0f9f-11eb-b6e4-eeee0a8f3c1d",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#140 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "140",
				"applicationScope": "own",
				"startedAt": "2020-10-16T11:07:34.525Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T11:08:48.527Z"
			}, {
				"id": "5f08057b-0f9f-11eb-96d2-eeee0a950f35",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#139 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "139",
				"applicationScope": "own",
				"startedAt": "2020-10-16T11:04:33.351Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T11:05:09.847Z"
			}, {
				"id": "1918b57e-0f97-11eb-96d2-eeee0a950f35",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#138 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "138",
				"applicationScope": "own",
				"startedAt": "2020-10-16T10:05:20.046Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T11:01:49.822Z"
			}, {
				"id": "e5cc8aa4-0f8b-11eb-96d2-eeee0a950f35",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "43",
				"subject": "P#137 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "137",
				"applicationScope": "own",
				"startedAt": "2020-10-16T08:45:09.519Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T08:46:27.548Z"
			}, {
				"id": "2e0c6407-0f7b-11eb-96d2-eeee0a950f35",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "42",
				"subject": "P#136 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "136",
				"applicationScope": "own",
				"startedAt": "2020-10-16T06:45:29.289Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T06:46:24.906Z"
			}, {
				"id": "03fb44e6-0f6e-11eb-b6e4-eeee0a8f3c1d",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "40",
				"subject": "P#135 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "135",
				"applicationScope": "own",
				"startedAt": "2020-10-16T05:11:15.255Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-16T05:13:47.444Z"
			}, {
				"id": "1e0e09a5-0ee8-11eb-82b0-eeee0a89db58",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "40",
				"subject": "P#134 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "134",
				"applicationScope": "own",
				"startedAt": "2020-10-15T13:12:46.437Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-15T13:14:19.687Z"
			}, {
				"id": "9e584791-0ee4-11eb-82b0-eeee0a89db58",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "39",
				"subject": "P#133 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "133",
				"applicationScope": "own",
				"startedAt": "2020-10-15T12:47:43.685Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-15T12:49:27.310Z"
			}, {
				"id": "080d51f9-0e08-11eb-8c24-eeee0a930b7d",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#132 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "132",
				"applicationScope": "own",
				"startedAt": "2020-10-14T10:28:42.255Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-14T10:29:47.016Z"
			}, {
				"id": "2daea3e5-0e04-11eb-82b0-eeee0a89db58",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#131 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "131",
				"applicationScope": "own",
				"startedAt": "2020-10-14T10:01:07.401Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-14T10:02:13.299Z"
			}, {
				"id": "f316bce5-0dfe-11eb-82b0-eeee0a89db58",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#130 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "130",
				"applicationScope": "own",
				"startedAt": "2020-10-14T09:23:41.614Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-14T09:25:57.497Z"
			}, {
				"id": "af9753ac-0df9-11eb-a550-eeee0a878aa2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#129 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "129",
				"applicationScope": "own",
				"startedAt": "2020-10-14T08:46:00.888Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-14T08:47:46.304Z"
			}, {
				"id": "1c08827d-0dea-11eb-a851-eeee0a842ba2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#128 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "128",
				"applicationScope": "own",
				"startedAt": "2020-10-14T06:54:30.876Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-14T06:58:16.904Z"
			}, {
				"id": "87624fe4-0d4a-11eb-912a-eeee0a871fdd",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#127 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "127",
				"applicationScope": "own",
				"startedAt": "2020-10-13T11:52:11.504Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-13T11:56:20.066Z"
			}, {
				"id": "11c2cb6e-0d2d-11eb-9acc-eeee0a90baeb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#126 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "126",
				"applicationScope": "own",
				"startedAt": "2020-10-13T08:21:18.760Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "be9cc800-0d2c-11eb-9acc-eeee0a90baeb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#125 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "125",
				"applicationScope": "own",
				"startedAt": "2020-10-13T08:18:59.260Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "3f4aa703-0d25-11eb-912a-eeee0a871fdd",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#122 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "122",
				"applicationScope": "own",
				"startedAt": "2020-10-13T07:25:19.174Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "08796a01-0d0e-11eb-9acc-eeee0a90baeb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#121 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "121",
				"applicationScope": "own",
				"startedAt": "2020-10-13T04:39:08.781Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "fb545882-0c83-11eb-9acc-eeee0a90baeb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#120 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "120",
				"applicationScope": "own",
				"startedAt": "2020-10-12T12:10:56.179Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-12T12:12:34.522Z"
			}, {
				"id": "8026a396-0c68-11eb-9acc-eeee0a90baeb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#113 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "113",
				"applicationScope": "own",
				"startedAt": "2020-10-12T08:54:13.108Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "015bd3b5-0c64-11eb-912a-eeee0a871fdd",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#112 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "112",
				"applicationScope": "own",
				"startedAt": "2020-10-12T08:22:02.399Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "18cd44b6-0c4e-11eb-912a-eeee0a871fdd",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "38",
				"subject": "P#109 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "109",
				"applicationScope": "own",
				"startedAt": "2020-10-12T05:45:12.802Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-12T05:47:11.944Z"
			}, {
				"id": "725e97fc-0a2d-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#108 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "108",
				"applicationScope": "own",
				"startedAt": "2020-10-09T12:46:27.354Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T12:47:59.203Z"
			}, {
				"id": "d18dc552-0a2c-11eb-8150-eeee0a830471",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#107 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "107",
				"applicationScope": "own",
				"startedAt": "2020-10-09T12:41:57.550Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "9e731101-0a29-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#106 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "106",
				"applicationScope": "own",
				"startedAt": "2020-10-09T12:19:03.321Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "a73415bf-0a28-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#105 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "105",
				"applicationScope": "own",
				"startedAt": "2020-10-09T12:12:08.511Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "e19a7ff8-0a12-11eb-8150-eeee0a830471",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#104 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "104",
				"applicationScope": "own",
				"startedAt": "2020-10-09T09:36:17.562Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T09:37:38.623Z"
			}, {
				"id": "68fc5bfc-0a07-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#102 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "102",
				"applicationScope": "own",
				"startedAt": "2020-10-09T08:14:10.735Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T08:15:15.350Z"
			}, {
				"id": "1a3478fc-0a06-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#101 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "101",
				"applicationScope": "own",
				"startedAt": "2020-10-09T08:04:49.066Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T08:06:23.991Z"
			}, {
				"id": "006e2bf7-0a00-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#100 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "100",
				"applicationScope": "own",
				"startedAt": "2020-10-09T07:21:08.843Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T07:25:14.290Z"
			}, {
				"id": "e358e94e-09fe-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#99 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "99",
				"applicationScope": "own",
				"startedAt": "2020-10-09T07:13:10.553Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "b36a66d9-09fe-11eb-aa1d-eeee0a99f756",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#98 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "98",
				"applicationScope": "own",
				"startedAt": "2020-10-09T07:11:50.137Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-09T07:12:55.366Z"
			}, {
				"id": "8f3cf1b9-09f7-11eb-8150-eeee0a830471",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#97 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "97",
				"applicationScope": "own",
				"startedAt": "2020-10-09T06:20:42.964Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "b220c6c6-088f-11eb-8918-eeee0a84189b",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#96 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "96",
				"applicationScope": "own",
				"startedAt": "2020-10-07T11:24:42.677Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T11:26:47.919Z"
			}, {
				"id": "d6f5ab6b-088c-11eb-9289-eeee0a99bdde",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#95 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "95",
				"applicationScope": "own",
				"startedAt": "2020-10-07T11:04:15.980Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "57ca24c6-0885-11eb-9289-eeee0a99bdde",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#94 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "94",
				"applicationScope": "own",
				"startedAt": "2020-10-07T10:10:36.147Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T10:12:52.192Z"
			}, {
				"id": "a892d02c-087d-11eb-9289-eeee0a99bdde",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#93 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "93",
				"applicationScope": "own",
				"startedAt": "2020-10-07T09:15:35.706Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T09:20:55.474Z"
			}, {
				"id": "874fdec3-087b-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#92 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "92",
				"applicationScope": "own",
				"startedAt": "2020-10-07T09:00:20.909Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T09:06:04.987Z"
			}, {
				"id": "6678ea41-0878-11eb-8cc1-eeee0a98a4cf",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#91 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "91",
				"applicationScope": "own",
				"startedAt": "2020-10-07T08:37:57.323Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T08:43:59.324Z"
			}, {
				"id": "45d820e0-0875-11eb-8cc1-eeee0a98a4cf",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#90 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "90",
				"applicationScope": "own",
				"startedAt": "2020-10-07T08:15:34.092Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T08:17:06.130Z"
			}, {
				"id": "e0bccc46-0874-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#89 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "89",
				"applicationScope": "own",
				"startedAt": "2020-10-07T08:12:44.463Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "ba1ecff8-0871-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#88 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "88",
				"applicationScope": "own",
				"startedAt": "2020-10-07T07:50:11.184Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T07:51:43.659Z"
			}, {
				"id": "52d8c925-0865-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#87 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "87",
				"applicationScope": "own",
				"startedAt": "2020-10-07T06:21:23.959Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "f6850815-0863-11eb-8cc1-eeee0a98a4cf",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#86 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "86",
				"applicationScope": "own",
				"startedAt": "2020-10-07T06:11:39.563Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T06:13:20.863Z"
			}, {
				"id": "2255c184-0860-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#85 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "85",
				"applicationScope": "own",
				"startedAt": "2020-10-07T05:44:15.086Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T05:45:23.293Z"
			}, {
				"id": "5f6822b3-0853-11eb-8cc1-eeee0a98a4cf",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#84 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "84",
				"applicationScope": "own",
				"startedAt": "2020-10-07T04:12:54.090Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-07T04:14:34.807Z"
			}, {
				"id": "7bf78e00-07d2-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#83 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "83",
				"applicationScope": "own",
				"startedAt": "2020-10-06T12:50:16.928Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "a07eab7d-07d0-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#82 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "82",
				"applicationScope": "own",
				"startedAt": "2020-10-06T12:36:59.218Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T12:38:31.432Z"
			}, {
				"id": "a7ac3b94-07cb-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#81 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "81",
				"applicationScope": "own",
				"startedAt": "2020-10-06T12:01:23.777Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T12:02:57.038Z"
			}, {
				"id": "4719b4cd-07c9-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#80 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "80",
				"applicationScope": "own",
				"startedAt": "2020-10-06T11:44:22.762Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "16fe53e4-07c5-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#79 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "79",
				"applicationScope": "own",
				"startedAt": "2020-10-06T11:14:24.065Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "f8be3692-07c1-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#78 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "78",
				"applicationScope": "own",
				"startedAt": "2020-10-06T10:52:04.823Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "a4b2d9d1-07bd-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#77 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "77",
				"applicationScope": "own",
				"startedAt": "2020-10-06T10:21:05.833Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "81e0d690-07ab-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#76 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "76",
				"applicationScope": "own",
				"startedAt": "2020-10-06T08:11:16.473Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T08:35:49.346Z"
			}, {
				"id": "ec8708b8-07a6-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#75 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "75",
				"applicationScope": "own",
				"startedAt": "2020-10-06T07:38:27.917Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "e1e35e43-07a3-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#74 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "74",
				"applicationScope": "own",
				"startedAt": "2020-10-06T07:16:41.577Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T07:20:10.072Z"
			}, {
				"id": "5e9bdee1-079f-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#73 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "73",
				"applicationScope": "own",
				"startedAt": "2020-10-06T06:44:23.340Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T06:45:43.190Z"
			}, {
				"id": "39eb2163-079e-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#72 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "72",
				"applicationScope": "own",
				"startedAt": "2020-10-06T06:36:12.287Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "4ce95f74-079b-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "37",
				"subject": "P#71 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "71",
				"applicationScope": "own",
				"startedAt": "2020-10-06T06:15:15.662Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T06:16:20.570Z"
			}, {
				"id": "bfaf5a1e-079a-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "36",
				"subject": "P#70 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "70",
				"applicationScope": "own",
				"startedAt": "2020-10-06T06:11:18.723Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T06:12:38.862Z"
			}, {
				"id": "58599b29-0799-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "35",
				"subject": "P#69 - Detailed Scoping Process",
				"status": "COMPLETED",
				"businessKey": "69",
				"applicationScope": "own",
				"startedAt": "2020-10-06T06:01:15.859Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": "2020-10-06T06:03:57.014Z"
			}, {
				"id": "940968c5-0798-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "33",
				"subject": "P#68 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "68",
				"applicationScope": "own",
				"startedAt": "2020-10-06T05:55:46.500Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "0878f43a-0798-11eb-98bd-eeee0a8ac49f",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "33",
				"subject": "P#67 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "67",
				"applicationScope": "own",
				"startedAt": "2020-10-06T05:51:52.350Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "885ca629-070b-11eb-bd0f-eeee0a91f755",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#66 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "66",
				"applicationScope": "own",
				"startedAt": "2020-10-05T13:06:07.874Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "fb68569a-0702-11eb-baa1-eeee0a85faab",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#65 - Detailed Scoping Process",
				"status": "ERRONEOUS",
				"businessKey": "65",
				"applicationScope": "own",
				"startedAt": "2020-10-05T12:04:55.418Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "6a41ed09-06fd-11eb-bd0f-eeee0a91f755",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#64 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "64",
				"applicationScope": "own",
				"startedAt": "2020-10-05T11:25:04.413Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "363a12dc-06fd-11eb-bd0f-eeee0a91f755",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#63 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "63",
				"applicationScope": "own",
				"startedAt": "2020-10-05T11:23:37.120Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "29e74986-03cb-11eb-8c19-eeee0a8bfecb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#62 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "62",
				"applicationScope": "own",
				"startedAt": "2020-10-01T09:47:48.120Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "559062ee-03bd-11eb-8c19-eeee0a8bfecb",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#60 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "60",
				"applicationScope": "own",
				"startedAt": "2020-10-01T08:08:48.416Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "4614fc51-03bb-11eb-a84a-eeee0a817695",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "31",
				"subject": "P#59 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "59",
				"applicationScope": "own",
				"startedAt": "2020-10-01T07:54:03.448Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "352fb3b1-ff26-11ea-a209-eeee0a8972b0",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#${context.projectId} - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "${context.projectId}",
				"applicationScope": "own",
				"startedAt": "2020-09-25T11:56:55.438Z",
				"startedBy": "Laxmi.Baragukar@incture.com",
				"completedAt": null
			}, {
				"id": "30499a45-fd67-11ea-aa77-eeee0a876097",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#${context.projectId} - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "${context.projectId}",
				"applicationScope": "own",
				"startedAt": "2020-09-23T06:37:02.181Z",
				"startedBy": "Laxmi.Baragukar@incture.com",
				"completedAt": null
			}, {
				"id": "ab797f41-fc9e-11ea-b921-eeee0a9427ec",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#56 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "56",
				"applicationScope": "own",
				"startedAt": "2020-09-22T06:41:40.012Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "45f4a9a5-fbd1-11ea-a7fb-eeee0a8fa3e7",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#55 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "55",
				"applicationScope": "own",
				"startedAt": "2020-09-21T06:11:22.862Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "9822d47a-fbd0-11ea-a7fb-eeee0a8fa3e7",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#53 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "53",
				"applicationScope": "own",
				"startedAt": "2020-09-21T06:06:31.241Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "675be86d-fbcf-11ea-9e92-eeee0a9e5a06",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#52 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "52",
				"applicationScope": "own",
				"startedAt": "2020-09-21T05:57:59.910Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "124328e9-fbcd-11ea-9e92-eeee0a9e5a06",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#51 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "51",
				"applicationScope": "own",
				"startedAt": "2020-09-21T05:41:18.148Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "77add14c-f9b8-11ea-a7fb-eeee0a8fa3e7",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#50 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "50",
				"applicationScope": "own",
				"startedAt": "2020-09-18T14:08:46.540Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "fbef0758-f8d5-11ea-8daa-eeee0a84c6e7",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#49 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "49",
				"applicationScope": "own",
				"startedAt": "2020-09-17T11:07:32.669Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "6dca28ee-f8ac-11ea-9652-eeee0a9415e2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#48 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "48",
				"applicationScope": "own",
				"startedAt": "2020-09-17T06:10:04.825Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "92d14415-daf2-11ea-b19b-eeee0a88b9b2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#45 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "45",
				"applicationScope": "own",
				"startedAt": "2020-08-10T10:16:36.835Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "6a371e09-dac9-11ea-b19b-eeee0a88b9b2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#44 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "44",
				"applicationScope": "own",
				"startedAt": "2020-08-10T05:21:59.350Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "e23c8d29-d86f-11ea-b19b-eeee0a88b9b2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#41 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "41",
				"applicationScope": "own",
				"startedAt": "2020-08-07T05:36:03.681Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "191cc447-d86a-11ea-b19b-eeee0a88b9b2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#40 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "40",
				"applicationScope": "own",
				"startedAt": "2020-08-07T04:54:38.767Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "9d13ba07-d7cb-11ea-9dc9-eeee0a8db123",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#39 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "39",
				"applicationScope": "own",
				"startedAt": "2020-08-06T10:00:10.187Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "7e5ffe56-d7c9-11ea-9dc9-eeee0a8db123",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#37 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "37",
				"applicationScope": "own",
				"startedAt": "2020-08-06T09:44:59.684Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "0125881d-d7c4-11ea-9dc9-eeee0a8db123",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#0 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "0",
				"applicationScope": "own",
				"startedAt": "2020-08-06T09:05:42.102Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "e95c3ba9-d7c0-11ea-b19b-eeee0a88b9b2",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "30",
				"subject": "P#0 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "0",
				"applicationScope": "own",
				"startedAt": "2020-08-06T08:43:33.705Z",
				"startedBy": "sb-clone-4df698d3-d8ee-4f55-b036-4b030b84bebf!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "5bd6cbd2-d31c-11ea-bf62-eeee0a989a15",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "21",
				"subject": "P#${context.projectId} - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "${context.projectId}",
				"applicationScope": "own",
				"startedAt": "2020-07-31T10:55:34.157Z",
				"startedBy": "Laxmi.Baragukar@incture.com",
				"completedAt": null
			}, {
				"id": "b53e5bb8-d318-11ea-bf62-eeee0a989a15",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "20",
				"subject": "P#${context.projectId} - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "${context.projectId}",
				"applicationScope": "own",
				"startedAt": "2020-07-31T10:29:26.165Z",
				"startedBy": "Laxmi.Baragukar@incture.com",
				"completedAt": null
			}, {
				"id": "592a31ec-d316-11ea-bf62-eeee0a989a15",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "20",
				"subject": "P#0 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "0",
				"applicationScope": "own",
				"startedAt": "2020-07-31T10:12:32.690Z",
				"startedBy": "sb-clone-e30d475f-150b-4b29-8ee8-19755e7216f5!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "e0707a41-d30b-11ea-bf62-eeee0a989a15",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "20",
				"subject": "P#0 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "0",
				"applicationScope": "own",
				"startedAt": "2020-07-31T08:57:35.179Z",
				"startedBy": "sb-clone-e30d475f-150b-4b29-8ee8-19755e7216f5!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "fd8cfb6f-d30a-11ea-bf62-eeee0a989a15",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "20",
				"subject": "P#0 - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "0",
				"applicationScope": "own",
				"startedAt": "2020-07-31T08:51:14.523Z",
				"startedBy": "sb-clone-e30d475f-150b-4b29-8ee8-19755e7216f5!b19391|workflow!b10150",
				"completedAt": null
			}, {
				"id": "7eb494ae-d2ec-11ea-a94a-eeee0a808253",
				"definitionId": "detailed_scoping_wf",
				"definitionVersion": "18",
				"subject": "P#${context.projectId} - Detailed Scoping Process",
				"status": "RUNNING",
				"businessKey": "${context.projectId}",
				"applicationScope": "own",
				"startedAt": "2020-07-31T05:12:56.810Z",
				"startedBy": "tanveer.singh@incture.com",
				"completedAt": null
			}];
			inboxModel.setData(data);
		}
	});
});