sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'br.com.rapexcelupload.fioriexcelupload',
            componentId: 'ZC_CR82_T_EXCEL_UPObjectPage',
            contextPath: '/ZC_CR82_T_EXCEL_UP'
        },
        CustomPageDefinitions
    );
});