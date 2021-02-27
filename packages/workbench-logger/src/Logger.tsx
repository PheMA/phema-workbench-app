import React from "react";
import moment from "moment";
import chroma from "chroma-js";

import "./Logger.scss";

interface LoggerMessage {
  ts: string;
  msg: string;
  prefix?: string;
  color?: string;
}

interface LoggerMessages {
  messages: LoggerMessage[];
}

class Logger extends React.Component<{}, LoggerMessages> {
  static instance: Logger;
  static defaultColor: any;

  state: LoggerMessages;
  messagesEnd: Element;

  constructor(props) {
    super(props);

    Logger.defaultColor = chroma.random().darken(3);

    this.state = {
      messages: [
        {
          ts: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          msg: "Logger initialized 🚀",
          prefix: "logger",
          color: Logger.defaultColor,
        },
      ],
    };
  }

  public static log(msg: string, prefix: string, color: string) {
    if (Logger.instance) {
      Logger.instance.setState({
        messages: [
          ...Logger.instance.state.messages,
          {
            ts: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
            msg: msg,
            prefix: prefix,
            color: color || Logger.defaultColor,
          },
        ],
      });
    } else {
      console.log(msg);
    }
  }

  public static prefixLogger(prefix: string) {
    const col = chroma.random().darken(3);

    return (msg) => Logger.log(msg, prefix, col);
  }

  scrollToBottom = () => {
    console.log("Scrolling");
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    Logger.instance = this;
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const items = this.state.messages.map((m, i) => {
      const prefix = m.prefix ? (
        <span
          className="workbench__logger__prefix"
          style={{ color: m.color.alpha(0.5).hex() }}
        >
          [{m.prefix}]
        </span>
      ) : undefined;

      return (
        <div className="workbench__logger__item" key={i}>
          <span
            className="workbench__logger__timestamp"
            style={{ color: m.color.alpha(0.5).hex() }}
          >
            [{m.ts}]
          </span>
          {prefix}
          <span
            className="workbench__logger__message"
            style={{ color: m.color.hex() }}
          >
            {m.msg}
          </span>
        </div>
      );
    });

    return (
      <div className="workbench__logger">
        {items}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export { Logger };
