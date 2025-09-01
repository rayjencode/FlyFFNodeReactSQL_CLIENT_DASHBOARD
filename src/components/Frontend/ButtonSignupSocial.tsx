import { colors } from '@/constants/colors';
import React from 'react';
import styled from 'styled-components';
import IconsLib from '@/utils/IconsLib';

interface Props {
   title: string;
   logo: string;
}

const LogoIcon = ({ logo }: { logo: string }) => {
   switch (logo) {
      case 'google':
         return (
            <IconLogoWrapper>
               <IconLogo src="/brand/google.webp" />
            </IconLogoWrapper>
         );
      case 'facebook':
         return (
            <IconLogoWrapper>
               <IconLogo src="/brand/facebook.webp" />
            </IconLogoWrapper>
         );
      case 'email':
         return (
            <IconLogoWrapper>
               <IconsLib
                  icon="mail-line"
                  size="24px"
                  color={colors.GRAY1}
                  hovercolor="white"
               />
            </IconLogoWrapper>
         );
      default:
         return null;
   }
};

const ButtonSignupSocial = ({ title, logo }: Props) => {
   return (
      <Wrapper>
         <Content>
            <LogoIcon logo={logo} />
            <Label className="logo-icon-label">{title}</Label>
         </Content>
      </Wrapper>
   );
};
const Wrapper = styled.div`
   border: 1px solid ${colors.GRAY1};
   border-radius: 5px;

   cursor: pointer;

   margin-bottom: 10px;
   width: 100%;
   :hover {
      background: ${colors.GRAY_DARK};
      .logo-icon-label {
         color: white;
      }
      .iconlist_item_icon {
         color: white !important;
      }
   }
`;

const Content = styled.div`
   display: flex;
   align-items: center;
   padding: 5px;
   justify-content: center;
`;
const Label = styled.p`
   font-size: 15px;
   /* padding: 10px 1rem; */
`;
const IconLogoWrapper = styled.div`
   width: 30px;
   height: 30px;
   overflow: hidden;
   padding: 5px;

   display: flex;
   justify-content: center;
`;
const IconLogo = styled.img`
   object-fit: contain;
   width: auto;
   height: auto;
   max-width: 100%;
   max-height: 100%;
`;

export default ButtonSignupSocial;
