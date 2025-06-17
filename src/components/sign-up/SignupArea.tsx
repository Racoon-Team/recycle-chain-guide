import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from 'store/store';
import { FirebaseAuth } from '../../firebase/config';
import './SignupArea.css';

const SignUpArea = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/home-2');
    }
  }, [status, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('validation.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('validation.lastNameRequired');
    if (!formData.email.trim()) newErrors.email = t('validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('validation.emailInvalid');
    if (!formData.password) newErrors.password = t('validation.passwordRequired');
    else if (formData.password.length < 6) newErrors.password = t('validation.passwordLength');
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = t('validation.passwordMismatch');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, formData.email, formData.password);
        console.log('User registered:', userCredential.user);
        navigate('/sign-in');
      } catch (error: any) {
        console.error('Registration error:', error.message);

        setErrors({ ...errors, email: error.message });
      }
    }
  };

  return (
    <div className="lonyo-account-section light-bg">
      <div className="container">
        <div className="lonyo-account-title">
          <h1>{t('signup.title')}</h1>
          <p>{t('signup.description')}</p>
        </div>
        <div className="lonyo-account-box" data-aos="fade-up" data-aos-duration="700">
          <div className="lonyo-contact-box2">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="lonyo-main-field">
                    <p>{t('signup.fullName')}</p>
                    <input
                      id="firstName-field"
                      className="light-bg"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                  </div>
                  <br />
                </div>
                <div className="col-lg-6">
                  <div className="lonyo-main-field">
                    <p>{t('signup.lastName')}</p>
                    <input
                      id="lastName-field"
                      className="light-bg"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                    />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                  </div>
                  <br />
                </div>
              </div>
              <div className="lonyo-main-field">
                <p>{t('signup.email')}</p>
                <input
                  id="email-field"
                  className="light-bg"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <br />
              <div className="lonyo-main-field">
                <p>{t('signup.password')}</p>
                <div className="position-relative">
                  <input
                    id="password-field"
                    className="light-bg form-control"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className={`fa fa-fw field-icon toggle-password ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></div>
                </div>
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <br />

              <div className="lonyo-main-field">
                <p>{t('signup.repeatPassword')}</p>
                <div className="position-relative">
                  <input
                    id="confirm-password-field"
                    className="light-bg form-control"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                  />
                  <div
                    onClick={toggleConfirmPasswordVisibility}
                    className={`fa fa-fw field-icon toggle-password ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></div>
                </div>
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>
              <br />
              <button className="lonyo-default-btn extra-btn d-block" type="submit">
                {t('signup.title')}
              </button>
              <div className="login">
                <span>{t('signup.question')}</span>
                <Link to="/sign-in">
                  <p>{t('signup.signInHere')}</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpArea;
