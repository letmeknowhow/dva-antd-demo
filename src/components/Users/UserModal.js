import React from 'react';
import { Modal, Form, Input } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;
class UserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  showModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ visible: true });
  }

  hideModalHandler = () => {
    this.setState({ visible: false });
  }

  okHandler = () => {
    const { onOK } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOK(values);
        this.hideModalHandler();
      }
    });
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)

              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);
