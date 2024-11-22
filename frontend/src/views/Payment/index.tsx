import React, { useEffect, useReducer, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './payment.css';
import { createPayment, getPayments, Payment } from '../../api/payment';

import { GridData } from '../Generator'
type State = {
  payments: Payment[];
};

type Action =
  | { type: 'SET_STATE'; payload: Payment[] }
  | { type: 'ADD_PAYMENT'; payload: Payment };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STATE':
      return { payments: [...action.payload] };
    case 'ADD_PAYMENT':
      return { payments: [...state.payments, action.payload] };
    default:
      return state;
  }
};

type PaymentViewProps = {
  gridData: GridData | null,
}


export default function PaymentView({ gridData }: PaymentViewProps) {
  const [state, dispatch] = useReducer(reducer, { payments: [] });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddPayment = async () => {
    if (!name || !amount || !gridData?.code || !gridData?.grid) return;

    const newPayment: Omit<Payment, 'id'> = {
      name,
      amount,
      code: gridData?.code,
      grid: gridData?.grid
    };

    try {
      const createdPayment = await createPayment(newPayment);
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
        dispatch({ type: 'SET_STATE', payload: payments });
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
