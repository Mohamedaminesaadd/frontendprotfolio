import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";

/**
 * Hero profile card. Keeps the original terminal identity
 * ($ prompts + typing animation) inside a clean white card.
 */
@Component({
  selector: "app-terminal",
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./terminal.html",
  styleUrl: "./terminal.css"
})
export class Terminal implements OnInit, OnDestroy {

  readonly focusText = "AI · Cybersecurity · Blockchain · Distributed systems";

  /** Typed text — a signal so updates from requestAnimationFrame are tracked. */
  readonly focus = signal("");

  private animationFrame: number | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private isDestroyed = false;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    if (!this.isBrowser) {
      // Server render: show the full text (no animation).
      this.focus.set(this.focusText);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.focus.set(this.focusText);
      return;
    }

    this.timer = setTimeout(() => this.type(), 400);
  }

  private type(): void {
    let index = 0;
    let last = 0;
    this.focus.set("");

    const next = (timestamp: number) => {
      if (this.isDestroyed) return;

      if (timestamp - last >= 28) {
        index++;
        last = timestamp;
        this.focus.set(this.focusText.slice(0, index));
      }

      if (index < this.focusText.length) {
        this.animationFrame = requestAnimationFrame(next);
      }
    };

    this.animationFrame = requestAnimationFrame(next);
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;

    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
