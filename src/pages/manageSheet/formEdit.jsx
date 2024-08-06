import { Button, Form, Input, InputNumber, Modal, Spin, Upload, message } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import { handleCancel, handleUpdateSheet } from "../../helpers/modelHelper";

import { useState } from "react";

import { editSheet } from "../../services/client/sheetApi";
function FormEdit({ record, fetchApi }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModalOpen] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (!values.file) {
        setLoading(false);
        return;

      }
      const regex = /^\d+\/\d+$/;
      if (!regex.test(values?.positionSurname)) {
        messageApi.open({
          type: "error",
          content: `Định dạng không hợp lệ. Vui lòng nhập lại số hàng/số cột theo định dạng "x/y"`,
        });
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
      formData.append("positionSurname", values?.positionSurname);
      formData.append("_id", record._id);
      const result = await editSheet(formData);
      if (result.code === 200) {
        fetchApi();
        handleCancel(form, setIsModalOpen);
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
    <div>
      {contextHolder}
      <div
        className="button-edit button-all"
        onClick={() => handleUpdateSheet(form, setIsModalOpen, record)}
      >
        <FaRegEdit />
        <span>Sửa thông tin sớ</span>
      </div>
      <Modal
        style={{
          top: 75,
        }}
        width={"80%"}
        title="Chỉnh Sửa Sớ"
        open={isModal}
        onCancel={() => handleCancel(form, setIsModalOpen)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            name={`edit-sheet+${record?._id}`}
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vị trí đặt thượng phụng",
                },
              ]}
              name={"positionSurname"}
              label="Vị trí đặt thượng phụng"
            >
              <Input />

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
                Sửa sớ
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
export default FormEdit;
