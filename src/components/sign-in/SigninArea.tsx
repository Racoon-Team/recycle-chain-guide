import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store/store';
import { useForm } from '../../hooks/useForm';
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const SigninArea = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/home');
    }
  }, [status, navigate]);

  const { email, password, onInputChange } = useForm({
    email: 'noelia@gmail.com',
    password: '1234567',
  });

  const [error, setError] = useState({ email: '', password: '' });

  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = !email.match(/^\S+@\S+\.\S+$/) ? t('errors.invalidEmail') : '';
    const passwordError = password.length <= 6 ? t('errors.shortPassword') : '';

    setError({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    dispatch(startLoginWithEmailPassword({ email, password }));
  };
  const handleGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  };

  return (
    <div className="lonyo-account-section light-bg">
      <div className="container">
        <div className="lonyo-account-title">
          <h1>{t('login.login')}</h1>
          <p>Step inside Lonyo and start managing finances like never before</p>
        </div>

        <div className="lonyo-account-box" data-aos="fade-up" data-aos-duration="700">
          <div className="login-with-google">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={status === 'authenticated'}>
              <h6 className="mb-0">{t('login.google')}</h6>
            </button>
          </div>

          <div className="or">
            <p>or</p>
          </div>

          <div className="lonyo-contact-box2">
            <form onSubmit={handleSubmit}>
              <div className="lonyo-main-field">
                <p>Email address*</p>
                <input
                  className="light-bg"
                  type="email"
                  name="email"
                  placeholder="email@google.com"
                  value={email}
                  onChange={onInputChange}
                />
                {error.email && <small className="text-danger">{error.email}</small>}
              </div>

              <div className="lonyo-main-field">
                <p>Password*</p>
                <div className="position-relative">
                  <input
                    id="password-field"
                    className="light-bg form-control"
                    type={passwordType}
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={onInputChange}
                  />
                  <div
                    className={`fa fa-fw field-icon toggle-password ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      cursor: 'pointer',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
                {error.password && <small className="text-danger">{error.password}</small>}
              </div>

              <button
                className="lonyo-default-btn extra-btn d-block"
                type="submit"
                disabled={status === 'authenticated'}>
                {t('login.login')}
              </button>

              <div className="login">
                <span>Don't have an account?</span>
                <Link to="/sign-up">
                  <p>Sign up here</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninArea;
