export type DropdownActionType<T> = {
   icon: string;
   label: string;
   onClick: (data: T) => void;
};

export type SelectOption = {
   _id: string;
   name: string;
   srcIcon?: string;
};
