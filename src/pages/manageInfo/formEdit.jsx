import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { handleCancel, handleUpdateDataInfo } from "../../helpers/modelHelper";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { editInfo } from "../../services/client/infoApi";
function FormEdit({ record, fetchApi }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isModal, setIsModalOpen] = useState(false);
  const onFinish = async (values) => {
    try {
      const cleanedValues = JSON.parse(
        JSON.stringify(values, (key, value) => {
          if (value === null || value === undefined) {
            return undefined;
          }
          return value;
        })
      );
      cleanedValues._id = record._id;
      const result = await editInfo(cleanedValues);
      if (result.code === 200) {
        fetchApi();
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
      handleCancel(form, setIsModalOpen);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <div
        className="button-edit button-all"
        onClick={() => handleUpdateDataInfo(form, setIsModalOpen, record)}
      >
        <FaRegEdit />
        <span>Sửa gia chủ</span>
      </div>
      <Modal
        style={{
          top: 75,
        }}
        width={"80%"}
        title="Chỉnh Công Việc"
        open={isModal}
        onCancel={() => handleCancel(form, setIsModalOpen)}
        footer={null}
      >
        <Form
          form={form}
          name={`edit-info-${record?._id}`}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Tên gia chủ"
                name="homeowners"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên gia chủ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên gia chủ..." />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Năm sinh gia chủ"
                name="age"
                rules={[
                  {
                    validator: (_, value) =>
                      value > 0
                        ? Promise.resolve()
                        : Promise.reject(new Error("Năm sinh lớn hơn 0")),
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Form.Item label="Tên vợ gia chủ" name="wife_homeowners">
                <Input placeholder="Nhập tên vợ gia chủ..." />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item label="Năm sinh vợ gia chủ" name="wife_age">
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Địa chỉ gia đình"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ gia đình",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="mb-2">
            <h4>Thông tin con cái gia chủ</h4>
          </div>
          <Form.List name="info_children">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => {
                  const { key, name } = field;
                  return (
                    <div key={key} className="row align-items-center gx-2">
                      <div className="col-4">
                        <Form.Item
                          name={[name, "name"]}
                          label={`Tên con ${index + 1}`}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Tên/Tuổi con gia chủ",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập tên..." />
                        </Form.Item>
                      </div>
                      <div className="col-4">
                        <Form.Item
                          label={`Năm sinh con ${index + 1}`}
                          name={[name, "year"]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              validator: (_, value) =>
                                value > 0
                                  ? Promise.resolve()
                                  : Promise.reject(
                                      new Error("Năm sinh lớn hơn 0")
                                    ),
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            placeholder="Nhập năm sinh..."
                          />
                        </Form.Item>
                      </div>

                      <div className="col-4">
                        {fields.length > 0 ? (
                          <FaRegTrashAlt
                            style={{
                              cursor: "pointer",
                              color: "red",
                            }}
                            className="dynamic-delete-button"
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                <Form.Item className="">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm con
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button className="button-submit" type="primary" htmlType="submit">
              Sửa gia chủ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default FormEdit;
