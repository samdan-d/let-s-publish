import React from "react";
import CKEditor from "react-ckeditor-component";
import {Button, Card, Form, Input, Select, Upload} from "antd";

import IntlMessages from "util/IntlMessages";

class CK extends React.Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      content: '<h2>Awesome Rich Content</h2>\n' +
        '<p>Suspendisse id sollicitudin dui. <strong>Vestibulum eu sapien pharetra,</strong> bibendum ligula id, ullamcorper ligula.</p>\n' +
        '\n' +
        '<ul>\n' +
        '        <li>ullamcorper ligula</li>\n' +
        '        <li>Duis vel neque</li>\n' +
        '</ul>\n' +
        '\n' +
        '<p><em>Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat. </em></p>\n',
    }
  }

  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  onChange(evt) {
    const newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }

  onBlur(evt) {
    console.log('onBlur event called with event info: ', evt);
  }

  afterPaste(evt) {
    console.log('afterPaste event called with event info: ', evt);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 8},
        sm: {span: 2},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 22},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    let children = ['Game', 'Movie', 'IT', 'PC', 'Tennis', 'Golf'];
    children = children.map(i => <Select.Option key={i.toString(36) + i}>{i}</Select.Option>);

    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [],
    };


    return (
      <Card className="gx-card" title='New Post'>
        <Form {...formItemLayout}>
          <Form.Item>
            <Select defaultValue="publish" style={{width: '10%', marginLeft: 20}}>
              <Select.Option value="publish">Publish</Select.Option>
              <Select.Option value="draft">Draft</Select.Option>
            </Select>

            <Select defaultValue="technology" style={{width: '15%', marginLeft: 20}}>
              <Select.Option value="technology">Technology</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="sport">Sport</Select.Option>
            </Select>

            <Select mode="tags" style={{width: '68%', marginLeft: 20}} placeholder="Tags">{children}</Select>
          </Form.Item>
          <Form.Item label={<span>Title</span>}>
            {getFieldDecorator('nickname', {
              rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
            })(<Input/>)}
          </Form.Item>

          <Form.Item>
            <CKEditor
              activeClass="p10"
              content={this.state.content}
              events={{
                'blur': this.onBlur.bind(this),
                'afterPaste': this.afterPaste.bind(this),
                'change': this.onChange.bind(this)
              }}
            />
          </Form.Item>

          <Form.Item>
            <Upload {...uploadProps}>
              <Button> <i className='icon icon-upload'/> Upload </Button>
            </Upload>
          </Form.Item>
        </Form>

        <Button type="primary" htmlType="submit"> Publish / Draft </Button>
      </Card>
    )
  }
}

export default Form.create({name: 'PostForm'})(CK);
