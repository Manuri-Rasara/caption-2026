import TrueFocus from '../home/FallingText';

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <TrueFocus 
        sentence="Hey! You."
        manualMode={false}
        blurAmount={5}
        borderColor="blue"
        animationDuration={0.6}
        pauseBetweenAnimations={0.8}
      />
    </div>
  );
}
