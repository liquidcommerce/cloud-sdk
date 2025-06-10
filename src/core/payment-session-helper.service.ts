import type { IUserSession } from '../interfaces';

enum A {
  X = 0,
  Y = 1,
}

enum B {
  I = 0,
  J = 1,
}

enum C {
  V = 'values',
  T = 'createdAt',
}

enum D {
  P = 'pk_live_',
  Q = 'pk_test_',
  R = 'seti_',
  S = '_secret_',
  U = 'production',
}

enum E {
  M = 2,
  N = 'string',
  O = 'object',
}

export class PaymentSessionHelperService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private static readonly F = {
    G: 'Invalid response structure',
    H: 'Invalid primary component',
    I: 'Invalid secondary component',
    J: 'Failed to reconstruct payment session data: ',
  };

  rcd(d: any, env: any): IUserSession {
    try {
      const p = d?.[C.V];
      this.v(p, Array.isArray, E.M, PaymentSessionHelperService.F.G);

      const q = p[A.X];
      this.v(q, (x: any) => typeof x === E.N, null, PaymentSessionHelperService.F.H);

      const r = p[A.Y];
      this.v(r, Array.isArray, E.M, PaymentSessionHelperService.F.I);

      return {
        key: this.a(q, env),
        secret: this.b(r[B.I], r[B.J]),
        createdAt: d?.[C.T] || new Date(),
      };
    } catch (e: any) {
      throw new Error(`${PaymentSessionHelperService.F.J}${e?.message}`);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-restricted-types, @typescript-eslint/no-unsafe-function-type
  private v(x: any, f: Function, l: any, m: string): void {
    if (!f(x) || (l !== null && x.length < l)) {
      throw new Error(m);
    }
  }

  private a(c: string, env: string): string {
    return `${env === D.U ? D.P : D.Q}${c}`;
  }

  private b(i: string, t: string): string {
    return !i || !t ? '' : `${D.R}${i}${D.S}${t}`;
  }
}