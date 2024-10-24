import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsBookmarkStar } from 'react-icons/bs';
import { FiFileText } from 'react-icons/fi';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { MdEventNote } from 'react-icons/md';
import { TbBrandGoogleAnalytics, TbMessageDots } from 'react-icons/tb';

const navItems = (role: any) => {
  const defaultNavItems = [
    {
      label: 'Discover',
      key: `/discover`,
      icon: null,
    },
    {
      label: 'For job seekers',
      key: `/candidates/overview`,
      icon: null,
    },
    {
      label: 'For companies',
      key: `/recruit/overview`,
      icon: null,
    },
  ];

  const recruitNavItem = [
    {
      label: 'Analytics',
      key: `/${role}/dashboard`,
      icon: <TbBrandGoogleAnalytics />,
      group: 1,
    },
    {
      label: 'Submit Job',
      key: `/${role}/dashboard`,
      icon: <IoBriefcaseOutline />,
      group: 2,
    },
    {
      label: 'Add User',
      key: `/${role}/dashboard`,
      icon: <AiOutlineUserAdd />,
      group: 2,
    },
    // {
    //   label: 'Hiring Event',
    //   key: `/${role}/dashboard`,
    //   icon: <IoBriefcaseOutline />,
    //   group: 2,
    // },
    // {
    //   label: 'Manage Projects',
    //   key: `/manage-projects`,
    //   icon: <FiFileText />,
    // },
    {
      label: 'Manage Jobs',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <FiFileText />,
      group: 3,
    },
    {
      label: 'Shortlist',
      key: `/${role}/dashboard/shortlist`,
      icon: <BsBookmarkStar />,
      group: 3,
    },
    // {
    //   label: 'Membership',
    //   key: `/${role}/dashboard/manage-jobs`,
    //   icon: <TbShoppingBagExclamation />,
    //   group: 3,
    // },
    // {
    //   label: 'Bought Services',
    //   key: `/bought-services`,
    //   icon: <FiShoppingBag />,
    // },
    // {
    //   label: 'My Company',
    //   key: `/my-company`,
    //   icon: <FiUsers />,
    // },
    // {
    //   label: 'Follow',
    //   key: `/follow`,
    //   icon: <FiUsers />,
    // },
    // {
    //   label: 'My Package',
    //   key: `/my-package`,
    //   icon: <FiPackage />,
    // },

    {
      label: 'Messages',
      key: `/${role}/dashboard/messages`,
      icon: <TbMessageDots />,
      group: 3,
    },

    {
      label: 'All Interviews',
      key: `/${role}/dashboard/meetings`,
      icon: <MdEventNote />,
      group: 4,
    },
    {
      label: 'Interviews availability',
      key: `/${role}/dashboard/meetings`,
      icon: <LuCalendarDays />,
      group: 4,
    },
  ];

  const candidateNavItem = [
    // {
    //     label: 'Discover',
    //     key: `/discover`,
    // },
    {
      label: 'Overview',
      key: `/candidates/overview`,
      icon: null,
    },

    {
      label: 'Jobs',
      key: `/jobs`,
      icon: null,
    },
    {
      label: 'Featured',
      key: `/candidates/featured`,
      icon: null,
    },
    {
      label: 'Remote',
      key: `/candidates/remote`,
      icon: null,
    },
    {
      label: 'For companies',
      key: `/recruit/overview`,
      icon: null,
    },
  ];

  const adminNavItem = [
    {
      label: 'Discover',
      key: `/discover`,
      icon: null,
    },
    {
      label: 'Overview',
      key: `/candidates/overview`,
      icon: null,
    },
  ];

  console.log('role >', role);

  // Ensure that the role dynamically adds correct routes
  if (role === 'recruiter') return recruitNavItem;
  else if (role === 'candidates') return candidateNavItem;
  else if (role === 'admin') return adminNavItem;
  else return defaultNavItems;
};

export default navItems;
