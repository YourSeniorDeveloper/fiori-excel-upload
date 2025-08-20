sap.ui.define([
    "sap/m/MessageToast",
    "./FileUploadHelper"
], function(MessageToast, FileUploadHelper) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");

            FileUploadHelper._callUploadDialog("Titulo do Popup", function (sFilename, sFileBase64) {
                debugger;
                FileUploadHelper._callAction(
                    this._controller.extensionAPI,
                    "/UploadExcel",
                    {
                        "file_name": sFilename,
                        "file_base64": sFileBase64
                    },
                    function (data) {
                        this.templateBaseExtension.getExtensionAPI().refreshTable();
                    }.bind(this)
                );
            }.bind(this));            

        }
    }
});
