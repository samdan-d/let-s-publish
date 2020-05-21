import React from "react";
import Widget from "components/Widget";
import Background from 'assets/images/post/ibm.jpg';

import {Typography, Comment, Avatar, Form, Button, List, Input} from 'antd';
import {commentApi} from "api/notification";

const {TextArea} = Input;

const CommentList = ({comments}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Biography extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    commentApi.create('5ec3c1526835e601376e9954', this.state.value)
      .then(() => this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'demo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: Date.now(),
          },
          ...this.state.comments,
        ],
      }))
      .catch(e => {
        console.log(e);
        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              author: 'demo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: <p>{this.state.value}</p>,
              datetime: Date.now(),
            },
            ...this.state.comments,
          ],
        });
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const {comments, submitting, value} = this.state;

    return (
      <Widget styleName="gx-card-profile">
        <div className="ant-card-head" style={{
          backgroundImage: `url(${Background})`,
          height: 200,
          display: "flex",
          alignItems: "center"
        }}>
          <Typography.Title style={{
            color: '#fefefe'
          }}>IBM Introduces Its Best Entertainment Tablets Yet</Typography.Title>
        </div>
        <h3>Awesome Rich Content</h3>
        <p>Suspendisse id sollicitudin dui. Vestibulum eu sapien pharetra, bibendum ligula id, ullamcorper ligula.

          ullamcorper ligula
          Duis vel neque
          Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat.
        </p>
        <h3 className="gx-font-weight-light">Donec dignissim gravida sem, ut cursus dolor hendrerit et. Morbi
          volutpat.</h3>
        <p>Augue mauris dignissim arcu, ut venenatis metus ante eu orci. Donec non maximus neque,
          ut finibus ex. Quisque semper ornare magna, sed ullamcorper risus luctus quis. Etiam tristique
          dui vitae diam rutrum sodales. Mauris feugiat lectus felis, nec ullamcorper risus elementum at.
          Aliquam erat volutpat. Nullam et est eget metus gravida tincidunt.
          Phasellus sed odio eu lacus venenatis.
        </p>
        <p>Suspendisse vel bibendum ex. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Sed a felis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie ultricies urna non
          volutpat.
          Nam fermentum cursus elit, et tempus metus scelerisque imperdiet. Sed tincidunt molestie justo,
          a vulputate velit sagittis at. Pellentesque consequat leo tortor.Augue mauris dignissim arcu, ut venenatis metus ante eu orci. Donec non maximus neque,
          ut finibus ex. Quisque semper ornare magna, sed ullamcorper risus luctus quis. Etiam tristique
          dui vitae diam rutrum sodales. Mauris feugiat lectus felis, nec ullamcorper risus elementum at.
          Aliquam erat volutpat. Nullam et est eget metus gravida tincidunt.
          Phasellus sed odio eu lacus venenatis.
          Nam fermentum cursus elit, et tempus metus scelerisque imperdiet. Sed tincidunt molestie justo,
          a vulputate velit sagittis at. Pellentesque consequat leo tortor.Augue mauris dignissim arcu, ut venenatis metus ante eu orci. Donec non maximus neque,
          ut finibus ex. Quisque semper ornare magna, sed ullamcorper risus luctus quis. Etiam tristique
          dui vitae diam rutrum sodales. Mauris feugiat lectus felis, nec ullamcorper risus elementum at.
          Aliquam erat volutpat. Nullam et est eget metus gravida tincidunt.
          Phasellus sed odio eu lacus venenatis.
        </p>
        <p>Suspendisse vel bibendum ex. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Sed a felis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie ultricies urna non
          volutpat.
          Nam fermentum cursus elit, et tempus metus scelerisque imperdiet. Sed tincidunt molestie justo,
          a vulputate velit sagittis at. Pellentesque consequat leo tortor.
        </p>
        <div>
          {comments.length > 0 && <CommentList comments={comments}/>}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="demo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
      </Widget>
    );
  }
}

export default Biography;
