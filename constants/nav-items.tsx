import { FiFileText } from 'react-icons/fi';
import { GrOverview } from 'react-icons/gr';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoIosPricetag } from 'react-icons/io';
import { IoBriefcase, IoBriefcaseOutline } from 'react-icons/io5';
import { LiaTeamspeak } from 'react-icons/lia';
import { LuCalendarDays } from 'react-icons/lu';
import {
  MdEventNote,
  MdOutlineFindReplace,
  MdOutlineInsights,
} from 'react-icons/md';
import { TbBrandGoogleAnalytics, TbMessageDots, TbRobot } from 'react-icons/tb';

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
      key: `/recruiter/overview`,
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
      key: `/${role}/dashboard/post-job`,
      icon: <IoBriefcaseOutline />,
      group: 2,
    },
    {
      label: 'Job Insights',
      key: `/${role}/dashboard/job-insights`,
      icon: <MdOutlineInsights />,
      group: 2,
    },
    {
      label: 'Team Collaboration',
      key: `/${role}/dashboard/collaboration`,
      icon: <LiaTeamspeak />,
      group: 2,
    },

    {
      label: 'Manage Jobs',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <FiFileText />,
      group: 3,
    },
    // {
    //   label: 'Shortlist',
    //   key: `/${role}/dashboard/shortlist`,
    //   icon: <BsBookmarkStar />,
    //   group: 3,
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
    {
      label: 'Template Library',
      key: `/${role}/dashboard/template-library`,
      icon: <HiOutlineTemplate />,
      group: 4,
    },
  ];

  const recruiterNavItem = [
    {
      label: 'Overview',
      key: `/${role}/dashboard`,
      icon: <GrOverview />,
      group: 1,
    },
    {
      label: 'Find talent',
      key: `/${role}/dashboard/post-job`,
      icon: <MdOutlineFindReplace />,
      group: 2,
    },
    {
      label: 'Post a job',
      key: `/${role}/dashboard/job-insights`,
      icon: <IoBriefcase />,
      group: 2,
    },
    {
      label: 'Free ATS',
      key: `/${role}/dashboard/team-collaboration`,
      icon: <TbRobot />,
      group: 2,
    },

    {
      label: 'Pricing',
      key: `/${role}/dashboard/manage-jobs`,
      icon: <IoIosPricetag />,
      group: 3,
    },
    {
      label: 'For candidates',
      key: `/candidates/overview`,
      icon: null,
    },
  ];

  const candidateNavItem = [
    {
      label: 'Overview',
      key: `/candidates/overview`,
      icon: null,
    },

    {
      label: 'Jobs',
      key: `/candidates/find-jobs`,
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
      key: `/recruiter/overview`,
      icon: null,
    },
  ];

  const candidateProfileNavItem = [
    {
      label: 'Overview',
      key: `/candidates/overview`,
      icon: null,
    },

    {
      label: 'Jobs',
      key: `/candidates/find-jobs`,
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
      key: `/recruiter/overview`,
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
  if (role === 'recruiter') return recruiterNavItem;
  else if (role === 'candidates') return candidateNavItem;
  else if (role === 'admin') return adminNavItem;
  else return defaultNavItems;
};

export default navItems;
