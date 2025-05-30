/**
 * initialization interface.
 */
export interface Initable {
  init(): Promise<null>;
}
