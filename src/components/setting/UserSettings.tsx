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
import '../../components/sign-up/SignupArea.css';
import { FirebaseAuth, FirebaseDB } from '../../firebase/config';
import { login } from '../../store/auth/authSlice';

const UserSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      if (formData.password || formData.confirmPassword) {
        if (!formData.currentPassword) newErrors.currentPassword = 'Tu contraseña actual es incorrecta';
        if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Las contraseñas no coinciden';
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

        console.log('Profile updated successfully');
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

        console.log('User registered:', newUser);
        navigate('/home-2');
      }
    } catch (error: any) {
      console.error('Error actualizacion', error.message);
      if (error.code === 'auth/wrong-password') {
        setErrors({ ...errors, currentPassword: 'Tu contraseña actual es incorrecta' });
      } else if (error.code === 'auth/requires-recent-login') {
        setErrors({ ...errors, currentPassword: 'Debes volver a iniciar sesión para cambiar datos sensibles' });
      } else {
        setErrors({ ...errors, email: error.message });
      }
    }
  };

  return (
    <div className="lonyo-account-section light-bg">
      <div className="container">
        <div className="lonyo-account-title">
          <h1>User Settings</h1>
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

              {isAuthenticatedUser && (
                <>
                  <div className="lonyo-main-field">
                    <p>Contraseña actual</p>
                    <input
                      id="current-password-field"
                      className="light-bg form-control"
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Current password"
                    />
                    {errors.currentPassword && <small className="text-danger">{errors.currentPassword}</small>}
                  </div>
                </>
              )}

              <div className="lonyo-main-field">
                <p>Contraseña nueva</p>
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
                <p>Confirmar contraseña nueva</p>
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
                    className={`fa fa-fw field-icon2 toggle-password ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></div>
                </div>
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>
              <br />

              <button className="lonyo-default-btn extra-btn d-block" type="submit">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
