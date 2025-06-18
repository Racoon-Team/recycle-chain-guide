// menu data
const menu_data = [
  {
    id: 1,
    title: 'How to recycle',
    link: '/how-to-recycle',
    has_dropdown: false,
  },

  {
    id: 2,
    title: 'Recycle map',
    link: '/recycle-map',
    has_dropdown: false,
  },
  {
    id: 3,
    title: 'Contact',
    link: '/contact-us',
    has_dropdown: false,
  },
  {
    id: 4,
    title: 'Demo',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      {
        link: '/home-examples',
        title: 'Home Examples',
        inner_submenu: true,
        sub_menu: [
          { link: '/', title: 'Home 01' },
          { link: '/home-2', title: 'Home 02' },
          { link: '/home-3', title: 'Home 03' },
        ],
      },
      {
        link: '/Pages',
        title: 'Pages',
        inner_submenu: true,
        sub_menu: [
          {
            link: '/about-us',
            title: 'About Us',
            inner_submenu: false,
          },
          {
            link: '/pricing',
            title: 'Pricing',
            inner_submenu: false,
          },
          {
            link: '/integration',
            title: 'Integrations',
            inner_submenu: true,
            sub_menu: [
              { link: '/integration', title: 'Integratios' },
              { link: '/single-integration', title: 'Integratios Details' },
            ],
          },
          {
            link: '/team',
            title: 'Team',
            inner_submenu: true,
            sub_menu: [
              { link: '/team', title: 'Team' },
              { link: '/single-team', title: 'Team Details' },
            ],
          },
          {
            link: '#',
            title: 'Service',
            inner_submenu: true,
            sub_menu: [
              { link: '/service', title: 'Service' },
              { link: '/single-service', title: 'Service Details' },
            ],
          },
          {
            link: '#',
            title: 'Career',
            inner_submenu: true,
            sub_menu: [
              { link: '/career', title: 'Career' },
              { link: '/single-career', title: 'Career Details' },
            ],
          },
          {
            link: '#',
            title: 'Utility',
            inner_submenu: true,
            sub_menu: [
              { link: '/faq', title: 'Faq' },
              { link: '/404', title: 'errors 404' },
              { link: '/cooming-soon', title: 'Cooming Soon' },
            ],
          },
          {
            link: '#',
            title: 'Accounts',
            inner_submenu: true,
            sub_menu: [
              { link: '/sign-up', title: 'Sign Up' },
              { link: '/sign-in', title: 'Sign In' },
              { link: '/reset-password', title: 'Reset Password' },
            ],
          },
        ],
      },
      {
        link: '/portfolio',
        title: 'Portfolio',
        inner_submenu: true,
        sub_menu: [
          { link: '/portfolio', title: 'Portfolio' },
          { link: '/single-portfolio', title: 'Portfolio Details' },
        ],
      },
      {
        link: '/blog',
        title: 'Blog',
        inner_submenu: true,
        sub_menu: [
          { link: '/blog', title: 'Blog', inner_submenu: false },
          { link: '/single-blog', title: 'Blog Details', inner_submenu: false },
        ],
      },
    ],
  },
];
export default menu_data;
