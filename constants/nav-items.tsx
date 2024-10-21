import { AiOutlineUser } from 'react-icons/ai';
import { BsBookmarkStar } from 'react-icons/bs';
import { FiFileText, FiSettings, FiVideo } from 'react-icons/fi';
import { GrAnalytics, GrOverview } from 'react-icons/gr';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IoBriefcaseOutline } from 'react-icons/io5';
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
      key: `/dashboard`,
      icon: <LuLayoutDashboard />,
    },
    // {
    //   label: 'Manage Projects',
    //   key: `/manage-projects`,
    //   icon: <FiFileText />,
    // },
    {
      label: 'Manage Jobs',
      key: `/manage-jobs`,
      icon: <FiFileText />,
    },
    {
      label: 'Submit Job',
      key: `/manage-jobs`,
      icon: <LuPencilLine />,
    },
    {
      label: 'Shortlist',
      key: `/manage-jobs`,
      icon: <BsBookmarkStar />,
    },
    {
      label: 'Membership',
      key: `/manage-jobs`,
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
      key: `/messages`,
      icon: <TbMessageDots />,
    },
    {
      label: 'Meetings',
      key: `/meetings`,
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

  const dashboardNavItem = [
    {
      label: 'Profile',
      key: `/candidate/portal/profile`,
      icon: <AiOutlineUser />,
    },
    {
      label: 'Overview',
      key: `/candidate/portal/overview`,
      icon: <GrOverview />,
    },
    {
      label: 'Job Tracker',
      key: `/candidate/portal/job-tracker`,
      icon: <IoBriefcaseOutline />,
    },
    {
      label: 'Calender',
      key: `/candidate/portal/calender`,
      icon: <HiOutlineCalendar />,
    },
    {
      label: 'Analytics',
      key: `/candidate/portal/analytics`,
      icon: <GrAnalytics />,
    },
    {
      label: 'Settings',
      key: `/candidate/portal/settings`,
      icon: <FiSettings />,
    },
  ];

  console.log('role >', role);

  if (role === 'recruit') return recruitNavItem;
  else if (`${role}/dashboard` === 'recruiter/dashboard') return recruitNavItem;
  else if (role === 'candidates') return candidateNavItem;
  else if (role === 'admin') return adminNavItem;
  else {
    return defaultNavItems;
  }
};

export default navItems;
