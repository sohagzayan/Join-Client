import { BsBookmarkStar } from 'react-icons/bs';
import { FiFileText, FiVideo } from 'react-icons/fi';
import { LuLayoutDashboard, LuPencilLine } from 'react-icons/lu';
import { TbMessageDots, TbShoppingBagExclamation } from 'react-icons/tb';

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
      label: 'Dashboard',
      key: `/${role}/dashboard`,
      icon: <LuLayoutDashboard />,
    },
    // {
    //   label: 'Manage Projects',
    //   key: `/manage-projects`,
    //   icon: <FiFileText />,
    // },
    {
      label: 'Manage Jobs',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <FiFileText />,
    },
    {
      label: 'Submit Job',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <LuPencilLine />,
    },
    {
      label: 'Shortlist',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <BsBookmarkStar />,
    },
    {
      label: 'Membership',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <TbShoppingBagExclamation />,
    },
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
    },
    {
      label: 'Meetings',
      key: `/${role}/dashboard/meetings`,
      icon: <FiVideo />,
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
