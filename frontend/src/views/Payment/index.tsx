import React, { useEffect, useState } from 'react';

import { createPayment, getPayments, Payment } from '../../api/payment';
import Button from '../../components/Button';
import Input from '../../components/Input';
import GeneratorStatus from '../../components/GeneratorStatus';
import { Action, State } from '../../state';

import './payment.css';



type PaymentViewProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
}


export default function PaymentView({ state, dispatch }: PaymentViewProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddPayment = async () => {
    if (!name || !amount || !state.gridData?.code || !state.gridData?.grid) return;

    const newPayment: Omit<Payment, 'id'> = {
      name,
      amount,
      code: state.gridData?.code,
      grid: state.gridData?.grid
    };

    try {
      const createdPayment = await createPayment(newPayment);
      console.log(createdPayment)
      dispatch({ type: 'ADD_PAYMENT', payload: createdPayment.payment });
      setName('');
      setAmount('');
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { payments } = await getPayments();
        dispatch({ type: 'SET_PAYMENTS', payload: payments });
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)

  return (
    <div>
      <GeneratorStatus state={state} />

      <div className="action-bar">
        <Input
          label="Payment"
          placeholder="Payment"
          value={name}
          onChange={onChangeName}
        />
        <Input
          label="Amount"
          placeholder="Amount"
          value={amount}
          onChange={onChangeAmount}
        />
        <div className="action-bar">
          <Button label="+ ADD" onClick={handleAddPayment} />
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Payment Name</th>
              <th>Amount</th>
              <th>Code</th>
              <th>Grid</th>
            </tr>
          </thead>
          <tbody>
            {state.payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.name}</td>
                <td>{payment.amount}</td>
                <td>{payment.code}</td>
                <td>{payment.grid.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
