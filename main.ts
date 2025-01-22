import { MarkdownPostProcessorContext, Plugin, Notice } from 'obsidian';
import {spawn} from 'child_process';

export default class Runsh extends Plugin {
  async onload() {
	this.registerMarkdownCodeBlockProcessor("runsh", this.processRunshBlock.bind(this))
  }

  async processRunshBlock(source: string, el:HTMLElement, ctx: MarkdownPostProcessorContext) {
	// Split to code and fluff by "%%%"
	const [cmd, ...fluff] = source.split("%%%")

	// Use fluff as button text if present, otherwise use the "Run command" as default
	const button = el.createEl("button", {text: fluff.length > 0 ? fluff.join(" ") : "Run command"})
	// Add tooltip with command
	button.setAttribute("title", cmd)

	button.on("click", "button", () => { clickHandler(cmd) })
  }
}

const clickHandler = async (cmd: string) => {
	new Notice("Running: " + cmd);

	spawn(cmd, {shell: true, detached: true, stdio: "ignore"})
}
