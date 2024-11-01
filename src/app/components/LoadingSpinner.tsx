const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
          <div className="absolute top-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-primary animate-spin rotate-45"></div>
          <div className="absolute top-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-primary animate-spin rotate-90"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;