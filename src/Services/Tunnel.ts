import { connect } from "ngrok";

const Tunnel = (
  port: number | string,
  options: object = {}
): Promise<string> => {
  try {
    return connect({
      addr: port,
      ...options
    });
  } catch (error) {
    throw new TunnelInitializationError(error);
  }
};

export class TunnelInitializationError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export default Tunnel;
