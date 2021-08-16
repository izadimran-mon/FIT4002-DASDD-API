import "jest-extended";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTypeOrNull(type: any): R;
      // toBeWithinRange(a: number, b: number): R;
    }

    interface Expect {
      toBeTypeOrNull(type: any): R;
      // toBeWithinRange(a: number, b: number): R;
    }
  }
}

export {};
