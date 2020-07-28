/*global QUnit*/

sap.ui.define([
	"newproductintroductionui/newproductintroductionui/controller/scoping.controller"
], function (Controller) {
	"use strict";

	QUnit.module("scoping Controller");

	QUnit.test("I should test the scoping controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});