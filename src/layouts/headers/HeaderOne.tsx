import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from 'store/store';
import OffCanvas from '../../common/OffCanvas';
import '../../components/sign-in/SingninArea.css';
import menu_data from '../../data/menu-data';
import { FirebaseAuth } from '../../firebase/config';
import useSticky from '../../hooks/use-sticky';
import { logout } from '../../store/auth/authSlice';

const HeaderOne = ({ style_2, style_3, toggle_color }: any) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { sticky } = useSticky();
  const { status, displayName } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(FirebaseAuth);
      dispatch(logout(null));
      navigate('/sign-in');
    } catch (error: any) {
      console.error('Error logging out:', error);
      dispatch(logout({ errorMessage: error.message }));
    }
  };

  return (
    <>
      <header
        className={`${sticky ? 'sticky-menu' : ''} site-header  ${style_2 ? 'bg-heading lonyo-header-section' : style_3 ? 'lonyo-header-section3' : 'lonyo-header-section light-bg'} `}
        id="sticky-menu">
        <div className="container">
          <div className="row gx-3 align-items-center justify-content-between">
            <div className="col-8 col-sm-auto ">
              <div className="header-logo1 ">
                <Link to="/">
                  {style_2 ? (
                    <img src="/assets/images/logo/logo-white.svg" alt="logo" />
                  ) : (
                    <img src="/assets/images/logo/logo-dark.svg" alt="logo" />
                  )}
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="lonyo-main-menu-item">
                <nav className="main-menu menu-style1 d-none d-lg-block menu-left">
                  <ul>
                    {menu_data.map((item, i) => (
                      <li key={i} className={`${item.has_dropdown ? 'menu-item-has-children' : ''}`}>
                        <Link to={item.link} className={`${style_2 ? 'light-color' : ''}`}>
                          {item.title}
                        </Link>
                        {item.has_dropdown && (
                          <ul className="sub-menu">
                            {item?.sub_menus?.map((sub_item, index) => (
                              <li key={index} className={`${sub_item.inner_submenu ? 'menu-item-has-children' : ''}`}>
                                <Link to={sub_item.link} className={`${sub_item.inner_submenu ? 'no-border' : ''}`}>
                                  {sub_item.title}
                                </Link>
                                {sub_item.inner_submenu && (
                                  <ul className="sub-menu">
                                    {sub_item.sub_menu?.map((inner_item, inner_index) => (
                                      <li key={inner_index}>
                                        <Link to={inner_item.link}>{inner_item.title}</Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-auto d-flex align-items-center">
              <div className="lonyo-header-info-wraper2">
                <div className={`lonyo-header-info-content ${style_2 ? 'content2' : ''}`}>
                  <ul className="d-flex align-items-center gap-3 m-0 list-unstyled">
                    {status !== 'authenticated' ? (
                      <li>
                        <Link to="/sign-in">{t('login.login')}</Link>
                      </li>
                    ) : (
                      <li className="position-relative">
                        <button
                          className="btn d-flex align-items-center text-white border-0 bg-transparent"
                          onClick={() => setDropdownOpen((prev) => !prev)}>
                          <img
                            src="/static/images/avatar/2.jpg"
                            alt={displayName ?? 'User'}
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                          />
                          {displayName}
                        </button>

                        {dropdownOpen && (
                          <ul className="dropdown-menu show dropdownMenu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setDropdownOpen(false);
                                  navigate('/userSetting');
                                }}>
                                {t('login.userSettings')}
                              </button>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setDropdownOpen(false);
                                  handleLogout();
                                }}>
                                {t('login.logout')}
                              </button>
                            </li>
                          </ul>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="lonyo-header-menu">
                <nav className="navbar site-navbar justify-content-between">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`lonyo-menu-toggle d-inline-block d-lg-none ${toggle_color ? 'white-color' : ''}`}>
                    <span></span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <OffCanvas setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
    </>
  );
};

export default HeaderOne;
