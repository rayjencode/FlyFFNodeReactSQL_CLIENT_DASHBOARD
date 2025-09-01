import { colors } from '@/constants/colors';
import IconsLib from '@/utils/IconsLib';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import type { IconType } from '@/utils/icons';
import useSaveChangesStore from '@/store/useSaveChangesStore';

interface Props {
   active: string;
}

interface MenuItem {
   id: string;
   name: string;
   icon: IconType;
   link: string;
}

const SideNav = ({ active }: Props) => {
   const { handleSave, isLoading, handleDiscard } = useSaveChangesStore();
   const [activeItem, setActiveItem] = useState(active);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const location = useLocation();

   const menu: MenuItem[] = [
      {
         id: 'dashboard',
         name: 'Dashboard',
         icon: 'home-5-fill',
         link: '/admin',
      },
      {
         id: 'players',
         name: 'Players',
         icon: 'home-5-fill',
         link: '/players',
      },
   ];

   const handleSelected = (id: string) => {
      setActiveItem(id);
      // Close mobile menu when item is selected
      if (window.innerWidth <= 768) {
         setIsMobileMenuOpen(false);
      }
   };

   useEffect(() => {
      const currentPath = location.pathname;
      const matchingItem = menu.find((item) => item.link === currentPath);
      handleDiscard();
      if (matchingItem) {
         setActiveItem(matchingItem.id);
      }
   }, [location.pathname]);

   return (
      <>
         <MobileToggle onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <IconsLib
               icon={isMobileMenuOpen ? 'close-line' : 'menu-line'}
               size="24px"
               color="white"
            />
         </MobileToggle>

         <Wrapper $isMobileOpen={isMobileMenuOpen}>
            <Link to="/admin">
               <LogoWrapper>
                  <Logo src="/logo.png" />
               </LogoWrapper>
            </Link>

            {menu.map((item, index) => (
               <Item
                  $active={activeItem === item.id}
                  key={index}
                  onClick={() => handleSelected(item.id)}
               >
                  <Link to={item.link}>
                     <ItemContent className="nav-link">
                        <IconsLib
                           icon={
                              activeItem === item.id
                                 ? item.icon
                                 : (`${item.icon.replace(
                                      '-fill',
                                      '-line'
                                   )}` as IconType)
                           }
                           size="20px"
                           color={
                              activeItem === item.id
                                 ? colors.SECONDARY
                                 : colors.GRAY1
                           }
                        />
                        <ItemLabel $active={activeItem === item.id}>
                           {item.name}
                        </ItemLabel>
                     </ItemContent>
                  </Link>
               </Item>
            ))}
         </Wrapper>
      </>
   );
};

const MobileToggle = styled.button`
   outline: none;
   border: none;
   display: none;
   position: fixed;
   bottom: 1rem;
   left: 1rem;
   z-index: 1000;
   background: ${colors.PRIMARY};
   /* border: 1px solid ${colors.GRAY14}; */
   border-radius: 50px;
   padding: 0.5rem;
   cursor: pointer;
   /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */

   @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
   }
`;

const Wrapper = styled.div<{
   $isMobileOpen: boolean;
}>`
   padding: 1rem;
   display: flex;
   justify-content: flex-start;
   flex-direction: column;
   gap: 10px;
   transition: all 0.3s ease-in-out;
   border-right: 1px solid ${colors.GRAY14};
   background: white;
   height: 100vh;

   width: 250px;

   @media (max-width: 768px) {
      transform: translateX(
         ${({ $isMobileOpen }) => ($isMobileOpen ? '0' : '-100%')}
      );
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      /* width: 200px; */
      /* padding: 0.75rem; */
      box-shadow: ${({ $isMobileOpen }) =>
         $isMobileOpen ? '2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
   }

   @media (max-width: 480px) {
      /* width: 60px; */
      /* padding: 0.5rem; */
   }

   /* :hover {
      .nav-link {
         background-color: ${colors.GRAY14};
         transition: all 0.3s ease-in-out;
      }
   } */
`;

const Item = styled.div<{
   $active: boolean;
}>`
   width: 100%;
   background: ${({ $active }) => ($active ? colors.PRIMARY : 'transparent')};
   border-radius: 5px;
   :hover {
      border-radius: 5px;
      background-color: ${({ $active }) =>
         $active ? colors.PRIMARY : colors.GRAY14};
   }

   /* @media (max-width: 768px) {
      border-radius: 8px;
      :hover {
         border-radius: 8px;
      }
   } */
`;

const ItemContent = styled.div`
   display: flex;
   align-items: center;
   padding: 10px;
   gap: 5px;

   @media (max-width: 768px) {
      /* padding: 12px; */
      /* gap: 8px; */
      /* justify-content: center; */
   }

   @media (max-width: 480px) {
      /* padding: 10px; */
      /* gap: 6px; */
   }
`;

const ItemLabel = styled.p<{
   $active: boolean;
}>`
   color: ${({ $active }) => ($active ? 'white' : colors.GRAY1)};
   font-weight: ${({ $active }) => ($active ? 600 : 400)};
   font-size: 14px;

   @media (max-width: 768px) {
      /* display: none; */
   }
`;

const LogoWrapper = styled.div`
   cursor: pointer;
   margin-bottom: 1rem;

   width: 100px;
   height: 45px;
   margin-right: auto;
   margin-left: auto;

   @media (max-width: 768px) {
      /* margin-bottom: 0.75rem; */
      /* text-align: center; */
   }

   @media (max-width: 480px) {
      /* margin-bottom: 0.5rem; */
   }
`;

const Logo = styled.img`
   width: 100px;

   @media (max-width: 768px) {
      /* width: 100px; */
   }

   @media (max-width: 480px) {
      /* width: 80px; */
   }
`;

export default SideNav;
