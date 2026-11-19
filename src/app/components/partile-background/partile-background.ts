import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, PLATFORM_ID, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [],
  templateUrl: './partile-background.html',
  styleUrl: './partile-background.css'
})
export class ParticleBackground
  implements AfterViewInit, OnDestroy {

  @ViewChild('particleCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];

  private animationId = 0;

  private width = 0;

  private height = 0;

  private readonly connectionDistance = 130;

  private readonly particleCount = 70;

  private reducedMotion = false;


  ngAfterViewInit(): void {

    if (!this.isBrowser) {
      return;
    }

    const context =
      this.canvas.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    this.ctx = context;

    this.resize();

    this.createParticles();

    this.reducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      this.drawStatic();
    } else {
      this.animate();
    }

    window.addEventListener(
      'resize',
      this.handleResize
    );
  }


  private resize(): void {

    const canvas =
      this.canvas.nativeElement;

    this.width =
      window.innerWidth;

    this.height =
      window.innerHeight;

    const devicePixelRatio =
      Math.min(window.devicePixelRatio || 1, 2);

    canvas.width =
      this.width * devicePixelRatio;

    canvas.height =
      this.height * devicePixelRatio;

    canvas.style.width =
      `${this.width}px`;

    canvas.style.height =
      `${this.height}px`;

    this.ctx.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );
  }


  private createParticles(): void {

    this.particles = [];

    const count =
      window.innerWidth < 768
        ? 35
        : this.particleCount;

    for (let i = 0; i < count; i++) {

      this.particles.push({

        x:
          Math.random() * this.width,

        y:
          Math.random() * this.height,

        vx:
          (Math.random() - 0.5) * 0.25,

        vy:
          (Math.random() - 0.5) * 0.25,

        radius:
          Math.random() * 1.5 + 0.5

      });

    }
  }


  /** Single still frame for visitors who prefer reduced motion. */
  private drawStatic(): void {

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawConnections();

    this.drawParticles();
  }


  private animate = (): void => {

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );


    this.updateParticles();

    this.drawConnections();

    this.drawParticles();


    this.animationId =
      requestAnimationFrame(
        this.animate
      );
  };


  private updateParticles(): void {

    for (const particle of this.particles) {

      particle.x += particle.vx;

      particle.y += particle.vy;


      if (
        particle.x < 0 ||
        particle.x > this.width
      ) {

        particle.vx *= -1;

      }


      if (
        particle.y < 0 ||
        particle.y > this.height
      ) {

        particle.vy *= -1;

      }

    }
  }


  private drawParticles(): void {

    for (const particle of this.particles) {

      this.ctx.beginPath();

      this.ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      this.ctx.fillStyle =
        'rgba(16, 185, 129, 0.35)';

      this.ctx.fill();
    }
  }


  private drawConnections(): void {

    for (
      let i = 0;
      i < this.particles.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < this.particles.length;
        j++
      ) {

        const a =
          this.particles[i];

        const b =
          this.particles[j];


        const dx =
          a.x - b.x;

        const dy =
          a.y - b.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (
          distance <
          this.connectionDistance
        ) {

          const opacity =
            1 -
            distance /
            this.connectionDistance;


          this.ctx.beginPath();

          this.ctx.moveTo(
            a.x,
            a.y
          );

          this.ctx.lineTo(
            b.x,
            b.y
          );

          this.ctx.strokeStyle =
            `rgba(99, 102, 241, ${opacity * 0.14})`;

          this.ctx.lineWidth = 0.6;

          this.ctx.stroke();
        }
      }
    }
  }


  ngOnDestroy(): void {

    if (!this.isBrowser) {
      return;
    }

    cancelAnimationFrame(
      this.animationId
    );

    window.removeEventListener(
      'resize',
      this.handleResize
    );
  }


  private handleResize = (): void => {

    this.resize();

    this.createParticles();

    if (this.reducedMotion) {
      this.drawStatic();
    }
  };

}