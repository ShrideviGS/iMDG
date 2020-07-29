{
	"contents": {
		"dc1e2759-2bdc-4927-b625-6cbccf75754d": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "detailed_scoping_wf",
			"subject": "P#${context.projectId} - Detailed Scoping Process",
			"businessKey": "${context.projectId}",
			"name": "Detailed Scoping Process",
			"documentation": "Detailed Scoping Workflow",
			"lastIds": "9aa3562f-e64e-40c9-a842-1f290104fd6d",
			"events": {
				"e42d7bd7-7a4d-4ec0-b731-444f6f76b2bd": {
					"name": "Start"
				},
				"735bec55-c2f0-4548-88ac-34f7331f8b5c": {
					"name": "End"
				}
			},
			"activities": {
				"68d52db7-f4be-4746-9e95-453080f61ba4": {
					"name": "Detailed Scoping Task"
				},
				"ddbe5be9-86f2-4f85-b21c-ffa370983a94": {
					"name": "Orchestrator"
				},
				"307ab52d-2a6a-4098-a8e1-dc9c9b758cc6": {
					"name": "Generate Material Codes"
				}
			},
			"sequenceFlows": {
				"57bb670b-75ed-4600-94d1-ad273e9434f5": {
					"name": "SequenceFlow2"
				},
				"c8474451-c2c5-4c84-b58f-a750b2841b3b": {
					"name": "SequenceFlow3"
				},
				"e09c37f7-373a-43a3-b0f0-ddfeb5b58608": {
					"name": "SequenceFlow8"
				},
				"8edfa4a9-9db9-402a-9b41-01ddb7e27876": {
					"name": "SequenceFlow9"
				}
			},
			"diagrams": {
				"f3e00e50-5d9c-4a8e-9f00-4276f5f11d98": {}
			}
		},
		"e42d7bd7-7a4d-4ec0-b731-444f6f76b2bd": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "Start"
		},
		"735bec55-c2f0-4548-88ac-34f7331f8b5c": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "End"
		},
		"68d52db7-f4be-4746-9e95-453080f61ba4": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "P#${context.projectId}/R#${context.role} - Detailed Scoping",
			"description": "",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://newproductintroductionuinewproductintroductionui/newproductintroductionui.newproductintroductionui.controller.detailScopingView",
			"recipientUsers": "P1099205",
			"recipientGroups": "NPI_DetailedScoping",
			"customAttributes": [{
				"id": "ProjectId",
				"label": "Project Id",
				"type": "string",
				"value": "${context.projectId}"
			}, {
				"id": "MaterialId",
				"label": "Material Id",
				"type": "string",
				"value": "<>"
			}, {
				"id": "ProjectDescription",
				"label": "Project Description",
				"type": "string",
				"value": "${context.projectDescription}"
			}, {
				"id": "MaterialDescription",
				"label": "Material Description",
				"type": "string",
				"value": "<>"
			}, {
				"id": "MaterialType",
				"label": "Material Type",
				"type": "string",
				"value": "<>"
			}, {
				"id": "NodeId",
				"label": "Node Id",
				"type": "string",
				"value": "DS1.1"
			}, {
				"id": "Key",
				"label": "Key",
				"type": "string",
				"value": "${context.role}"
			}, {
				"id": "SubKey",
				"label": "Sub-Key",
				"type": "string",
				"value": "${context.phase}"
			}, {
				"id": "Country",
				"label": "Country",
				"type": "string",
				"value": "${context.leadCountry}"
			}],
			"id": "usertask1",
			"name": "Detailed Scoping Task",
			"documentation": "Detailed Scoping Task",
			"dueDateRef": "92bf4f03-5400-4cde-9f27-0d6f9f8d2c8e"
		},
		"ddbe5be9-86f2-4f85-b21c-ffa370983a94": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "mylanservices",
			"path": "workflow/scoping/orchestrate/${context.projectId}/${context.rowNumber}",
			"httpMethod": "GET",
			"id": "servicetask1",
			"name": "Orchestrator"
		},
		"307ab52d-2a6a-4098-a8e1-dc9c9b758cc6": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "mylanservices",
			"path": "workflow/scoping/generateMaterialNumbers/${context.projectId}/${context.rowNumber}",
			"httpMethod": "PUT",
			"id": "servicetask2",
			"name": "Generate Material Codes"
		},
		"57bb670b-75ed-4600-94d1-ad273e9434f5": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow2",
			"name": "SequenceFlow2",
			"sourceRef": "68d52db7-f4be-4746-9e95-453080f61ba4",
			"targetRef": "307ab52d-2a6a-4098-a8e1-dc9c9b758cc6"
		},
		"c8474451-c2c5-4c84-b58f-a750b2841b3b": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow3",
			"name": "SequenceFlow3",
			"sourceRef": "ddbe5be9-86f2-4f85-b21c-ffa370983a94",
			"targetRef": "735bec55-c2f0-4548-88ac-34f7331f8b5c"
		},
		"e09c37f7-373a-43a3-b0f0-ddfeb5b58608": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow8",
			"name": "SequenceFlow8",
			"sourceRef": "e42d7bd7-7a4d-4ec0-b731-444f6f76b2bd",
			"targetRef": "68d52db7-f4be-4746-9e95-453080f61ba4"
		},
		"8edfa4a9-9db9-402a-9b41-01ddb7e27876": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow9",
			"name": "SequenceFlow9",
			"sourceRef": "307ab52d-2a6a-4098-a8e1-dc9c9b758cc6",
			"targetRef": "ddbe5be9-86f2-4f85-b21c-ffa370983a94"
		},
		"f3e00e50-5d9c-4a8e-9f00-4276f5f11d98": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"202ecfd4-b265-430f-b38c-81f2f8aac4bb": {},
				"e035485b-9bcd-42f6-bf24-2eb91ba1ea17": {},
				"ba027edb-1791-47a5-8850-cd6b31c29912": {},
				"3bed44f6-737b-4e1b-bb32-a7417785513c": {},
				"732d4797-9dfd-48c5-b258-9c34467ff561": {},
				"53d033cd-e123-4b92-bea6-482f261179c1": {},
				"48444d81-4e0e-413a-83d1-12a86068d310": {},
				"b7e8e9b8-c023-46a9-948a-c65d2f09cab0": {},
				"ba4251b6-8831-4ddf-bcef-f68ec9ab4226": {}
			}
		},
		"202ecfd4-b265-430f-b38c-81f2f8aac4bb": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 47,
			"y": 102,
			"width": 32,
			"height": 32,
			"object": "e42d7bd7-7a4d-4ec0-b731-444f6f76b2bd"
		},
		"e035485b-9bcd-42f6-bf24-2eb91ba1ea17": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 670,
			"y": 100,
			"width": 35,
			"height": 35,
			"object": "735bec55-c2f0-4548-88ac-34f7331f8b5c"
		},
		"ba027edb-1791-47a5-8850-cd6b31c29912": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 167.24147286593848,
			"y": 86.75,
			"width": 100,
			"height": 60,
			"object": "68d52db7-f4be-4746-9e95-453080f61ba4"
		},
		"3bed44f6-737b-4e1b-bb32-a7417785513c": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "217.24147286593848,116.84375 392.30610464945386,116.84375",
			"sourceSymbol": "ba027edb-1791-47a5-8850-cd6b31c29912",
			"targetSymbol": "b7e8e9b8-c023-46a9-948a-c65d2f09cab0",
			"object": "57bb670b-75ed-4600-94d1-ad273e9434f5"
		},
		"732d4797-9dfd-48c5-b258-9c34467ff561": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 521.3707364329692,
			"y": 87.125,
			"width": 100,
			"height": 60,
			"object": "ddbe5be9-86f2-4f85-b21c-ffa370983a94"
		},
		"53d033cd-e123-4b92-bea6-482f261179c1": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "571.3707364329692,117.3125 687.5,117.3125",
			"sourceSymbol": "732d4797-9dfd-48c5-b258-9c34467ff561",
			"targetSymbol": "e035485b-9bcd-42f6-bf24-2eb91ba1ea17",
			"object": "c8474451-c2c5-4c84-b58f-a750b2841b3b"
		},
		"48444d81-4e0e-413a-83d1-12a86068d310": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "63,117.375 167.74147286593848,117.375",
			"sourceSymbol": "202ecfd4-b265-430f-b38c-81f2f8aac4bb",
			"targetSymbol": "ba027edb-1791-47a5-8850-cd6b31c29912",
			"object": "e09c37f7-373a-43a3-b0f0-ddfeb5b58608"
		},
		"b7e8e9b8-c023-46a9-948a-c65d2f09cab0": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 342.30610464945386,
			"y": 86.9375,
			"width": 100,
			"height": 60,
			"object": "307ab52d-2a6a-4098-a8e1-dc9c9b758cc6"
		},
		"ba4251b6-8831-4ddf-bcef-f68ec9ab4226": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "392.30610464945386,117.03125 571.3707364329692,117.03125",
			"sourceSymbol": "b7e8e9b8-c023-46a9-948a-c65d2f09cab0",
			"targetSymbol": "732d4797-9dfd-48c5-b258-9c34467ff561",
			"object": "8edfa4a9-9db9-402a-9b41-01ddb7e27876"
		},
		"9aa3562f-e64e-40c9-a842-1f290104fd6d": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"timereventdefinition": 1,
			"sequenceflow": 9,
			"startevent": 1,
			"endevent": 1,
			"usertask": 1,
			"servicetask": 2,
			"exclusivegateway": 1
		},
		"92bf4f03-5400-4cde-9f27-0d6f9f8d2c8e": {
			"classDefinition": "com.sap.bpm.wfs.TimerEventDefinition",
			"timeDuration": "PT10M",
			"id": "timereventdefinition1"
		}
	}
}