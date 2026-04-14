'use client'
import React, { useState } from "react";
import StackIcon from "tech-stack-icons";

const TechStack = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const techStack: string[] = ['react', 'nodejs', 'elastic', 'storybook', 'github', 'jenkins'];

  return (
    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
      {techStack.map((techName: string) => (
        <div
          key={techName}
          onMouseEnter={() => setHoveredIcon(techName)}
          onMouseLeave={() => setHoveredIcon(null)}
          style={{ position: 'relative', display: 'flex', cursor: 'default' }}
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
          {hoveredIcon === techName && (
            <span style={{
              position: 'absolute',
              bottom: 'calc(100% + 6px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--black)',
              color: 'var(--cream)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              padding: '4px 8px',
              borderRadius: '5px',
              pointerEvents: 'none',
            }}>
              {techName.charAt(0).toUpperCase() + techName.slice(1)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechStack;