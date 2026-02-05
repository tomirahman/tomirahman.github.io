const techStack = [
  "REACT.JS",
  "NODE.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "ETHEREUM",
  "SOLANA",
  "VALIDATOR OPS",
  "LINUX",
  "DOCKER",
  "GIT",
  "COMMUNITY BUILDING",
  "DISCORD",
  "TELEGRAM",
];

const TechMarquee = () => {
  // Duplicate the array for seamless infinite scroll
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden bg-primary py-4">
      {/* Gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedTech.map((tech, index) => (
          <span
            key={index}
            className="mx-4 font-body text-sm md:text-base font-medium text-primary-foreground tracking-wider inline-flex items-center"
          >
            {tech}
            <span className="mx-4 text-primary-foreground/50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
