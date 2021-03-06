import React, {useEffect, useState} from 'react';
import {List, Typography, Divider, Button, Modal, Form, message} from "antd";
import Input from "antd/es/input";
import {tagApi} from "api/post";

const Tags = ({form}) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({visible: false, confirmLoading: false, selected: {}})
  const {getFieldDecorator} = form;

  useEffect(() => {
    tagApi.getAll()
      .then(res => setData(res.data.tags))
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
          return tagApi.update(modal.selected._id, name);
        }
        return tagApi.create(name);
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
    tagApi.delete(modal?.selected?._id)
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
        title={`${modal.selected ? "Create" : "Update"} Tag`}
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
              rules: [{required: true, message: 'Please input the name of tag!'}],
            })(<Input/>)}
          </Form.Item>
        </Form>
      </Modal>
      <Divider orientation="left">
        <Typography.Title>Tags</Typography.Title>
        <Button
          type="primary"
          onClick={() => setModal({...modal, visible: true})}
        >Add New Tag</Button></Divider>
      <List
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={() => setModal({...modal, selected: item, visible: true})}
            key={item._id}>
            <Typography.Text mark>[Tag]</Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Form.create({name: 'form_in_modal'})(Tags);