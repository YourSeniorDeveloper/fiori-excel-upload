sap.ui.define([
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
], function(spreadsheet, library) {
    'use strict';

    return {
        callUploadDialog: function(orig, callback) {
            if(!this.oFileUploadDialog) {
                this._createFileUploadDialog(orig, function (oFile, sFilename) {
                    callback(sFilename, btoa(oFile.target.result))
                });
            }
            this.oFileUploadDialog.open();
        },
        _createFileUploadDialog: function(orig, onFileUploadHandler) {
            this.oFileUploader = new sap.ui.unified.FileUploader("FileUploader",{
                name: "FileUploader",
                tooltip: "Importar arquivo",
                fileType: ["xlsx","XLSX"],
                width:"350px"
            });

            this.oFileUploadDialog = new sap.m.Dialog({
                title: orig,
                content: [ 
                    new sap.ui.layout.form.SimpleForm("FileUploadForm", {
                        editable: true,
                        content: [
                            this.oFileUploader
                        ]
                    })
                ],
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Importar",
                    press: function() {
                        const file = this.oFileUploader.oFileUpload.files[0];
                        this.filename = file.name;
                        if (!file) {
                            sap.m.MessageBox.show(
                                "Nenhum arquivo foi selecionado",
                                {
                                    icon: sap.m.MessageBox.Icon.ERROR,
                                    title: "Erro ao importar o arquivo"
                                }
                            );
                            return;
                        }
                        
                        const fileReader = new FileReader();
                        
                        fileReader.onload = function (oFile) {
                            this.oFileUploadDialog.close();
                            onFileUploadHandler(oFile, this.filename);
                        }.bind(this);
                        
                        fileReader.onerror = function (oError) {
                            sap.m.MessageBox.show(
                                oError.message,
                                {
                                    icon: sap.m.MessageBox.Icon.ERROR,
                                    title: "Erro ao importar o arquivo"
                                }
                            );
                        };
                        
                        fileReader.readAsArrayBuffer(file);
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: sap.ui.getCore().getLibraryResourceBundle("sap.ui.generic.app").getText("ACTION_CANCEL"),
                    press: function () {
                        this.oFileUploadDialog.close();
                    }.bind(this)
                }),
                afterClose: function (oControlEvent) {
                    this.oFileUploadDialog.destroy();
                    delete this.oFileUploadDialog;
                }.bind(this)
            });
        },
        baixarLayout: function(oEvent) {
            /* =================================================================== 
            Monta layout de colunas
            =================================================================== */
            let aCols = [];

            aCols.push({
                label: 'Coluna1',
                property: 'Coluna1',
                type: library.EdmType.String
            });
            aCols.push({
                label: 'Coluna2',
                property: 'Coluna2',
                type: library.EdmType.String
            });
            aCols.push({
                label: 'Coluna3',
                property: 'Coluna3',
                type: library.EdmType.String
            });

            aCols.push({
                label: 'Coluna4',
                property: 'Coluna3',
                type: library.EdmType.String
            });

            aCols.push({
                label: 'Coluna5',
                property: 'Coluna3',
                type: library.EdmType.String
            });
            
            /* =================================================================== 
            Prepara configurações
            =================================================================== */
            let oSettings = {
                workbook: { columns: aCols },
                dataSource: [''],
                count: 1,
                fileName: 'PlanilhaModelo.xlsx'
            };

            /* =================================================================== 
            Cria planilha 
            =================================================================== */
            let oSheet = new spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            })
        }        
    };
});
