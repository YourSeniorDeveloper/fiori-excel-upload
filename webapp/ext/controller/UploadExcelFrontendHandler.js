sap.ui.define([
    "sap/m/MessageToast",
    "./FileUploadHelper"
], function(MessageToast, FileUploadHelper) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            FileUploadHelper._callUploadDialog("Titulo do Popup", function (sFilename, sFileBase64) {
                console.log(sFilename);
                FileUploadHelper._callAction(
                    "/UploadExcel",
                    {
                        "file_name": sFilename,
                        "file_base64": btoa(oFile.target.result)
                    },
                    function (data) {
                        this.templateBaseExtension.getExtensionAPI().refreshTable();
                    }.bind(this)
                );
            }.bind(this)

            });
        }
    };
});
