import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModalRedux } from "../../reducer/event";
import { useTranslation } from "react-i18next";
import { ApiServer } from "../../ApiServer/api";
export default function DeleteModal() {
  const { deleteModal,deletePhotoId } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function closeModal() {
    dispatch(DeleteModalRedux());
  }
  const handleDelete=()=>{
    dispatch(DeleteModalRedux());
    const fetchData = async () => {
        try {
          await ApiServer.delData(`/image/${deletePhotoId}/`);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
  }

  return (
    <>
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl tg-theme-color p-6 text-left align-middle shadow-xl transition-all z-[999]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {t("photo_h1")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <h1 className="text-sm opacity-[0.7]">
                     {t("photo_p")}
                    </h1>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      {t("delete_btn")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
