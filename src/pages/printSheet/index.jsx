import { Button, ConfigProvider, DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";

import { printSheet } from "../../services/client/sheetApi";
import { removeAccents } from "../../helpers/removeAccents";
import locale from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import { fetchApi } from "./js/fetchApi";
dayjs.locale("vi");
function PrintSheet() {
  const [recordInfo, setRecordInfo] = useState([]);
  const [recordSheet, setRecordSheet] = useState([]);
  const [linkDownload, setLinkDownload] = useState("");
  const [nameFile, setNameFile] = useState("");
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    fetchApi(setRecordInfo, setRecordSheet);
  }, []);

  const handleFinish = async (values) => {
    values.date = values.date.toISOString();

    const result = await printSheet(values);
    if (result.code === 200) {
      const binaryString = window.atob(result.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes.buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const checkNameSheet = recordSheet.find(
        (item) => item.value === values.sheetId
      );

      setNameFile(
        `${checkNameSheet.label} ngày tạo: ${dayjs(new Date()).format(
          "DD-MM-YYYY"
        )}.xlsx`
      );
      setLinkDownload(url);
    }
  };

  return (
    <div className="mt-4">
      <div className="container">
        <div className="title-heading mb-3">
          <h1>In Sớ</h1>
        </div>
        <div className="print-sheet">
          <div className="print-form">
            <ConfigProvider locale={locale}>
              <Form name="print-form" onFinish={handleFinish}>
                <Form.Item
                  label="Chọn danh sách gia chủ"
                  name="listIdInfo"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn gia chủ",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    options={recordInfo}
                    showSearch
                    placeholder="Chọn gia chủ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      removeAccents(option.label)
                        .toLowerCase()
                        .includes(removeAccents(input).toLowerCase()) ||
                      removeAccents(option.value)
                        .toLowerCase()
                        .includes(removeAccents(input).toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Chọn sớ cúng"
                  name="sheetId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn sớ",
                    },
                  ]}
                >
                  <Select
                    options={recordSheet}
                    showSearch
                    placeholder="Chọn sớ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      removeAccents(option.label)
                        .toLowerCase()
                        .includes(removeAccents(input).toLowerCase()) ||
                      removeAccents(option.value)
                        .toLowerCase()
                        .includes(removeAccents(input).toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Chọn ngày cúng"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="button-submit"
                    type="primary"
                    htmlType="submit"
                  >
                    Bắt Đầu Tạo File Excel
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
          {linkDownload && nameFile && (
            <div className="print-dowload">
              <a
                href={linkDownload}
                download={nameFile}
                className="button-dowload"
              >
                Tải xuống Excel để in
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PrintSheet;
