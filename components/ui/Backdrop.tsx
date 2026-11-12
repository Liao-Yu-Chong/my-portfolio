/**
 * The page's single background layer: a column ruling plus two distant
 * blooms, all fixed and drifting against the scroll.
 *
 * Everything in here is decorative and inert — the content scrolling over
 * it owns all of the contrast. The deltas are deliberately small: enough
 * that flat black gains depth, not enough to read as movement.
 *
 * The drift is a CSS scroll-driven animation on the root scroller
 * (backdrop-* in globals.css), so this renders on the server and runs no
 * JS. Without support, or under reduced motion, the layers simply hold
 * their static positions.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="backdrop-grid absolute inset-0">
        <div className="rule-grid" />
      </div>

      {/* The warm bloom starts behind the hero headline and sinks as you read. */}
      <div className="backdrop-ember absolute left-1/2 h-[46rem] w-[64rem] max-w-[160vw] -translate-x-1/2">
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--color-ember) 15%, transparent), transparent 70%)',
          }}
        />
      </div>

      {/* The cold one is the opposite: absent at the top, rising into the work
          and contact sections so the lower half is not just a darker copy. */}
      <div className="backdrop-signal absolute left-[62%] h-[38rem] w-[46rem] max-w-[140vw] -translate-x-1/2">
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--color-signal) 13%, transparent), transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
