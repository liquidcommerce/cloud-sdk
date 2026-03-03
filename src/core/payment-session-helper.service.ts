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
  T_C = 'ctoken_',
  U = 'prod',
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
    return `${env === D.U ? '' : D.Q}${c}`;
  }

  private b(i: string, t: string): string {
    return !i || !t ? '' : `${D.R}${i}${D.S}${t}`;
  }

  public ocd(ct: string, si: string): string {
    const p = this.gsi(si).replace(D.R, '');
    const c = ct.replace(D.T_C, '');
    const d = JSON.stringify([c, p]);

    return typeof btoa === 'function' ? btoa(d) : Buffer.from(d).toString('base64');
  }

  public gsi(s: string): string {
    return s.split(D.S)[0];
  }

  public gdk(t: string): string {
    try {
      const d = typeof atob === 'function' ? atob(t) : Buffer.from(t, 'base64').toString('ascii');
      const [c, p] = JSON.parse(d);
      const cti = `${D.T_C}${c}`;
      const sii = `${D.R}${p}`;
      return `${cti}${sii}`;
    } catch (e: any) {
      throw new Error(`Failed to reconstruct the response data: ${e.message}`);
    }
  }

  public dd<T>(d: any, t: string): T {
    const k = this.gdk(t);
    if (d && k) {
      try {
        const c =
          typeof atob === 'function' ? atob(d) : Buffer.from(d, 'base64').toString('binary');

        let p = '';
        for (let i = 0; i < c.length; i++) {
          // eslint-disable-next-line no-bitwise
          p += String.fromCharCode(c?.charCodeAt?.(i) ^ k?.charCodeAt?.(i % k.length));
        }

        return JSON.parse(p);
      } catch (e: any) {
        throw new Error(`Failed to reconstruct the response data: ${e.message}`);
      }
    }

    return d as T;
  }
}
