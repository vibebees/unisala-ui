import { useIonToast } from "@ionic/react";

function useCustomToast() {
  const [present] = useIonToast();

  const showToast = (message, duration = 2000) => {
    present({
      message: message,
      duration: duration,
      // Add any default options you want to standardize across your application
      // position: 'top',
      // buttons: [{ text: 'Done', role: 'cancel' }],
    });
  };

  return showToast;
}

export default useCustomToast;
