import React, {useEffect} from "react";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

const SignIn = (props) => {

  const dispatch = useDispatch();
  const {loader, alertMessage, showMessage, authUser} = useSelector(({auth}) => auth);
  const history = useHistory();

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
      if (!err) {
        dispatch(showAuthLoader());
        dispatch(userSignIn(values));
      }
    });
  };


  const {getFieldDecorator} = props.form;

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg" />
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/logo.png")}/>
            </div>
          </div>
          <div className="gx-app-login-content" style={{"margin-top": "8%"}}>
            <Form onSubmit={handleSubmit} className="gx-signin-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('email', {
                  initialValue: "demo@example.com",
                  rules: [{
                    required: true, type: 'email', message: 'The input is not valid E-mail!',
                  }],
                })(
                  <Input placeholder="Email"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: "demo#123",
                  rules: [{required: true, message: 'Please input your Password!'}],
                })(
                  <Input type="password" placeholder="Password"/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link>
              </FormItem>
            </Form>
          </div>

          {loader ?
            <div className="gx-loader-view">
              <CircularProgress/>
            </div> : null}
          {showMessage ?
            message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

const WrappedNormalLoginForm = Form.create()(SignIn);

export default WrappedNormalLoginForm;
