import { useRive, Layout, Fit } from "@rive-app/react-canvas";

export const RiveBackground = (props: any) => {
  const { RiveComponent } = useRive({
    src: "/rivs/forgot_pass_form_v7.riv",
    artboard: "Background",
    layout: new Layout({
      fit: Fit.Cover,
    }),
  });

  return <RiveComponent {...props} />;
};

export default RiveBackground;
