import { Button, Form, Input, Modal, Upload, message } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import {
  handleCancel,

  handleUpdateSheet,
} from "../../helpers/modelHelper";

import { useState } from "react";

import {  editSheet } from "../../services/client/sheetApi";
function FormEdit({ record, fetchApi }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isModal, setIsModalOpen] = useState(false);
  const onFinish = async (values) => {
    try {
      if (!values.file) {
        return;
      }
      console.log(values);
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
    } catch (error) {
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
            name={"file"}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn file",
              },
            ]}
            label="Chọn file sớ"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
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
              Sửa sớ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default FormEdit;
