import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styles from './logIn.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import fetchResource from '../../utils/api';
import { setUserSession } from '../../utils/sesion';

const LogIn = () => {
  const {
    register, handleSubmit, watch, setValue, errors, setError,
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });
  const { email, password } = watch();

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
  }, [register]);

  const handleChange = (name, e) => {
    e.persist();
    setValue(name, e.target.value);
  };

  const history = useHistory();
  const message = "Don't you have an account yet?";
  const handleClick = () => {
    history.push('/signup');
  };

  const mySubmit = (data) => {
    fetchResource('POST', 'login', {
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
          Log In
        </div>
        <div className={styles.inputCont}>
          <form onSubmit={handleSubmit(mySubmit)} className={styles.form}>
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
              name="password"
              value={password}
              onChange={(e) => handleChange('password', e)}
              error={errors.password?.message}
            />
            <div className={styles.buttonDiv}>
              <Button type="submit" label="submit" size="big" />
            </div>
          </form>
        </div>
        <div className={styles.redirectCont}>
          <div className={styles.redirectText}>
            {message}
          </div>
          <Button label="click here" variant="text" size="small" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
