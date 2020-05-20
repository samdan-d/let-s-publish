import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, message, Modal, Table, Tag, Typography} from "antd";
import {postApi, profileApi, tagApi} from "api/post";
import Input from "antd/es/input";
import CK from "routes/extraComponents/editors/CK";
import {notificationApi} from "api/notification";

const Post = ({form}) => {
  const [modal, setModal] = useState({visible: false, confirmLoading: false, selected: {}})
  const [data, setData] = useState({posts: [], tags: [], categories: []});
  const [content, setContent] = useState('');

  useEffect(() => {
    postApi.getAll()
      .then((res) => {
        setData({
          posts: res?.data?.posts,
          tags: res?.data?.tags,
          categories: res?.data?.categories
        })
      })
      .catch(() => message.error('Profile api fetching error'));
    return () => setData({posts: [], tags: [], categories: []});
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: '_category',
      key: '_category',
      render: _category => data.categories.find(cat => cat._id === _category)?.name
    },
    {
      title: 'Tags',
      dataIndex: '_tags',
      key: '_tags',
      render: tags => (
        <span>
          {tags.map(tag => <Tag key={tag}>{data.tags.find(t => t._id === tag)?.name}</Tag>)}
        </span>
      ),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Published Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const onDelete = () => {
  };
  const onCreate = () => {
    let file = null;
    setModal({...modal, confirmLoading: true});
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        return values;
      })
      .then(values => {
        // if (Object.keys(modal?.selected)?.length > 0) {
        //   return tagApi.update(modal.selected._id, name);
        // }
        file = values?.image?.file?.originFileObj;
        return postApi.create({...values, content, image: null});
      })
      .then((res) => {
        const id = res?.data?.post?._id;
        return postApi.uploadImage(id, file);
      })
      .then(() => notificationApi.create('New Post', 'New post has published check it out.'))
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

  return (
    <div>
      <Modal
        width='80%'
        title={`${modal.selected ? "Create" : "Update"} Tag`}
        visible={modal.visible}
        onCancel={() => setModal({visible: false, confirmLoading: false, selected: {}})}
        footer={[
          <Button key="back" onClick={() => setModal({visible: false, confirmLoading: false, selected: {}})}>
            Back
          </Button>,
          <span key="operations">
            {(Object.keys(modal?.selected)?.length > 0) && <Button key="Delete" type="danger" onClick={onDelete}> Delete </Button>}
            <Button key="submit" type="primary" loading={modal.confirmLoading} onClick={onCreate}> Publish / Draft </Button>
          </span>
        ]}>
        <CK form={form} tags={data.tags} categories={data.categories} setContent={setContent} content={content}/>
      </Modal>

      <Divider orientation="left">
        <Typography.Title>Posts</Typography.Title>
        <Button
          type="primary"
          onClick={() => setModal({...modal, visible: true})}
        >Add New Post</Button></Divider>
      <Table rowKey='_id' dataSource={data.posts} columns={columns}/>
    </div>
  );
};

export default Form.create({name: 'post_form_in_modal'})(Post);