import React from "react";
import "./CoconutPile.css";
import { coconutVariants } from "./svg/ClosedCoconuts";
import { useCoconutContext } from "./CoconutContext";

const CoconutPile: React.FC = () => {
  const { coconuts, setCoconuts, coconutId, setCoconutId } = useCoconutContext();

  function dropCoconut() {
    const fallArea = 420 * 0.3;
    const fallX = Math.round(Math.random() * fallArea) + (420 - fallArea);
    const pileX = Math.round((Math.random() - 0.5) * 120);
    const pileY = Math.round((Math.random() ** 2) * 40);
    const pileRot = Math.round((Math.random() - 0.5) * 38);
    const roll = Math.round((Math.random() - 0.5) * 40);
    const variant = Math.floor(Math.random() * coconutVariants.length);
    setCoconuts(cocos => [...cocos, {
      id: coconutId,
      animating: true,
      x: fallX + pileX,
      y: pileY,
      rot: pileRot,
      roll,
      variant,
      fallX
    }]);
    setCoconutId(id => id + 1);
  }

  function handleCoconutAnimationEnd(id: number) {
    setCoconuts(cocos => cocos.map(c => c.id === id ? { ...c, animating: false } : c));
  }

  (window as any).dropCoconut = dropCoconut;

  return (
    <div className="coconut-pile">
      {coconuts.map((coco, i) => {
        const Coconut = coconutVariants[coco.variant];
        return (
          <span
            key={coco.id}
            className={`coconut-emoji${coco.animating ? ' coconut-falling' : ''}`}
            style={{
              right: `${24 + 420 - (coco.x)}px`,
              bottom: `${2 + coco.y}px`, // Ändra från 18 till 2 för att sänka nötterna
              zIndex: 40 + i,
              transform: `rotate(${coco.animating ? coco.rot : coco.rot + coco.roll}deg)`
            }}
            aria-label="cocosnöt"
            onAnimationEnd={() => handleCoconutAnimationEnd(coco.id)}
          >
            <Coconut />
          </span>
        );
      })}
    </div>
  );
};

export default CoconutPile;
