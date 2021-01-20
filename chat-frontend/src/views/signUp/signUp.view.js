import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './signUp.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import fetchResource from '../../utils/api';
import { setUserSession } from '../../utils/sesion';

const SignUp = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };
  const {
    register, handleSubmit, watch, setValue, errors, setError,
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
      name: null,
      confirmPassword: null,
    },
  });
  const {
    email, password, name, confirmPassword,
  } = watch();

  useEffect(() => {
    register({ name: 'email' }, {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Enter a valid email',
      },
    });
    register({ name: 'password' }, {
      required: 'Password is required',
    });
    register({ name: 'name' }, {
      required: 'The name is required',
    });
    register({ name: 'confirmPassword' }, {
      required: 'Confirm password is required',
      validate: (value) => value === watch('password') || 'The passwords do not match',
    });
  }, [register]);
  const handleChange = (nameData, e) => {
    e.persist();
    setValue(nameData, e.target.value);
  };
  const mySubmit = (data) => {
    fetchResource('POST', 'register', {
      body: data,
    }).then((res) => {
      setUserSession(res);
      history.push('/chat');
    }).catch((apiError) => {
      Object.entries(apiError.response.error).forEach((error) => {
        const [key, value] = error;
        setError(key, { message: value, type: 'manual' });
      });
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          Sign Up
        </div>
        <div className={styles.inputCont}>
          <form onSubmit={handleSubmit(mySubmit)} className={styles.form}>
            <Input
              type="text"
              size="big"
              label="Name"
              onChange={(e) => handleChange('name', e)}
              value={name}
              error={errors.name?.message}
            />
            <Input
              type="text"
              size="big"
              label="Email"
              onChange={(e) => handleChange('email', e)}
              value={email}
              error={errors.email?.message}
            />
            <Input
              type="password"
              size="big"
              label="Password"
              onChange={(e) => handleChange('password', e)}
              value={password}
              error={errors.password?.message}
            />
            <Input
              type="password"
              size="big"
              label="Confirm password"
              onChange={(e) => handleChange('confirmPassword', e)}
              value={confirmPassword}
              error={errors.confirmPassword?.message}
            />
            <div className={styles.button}>
              <Button type="submit" label="submit" size="big" />
            </div>
          </form>
        </div>
        <div className={styles.redirectCont}>
          <div className={styles.redirectText}>
            Are you already registered?
          </div>
          <Button label="click here" variant="text" size="small" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
