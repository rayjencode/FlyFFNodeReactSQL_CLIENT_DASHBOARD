import { colors } from '@/constants/colors';
import type { IconType } from '@/utils/icons';
import IconsLib from '@/utils/IconsLib';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
   title: string;
   subtitle: string;
   onSubtitleClick?: () => void;
   type: 'text' | 'password';
   hasIcon?: boolean;
   icon?: IconType;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   name?: string;
}

const LoginInput = ({
   title,
   subtitle,
   onSubtitleClick,
   type,
   hasIcon,
   icon,
   value,
   onChange,
   name,
}: Props) => {
   const [isFocused, setIsFocused] = useState(false);
   const [isHovered, setIsHovered] = useState(false);

   const handleFocus = () => {
      setIsFocused(true);
   };

   const handleBlur = () => {
      setIsFocused(false);
   };

   const handleMouseEnter = () => {
      setIsHovered(true);
   };

   const handleMouseLeave = () => {
      setIsHovered(false);
   };

   const isFocusedOrHovered = isFocused || isHovered;

   const handleSubtitleClick = () => {
      // console.log(`------>`);
      onSubtitleClick?.();
   };

   return (
      <Wrapper>
         <Top>
            <InputLabel>{title}</InputLabel>
            <SubLabel onClick={() => handleSubtitleClick()}>
               {subtitle}
            </SubLabel>
         </Top>

         <FormWrapper>
            <FormContent>
               <Input
                  type={type}
                  value={value}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={title}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  name={name}
               />
               {hasIcon && icon && (
                  <IconsLib icon={icon} color={colors.DANGER} size="20px" />
               )}
            </FormContent>
            {!value && <ValidationMsg>{title} is required</ValidationMsg>}
         </FormWrapper>
      </Wrapper>
   );
};

const Wrapper = styled.div`
   margin-top: 1rem;
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const InputLabel = styled.p`
   font-weight: 600;
   font-size: 15px;
`;

const SubLabel = styled.p`
   font-size: 15px;
   cursor: pointer;
   text-decoration: underline;
`;

const FormWrapper = styled.div`
   margin-top: 4px;
`;

const FormContent = styled.div`
   display: flex;
   align-items: center;
   gap: 5px;
   border: 1px solid ${colors.GRAY4};
   border-radius: 4px;
   padding: 9px 10px;
`;

const ValidationMsg = styled.p`
   margin-top: 5px;
   color: ${colors.DANGER};
   font-size: 14px;
   font-weight: 500;
`;

const Input = styled.input`
   width: 100%;
   outline: none;
   border: none;
   font-weight: 600;
   font-size: 14px;
   color: ${colors.GRAY1};
`;

export default LoginInput;
