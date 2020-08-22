const SM_HANDLES = Object.freeze({
  facebook:  { icon: 'fab fa-facebook-f fa-lg' },
  twitter:   { icon: 'fab fa-twitter fa-lg' },
  youtube:   { icon: 'fab fa-youtube fa-lg' },
  instagram: { icon: 'fab fa-instagram fa-lg' },
  github:    { icon: 'fab fa-github fa-lg' },
  email:     { icon: 'far fa-envelope fa-lg' },
  pinterest: { icon: 'fab fa-pinterest-p fa-lg' },
  linkedIn:  { icon: 'fab fa-linkedin-in fa-lg' },
  website:   { icon: 'fab fa-globe fa-lg' },
  gplus:     { icon: 'fab fa-google-plus-g fa-lg' },
});

const Me = {
  name:      'Deepankar Sandhibigraha',
  firstName: 'Deepankar',
  lastName:  'Sandhibigraha',
  nickname:  'Sandy',
  jobTitle:  'Fullstack Web Developer | React Native Developer',
  company:   'Tikkl, Inc',
  email:     'info@deepankar.dev',
  dob:       new Date('09-02-1995'),
  about:     'Currently working as Software Engineer. Love new technologies. Lately interested in modern history and world politics. Love to ride bike. Love greenery and I do gardening.',
  skills:    'ReactJS | React Native | HTML5 | CSS3 | NodeJS | UNIX',
  smHandles: {
    facebook:  { url: 'https://facebook.com/DeepankarSandy', disabled: true },
    twitter:   { url: 'https://twitter.com/DeepankarSandy' },
    youtube:   { url: 'https://www.youtube.com/channel/UCOWnHB_2DxTw9SVxv0LSbvQ' },
    instagram: { url: 'https://instagram.com/deepankar_sandy', disabled: true },
    github:    { url: 'https://github.com/DeepankarSandy' },
    email:     { url: 'info@deepankar.dev', disabled: true },
    linkedIn:  { url: 'https://www.linkedin.com/in/deepankarsandhibigraha/' },
  },
  projects:  [
    { id: 1, title: 'Personal Website', description: 'This website is completely built by me using NodeJS, ReactJS, HTML5, CSS3 with Webpack, SASS and deployed on Heroku for now.' },
    { id: 2, title: 'Conference Mobile App', description: 'Conference with group amd direct message capabilities, push notifications, live sync using React Native and FCM.' }
  ]
};

export { SM_HANDLES, Me };
