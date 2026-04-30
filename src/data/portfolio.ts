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
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    url: 'https://ajlead.com',
  },
  {
    title: 'dandicraft.com',
    category: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    url: 'https://dandicraft.com',
  },
  {
    title: 'goldstonem.com',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    url: 'https://goldstonem.com',
  },
  {
    title: 'clovercareaba.com',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    url: 'https://clovercareaba.com',
  },
  {
    title: 'keynorstudios.com',
    category: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    url: 'https://keynorstudios.com',
  },
  {
    title: 'nlakehomes.com',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    url: 'https://nlakehomes.com',
  },
  {
    title: 'machondoros.com',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    url: 'https://machondoros.com',
  },
  {
    title: 'barbuxbarter.com',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    url: 'https://barbuxbarter.com',
  },
  {
    title: 'malonluxerysuites.com',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80',
    url: 'https://malonluxerysuites.com',
  },
];
