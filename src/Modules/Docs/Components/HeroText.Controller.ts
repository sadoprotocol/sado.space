import { Controller } from "@valkyr/solid";

import { config } from "../Config";

const DELAY_TIMER = 2000;

export class HeroTextController extends Controller<{
  prefix: string;
  text: string;
}> {
  current = 0;

  timeout?: any;

  async onInit() {
    this.setState({
      prefix: config.hero.title,
      text: config.hero.marqee[this.current]
    });
    this.timeout = setTimeout(() => {
      this.#removeText(this.state.text);
    }, DELAY_TIMER);
  }

  async onDestroy() {
    clearTimeout(this.timeout);
  }

  #addText(text: string, pos: number) {
    this.timeout = setTimeout(() => {
      this.setState({ text: text.slice(0, pos) });
      if (pos < text.length) {
        this.#addText(text, pos + 1);
      } else {
        this.timeout = setTimeout(() => {
          this.#removeText(this.state.text);
        }, DELAY_TIMER);
      }
    }, Math.floor(Math.random() * 50) + 50);
  }

  #removeText(text: string) {
    const remaining = text.length - 1;
    this.timeout = setTimeout(() => {
      if (remaining >= 0) {
        this.setState({ text: text.slice(0, remaining) });
        if (remaining !== 0) {
          this.#removeText(this.state.text);
        } else {
          this.#addText(this.#getNext(), 0);
        }
      }
    }, Math.floor(Math.random() * 5) + 30);
  }

  #getNext() {
    this.current += 1;
    if (this.current >= config.hero.marqee.length) {
      this.current = 0;
    }
    return config.hero.marqee[this.current];
  }
}
