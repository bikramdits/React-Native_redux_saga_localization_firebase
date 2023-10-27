import React, { useRef } from "react";

export default function useAnimation(
  animationName: string,
  onFinish: () => any,
): (React.MutableRefObject<null> | (() => any))[] {
  let ref = useRef(null);

  const animation = () =>
    ref.current[animationName](200).then(
      (endState: any) => endState.finished && onFinish()
    );
  return [ref, animation];
}
