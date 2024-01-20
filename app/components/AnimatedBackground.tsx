// Author: Thomas
'use client'
import React, { useRef, useEffect } from 'react';

interface Dot {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  }

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Only proceed if the canvas is not null to ensure we don't attempt to access non-rendered canvas element
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return; // Also check for context not being null before starting drawing logic

        //particle settings
        const numberOfParticles = 30;
        const particles: Particle[] = []; // Array of Particle

        // create particles
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5, // Particles are slower than dots
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

         // Dot settings
        const numberOfDots = 100;
        const maxDistance = 150; // Distance for drawing lines between dots
        const dots: Dot[] = []; // Array of Dot

        // Create dots
        for (let i = 0; i < numberOfDots; i++) {
            dots.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }

        // method to draw lines between each other
        const drawLine = (dot1: Dot, dot2: Dot) => {
            context.beginPath();
            context.moveTo(dot1.x, dot1.y);
            context.lineTo(dot2.x, dot2.y);
            context.stroke();
    }; 

        // Matches canvas to window size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation logic starts here - updates frames
    const update = () => {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clears previous frame

      // Draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Passes through edges to the other side of the window
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) particle.y = 0;

        context.shadowBlur = 0; // Disables glow for the particles

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        context.fill();
      });

      context.shadowBlur = 15;
      context.shadowColor = "#FFF";

      // Draw dots
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edge
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // 
        context.beginPath();
        context.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        context.fillStyle = 'rgb(173, 216, 230)';
        context.fill();
      });

      // Dots draw lines to each other
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            context.strokeStyle = `rgba(255,255,255,${(1 - distance / maxDistance)})`;
            drawLine(dots[i], dots[j]);
          }
        }
      }
      // Resetting so it doesn't affect the clock
      context.shadowBlur = 0;

      /*
      // Get current time
      const currentTime = time();
      

      // Styling clock
      context.font = '68px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'top';
      
      const paddingTop = 80;
      context.fillText(currentTime, canvas.width / 2, paddingTop / 2);
      */
      requestAnimationFrame(update); // call on browser API to call for update on frame
    };

    update();

     // Add the event listener after the null checks, to listen for window resize
     window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize); // Cleanup to prevent memory leaks 
        };
      }
    }, 
[]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default AnimatedBackground;