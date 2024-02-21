import React, { useEffect, useState } from "react";
import { addItem, getItems } from "../api/getItemList";
import { Table } from "antd";
import GlobalModal from "./Modal";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "45%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "45%",
    },

    {
      title: "Edit",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <a
          onClick={() => {
            setIsModalOpen(true);
            setInputValue({
              name: record.name,
              description: record.description,
            });

            setModalData(record);
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState({ name: "", description: "" });
  const [newInputValue, setNewInputValue] = useState({
    name: "",
    description: "",
  });
  const onSuccess = (e) => {
    setData((pre) => [...pre, e.data]);
    console.log(e);
  };
  //call api to send data
  const sendItem = (item) => {
    if (newInputValue.name !== "" && newInputValue.description !== "") {
      addItem({
        onSuccess,
        name: newInputValue.name,
        description: newInputValue.description,
      });
    }
  };
  //initially fetch the data
  useEffect(() => {
    getItems({ setData });
  }, []);
  //when update modal is opend/closed
  useEffect(() => {
    if (!isModalOpen && modalData && inputValue) {
      const modifiedData = data.map((item, index) => {
        if (item._id === modalData._id) {
          //calling update appi
          const updatedItem = {
            ...item,
            name: inputValue.name,
            description: inputValue.description,
          };
          return updatedItem;
        }
        return item;
      });
      setData(modifiedData);
    }
  }, [isModalOpen]);
  return (
    data && (
      <div className="mx-5">
        <div className="w-full mx-auto my-2 flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-700 px-3 rounded"
          >
            Add
          </button>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
        {/* for add modal */}
        <GlobalModal
          type="add"
          setInputValue={setNewInputValue}
          inputValue={newInputValue}
          // modalData={modalData}
          onClick={sendItem}
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
        {/* for update modal */}
        <GlobalModal
          type="update"
          setInputValue={setInputValue}
          inputValue={inputValue}
          modalData={modalData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    )
  );
};
export default Home;
