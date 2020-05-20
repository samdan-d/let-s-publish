import React, {useEffect, useState} from 'react';
import {List, Typography, Divider, Button, Modal, Form, message} from "antd";
import Input from "antd/es/input";
import {categoryApi} from "api/post";

const Categories = ({form}) => {
  const [modal, setModal] = useState({visible: false, confirmLoading: false, selected: {}})
  const {getFieldDecorator} = form;
  const [data, setData] = useState([]);

  useEffect(() => {
    categoryApi.getAll()
      .then(res => setData(res.data.categories))
      .catch(() => message.error('Post api fetching error'));
    return () => setData([]);
  }, [modal]);

  const onCreate = () => {
    setModal({...modal, confirmLoading: true});
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        return values.name;
      })
      .then(name => {
        if (Object.keys(modal?.selected)?.length > 0) {
          return categoryApi.update(modal.selected._id, name);
        }
        return categoryApi.create(name);
      })
      .then(() => setModal({selected: {}, visible: false, confirmLoading: false}))
      .catch(info => {
        if (info?.response?.data?.error?._message) {
          message.error(info?.response?.data?.error?._message);
        } else if (info?.response?.data?.error) {
          message.error(info?.response?.data?.error);
        }
        setModal({...modal, confirmLoading: false});
        console.log('Validate Failed:', info);
      });
  };

  const onDelete = () => {
    setModal({...modal, confirmLoading: true});
    categoryApi.delete(modal?.selected?._id)
      .then(() => setModal({selected: {}, visible: false, confirmLoading: false}))
      .catch(info => {
        if (info?.response?.data?.error?._message) {
          message.error(info?.response?.data?.error?._message);
        } else if (info?.response?.data?.error) {
          message.error(info?.response?.data?.error);
        }
        setModal({...modal, confirmLoading: false});
        console.log('Validate Failed:', info);
      });
  }

  return (
    <div>
      <Modal
        title={`${modal.selected ? "Create" : "Update"} Category`}
        visible={modal.visible}
        onCancel={() => setModal({visible: false, confirmLoading: false, selected: {}})}
        footer={[
          <Button key="back" onClick={() => setModal({visible: false, confirmLoading: false, selected: {}})}>
            Back
          </Button>,
          <span key="operations">
            {(Object.keys(modal?.selected)?.length > 0) && <Button key="Delete" type="danger" onClick={onDelete}> Delete </Button>}
            <Button key="submit" type="primary" loading={modal.confirmLoading} onClick={onCreate}> Submit </Button>
          </span>
        ]}>
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              initialValue: modal.selected.name,
              rules: [{required: true, message: 'Please input the name of category!'}],
            })(<Input/>)}
          </Form.Item>
        </Form>
      </Modal>
      <Divider orientation="left">
        <Typography.Title>Categories</Typography.Title>
        <Button
          type="primary"
          onClick={() => setModal({...modal, visible: true})}
        >Add New Category</Button></Divider>
      <List
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={() => setModal({...modal, selected: item, visible: true})}
            key={item._id}>
            <Typography.Text mark>[Category]</Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Form.create({name: 'form_in_modal'})(Categories);