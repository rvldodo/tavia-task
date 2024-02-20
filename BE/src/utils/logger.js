import bunyan from "bunyan";
import bFormat from "bunyan-format";
import colors from "colors";

const formatOut = bFormat({ outputMode: "long", colors: true });
let level = "info";

const streams = [
  {
    stream: formatOut,
    level,
    color: true,
  },
];

const log = bunyan.createLogger({
  name: "Tavia-task",
  streams,
  serializers: bunyan.stdSerializers,
});

const debug = (obj, msg) => {
  log.debug(colors.gray(obj), msg || "");
};

const info = (obj, msg) => {
  log.info(colors.white(obj), msg || "");
};

const warn = (obj, msg) => {
  log.warn(colors.yellow(obj), msg || "");
};

const error = (obj, msg) => {
  log.error(colors.red(obj), msg || "");
};

export default {
  debug,
  warn,
  error,
  info,
};
