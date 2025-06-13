import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store/store';
import { FirebaseAuth } from '../../firebase/config';
import { startGoogleSingup } from '../../store/auth/thunks';

const SignUpArea = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
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

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';

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
  const handleGoogleSignup = () => {
    dispatch(startGoogleSingup());
  };

  return (
    <div className="lonyo-account-section light-bg">
      <div className="container">
        <div className="lonyo-account-title">
          <h1>Sign Up</h1>
          <p>Step into the future with Lonyo and take your financial game to the next level!</p>
        </div>
        <div className="lonyo-account-box" data-aos="fade-up" data-aos-duration="700">
          <div className="login-with-google">
            <button
              type="button"
              onClick={handleGoogleSignup}
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
              <div className="row">
                <div className="col-lg-6">
                  <div className="lonyo-main-field">
                    <p>Full name*</p>
                    <input
                      className="light-bg"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Adam"
                    />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="lonyo-main-field">
                    <p>Last Name*</p>
                    <input
                      className="light-bg"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                    />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                  </div>
                </div>
              </div>
              <div className="lonyo-main-field">
                <p>Email address*</p>
                <input
                  className="light-bg"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="lonyo-main-field">
                <p>Password*</p>
                <input
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
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <div className="lonyo-main-field">
                <p>Repeat password*</p>
                <input
                  className="light-bg form-control"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                />
                <div
                  onClick={toggleConfirmPasswordVisibility}
                  className={`fa fa-fw field-icon2 toggle-password2 ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></div>
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>
              <button className="lonyo-default-btn extra-btn d-block" type="submit">
                Sign up
              </button>
              <div className="login">
                <span>Already have an account?</span>
                <Link to="/sign-in">
                  <p>Sign in here</p>
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
