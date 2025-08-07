import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ClientApiImpl } from '../../api';

const LoginContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px red solid;
`;

const LoginFormContainer = styled('form')`
  display: flex;
  width: 400px;
  justify-content: end;
  border: 1px blue solid;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
`;

type LoginInputs = {
  login: string;
  password: string;
};

export const Login: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  const handleloginSubmit: SubmitHandler<LoginInputs> = (data) => {
    const api = ClientApiImpl.getInstance();

    api
      .postLogin(data)
      .then((result) => {
        Logger.info('post login', result);
        if (result) {
          navigate('/choose');
        }
      })
      .catch((e) => {
        Logger.warn('post ling error', e);
      });
  };
  return (
    <LoginContainer>
      <h2>Login</h2>
      <LoginFormContainer onSubmit={handleSubmit(handleloginSubmit)}>
        <Controller
          control={control}
          name="login"
          render={({ field }) => <TextField {...field} />}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => <TextField type="password" {...field} />}
        />
        <div>
          <Button type="submit">submit</Button>
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
};
