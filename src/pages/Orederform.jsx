import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearItems } from '../redux/slices/cartSlice';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as Yup from 'yup';
import axios from 'axios';
import PaymentButton from '../components/YooKassaWidget';
import YooKassaWidget from '../components/YooKassaWidget';

const OrderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deliveryMethod, setDeliveryMethod] = useState('');
  const handleRadioChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const location = useLocation();
  const { itemsInCart, totalPrice } = location.state || {};

  const initialValues = {
    имя: '',
    фамилия: '',
    отчество: '',
    номерТелефона: '',
    email: '',
    // регион: '',
    населенныйПункт: '',
    улица: '',
    дом: '',
    корпус: '',
    квартира: '',
    индекс: '',
    комментарий: '',
    способДоставки: '',
  };

  const validationSchema = Yup.object().shape({
    имя: Yup.string().required('Введите имя'),
    фамилия: Yup.string().required('Введите фамилию'),
    номерТелефона: Yup.string().required('Введите номер телефона'),
    // email: Yup.string().email('Некорректный формат email').required('Введите email'),
    // регион: Yup.string().required('Выберите регион'),
    населенныйПункт: Yup.string().required('Введите населенный пункт'),
    улица: Yup.string().required('Введите улицу'),
    дом: Yup.string().required('Введите номер дома'),
    квартира: Yup.string().required('Введите номер квартиры'),
    способДоставки: Yup.string().required('Выберите способ доставки'),
  });



  const handleSubmit = async (values, { resetForm }) => {
    try {
      const orderNumber = Date.now().toString();

      const itemsText = itemsInCart
        .map(
          (item) => `
        Название: ${item.title}
        Вес: ${item.weight}
        Объём: ${item.size}
        Количество: ${item.count}
        Сумма: ${item.priceCoutn}
      `,
        )
        .join('\n');

      // Отправить данные формы в телеграм
      const response = await axios.post(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}`,

        {
          text: `
            Заказ номер: ${orderNumber}
            Имя: ${values.имя}
            Фамилия: ${values.фамилия}
            Отчество: ${values.отчество}
            Номер телефона: ${values.номерТелефона}
            Email: ${values.email}
            Населенный пункт: ${values.населенныйПункт}
            Улица: ${values.улица}
            Дом: ${values.дом}
            Квартира: ${values.квартира}
            Корпус: ${values.корпус}
            Индекс: ${values.индекс}
            Способ доставки: ${values.способДоставки}
            Комментарий: ${values.комментарий}
            ${itemsText}
            Общая стоимость: ${totalPrice} 

          `,
        },
      );
      dispatch(clearItems());

      // Сбросить форму после успешной отправки
      resetForm();
      console.log(response.data);
      navigate(`/order-success/${orderNumber}`);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <>
      <div className="container">
        <h1 className="order-form__title-1">Добавьте Ваши данные для доставки</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {(formik) => (
            <Form className="order-form">
              <div className="container">
                <h2 className="order-form__title">ВАШ ЗАКАЗ:</h2>
                <div className="cart-order">
                  {itemsInCart.map((item, index) => (
                    <div key={index} className="cart-order__order">
                      <p className="">{item.title}</p>
                      {item.size && <div>{item.size} мл.</div>}
                      {item.weight && <div>{item.weight} гр.</div>}
                      <p>Кол-во: {item.count}</p>
                      <p className="cart-order__sumName">
                        Сумма: <span className="cart-order__sum">{item.priceCoutn} ₽</span>
                      </p>
                    </div>
                  ))}
                  <p className="cart-order__name">Общая стоимость: {totalPrice} ₽</p>
                </div>
                <h2 className="order-form__title">ДАННЫЕ ПОЛУЧАТЕЛЯ</h2>
                <div className="order-form__information">
                  <div className="order-form__wrapper">
                    <label htmlFor="имя">
                      Имя<span>*</span>:
                    </label>
                    <Field
                      className="order-form__input"
                      type="text"
                      id="имя"
                      name="имя"
                      // placeholder="Введите имя"
                    />
                    <ErrorMessage
                      name="имя"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="фамилия">
                      Фамилия<span>*</span>:
                    </label>
                    <Field className="order-form__input" type="text" id="фамилия" name="фамилия" />
                    <ErrorMessage
                      name="фамилия"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="отчество">Отчество:</label>
                    <Field
                      className="order-form__input"
                      type="text"
                      id="отчество"
                      name="отчество"
                    />
                    {/* <ErrorMessage name="отчество" component="div" className="error-message" /> */}
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="номерТелефона">
                      Номер телефона<span>*</span>:
                    </label>
                    <Field name="номерТелефона">
                      {({ form, field }) => (
                        <PhoneInput
                          country={'ru'}
                          value={field.value}
                          onChange={(value) => form.setFieldValue(field.name, value)}
                          inputClass="order-form__phone"
                          disableDropdown={true}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="номерТелефона"
                      component="div"
                      className="order-form__error-message-phone"
                    />
                  </div>

                  <div className="order-form__wrapper">
                    <label htmlFor="email">Email:</label>
                    <Field className="order-form__input" type="email" id="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                </div>
                <h2 className="order-form__title">АДРЕС</h2>
                <div className="order-form__adress">
                  {/* <div className="order-form__wrapper">
                                <label htmlFor="регион">
                                  Регион<span>*</span>:
                                </label>
                                <Field className="order-form__input" type="text" id="регион" name="регион">
                                </Field>
                                <ErrorMessage
                                  name="регион"
                                  component="div"
                                  className="order-form__error-message"
                                />
                              </div> */}
                  <div className="order-form__wrapper">
                    <label htmlFor="населенныйПункт">
                      Населенный пункт<span>*</span>:
                    </label>
                    <Field
                      className="order-form__input"
                      type="text"
                      id="населенныйПункт"
                      name="населенныйПункт"
                    />
                    <ErrorMessage
                      name="населенныйПункт"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="улица">
                      Улица<span>*</span>:
                    </label>
                    <Field className="order-form__input" type="text" id="улица" name="улица" />
                    <ErrorMessage
                      name="улица"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="дом">
                      Дом<span>*</span>:
                    </label>
                    <Field className="order-form__input" type="text" id="дом" name="дом" />
                    <ErrorMessage
                      name="дом"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="корпус">Корпус:</label>
                    <Field className="order-form__input" type="text" id="корпус" name="корпус" />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="квартира">
                      Квартира<span>*</span>:
                    </label>
                    <Field
                      className="order-form__input"
                      type="text"
                      id="квартира"
                      name="квартира"
                    />
                    <ErrorMessage
                      name="квартира"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="индекс">Индекс:</label>
                    <Field className="order-form__input" type="text" id="индекс" name="индекс" />
                    <ErrorMessage
                      name="индекс"
                      component="div"
                      className="order-form__error-message"
                    />
                  </div>
                  <div className="order-form__wrapper">
                    <label htmlFor="комментарий">Комментарий:</label>
                    <Field
                      className="order-form__textarea"
                      as="textarea"
                      rows={3}
                      cols={70}
                      id="комментарий"
                      name="комментарий"
                    />
                  </div>
                </div>
                <h2 className="order-form__title">ДОСТАВКА</h2>
                <div className="order-form__delivery">
                  <div className="order-form__wrapper">
                    <label className="delivery-label" htmlFor="способДоставки">
                      Способ доставки<span>*</span>:
                    </label>
                    <div className="order-form__radiobutton">
                      <label htmlFor="поГороду" className="radio__wrapper">
                        <Field
                          className="real-radio"
                          type="radio"
                          id="поГороду"
                          name="способДоставки"
                          value="поГороду"
                          disabled={
                            formik.values.населенныйПункт.trim().toLowerCase() !== 'кемерово'
                          }
                          checked={formik.values.способДоставки === 'поГороду'}
                          onChange={(event) => {
                            formik.setFieldValue('способДоставки', event.target.value);
                            handleRadioChange(event);
                          }}
                        />
                        <span className="custom-radio"></span>
                        <p className="radio-name">Бесплатная доствка ( по г.Кемерово )</p>
                      </label>

                      <label htmlFor="Cdek" className="radio__wrapper">
                        <Field
                          className="real-radio"
                          type="radio"
                          id="Cdek"
                          name="способДоставки"
                          value="Cdek"
                          disabled={
                            formik.values.населенныйПункт.trim().toLowerCase() === 'кемерово'
                          }
                          checked={formik.values.способДоставки === 'Cdek'}
                          onChange={(event) => {
                            formik.setFieldValue('способДоставки', event.target.value);
                            handleRadioChange(event);
                          }}
                        />
                        <span className="custom-radio"></span>
                        <p className="radio-name">Транспортная компания «СДЭК»</p>
                      </label>

                      <label htmlFor="почтаРоссии" className="radio__wrapper">
                        <Field
                          className="real-radio"
                          type="radio"
                          id="почтаРоссии"
                          name="способДоставки"
                          value="почтаРоссии"
                          disabled={
                            formik.values.населенныйПункт.trim().toLowerCase() === 'кемерово'
                          }
                          checked={formik.values.способДоставки === 'почтаРоссии'}
                          onChange={(event) => {
                            formik.setFieldValue('способДоставки', event.target.value);
                            handleRadioChange(event);
                          }}
                        />
                        <span className="custom-radio"></span>
                        Почта России
                      </label>

                      <label htmlFor="самовывоз" className="radio__wrapper">
                        <Field
                          className="real-radio"
                          type="radio"
                          id="самовывоз"
                          name="способДоставки"
                          value="самовывоз"
                          disabled={
                            formik.values.населенныйПункт.trim().toLowerCase() !== 'кемерово'
                          }
                          checked={formik.values.способДоставки === 'самовывоз'}
                          onChange={(event) => {
                            formik.setFieldValue('способДоставки', event.target.value);
                            handleRadioChange(event);
                          }}
                        />
                        <span className="custom-radio"></span>
                        <p className="radio-name">Самовывоз ( д. Сухово ул. Ботаническая 12312 )</p>
                      </label>
                    </div>
                    <ErrorMessage
                      name="способДоставки"
                      component="div"
                      className="order-form__error-message delivery-error"
                    />
                  </div>
                </div>
                <h2 className="order-form__title">ОПЛАТА</h2>

                {/* <div className="order-form__payment">
                  {deliveryMethod === 'поГороду' || deliveryMethod === 'самовывоз' ? (
                    <>
                      <button
                        className="button button--order"
                        type="submit"
                        disabled={formik.isSubmitting}>
                        Оплата при получении ({totalPrice} ₽)
                      </button>
                      <button
                        className="button button--order"
                        type="submit"
                        disabled={formik.isSubmitting}
                        // onClick={() => navigate('/payment', { totalPrice })}
                      >
                        Оплатить онлайн ({totalPrice} ₽)
                      </button>
                    </>
                  ) : (
                    <button
                      className="button button--order"
                      type="submit"
                      disabled={formik.isSubmitting}
                      // onClick={() => navigate('/payment', { totalPrice })}
                    >
                      Оплатить онлайн ({totalPrice} ₽)
                    </button>
                  )}
                </div> */}
              </div>
            </Form>
          )}
        </Formik>

        <YooKassaWidget />
      </div>
    </>
  );
};

export default OrderForm;
