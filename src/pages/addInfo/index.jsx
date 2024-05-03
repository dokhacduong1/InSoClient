import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { createInfo } from "../../services/client/infoApi";
import { useState } from "react";

function AddInfo() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const cleanedValues = JSON.parse(
        JSON.stringify(values, (key, value) => {
          if (value === null || value === undefined) {
            return undefined;
          }
          return value;
        })
      );

      const result = await createInfo(cleanedValues);
      if (result.code === 200) {
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
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra",
      });
    }
  };

  return (
    <div className="mt-4">
      {contextHolder}
      <div className="container">
        <div className="title-heading mb-3">
          <h1>Thêm Thông Tin Gia Chủ</h1>
        </div>
        <div className="add-info ">
          <Spin spinning={loading}>
            <Form name={`add-info`} onFinish={onFinish} layout="vertical">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <Form.Item label="Tên vợ gia chủ" name="wife_homeowners">
                    <Input placeholder="Nhập tên vợ gia chủ..." />
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                <Button
                  className="button-submit"
                  type="primary"
                  htmlType="submit"
                >
                  Thêm gia chủ
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default AddInfo;
