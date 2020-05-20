import React, {useEffect, useState} from 'react';
import {Table} from "antd";

const Post = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    return () => setData([]);
  });

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Published Date',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
    },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns}/>;
    </div>
  );
};

export default Post;