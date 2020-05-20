import React from "react";
import CKEditor from "react-ckeditor-component";
import {Button, Card, Form, Input, Select, Upload} from "antd";

class CK extends React.Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.props.setContent('<h2>Awesome Rich Content</h2>\n' +
      '<p>Suspendisse id sollicitudin dui. <strong>Vestibulum eu sapien pharetra,</strong> bibendum ligula id, ullamcorper ligula.</p>\n' +
      '\n' +
      '<ul>\n' +
      '        <li>ullamcorper ligula</li>\n' +
      '        <li>Duis vel neque</li>\n' +
      '</ul>\n' +
      '\n' +
      '<p><em>Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat. </em></p>\n');
  }

  updateContent(newContent) {
    this.props.setContent(newContent);
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
    const {categories, tags, content} = this.props;
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

    const options = (items) => items.map(i => <Select.Option key={i._id}>{i.name}</Select.Option>);

    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [],
    };

    return (
      <Card className="gx-card" title='New Post'>
        <Form {...formItemLayout}>
          <Form.Item label='State'>
            {getFieldDecorator('state', {
              rules: [{required: true, message: 'Please select post state!'}], initialValue: 'publish'
            })(
              <Select style={{width: '15%', marginLeft: 20}}>
                <Select.Option value="publish">Publish</Select.Option>
                <Select.Option value="draft">Draft</Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Category'>
            {getFieldDecorator('_category', {
              rules: [{required: true, message: 'Please select post category!'}],
            })(
              <Select style={{width: '15%', marginLeft: 20}}>{options(categories)}</Select>
            )}
          </Form.Item>

          <Form.Item label='Tags'>
            {getFieldDecorator('_tags')(
              <Select mode="tags" style={{width: '80%', marginLeft: 20}} placeholder="Tags">{options(tags)}</Select>
            )}
          </Form.Item>

          <Form.Item label={<span>Title</span>}>
            {getFieldDecorator('title', {
              rules: [{required: true, message: 'Please input your title!', whitespace: true}],
            })(<Input/>)}
          </Form.Item>

          <Form.Item>
            <CKEditor
              activeClass="p10"
              content={content}
              events={{
                'blur': this.onBlur.bind(this),
                'afterPaste': this.afterPaste.bind(this),
                'change': this.onChange.bind(this)
              }}
            />
          </Form.Item>

          <Form.Item label="Image">
            {getFieldDecorator('image', {
              rules: [{required: true}],
            })(<Upload {...uploadProps}>
              <Button> <i className='icon icon-upload'/> Upload </Button>
            </Upload>)}

          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default CK;
