sap.ui.define([
    "sap/m/MessageToast",
    "./FileUploadHelper"
], function(MessageToast, FileUploadHelper) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            FileUploadHelper._callUploadDialog("/ImportarPlanilha", "Lista de Materiais");
        }
    };
});
