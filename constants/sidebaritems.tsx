import { BiUserCircle } from 'react-icons/bi';
import { FcFeedback } from 'react-icons/fc';
import { FiFileText } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { LiaTeamspeak, LiaUserAltSolid } from 'react-icons/lia';
import { LuCalendarDays, LuInbox } from 'react-icons/lu';
import {
  MdEventNote,
  MdFavoriteBorder,
  MdManageAccounts,
  MdOutlineInsights,
} from 'react-icons/md';
import { RiLuggageCartFill } from 'react-icons/ri';
import {
  TbBrandGoogleAnalytics,
  TbMessageDots,
  TbMessages,
} from 'react-icons/tb';

export const sidebarItems = (role: string) => {
  const defaultSidebarItems = [
    {
      label: 'My Profile',
      icon: <BiUserCircle />,
      key: `/${role}/profile`,
    },
    {
      label: 'Manage Profile',
      icon: <MdManageAccounts />,
      key: `/${role}/manage-profile`,
    },
  ];

  // common admin route
  const recruiterSidebarItems = [
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
      key: `/${role}/dashboard/team-collaboration`,
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

  const candidateSidebarItems = [
    {
      label: 'Dashboard',
      icon: <GoHome />,
      key: `/${role}/dashboard/`,
    },
    {
      label: 'Profile',
      icon: <LiaUserAltSolid />,
      key: `/${role}/profile/`,
    },
    // {
    //     label: 'User Preference',
    //     icon: <MdOutlinePersonalInjury />,
    //     key: `/${role}/dashboard/user_preference`,
    // },
    {
      label: 'applied',
      icon: <LuInbox />,
      key: `/${role}/applied`,
    },
    {
      label: 'favorite',
      icon: <MdFavoriteBorder />,
      key: `/${role}/favorite`,
    },
    {
      label: 'messages',
      icon: <TbMessages />,
      key: `/${role}/messages`,
    },
  ];

  // user route

  const adminSidebarItems = [
    ...defaultSidebarItems,
    {
      label: 'My Booking',
      icon: <RiLuggageCartFill />,
      key: `/dashboard/booking`,
    },
    {
      label: 'Feedback',
      icon: <FcFeedback />,
      key: `/dashboard/feedback`,
    },
  ];

  if (role === 'recruiter') return recruiterSidebarItems;
  else if (role === 'candidate') return candidateSidebarItems;
  else if (role === 'admin') return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
