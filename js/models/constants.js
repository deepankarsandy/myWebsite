const smHandles = [
  { type: 'facebook', url: 'https://facebook.com/DeepankarSandy', disabled: true },
  { type: 'twitter', url: 'https://twitter.com/DeepankarSandy', disabled: false },
  { type: 'youtube', url: 'https://www.youtube.com/channel/UCq6np7VtiyqLLQeBdUfafqg/channels', disabled: false },
  { type: 'instagram', url: 'https://instagram.com/deepankar_sandy', disabled: true },
  { type: 'github', url: 'https://github.com/DeepankarSandy', disabled: false },
  { type: 'email', url: 'mailto:zilu2deep@gmail.com', disabled: false },
  { type: 'pinterest', url: 'https://pinterest.com/DeepankarSandy', disabled: true },
  { type: 'linkedIn', url: 'https://www.linkedin.com/in/deepankarsandhibigraha/', disabled: false },
];

const user = {
  name: 'Deepankar Sandhibigraha',
  firstName: 'Deepankar',
  lastName:  'Sandhibigraha',
  nickname:  'Sandy',
  jobTitle:  'Fullstack Web Developer | React Native Developer',
  company:   'Tikkl, Inc',
  dob:       new Date('09-02-1995'),
  about:     'Currently working as Software Engineer. Love new technologies. Lately interested in modern history and world politics. Love to ride bike. Love greenery and I do gardening.',
  skills:    'ReactJS | React Native | HTML5 | CSS3 | NodeJS | UNIX',
  projects:  [
    { id: 1, title: 'Personal Website', description: 'This website is completely built by me using NodeJS, ReactJS, HTML5, CSS3 with Webpack, SASS and deployed on Heroku for now.' },
    { id: 2, title: 'Conference Mobile App', description: 'Conference with group amd direct message capabilities, push notifications, live sync using React Native and FCM.' }
  ]
}

Object.freeze(smHandles);

export { smHandles, user };
