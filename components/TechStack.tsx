'use client'
import React, { useState } from "react";
import StackIcon from "tech-stack-icons";

const TechStack = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const techStack: string[] = ['react', 'nodejs', 'elastic', 'storybook', 'js'];

  return (
    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
      {techStack.map((techName: string) => (
        <div
          key={techName}
          onMouseEnter={() => setHoveredIcon(techName)}
          onMouseLeave={() => setHoveredIcon(null)}
          style={{ display: 'flex', cursor: 'default' }}
        >
          <StackIcon 
            name={techName} 
            variant={hoveredIcon === techName ? undefined : 'grayscale'} 
            className="hero-tech-icon" 
            style={{ 
              width: 30, 
              height: 30, 
              marginRight: '10px',
              transition: 'all 0.3s ease' 
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default TechStack;