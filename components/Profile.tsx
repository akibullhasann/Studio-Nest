"use client";
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoAddCircleOutline, IoBusinessOutline, IoCalendarOutline, IoHeartOutline, IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import {toast} from "react-toastify";

const Profile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log('from user', user);
    
    const handleSignOut = async () => {
        await authClient.signOut()
        toast.success('Signout Successfully');
    }

    return (
        <div>
            <Popover>
                <div className='flex items-center gap-2'>
                    <PopoverTrigger render={<Avatar>
                        <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                        <AvatarFallback className="text-foreground">{user?.name.charAt(0)}</AvatarFallback>
                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>} />
                    <div>{user?.name}</div>
                </div>
                <PopoverContent align="start">
                    <PopoverHeader>
                        <PopoverTitle>
                            <p className='text-muted-foreground text-small'>Signed in as</p>
                            <p className="font-semibold text-xl ">{user?.name}</p>
                            <p className='text-muted-foreground text-small'>{user?.email}</p>
                        </PopoverTitle>

                        <PopoverDescription>
                            <div className="w-60 space-y-1 p-2">

                                <Link
                                    href="/addStudio"
                                    className="flex items-center gap-3 rounded-xl bg-amber-500 px-3 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600"
                                >
                                    <IoAddCircleOutline className="size-5" />
                                    Add New Studio
                                </Link>

                                <Link
                                    href="/my-listing"
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-all hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
                                >
                                    <IoBusinessOutline className="size-5" />
                                    My Studio Listings
                                </Link>

                                <Link
                                    href="/my-bookings"
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-all hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
                                >
                                    <IoCalendarOutline className="size-5" />
                                    My Bookings
                                </Link>

                                <Link
                                    href="/wishlist"
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-all hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
                                >
                                    <IoHeartOutline className="size-5" />
                                    Saved Wishlist
                                </Link>

                                <div className="my-2 border-t border-border" />

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                >
                                    <IoLogOutOutline className="size-5" />
                                    Sign Out
                                </button>

                            </div>
                        </PopoverDescription>

                    </PopoverHeader>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Profile;