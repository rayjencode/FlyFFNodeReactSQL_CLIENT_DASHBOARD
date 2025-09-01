import { toast } from 'react-toastify';
// import { updateStore } from '@/api/store';
import { create } from 'zustand';

interface CustomizationValues {
   store: string;
   storename: string;
   location: string;
   settings: {
      btnColor: string;
      btnLabel: string;
      btnEmbed: string;
      designTheme: string;
      colorTheme: string;
      imgs: string[];
   };
}

interface State {
   showSave: boolean;
   valuesSave: CustomizationValues | null;
   typeSave: string | null;
   isLoading: boolean;
   handleShowSave: (show: boolean) => void;
   handleCloseSave: () => void;
   handleValues: (
      values: CustomizationValues | null,
      type: string | null
   ) => void;
   handleSave: () => void;
   successSave: boolean;
   handleDiscard: () => void;
   handleSuccessSave: (value: boolean) => void;
}

const useSaveChangesStore = create<State>((set, get) => ({
   showSave: false,
   valuesSave: null,
   typeSave: null,
   isLoading: false,
   successSave: false,
   handleShowSave: (show) => set({ showSave: show }),
   handleCloseSave: () => set({ showSave: false }),
   handleValues: (values, type) => set({ valuesSave: values, typeSave: type }),
   handleSave: async () => {
      if (get().isLoading) return;
      set({ isLoading: true });
      //   const { valuesSave, typeSave } = get();
      //   if (typeSave === 'customization' && valuesSave) {
      //      // console.log(`customization`, valuesSave);

      //      await new Promise((resolve) => setTimeout(resolve, 3000));

      //      updateStore({
      //         storeId: valuesSave.store,
      //         storename: valuesSave.storename,
      //         location: valuesSave.location,
      //         settings: {
      //            btnColor: valuesSave.settings.btnColor,
      //            btnLabel: valuesSave.settings.btnLabel,
      //            btnEmbed: valuesSave.settings.btnEmbed,
      //            designTheme: valuesSave.settings.designTheme as
      //               | 'modern'
      //               | 'classic'
      //               | 'swipe',
      //            colorTheme: valuesSave.settings.colorTheme || '#B3D946',
      //            imgs: valuesSave.settings.imgs || [],
      //         },
      //      })
      //         .then(async (res) => {
      //            toast.success(res.data.msg, {
      //               position: 'bottom-center',
      //               autoClose: 2500,
      //               hideProgressBar: false,
      //               closeOnClick: true,
      //               pauseOnHover: true,
      //               draggable: true,
      //            });

      //            await new Promise((resolve) => setTimeout(resolve, 300));
      //            // handleRefresh();
      //            // Update initial values after successful save
      //            // initialValuesRef.current = values;
      //            // handleShowSave(false);
      //            set({ showSave: false, successSave: true });
      //         })
      //         .catch((err) => {
      //            console.log(`Error`, err);
      //            toast.error('Server Error', {
      //               position: 'bottom-center',
      //               autoClose: 2500,
      //               hideProgressBar: false,
      //               closeOnClick: true,
      //               pauseOnHover: true,
      //               draggable: true,
      //            });
      //         })
      //         .finally(() => {
      //            set({ isLoading: false });
      //            set({ successSave: false });
      //            // set({ successSave: false });
      //            // setIsSubmitting(false);
      //         });
      //      // Here you can implement the save logic for customization
      //      // For example, call updateStore with the values
      //   }
   },
   handleDiscard: () => {
      set({ showSave: false });
      set({ successSave: false });
   },
   handleSuccessSave: (value: boolean) => {
      set({ successSave: value });
   },
}));

export default useSaveChangesStore;
