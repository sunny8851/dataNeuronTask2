import axios from "axios";

const getItems = ({ setData }) => {
  axios
    .get("https://dataneuronbackend-z1ot.onrender.com/item/getallitems")
    .then((res) => setData(res.data))
    .catch((e) => {
      console.log(e);
    });
};
const updateItem = ({ id, name, description }) => {
  axios
    .post("https://dataneuronbackend-z1ot.onrender.com/item/update", {
      id: id,
      name: name,
      description: description,
    })
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
    });
};
const addItem = ({ onSuccess, name, description }) => {
  axios
    .post("https://dataneuronbackend-z1ot.onrender.com/item/add", {
      name: name,
      description: description,
    })
    .then((res) => onSuccess(res))
    .catch((e) => {
      console.log(e);
    });
};

export { getItems, updateItem, addItem };
