"use client";
import { marked } from "marked";
import Image from "next/image";
import { useEffect, useState } from "react";

declare const window: any;

export default function Home() {
  const [lines, updLines] = useState<string[]>(["Terminal v1.0.0 [by Gavin, in React]"]);
  function setLines(newLines: string[]) {
    const markedLines = newLines.map(line => marked(line));
    updLines(markedLines as string[]);
  }
  function runCommand(value: string) {
    // Create a new array from the current lines
    let newLines = [...lines, `<span style="color:#0f0;">gavingogaming</span><span style="color:#f00;">@</span><span style="color:#0f0;">personal:</span><span style="color:#00f;">~</span><span style="color:#ff0;">$</span> ${value}`];
  
    const args = value.split(" "); 
    switch (args[0]) {
      case "help":
        newLines = [
          ...newLines,
          "[ list of commands ]",
          "{ help, clear, projects, socials }"
        ];
        break;
      case "clear":
        newLines = ["Terminal v1.0.0 [by Gavin, in React]"];
        break;
      case "projects":
        newLines = [
          ...newLines,
          "[ list of projects ]",
          "{ [klash](https://klash.dev), [counterfeit](https://counterfeitcontent.com), [empires](https://designingempires.com), [glacier](https://glacier.fly.dev), [klips](https://klips.gavingogaming.com) }"
        ];
        break;
      case "socials":
        newLines = [
          ...newLines,
          "[ all my socials ]",
          "{ [twitter](https://x.com/gavingogaming), [instagram](https://instagram.com/gavingogaming), [github](https://github.com/gavingogaming), [youtube](https://youtube.com/gavingogaming), [shop](https://shop.gavingogaming.com), [linkedin](https://www.linkedin.com/in/gavin-fox-149b40300/) }"
        ];
        break;
      default:
        newLines = [...newLines, `Command not found: ${args[0]}`];
        break;
    }
  
    // Update the state once with the new lines
    setLines(newLines);
  }
  useEffect(()=>{
    window.evalCommand = runCommand;
  }, []);
  return (
    <main>
      <div className="terminal">
        <div className="terminal-lines">
          {lines.map((line, index) => (
            <div key={index} className="terminal-line">
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
        </div>
        <div className="terminal-input">
          <span dangerouslySetInnerHTML={{__html:`<span style="color:#0f0;">gavingogaming</span><span style="color:#f00;">@</span><span style="color:#0f0;">personal:</span><span style="color:#00f;">~</span><span style="color:#ff0;">$</span>`}}></span>
          <input
            type="text"
            id="input"
            autoCorrect={"off"}
            autoCapitalize={"off"}
            autoComplete={"off"}
            onKeyDown={async (event) => {
              const input = document.getElementById("input") as HTMLInputElement;
              if (event.key === "Enter") {
                runCommand(input.value);
                input.value = "";
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
