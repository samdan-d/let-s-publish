import React, {useEffect, useState} from 'react';
import {Avatar, List, message, Typography} from "antd";
import {commentApi} from "api/notification";

const User = () => {
  const [data, setData] = useState([
    'Sorry, I can\'t hangout. My uncle\'s cousin\'s sister in law\'s best friend\'s insurance agent\'s roommate\'s pet goldfish died. Maybe next time.',
    'After one look at this planet any visitor from outer space would say “I WANT TO SEE THE MANAGER.”',
    'Men are simple things. They can survive a whole weekend with only three things: beer, boxer shorts and batteries for the remote control.',
    'Girls have an unfair advantage over men: If they can\'t get what they want by being smart, they can get it by being dumb.',
    'I like to say things twice, say things twice. It can get annoying though, annoying though.'
  ]);

  return (
    <div>
      <Typography.Title>Comments</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={comment => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={
                comment.profile ? `${comment.profile}?alt=media` :
                  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }/>}
              description={comment}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default User;