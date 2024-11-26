'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetCurrentUserQuery,
  UserAuthApi,
} from '@/redux/features/auth/authentication';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import VisibilitySetting from '../visibility-setting/VisibilitySetting';

const HeaderController = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies['auth_token'];
  const dispatch = useDispatch();

  const handleLogout = () => {
    destroyCookie(null, 'auth_token');
    dispatch(UserAuthApi.util.resetApiState());
    router.push('/ab/account-security/login');
  };

  const { data: currentUser } = useGetCurrentUserQuery(
    token ? { token } : { token: '' },
    {
      skip: !token,
    },
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        {currentUser && (
          <>
            <div>
              <IoMdNotificationsOutline className="text-text5" size={25} />
            </div>
            <VisibilitySetting />
            {/* <ShinyButton /> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={() => router.push('/jobs')}
                  className="text-blue-midnight_blue flex cursor-pointer items-center whitespace-nowrap rounded-full border-none bg-transparent font-bold outline-none hover:bg-gray-50"
                >
                  <Image
                    src="/assets/images/girl-user.webp"
                    width={36}
                    height={36}
                    alt="user"
                    className="border-primary rounded-full border-2"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative z-[999] w-56 border border-[rgba(255,255,255,0.14)] bg-[#181C3B] text-text6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push('candidate/dashboard')}
                  >
                    Dashboard
                    <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Pricing
                    <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Edit preferences</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    Edit Resume
                    <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Bookmarks</DropdownMenuItem>
                <DropdownMenuItem>My Applications</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="border border-[rgba(255,255,255,0.14)] bg-[#181C3B] text-text6">
                      <DropdownMenuItem>Manage Account</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem className="bg-primary/10 text-primary mt-1 flex cursor-pointer items-center justify-center font-semibold">
                  Post a job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {!currentUser && (
          <>
            <Button
              variant="outline"
              onClick={() => router.push('/ab/account-security/login')}
              className="hover:bg-primary flex cursor-pointer items-center whitespace-nowrap rounded-md border border-theme2 bg-transparent font-bold text-theme1 transition-all duration-200 ease-in-out hover:text-white"
            >
              Log in
            </Button>

            <Button
              onClick={() => router.push('/nx/signup')}
              variant="outline"
              className="hover:text-primary font-apercu-light flex cursor-pointer items-center whitespace-nowrap rounded-md border-transparent bg-theme2 px-3 py-0 text-base text-white transition-all duration-200 ease-in-out hover:border-theme1 hover:bg-transparent hover:text-theme1"
            >
              Be Part
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderController;
