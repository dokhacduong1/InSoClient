import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createSheet } from "../../services/client/sheetApi";

function AddSheet() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      if (!values.file) {
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
    } catch (error) {
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
              <Button className="button-submit" type="primary" htmlType="submit">
                Thêm sớ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddSheet;