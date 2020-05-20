import React, {useEffect, useState} from 'react';
import {Avatar, List, message, Typography} from "antd";
import {profileApi} from "api/post";

const User = () => {
  const [data, setData] = useState([{title: 1}, {title: 2}]);

  useEffect(() => {
    profileApi.getAll()
      .then((res) => setData(res?.data?.users))
      .catch(() => message.error('Profile api fetching error'));
    return () => setData([]);
  }, []);

  return (
    <div>
      <Typography.Title>Users</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={user => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={
                user.profile ? `${user.profile}?alt=media` :
                  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }/>}
              title={user.username}
              description={`Let's Publish user with permission with ${user.isAdmin ? 'Admin' : 'User'}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default User;