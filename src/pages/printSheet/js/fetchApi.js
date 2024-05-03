import { getInfo } from "../../../services/client/infoApi";
import { getSheet } from "../../../services/client/sheetApi";

export const fetchApi = async (setRecordInfo,setRecordSheet) => {
    try {
      const [resultInfo, resultSheet] = await Promise.all([
        getInfo(),
        getSheet(),
      ]);
      if (resultInfo.code === 200) {
        const convertDataInfo = resultInfo.data.map((item) => {
          return {
            value: item._id,
            label: item.homeowners + " - " + item.address,
          };
        });
        setRecordInfo(convertDataInfo);
      }
      if (resultSheet.code === 200) {
        const convertDataSheet = resultSheet.data.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        });
        setRecordSheet(convertDataSheet);
      }
    } catch (error) {
      console.error(error);
    }
  };