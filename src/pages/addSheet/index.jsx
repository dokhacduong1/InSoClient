import { Form, Input, Upload, Button, message, Spin, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createSheet } from "../../services/client/sheetApi";
import { useState } from "react";

function AddSheet() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (!values.file) {
        setLoading(false);
        return;
      }
      const file = values.file[0].originFileObj;
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      if (!isExcel) {
        message.error("Thí chủ không thể upload file khác ngoài excel!");
        return;
      }
      const formData = new FormData();
      formData.append("file", values.file[0].originFileObj);
      formData.append("title", values.title);
      formData.append("positionAddress", values.positionAddress);
      formData.append("positionUserInfo", values.positionUserInfo);
      const result = await createSheet(formData);
      if (result.code === 200) {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: result.success,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Có lỗi xảy ra",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra",
      });
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      {contextHolder}
      <div className="container">
        <div className="title-heading mb-3">
          <h1>Thêm Sớ</h1>
        </div>
        <div className="add-sheet">
          <Spin spinning={loading}>
            <Form
              form={form}
              name={`add-info`}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sớ",
                  },
                ]}
                name={"title"}
                label="Tên sớ"
              >
                <Input placeholder="Nhập tên sớ" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập vị trí thông tin người dùng",
                  },
                ]}
                name={"positionUserInfo"}
                label="Vị trí đặt thông tin người dùng"
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập vị trí địa chỉ",
                  },
                ]}
                name={"positionAddress"}
                label="Vị trí đặt địa chỉ"
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                name={"file"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn file",
                  },
                ]}
                label="Chọn file sớ"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  beforeUpload={(file) => {
                    const isExcel =
                      file.type ===
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                      file.type === "application/vnd.ms-excel";
                    if (!isExcel) {
                      message.error(
                        "Thí chủ không thể upload file khác ngoài excel!"
                      );
                    }
                    return isExcel;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  className="button-submit"
                  type="primary"
                  htmlType="submit"
                >
                  Thêm sớ
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default AddSheet;
