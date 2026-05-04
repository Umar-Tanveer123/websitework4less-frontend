export interface Project {
  title: string;
  category: string;
  imageUrl: string;
  url: string;
}

export const categories = ['All', 'Web Design', 'E-Commerce', 'Web Application', 'Branding'];

export const projects: Project[] = [
  {
    title: 'ajlead.com',
    category: 'Web Application',
    imageUrl: '/projects/project1.png',
    url: 'https://ajlead.com',
  },
  {
    title: 'dandicraft.com',
    category: 'E-Commerce',
    imageUrl: '/projects/project2.png',
    url: 'https://dandicraft.com',
  },
  {
    title: 'goldstonem.com',
    category: 'Web Application',
    imageUrl: '/projects/project3.png',
    url: 'https://goldstonem.com',
  },
  {
    title: 'clovercareaba.com',
    category: 'Web Design',
    imageUrl: '/projects/project4.png',
    url: 'https://clovercareaba.com',
  },
  {
    title: 'keynorstudios.com',
    category: 'E-Commerce',
    imageUrl: '/projects/project5.png',
    url: 'https://keynorstudios.com',
  },
  {
    title: 'nlakehomes.com',
    category: 'Web Design',
    imageUrl: '/projects/project6.png',
    url: 'https://nlakehomes.com',
  },
  {
    title: 'barbuxbarter.com',
    category: 'Web Application',
    imageUrl: '/projects/project7.png',
    url: 'https://barbuxbarter.com',
  },
  {
    title: 'malonluxerysuites.com',
    category: 'Branding',
    imageUrl: '/projects/project8.png',
    url: 'https://malonluxerysuites.com',
  },
  {
    title: 'jrvinternational.com',
    category: 'Branding',
    imageUrl: '/projects/project9.png',
    url: 'https://jrvinternational.com/',
  },
];
