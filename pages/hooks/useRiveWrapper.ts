import {useRive} from '@rive-app/react-canvas';

const useRiveWrapper = () => {
  const {rive, RiveComponent} = useRive({
    src: "/rivs/forgot_pass_form_v7.riv",
    artboard: "Forget Flow",
    stateMachines: "Forget Machine",
    autoplay: true,
  });

  return {
    rive,
    RiveComponent,
  };
};

export default useRiveWrapper;
