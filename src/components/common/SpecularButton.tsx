import { useEffect, useRef, type ComponentProps } from "react";
import { Link } from "react-router-dom";
import "./SpecularButton.css";

const vertex = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

// Adapted from the supplied React Bits SpecularButton shader. Keep the light
// separate from the link body, so navigation and styling also work without WebGL.
const fragment = `#version 300 es
precision highp float;
uniform vec2 uHalf;
uniform vec2 uPointer;
uniform float uRatio;
uniform float uLevel;
out vec4 outColor;
void main() {
  vec2 p = gl_FragCoord.xy / uRatio - uHalf - 12.0;
  float r = min(18.0, min(uHalf.x, uHalf.y));
  vec2 q = abs(p) - uHalf + r;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  vec2 delta = (p - uPointer) / vec2(64.0, 29.0);
  float spot = exp(-dot(delta, delta));
  float edge = 1.0 - smoothstep(0.45, 1.55, abs(d + 0.5));
  float glow = exp(-abs(d) / 4.0) * spot * 0.15;
  float a = clamp(edge * spot * uLevel + glow * uLevel, 0.0, 1.0);
  outColor = vec4(vec3(0.77, 0.97, 1.0) * a, a);
}
`;

function createProgram(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { gl.deleteProgram(program); return null; }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (compiled) gl.attachShader(program, shader);
    gl.deleteShader(shader);
    if (!compiled) { gl.deleteProgram(program); return null; }
  }
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  gl.deleteProgram(program);
  return null;
}

/** A router link styled as a React Bits–style specular button. */
export function SpecularButton({ children, className, ...props }: ComponentProps<typeof Link>) {
  const link = useRef<HTMLAnchorElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = link.current;
    const layer = canvas.current;
    if (!element || !layer) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gl = layer.getContext("webgl2", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;
    const program = createProgram(gl);
    if (!program) return;
    const buffer = gl.createBuffer();
    if (!buffer) { gl.deleteProgram(program); return; }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const half = gl.getUniformLocation(program, "uHalf");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const ratio = gl.getUniformLocation(program, "uRatio");
    const level = gl.getUniformLocation(program, "uLevel");
    let frame = 0;
    let point: PointerEvent | undefined;

    const draw = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round((bounds.width + 24) * scale);
      const h = Math.round((bounds.height + 24) * scale);
      if (layer.width !== w) layer.width = w;
      if (layer.height !== h) layer.height = h;
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (motion.matches) return;
      const hx = bounds.width / 2;
      const hy = bounds.height / 2;
      const x = point ? point.clientX - bounds.left - hx : -hx + 22;
      const y = point ? bounds.top + hy - point.clientY : hy;
      const distance = Math.hypot(Math.max(0, Math.abs(x) - hx), Math.max(0, Math.abs(y) - hy));
      const near = point ? Math.max(0, 1 - distance / 250) : 0;
      gl.uniform2f(half, hx, hy);
      gl.uniform2f(pointer,
        near ? Math.max(-hx, Math.min(hx, x)) : -hx + 22,
        near ? Math.max(-hy, Math.min(hy, y)) : hy,
      );
      gl.uniform1f(ratio, scale);
      gl.uniform1f(level, 0.35 + 0.65 * near);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const move = (event: PointerEvent) => {
      if (motion.matches || event.pointerType === "touch") return;
      point = event;
      schedule();
    };
    const reset = () => { point = undefined; schedule(); };
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(element);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", schedule);
    document.documentElement.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("resize", schedule);
      document.documentElement.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <Link {...props} ref={link} className={`specular-button${className ? ` ${className}` : ""}`}>
      <canvas ref={canvas} className="specular-button__light" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </Link>
  );
}
