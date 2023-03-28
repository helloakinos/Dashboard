import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./Sidebar.module.css"
import React, { useState } from 'react';

const Logo = (props) => {
    return (
      <Image
        src="/logo.png"
        alt="Lima Logo"
        width="36.77px"
        height="32px"
    />
    )
}

const Lima = (props) => {
    return (
      <Image
        src="/LIMA.png"
        alt="Lima"
        width= "88.4px"
        height= "28px"
    />
    )
}


export default function sidebar({toggleSidebar,collapsed}){

    const menuItems = [
        {
          href: '/',
          icon: "bx bx-home",
          title: "Dashboard"
        },
        {
          href: '/map',
          icon: "bx bx-map-alt",
          title: "Farm Zoning"
        },
        {
          href: '/database',
          icon: "bx bx-data",
          title: "Database"
        },
        {
          href: '/cloud',
          icon: "bx bx-cloud",
          title: "Weather"
        },
    
      ];

    let sidebarMenu;

    if(collapsed){
        sidebarMenu =  menuItems.map(({ href, icon, title }) => (
            <li key={title}>
                <Link href={href}>
                <a>
                    <div className={`flex justify-center ${styles.collapsedIconColor}`}>
                        <i aria-hidden className={`${icon} self-center ${styles.icon} relative p-3 `}></i>
                        {title!="Dashboard" &&
                            <i aria-hidden className={`fas fa-lock fa-xs align-top absolute right-3 `}></i>
                        }
                    </div>  
                </a>
                </Link>
            </li> 
        ))
        
    } else {
        sidebarMenu = 
        
        menuItems.map(({ href, icon, title }) => (
            <li key={title} className={styles.li}>
                <Link href={href}>
                    <a className={`flex px-3 rounded cursor-pointer ${styles.linkcolor}`}>
                        <div className={`flex ${styles.menuItems} `}> 
                            <div className={`${styles.menuIcon} text-center`}>
                                <i aria-hidden className={`${icon} bx-sm`}></i>
                            </div>
                            <div className={`${styles.menuTextText} flex`}>
                                <div className={`${styles.menuTextText}`}>
                                    <span>{title}</span>
                                </div>
                                {title!="Dashboard" &&
                                    <div className={` ${styles.menuTextIcon}`}>
                                        <i aria-hidden className="fas fa-lock fa-xs align-top"></i>
                                    </div>
                                }
                            </div>
                        </div>
                    </a>
                </Link>
            </li> 
        ))
    }

    let addpage;

    if(collapsed){
        addpage= 
            <Link href="/">
                <a>
                    <div className={`flex align-center justify-center ${styles.collapsedIconColor}`}>
                        <i aria-hidden className={`fas fa-plus ${styles.icon} relative p-3`}></i>
                        <i aria-hidden className="fas fa-lock fa-xs align-top absolute right-3"></i>
                    </div>
                </a>
            </Link>
    } else{
        addpage=
            <Link href="/">
                <a className={`flex px-3 rounded cursor-pointer ${styles.linkcolor}`}>
                    <div className={`flex ${styles.menuItems}`}>
                        <div className={`${styles.menuIcon} text-center`}>
                            <i aria-hidden className={`fas fa-plus fa-lg`}></i>
                        </div>
                        <div className={`${styles.menuTextText} flex`}>
                            <div className={`${styles.menuTextText}`}>
                                <span>AddPage</span>
                            </div>
                            <div className={styles.menuTextIcon}>
                                <i aria-hidden className="fas fa-lock fa-xs align-top"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
    }

    let help;

    if(collapsed){
        help  =
            <Link href="/">
                <a>
                    <div className={`flex align-center justify-center mb-3 ${styles.menuItems}`}>     
                            <i className={`bx bx-help-circle ${styles.icon} ${styles.settingHelpColor}`}></i>
                    </div>
                </a>
            </Link> 
    } else{
        help  =
            <div >
                <Link href="/">
                    <a className={`flex px-3 rounded cursor-pointer ${styles.settingHelpColor}`}>
                        <div className={`flex ${styles.menuItems}`}>
                            <div className={`${styles.menuIcon} text-center`}>
                                <i className='bx bx-help-circle bx-sm'></i>
                            </div>
                            <div className={`${styles.menuTextText} flex`}>
                                <div className={`${styles.menuTextText}`}>
                                    <span>Help</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link> 
            </div>
    }
    
    let settings;

    if(collapsed){
        settings= 
   
            <Link href="/">
                <a>
                    <div className={`flex items-center justify-center ${styles.menuItems}`}>
                        <i aria-hidden className={`fa fa-gear ${styles.icon} ${styles.settingHelpColor}`}></i>
                    </div>
                </a>
            </Link> 

    }else{
        settings= 
        
            <div className={`${styles.li}`}>
                <Link href="/">
                    <a className={`flex px-3 rounded cursor-pointer ${styles.settingHelpColor}`}>
                        <div className={`flex items-center ${styles.menuItems}`}>
                            <div className={`${styles.menuIcon} text-center`}>
                                <i aria-hidden className="fa fa-gear fa-lg"></i>
                            </div>
                            <div className={styles.menuTextText}>
                                <span>Settings</span>
                            </div>
                        </div>
                    </a>
                </Link> 
            </div>
    }
    

      
    return(
                <div className={`bg-white h-screen fixed relative m-0 p-0 sidebar ${collapsed?styles.sidebarCollapsed:styles.sidebarExpanded}`}>
                    <div className={`${styles.logoHeight}`}> 
                        <Link className="font-semibold" href="/">
                            <a className={`text-2xl flex justify-center items-center ${styles.titleLogo}`}>
                                <div>
                                    <Logo/>
                                </div>
                                <div className={collapsed?"hidden":"block"}>
                                    <Lima/>
                                </div>
                            </a>
                        </Link>
                        <i className={`bx ${collapsed?'bx-chevron-right':'bx-chevron-left'} bx-sm absolute cursor-pointer ${styles.toggleButton}`} id="btn" onClick={()=>toggleSidebar()}></i>
                    </div>
                    <ul >
                        {sidebarMenu}    
                    </ul>
                    <div className={`${styles.li} mt-5 `}>
                        {addpage}
                    </div>
                    <div className={`absolute bottom-10 w-full`}>
                        {help}
                        {settings}
                    </div>
                    <style jsx>
                        {`

                        `}
                    </style>
                </div>

    )
}