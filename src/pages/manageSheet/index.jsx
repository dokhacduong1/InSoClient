import { useEffect, useState } from "react";
import MemoizedFilterDropdownCustom from "../../components/filterDropdownCustom";
import { removeAccents } from "../../helpers/removeAccents";
import { deleteSheet, getSheet } from "../../services/client/sheetApi";
import { ConfigProvider, Input, Space, Table, message } from "antd";
import FormEdit from "./formEdit";
import { FaRegTrashAlt } from "react-icons/fa";

function ManageSheet() {
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { Search } = Input;
  const fetchApi = async () => {
    const result = await getSheet(keyword);
    if (result.code === 200) {
      setRecords(result.data);
      return;
    }
    setRecords([]);
  };
  useEffect(() => {
    fetchApi();
  }, [keyword]);
  const columns = [
    {
      title: "Tên sớ",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        return (
          removeAccents(record.title)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record.title)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <FormEdit
            record={record}
            fetchApi={() => {
              fetchApi(keyword);
            }}
          />
          <div
            onClick={() => {
              handleDelete(record?._id);
            }}
            className="button-remove button-all"
          >
            <FaRegTrashAlt />
            <span>Xóa sớ</span>
          </div>
        </Space>
      ),
    },
  ];
  const handleSearch = (value) => {
    setKeyword(value);
  };
  const handleDelete = async (id) => {
    try {
      const result = await deleteSheet(id);
      if (result.code === 200) {
        fetchApi(keyword);
        messageApi.open({
          type: "success",
          content: result.success,
        });
        return;
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
      <div className="containet">
        <div className="title-heading mb-3">
          <h1>Quản Lý Sớ</h1>
        </div>
        <div className="manage-sheet">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeBorderColor: "#d9d9d9",
                  hoverBorderColor: "#d9d9d9",
                },
              },
              token: {
                borderRadius: 9999,
                colorPrimary: "#d9d9d9",
                colorIcon: "#000",
                colorIconHover: "#000",
              },
            }}
          >
            <div className="search-info mb-3">
              <Search onSearch={handleSearch} size="large" />
            </div>
          </ConfigProvider>
          <div className="table-sheet">
            {records.length > 0 && (
              <Table rowKey={"_id"} columns={columns} dataSource={records} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageSheet;
