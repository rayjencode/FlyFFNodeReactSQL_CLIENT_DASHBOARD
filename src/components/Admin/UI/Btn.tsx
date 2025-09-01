import { colors } from '@/constants/colors';
import type { IconType } from '@/utils/icons';
import IconsLib from '@/utils/IconsLib';

import styled from 'styled-components';

interface Props {
   title: string;
   type: 'normal' | 'default' | 'outline' | 'disabled';
   textcolor?: string;
   bgcolor?: string;
   size?: 'small' | 'medium' | 'large';
   hasIcon?: boolean;
   icon?: IconType;
   iconPosition?: 'left' | 'right';
   onClick?: () => void;
}

const Btn = ({
   title,
   type,
   textcolor,
   bgcolor,
   size = 'medium',
   hasIcon,
   icon,
   iconPosition,
   onClick,
}: Props) => {
   switch (type) {
      case 'normal':
         return (
            <ButtonNormal
               $bgcolor={bgcolor ?? ''}
               $size={size}
               onClick={onClick}
            >
               {hasIcon && iconPosition === 'left' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
               <Span $textcolor={textcolor ?? ''}>{title}</Span>
               {hasIcon && iconPosition === 'right' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
            </ButtonNormal>
         );
      case 'default':
         return (
            <ButtonDefault
               $bgcolor={bgcolor ?? ''}
               $size={size}
               onClick={onClick}
            >
               {hasIcon && iconPosition === 'left' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
               <Span $textcolor={textcolor ?? ''}>{title}</Span>
               {hasIcon && iconPosition === 'right' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
            </ButtonDefault>
         );
      case 'outline':
         return (
            <ButtonOutline
               $bgcolor={bgcolor ?? ''}
               $size={size}
               onClick={onClick}
            >
               {hasIcon && iconPosition === 'left' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
               <Span $textcolor={textcolor ?? ''}>{title}</Span>
               {hasIcon && iconPosition === 'right' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
            </ButtonOutline>
         );
      case 'disabled':
         return (
            <ButtonDisabled
               $bgcolor={bgcolor ?? ''}
               $size={size}
               onClick={onClick}
            >
               {hasIcon && iconPosition === 'left' && (
                  <IconsLib
                     icon={icon ?? 'sample'}
                     size="20px"
                     color={colors.GRAY8}
                  />
               )}
               <Span $textcolor={textcolor ?? ''}>{title}</Span>
               {hasIcon && iconPosition === 'right' && (
                  <IconsLib
                     icon={icon ?? 'sample'}
                     size="20px"
                     color={colors.GRAY8}
                  />
               )}
            </ButtonDisabled>
         );
      default:
         return (
            <ButtonNormal
               $bgcolor={bgcolor ?? ''}
               $size={size}
               onClick={onClick}
            >
               {hasIcon && iconPosition === 'left' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
               <Span $textcolor={textcolor ?? ''}>{title}</Span>
               {hasIcon && iconPosition === 'right' && (
                  <IconsLib icon={icon ?? 'sample'} size="20px" color="white" />
               )}
            </ButtonNormal>
         );
   }
};

const ButtonNormal = styled.button<{
   $bgcolor: string;
   $size: string;
}>`
   outline: none;
   border: none;
   display: flex;
   gap: 10px;
   justify-content: center;
   align-items: center;
   background: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : colors.GRAY13)};
   padding: ${({ $size }) =>
      $size === 'small'
         ? '5px 7px'
         : $size === 'medium'
         ? '10px 1rem'
         : '15px 2rem'};
   border-radius: 4px;
   width: 150px;
   &:hover {
      opacity: 0.9;
   }
`;

const ButtonDefault = styled.button<{
   $bgcolor: string;
   $size: string;
}>`
   outline: none;
   border: none;
   display: flex;
   gap: 10px;
   justify-content: center;
   align-items: center;
   background: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : colors.GRAY13)};
   padding: ${({ $size }) =>
      $size === 'small'
         ? '5px 7px'
         : $size === 'medium'
         ? '10px 1rem'
         : '15px 2rem'};
   border-radius: 4px;
   width: 150px;
   &:hover {
      opacity: 0.9;
   }
`;
const ButtonDisabled = styled.button<{
   $bgcolor: string;
   $size: string;
}>`
   outline: none;
   border: none;
   display: flex;
   gap: 10px;
   justify-content: center;
   align-items: center;
   background: ${colors.GRAY13};
   padding: ${({ $size }) =>
      $size === 'small'
         ? '5px 7px'
         : $size === 'medium'
         ? '10px 1rem'
         : '15px 2rem'};
   border-radius: 4px;
   cursor: not-allowed;
   width: 150px;
   &:hover {
      opacity: 0.9;
   }
`;

const ButtonOutline = styled.button<{
   $bgcolor: string;
   $size: string;
}>`
   outline: none;
   border: ${({ $bgcolor }) =>
      $bgcolor ? `1px solid ${$bgcolor}` : `1px solid ${colors.GRAY13}`};
   display: flex;
   gap: 10px;
   justify-content: center;
   align-items: center;
   border-radius: 4px;
   background: none;
   width: 150px;
   padding: ${({ $size }) =>
      $size === 'small'
         ? '5px 7px'
         : $size === 'medium'
         ? '10px 1rem'
         : '15px 2rem'};
`;

const Span = styled.span<{
   $textcolor: string;
}>`
   color: ${({ $textcolor }) => ($textcolor ? $textcolor : colors.GRAY1)};
   font-size: 15px;
   font-weight: 600;
`;

export default Btn;
