import workingIllustration from '../assets/Working from anywhere-rafiki.svg';

export default function AuthIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Imported SVG Illustration */}
      <img 
        src={workingIllustration} 
        alt="Working from anywhere" 
        className="w-full max-w-[450px]" 
      />
    </div>
  );
}
