"use strict";

/* eslint-disable prefer-destructuring */
// eslint-disable-next-line no-undef
registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners'];
  }

  // calculation based on the equation:
  // TODO: Add link to equation
  // Note that the y-axis is flipped between a normal graph and the browser, as
  // in the browser, (0, 0) is at the top-left and (+w, +h) is in the bottom-right corner
  calculateAB(hWidth, hHeight, r, rSquared, sSquared, x) {
    const xMinusHWidth = x - hWidth;
    const xMinusHWidthSquared = Math.pow(xMinusHWidth, 2);
    const a = r * hHeight * Math.sqrt(rSquared - xMinusHWidthSquared);
    const b = hWidth * Math.sqrt(rSquared - xMinusHWidthSquared * sSquared);
    return {
      a,
      b
    };
  }
  paint(ctx, geom, properties) {
    const propertyValues = properties.get('--smooth-corners').toString().split(' ');
    const c0 = propertyValues[0];
    const c1 = propertyValues[1] || c0;
    const c2 = propertyValues[2] || c0;
    const c3 = propertyValues[3] || c1 || c0;
    ctx.fillStyle = 'black';
    const nValues = [100 - c0, 100 - c1, 100 - c2, 100 - c3];

    // 4 values — one for each corner.
    // m is a value between 0 and 100 which determines the amount of curvature
    let mValues = nValues.map(n => {
      if (n > 100) return 100;
      if (n < 0) return 0;
      return n;
    });
    const {
      width,
      height
    } = geom;
    const hWidth = width / 2;
    const hHeight = height / 2;
    const r = hWidth;
    const rSquared = Math.pow(r, 2);
    let m = mValues[0];
    let s = 0.9 + m / 1000;
    let sSquared = Math.pow(s, 2);
    ctx.beginPath();

    // top left part
    for (let i = 0; i < r; i++) {
      const x = i - r + hWidth;
      const {
        a,
        b
      } = this.calculateAB(hWidth, hHeight, r, rSquared, sSquared, x);
      const y = hHeight - a / b;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    m = mValues[1];
    s = 0.9 + m / 1000;
    sSquared = Math.pow(s, 2);

    // top right part
    for (let i = r; i < 2 * r + 1; i++) {
      const x = i - r + hWidth;
      const {
        a,
        b
      } = this.calculateAB(hWidth, hHeight, r, rSquared, sSquared, x);
      const y = hHeight - a / b;
      ctx.lineTo(x, y);
    }
    m = mValues[2];
    s = 0.9 + m / 1000;
    sSquared = Math.pow(s, 2);

    // bottom left part
    for (let i = 2 * r; i < 3 * r; i++) {
      const x = 3 * r - i + hWidth;
      const {
        a,
        b
      } = this.calculateAB(hWidth, hHeight, r, rSquared, sSquared, x);
      const y = hHeight + a / b;
      ctx.lineTo(x, y);
    }
    m = mValues[3];
    s = 0.9 + m / 1000;
    sSquared = Math.pow(s, 2);

    // bottom right part
    for (let i = 3 * r; i < 4 * r + 1; i++) {
      const x = 3 * r - i + hWidth;
      const {
        a,
        b
      } = this.calculateAB(hWidth, hHeight, r, rSquared, sSquared, x);
      const y = hHeight + a / b;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
});