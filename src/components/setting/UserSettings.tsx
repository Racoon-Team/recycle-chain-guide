import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../components/setting/UserSettings.css';
import { FirebaseAuth, FirebaseDB } from '../../firebase/config';
import { login } from '../../store/auth/authSlice';

const UserSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wantsToChangePassword, setWantsToChangePassword] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [actualPasswordVisible, setActualPasswordVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const [firstName, lastName = ''] = user.displayName?.split(' ') ?? ['', ''];
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || '',
      }));
      setIsAuthenticatedUser(true);
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);
  const toggleActualPasswordVisibility = () => setActualPasswordVisible(!actualPasswordVisible);

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

    if (!isAuthenticatedUser) {
      if (!formData.password) newErrors.password = t('validation.passwordRequired');
      else if (formData.password.length < 6) newErrors.password = t('validation.passwordLength');
      if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = t('validation.passwordMismatch');
    } else {
      if (wantsToChangePassword) {
        if (!formData.currentPassword) newErrors.currentPassword = t('errors.wrongPassword');
        if (formData.password.length < 6) newErrors.password = t('validation.passwordLength');
        if (formData.confirmPassword !== formData.password)
          newErrors.confirmPassword = t('validation.passwordMismatch');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && isAuthenticatedUser) {
        if (formData.password && formData.currentPassword) {
          const credential = EmailAuthProvider.credential(user.email || '', formData.currentPassword);
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, formData.password);
        }

        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });

        if (formData.email !== user.email) {
          await updateEmail(user, formData.email);
        }

        const userDoc = doc(FirebaseDB, `users/${user.uid}`);
        await setDoc(userDoc, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        });

        dispatch(
          login({
            uid: user.uid,
            email: formData.email,
            displayName: `${formData.firstName} ${formData.lastName}`,
            status: 'authenticated',
          })
        );
        navigate('/home-2');
      } else {
        const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, formData.email, formData.password);
        const newUser = userCredential.user;

        await updateProfile(newUser, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });

        const userDoc = doc(FirebaseDB, `users/${newUser.uid}`);
        await setDoc(userDoc, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        });
        navigate('/home-2');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          setErrors((prev) => ({ ...prev, currentPassword: t('errors.wrongPassword') }));
        } else if (error.code === 'auth/requires-recent-login') {
          setErrors((prev) => ({
            ...prev,
            currentPassword: t('errors.requiresRecentLogin'),
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: error.message }));
        }
      } else {
        setErrors((prev) => ({ ...prev, email: t('errors.unknown') }));
      }
    }
  };

  return (
    <div className="lonyo-account-section light-bg">
      <div className="container">
        <div className="lonyo-account-title">
          <h1>{t('userSettings.title')}</h1>
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
                <button
                  type="button"
                  className="lonyo-default-btn extra-btn"
                  onClick={() => setWantsToChangePassword(!wantsToChangePassword)}>
                  {wantsToChangePassword ? t('userSettings.cancelChangePassword') : t('userSettings.changePassword')}
                </button>
              </div>
              <br />

              {isAuthenticatedUser && wantsToChangePassword && (
                <>
                  <div className="lonyo-main-field">
                    <p>{t('userSettings.currentPassword')}</p>
                    <div className="position-relative">
                      <input
                        id="current-password-field"
                        className="light-bg form-control"
                        type={actualPasswordVisible ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Current password"
                      />
                      <div
                        onClick={toggleActualPasswordVisibility}
                        className={`fa fa-fw field-icon toggle-password ${actualPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></div>
                    </div>
                    {errors.currentPassword && <small className="text-danger">{errors.currentPassword}</small>}
                  </div>
                </>
              )}
              <br />

              {wantsToChangePassword && (
                <>
                  <div className="lonyo-main-field">
                    <p>{t('userSettings.newPassword')}</p>
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
                    <p>{t('userSettings.confirmNewPassword')}</p>
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
                </>
              )}

              <button className="lonyo-default-btn extra-btn d-block" type="submit">
                {t('userSettings.saveChanges')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
