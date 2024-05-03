import { message } from "antd";
export function messageSuccess(content) {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "success",
    content: content,
  });
}

export function messageError(content) {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "error",
    content: content,
  });
}