export default function Button({ children, onClick, type }) {
    const baseClasses =
      "p-5 rounded-lg text-xl font-semibold transition-all duration-150 active:scale-95";
  
    
    const colorClasses =
      children === "="
        ? "bg-blue-500 text-white hover:bg-blue-400"
        : type === "special"
        ? "bg-orange-500 text-white hover:bg-orange-400"
        : "bg-green-600 text-white hover:bg-green-500";
  
    return (
      <button className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  
  