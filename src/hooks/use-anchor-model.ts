import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject } from "react";
import { Group, MathUtils, Object3DEventMap, Vector3 } from "three";
import { lerp } from "three/src/math/MathUtils.js";

type UseAnchorModelProps = {
  model: RefObject<Group<Object3DEventMap> | null>;
  lerpAlpha?: number;
  scrollThreshold?: number;
  uiFixedScale?: number; // size of model after scroll;
  repositionModel?: boolean;
  endPos?: Vector3; // normalized device coordinates to anchor to
  startPos?: Vector3; // starting position of the model
};

/**
 * moves a model to the bottom right of the screen on scroll
 */
export function useAnchorModel({
  model,
  lerpAlpha = 0.1,
  scrollThreshold = 0.5 / 3,
  uiFixedScale = 0.8,
  repositionModel = false,
  endPos = new Vector3(0.75, -0.75, 0),
  startPos,
}: UseAnchorModelProps) {
  const scroll = useScroll();
  const { width, height, camera } = useThree((state) => ({
    width: state.viewport.width,
    height: state.viewport.height,
    camera: state.camera,
  }));

  // move to endPos and scale down as we scroll down
  useFrame(() => {
    if (!model.current || !scroll) return;
    const head = model.current;
    const { offset } = scroll;

    // compute parameter t in [0,1] relative to the threshold
    const localT = MathUtils.clamp(offset / scrollThreshold, 0, 1);

    // move to offset x and y
    if (repositionModel) {
      if (startPos) head.position.copy(startPos);
      // const offsetX = (localT * width) / 1.6;
      // const offsetY = (localT * -height) / 1.6;
      // head.position.x = MathUtils.lerp(head.position.x, offsetX, lerpAlpha);
      // head.position.y = MathUtils.lerp(head.position.y, offsetY, lerpAlpha);
      const ndc = endPos;
      ndc.unproject(camera);
      ndc.z = head.position.z;
      head.position.lerpVectors(head.position, ndc, localT * lerpAlpha);
    }

    // Scale down
    if (offset >= scrollThreshold) {
      // scale down as we scroll past first page
      const targetScale = 0.4;
      head.scale.lerp(new Vector3().setScalar(targetScale), 0.1);
    } else {
      // scale back to normal when on first page
      head.scale.lerp(new Vector3().setScalar(uiFixedScale), 0.1);
    }
  });
}
