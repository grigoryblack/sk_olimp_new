import styles from './Contacts.module.scss';
import { ConfigProvider, FormProps, notification } from 'antd';
import { Form, Modal, Checkbox } from 'antd';
import { useState } from 'react';
import Button from '../../shared/ui/Button';
import SplitTextAnimation from '../../shared/ui/SplitText';
import Mockup from '../../assets/img/mockup.png';
import ContactsBlock from '../../shared/ui/Contacts';

type FieldType = {
  name?: string;
  number?: string;
  question?: string;
  agreement?: boolean;
};

interface ErrorResponse {
  message?: string;
}

const Contacts = () => {
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.number,
          question: values.question,
        }),
      });

      if (response.ok) {
        notification.success({
          message: 'Успех',
          description: 'Ваше сообщение успешно отправлено!',
          placement: 'topRight',
        });
        form.resetFields();
        setPhone('');
      } else {
        const errorData: ErrorResponse = await response.json();
        notification.error({
          message: 'Ошибка',
          description: errorData.message || 'Ошибка при отправке сообщения.',
          placement: 'topRight',
        });
      }
    } catch (err: unknown) {
      notification.error({
        message: 'Ошибка',
        description:
          err instanceof Error
            ? err.message || 'Ошибка одной сети. Пожалуйста, попробуйте снова.'
            : 'Неизвестная ошибка. Пожалуйста, попробуйте снова.',
        placement: 'topRight',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPhone(digitsOnly.slice(0, 11));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.setFieldsValue({ agreement: true });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e: { target: { checked: boolean } }) => {
    form.setFieldsValue({ agreement: e.target.checked });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Напишите нам!'} size={2.3} />
        <p className={styles.callback__title}>
          Готовы начать свой проект? <br />
          Свяжитесь с&nbsp;нами, и&nbsp;мы&nbsp;поможем вам реализовать ваши идеи!
        </p>
        <div className={styles.container__inner}>
          <Form
            form={form}
            name="callback-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ number: phone }}
            layout="vertical"
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

            <Form.Item<FieldType>
              label="Ваш вопрос"
              name="question"
              rules={[{ required: true, message: 'Пожалуйста, напишите вопрос!' }]}
            >
              <textarea placeholder="Текст сообщения..." />
            </Form.Item>

            <Form.Item<FieldType>
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Необходимо согласие на обработку данных')),
                },
              ]}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#000000',
                  },
                }}
              >
                <Checkbox onChange={handleCheckboxChange}>
                  Я&nbsp;соглашаюсь с
                  <a
                    href="#"
                    className={styles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      showModal();
                    }}
                  >
                    обработкой персональных данных
                  </a>
                </Checkbox>
              </ConfigProvider>
            </Form.Item>

            <Form.Item>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Отправка...' : 'Получить консультацию'}
              </Button>
            </Form.Item>

            <ContactsBlock />
          </Form>

          <Modal
            title="Соглашение на обработку персональных данных"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="submit" variant="primary" onClick={handleOk}>
                Принять
              </Button>,
            ]}
          >
            <div className={styles.agreementText}>
              <p>
                Настоящим я&nbsp;даю согласие на&nbsp;обработку моих персональных данных,
                предоставленных в&nbsp;данной форме, в&nbsp;целях обратной связи и&nbsp;консультации
                по&nbsp;интересующим меня услугам.
              </p>
              <p>
                Под обработкой персональных данных понимаются следующие действия: сбор, запись,
                систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение,
                использование, передача (распространение, предоставление, доступ), обезличивание,
                блокирование, удаление, уничтожение персональных данных.
              </p>
              <p>Я&nbsp;подтверждаю, что:</p>
              <ul>
                <li>
                  Мои персональные данные будут использоваться исключительно для целей обратной
                  связи
                </li>
                <li>Мои данные не&nbsp;будут передаваться третьим лицам</li>
                <li>
                  Мои данные не&nbsp;будут использоваться для рекламных рассылок
                  и&nbsp;маркетинговых целей
                </li>
                <li>Согласие действует до&nbsp;момента достижения целей обработки</li>
                <li>Я&nbsp;имею право отозвать согласие, направив письменное заявление</li>
              </ul>
              <p>
                Обработка персональных данных осуществляется в&nbsp;соответствии с&nbsp;Федеральным
                законом от&nbsp;27.07.2006 №&nbsp;152-ФЗ &laquo;О&nbsp;персональных данных&raquo;.
              </p>
            </div>
          </Modal>

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