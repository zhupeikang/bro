'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,Input} from '@heroui/react';
import {usePathname} from "next/navigation";
import {SearchIcon} from "@heroui/shared-icons";

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

    const nav: NavItem[] = [
        {name: '首页', href: '/'},
        {name: '区块浏览', href: '/block'},
        {name: '交易浏览', href: '/transaction'},
        {name: 'NFT', href: '/nft'},
    ]
    const pathname = usePathname();
    return (
        <Navbar maxWidth={'2xl'} isBordered shouldHideOnScroll>
            <NavbarBrand>
                <AcmeLogo/>
                <p className="font-bold text-inherit">恺英联盟链</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
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

                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[40rem] ",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="请输入地址/交易哈希/区块高度进行搜索"
                    size="sm"
                    startContent={<SearchIcon  />}
                    type="search"
                />
            </NavbarContent>

        </Navbar>
    );
}

