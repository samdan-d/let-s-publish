import React, {useEffect} from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Link, useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  userSignUp
} from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

const SignUp = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {loader, alertMessage, showMessage, authUser} = useSelector(({auth}) => auth);


  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      history.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log("values", values);
      const {password, repeat_password} = values;
      if (!err && password === repeat_password) {
        dispatch(showAuthLoader());
        dispatch(userSignUp(values));
      }
    });
  };

  const {getFieldDecorator} = props.form;

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signUp"/></h1>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/logo.png")}/>
            </div>
          </div>

          <div className="gx-app-login-content">
            <Form onSubmit={handleSubmit} className="gx-signup-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: 'Please input your username!'}],
                })(
                  <Input placeholder="Username"/>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    rules: [{required: true, message: 'Please input your Password!'}],
                  }],
                })(
                  <Input type="password" placeholder="password"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('repeat_password', {
                  rules: [{required: true, message: 'Please input your Password!'}],
                })(
                  <Input type="password" placeholder="Password"/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp"/>
                </Button>
                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                id="app.userAuth.signIn"/></Link>
              </FormItem>
            </Form>
          </div>
          {loader &&
          <div className="gx-loader-view">
            <CircularProgress/>
          </div>
          }
          {showMessage &&
          message.error(alertMessage)}
        </div>
      </div>
    </div>
  );
};


const WrappedSignUpForm = Form.create()(SignUp);


export default WrappedSignUpForm;
