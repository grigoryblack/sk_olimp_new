import styles from './Contacts.module.scss';
import type { FormProps } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';
import Button from '../../shared/ui/Button';
import SplitTextAnimation from '../../shared/ui/SplitText';
import Mockup from '../../assets/img/mockup.png';

type FieldType = {
  name?: string;
  number?: string;
};

const Contacts = () => {
  const [phone, setPhone] = useState('');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPhone(digitsOnly.slice(0, 11));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Напишите нам!'} size={2.6} />

        <div className={styles.container__inner}>
          <Form
            name="callback-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ number: phone }}
            className={styles.form}
          >
            <Form.Item<FieldType>
              label="Ваше имя"
              name="name"
              rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
            >
              <input placeholder="Иван" />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="number"
              rules={[
                { required: true, message: 'Пожалуйста, введите номер!' },
                {
                  pattern: /^\d{11}$/,
                  message: 'Телефон должен содержать ровно 11 цифр',
                },
              ]}
            >
              <input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="89121234562"
                maxLength={11}
              />
            </Form.Item>

            <Form.Item>
              <Button variant="primary" onClick={() => onFinish}>
                Получить консультацию
              </Button>
            </Form.Item>

            <Contacts />
          </Form>

          <img className={styles.mockup} src={Mockup} alt="mockup" />
        </div>
      </div>

      <div className={styles.footer}>
        Created by <a href="https://druzhenkovgrigory.onrender.com/">@mask.bright</a>
      </div>
    </div>
  );
};

export default Contacts;
