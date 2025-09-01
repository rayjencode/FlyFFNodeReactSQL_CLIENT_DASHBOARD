import React from 'react';

import styled, { keyframes } from 'styled-components';
import { ICONS_MAP, type IconType } from './icons';

interface Props {
   id?: string;
   icon: IconType;
   color: string;
   size: string;
   flip?: boolean;
   hovercolor?: string;
   mobilesize?: string;
}

const IconsLib = ({
   id = '',
   icon = 'heart-fill',
   size,
   color,
   flip,
   hovercolor = '',
   mobilesize = '14px',
}: Props) => {
   const IconComponent = ICONS_MAP[icon]; // Dynamically select the icon
   return IconComponent ? (
      <Wrapper
         id={id}
         //    icon={icon}
         flip={flip}
         $hovercolor={hovercolor} // Use transient prop $
         $mobilesize={mobilesize} // Use transient prop $
         size={size}
         color={color}
      >
         <IconComponent
            id={id}
            size={size}
            color={color}
            className={`${icon} ${
               icon === 'loader' ? 'iconlist_item_icon_loader' : ''
            }`}
         />
      </Wrapper>
   ) : null;
};

const spinnerAnimation = keyframes`
   from {transform: rotate(0deg);}
   to {transform: rotate(360deg);}
`;

const Wrapper = styled.div<{
   flip?: boolean;
   color: string;
   size: string;
   $mobilesize: string;
   $hovercolor: string;
}>`
   display: grid;
   line-height: 1.4;
   transform: ${({ flip }) => (flip ? 'scaleX(-1)' : '')};

   .iconlist_item_icon {
      display: block;
      line-height: 0;
      color: ${({ color }) => (color ? color : '')};
      width: ${({ size }) => (size ? size : '20px')};
      height: ${({ size }) => (size ? size : '20px')};
      transition: all 0.3s ease-in-out;
      :hover {
         color: ${({ $hovercolor }) => ($hovercolor ? $hovercolor : ``)};
         transition: all 0.3s ease-in-out;
      }
      @media (max-width: 640px) {
         width: ${({ $mobilesize }) => ($mobilesize ? $mobilesize : '20px')};
         height: ${({ $mobilesize }) => ($mobilesize ? $mobilesize : '20px')};
         transition: all 0.3s ease-in-out;
      }
   }
   .iconlist_item_icon_loader {
      line-height: 0;
      color: ${({ color }) => (color ? color : '')};
      width: ${({ size }) => (size ? size : '20px')};
      height: ${({ size }) => (size ? size : '20px')};
      transition: all 0.3s ease-in-out;

      animation: ${spinnerAnimation} 0.6s linear infinite;

      @media (max-width: 640px) {
         width: ${({ $mobilesize }) => ($mobilesize ? $mobilesize : '20px')};
         height: ${({ $mobilesize }) => ($mobilesize ? $mobilesize : '20px')};
         transition: all 0.3s ease-in-out;
      }
   }
`;

export default IconsLib;
