import { ConfigProvider, Input, Space, Table, message } from "antd";
import { useEffect, useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { deleteInfo, getInfo } from "../../services/client/infoApi";
import "./manageInfo.scss";
import MemoizedFilterDropdownCustom from "../../components/filterDropdownCustom";
import { removeAccents } from "../../helpers/removeAccents";
import FormEdit from "./formEdit";
function ManageInfo() {
  const currentYear = new Date().getFullYear();
  const [messageApi, contextHolder] = message.useMessage();
  const [keyword, setKeyword] = useState("");
  const { Search } = Input;
  const [records, setRecords] = useState([]);
  const fetchApi = async () => {
    const result = await getInfo(keyword);
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
      title: "Tên gia chủ",
      dataIndex: "homeowners",
      key: "homeowners",
      render: (text) => <a>{text}</a>,
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        return (
          removeAccents(record.homeowners)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record.homeowners)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Tuổi gia chủ",
      dataIndex: "age",
      key: "age",
      render: (_, record) => <a>{currentYear - record?.age + 1}</a>,
      sorter: (a, b) => {
        return currentYear - a.age - (currentYear - b.age);
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        return (
          removeAccents(record.address)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record.address)
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
            <span>Xóa gia chủ</span>
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
      const result = await deleteInfo(id);
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
      <div className="container">
        <div className="title-heading mb-3">
          <h1>Quản Lý Thông Tin Gia Chủ</h1>
        </div>
        <div className="manage-info">
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
          <div className="table-info">
  
              <Table rowKey={"_id"} columns={columns} dataSource={records} />
          
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageInfo;
