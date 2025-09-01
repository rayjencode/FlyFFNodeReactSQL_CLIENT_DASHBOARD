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
   margin-top: 1.5rem;
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 8px;
`;

const InputLabel = styled.p`
   font-weight: 600;
   font-size: 15px;
   color: ${colors.GRAY10};
`;

const SubLabel = styled.p`
   font-size: 15px;
   cursor: pointer;
   text-decoration: underline;
   color: ${colors.PRIMARY};
   font-weight: 600;
`;

const FormWrapper = styled.div`
   margin-top: 4px;
`;

const FormContent = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   border: 2px solid ${colors.MAIN_DARK90};
   border-radius: 4px;
   padding: 12px 14px;
   background-color: rgba(29, 29, 31, 0.8);
   transition: border-color 0.3s ease-in-out;

   &:focus-within {
      border-color: ${colors.PRIMARY};
   }
`;

const ValidationMsg = styled.p`
   margin-top: 6px;
   color: ${colors.DANGER};
   font-size: 14px;
   font-weight: 500;
`;

const Input = styled.input`
   width: 100%;
   outline: none;
   border: none;
   font-weight: 600;
   font-size: 16px;
   color: ${colors.WHITE};
   background-color: transparent;

   &::placeholder {
      color: ${colors.GRAY5};
   }
`;

export default LoginInput;
