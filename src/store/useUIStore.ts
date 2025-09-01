import { create } from 'zustand';

export interface State<T = unknown> {
   show: boolean;
   template?: string;
   title?: string;
   windowType?: 'mobile' | 'desktop';
   mobileSettings?: { height: string };
   data?: T;
   actions?: {
      onConfirm?: (data: T) => void;
      onCancel?: () => void;
   };
   refresh: number;
   handleShow: (value: Partial<State>) => void;
   handleClose: () => void;
   outsideClickId?: string;
   handleOutsideClick: (id: string) => void;
   handleRefresh: () => void;
}

export const useUIStore = create<State>((set) => ({
   show: false,
   template: '',
   title: '',
   windowType: 'desktop',
   mobileSettings: {
      height: '100%',
   },
   data: null,
   actions: undefined,
   refresh: 0,
   handleShow: (value) =>
      set((state) => ({
         ...state,
         show: true,
         template: value.template,
         title: value.title,
         windowType: value.windowType,
         mobileSettings: value.mobileSettings,
         data: value.data,
         actions: value.actions,
      })),

   handleClose: () => set({ show: false }),
   handleOutsideClick: (id: string) => set({ outsideClickId: id }),
   handleRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));
