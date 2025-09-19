'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
    NavbarMenuToggle,
    NavbarMenu, NavbarMenuItem
} from '@heroui/react';
import {usePathname} from "next/navigation";
import {SearchIcon} from "@heroui/shared-icons";
import React from "react";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};


export default function Header() {

    type NavItem = {
        name: string;
        href: string;
    }
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const nav: NavItem[] = [
        {name: '首页', href: '/'},
        {name: '区块浏览', href: '/block'},
        {name: '交易浏览', href: '/transaction'},
        {name: 'NFT', href: '/nft'},
    ]
    const pathname = usePathname();


    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar isBordered shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">恺英联盟链</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {nav.map((item:NavItem) => {
                    const isActive = pathname === item.href;
                    return (
                        <NavbarItem key={item.name} data-active={item.href === pathname} className="text-sm">
                            <Link aria-current={isActive ? 'page' : undefined}
                                  color={isActive? 'primary' : 'foreground'} href={item.href}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    );
                })}

            </NavbarContent>

            <NavbarMenu>

                {nav.map((item:NavItem) => {
                    const isActive = pathname === item.href;
                    return (
                        <NavbarItem key={item.name} data-active={item.href === pathname} className="text-sm">
                            <Link aria-current={isActive ? 'page' : undefined}
                                  color={isActive? 'primary' : 'foreground'} href={item.href}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    );
                })}


            </NavbarMenu>
        </Navbar>

    );
}

