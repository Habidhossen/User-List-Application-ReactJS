const Loading = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-purple-400 opacity-75"></span>
    </section>
  );
};

export default Loading;
