import React from 'react';
import { colors } from '@/constants/colors';
// import { DropdownActionType } from '@/types/shared';
// import { IconType } from '@/utils/icons';
import IconsLib from '@/utils/IconsLib';
import styled from 'styled-components';
import type { DropdownActionType } from '@/types/shared';
import type { IconType } from '@/utils/icons';

interface Props<T> {
   active: boolean;
   actions: DropdownActionType<T>[];
   width?: string;
   textdecoration?: string;
   top?: string;
   right?: string;
   selected?: unknown;
}

const Dropdown = <T,>({
   active,
   actions,
   textdecoration,
   width,
   top,
   right,
   selected,
}: Props<T>) => {
   return (
      <Wrapper
         $active={active ? 'true' : 'false'}
         $textdecoration={textdecoration ?? 'none'}
         $width={width ?? '120px'}
         $top={top ?? '0'}
         $right={right ?? '0'}
      >
         <List>
            {actions.map((item, index) => {
               return (
                  <Item key={index} onClick={() => item.onClick(selected as T)}>
                     <ItemContent>
                        <IconsLib
                           icon={item.icon as IconType}
                           size="20px"
                           color={colors.GRAY8}
                        />
                        <ItemLabel>{item.label}</ItemLabel>
                     </ItemContent>
                  </Item>
               );
            })}
         </List>
      </Wrapper>
   );
};

const Wrapper = styled.div<{
   $active: string;
   $textdecoration: string;
   $width: string;
   $top: string;
   $right: string;
}>`
   position: absolute;
   right: ${({ $right }) => $right};
   top: ${({ $top }) => $top};
   background: white;
   width: ${({ $width }) => $width};
   padding: 10px 0;
   border-radius: 4px;
   box-shadow: ${colors.BOXSHADOW};
   display: ${({ $active }) => ($active === 'true' ? 'block' : 'none')};
   text-decoration: ${({ $textdecoration }) => $textdecoration};
   z-index: 14;
`;
const List = styled.div``;
const Item = styled.div`
   padding: 5px 10px;

   &:not-last-child() {
      border-bottom: 1px solid ${colors.GRAY13};
   }
   &:hover {
      background-color: ${colors.GRAY14};
   }
`;

const ItemContent = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;

const ItemLabel = styled.p`
   font-size: 14px;
   color: ${colors.GRAY1};
`;
export default Dropdown;
