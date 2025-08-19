sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'br/com/rapexcelupload/fioriexcelupload/test/integration/FirstJourney',
		'br/com/rapexcelupload/fioriexcelupload/test/integration/pages/ZC_CR82_T_EXCEL_UPList',
		'br/com/rapexcelupload/fioriexcelupload/test/integration/pages/ZC_CR82_T_EXCEL_UPObjectPage',
		'br/com/rapexcelupload/fioriexcelupload/test/integration/pages/ZC_CR82_T_EXCEL_DTObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZC_CR82_T_EXCEL_UPList, ZC_CR82_T_EXCEL_UPObjectPage, ZC_CR82_T_EXCEL_DTObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('br/com/rapexcelupload/fioriexcelupload') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZC_CR82_T_EXCEL_UPList: ZC_CR82_T_EXCEL_UPList,
					onTheZC_CR82_T_EXCEL_UPObjectPage: ZC_CR82_T_EXCEL_UPObjectPage,
					onTheZC_CR82_T_EXCEL_DTObjectPage: ZC_CR82_T_EXCEL_DTObjectPage
                }
            },
            opaJourney.run
        );
    }
);