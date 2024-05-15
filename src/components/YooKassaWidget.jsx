import React, { useState } from 'react';

const YooKassaWidget = () => {
  const [paymentId, setPaymentId] = useState('');

  const createPayment = async () => {
    try {
      const response = await fetch('http://yourdomain.com/api/yookassa/payments', { // замените на URL вашего прокси-сервера
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // ...другие параметры запроса (например, тело запроса)
      });

      const data = await response.json();
      setPaymentId(data.id);
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
    }
  };

  return (
    <div>
      <button onClick={createPayment}>Создать платеж</button>
      {paymentId && <p>ID созданного платежа: {paymentId}</p>}
    </div>
  );
};

export default YooKassaWidget;
