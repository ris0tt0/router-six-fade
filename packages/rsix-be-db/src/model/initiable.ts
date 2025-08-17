/**
 * initialization interface.
 */
export interface Initable {
  /**
   * determines if this class is initialized.
   */
  isInitialized: boolean;
  /**
   * Initializes the class
   */
  init(): Promise<null>;
  /**
   * Used to clean up the class, remove event listeners.
   */
  destroy(): Promise<null>;
}
